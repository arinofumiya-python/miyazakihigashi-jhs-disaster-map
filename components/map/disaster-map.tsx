"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  Polyline,
  ScaleControl,
  TileLayer,
  useMap,
} from "react-leaflet"

import "leaflet/dist/leaflet.css"

import { HAZARD_LAYERS } from "@/lib/hazard-layers"
import { MAP_CENTER } from "@/lib/shelters"
import {
  createCurrentLocationIcon,
  createShelterIcon,
} from "@/lib/map-icons"
import { haversineDistance } from "@/lib/geo"

import type {
  DisasterType,
  Shelter,
  ShelterWithDistance,
} from "@/lib/types"

import { HazardLayerPanel } from "@/components/map/hazard-layer-panel"
import { ShelterPopup } from "@/components/map/shelter-popup"

import {
  CoordinatesDisplay,
  FullscreenControl,
  LocateControl,
  SearchControl,
} from "@/components/map/map-controls"

interface DisasterMapProps {
  shelters: Shelter[]
  focusShelterId?: string
  className?: string
}

/* ========================================
   Leafletの地図サイズを再計算
======================================== */

function MapResizeFix() {
  const map = useMap()

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize()
    }, 300)

    return () => clearTimeout(timer)
  }, [map])

  return null
}

/* ========================================
   指定された宮東地区の範囲
======================================== */

const MIYATO_BOUNDS: [
  [number, number],
  [number, number],
] = [
  [31.91250360896004, 131.41626033014597],
  [31.935980909027702, 131.4465752587687],
]

/* ========================================
   危険な道
======================================== */

const SAFE_ROUTES: [number, number][][] = [
  [
    [31.933915952483876, 131.42927758738696],
    [31.915631053039746, 131.43202416930998],
  ],
  [
    [31.92797165194925, 131.4263592070949],
    [31.925699639107798, 131.42569693841415],
  ],
  [
    [31.93082224658181, 131.42735764311095],
    [31.93181473272855, 131.42778679651727],
  ],
  [
    [31.93181473272855, 131.42778679651727],
    [31.93131393830559, 131.42791554253915],
  ],
  [
    [31.931451771169588, 131.43259827106667],
    [31.932269452567603, 131.43408521175718],
  ],
  [
    [31.929494031037542, 131.43216305866076],
    [31.928798659398936, 131.43234513303105],
  ],
  [
    [31.934807187616645, 131.42431539886488],
    [31.934309521001715, 131.42440561725513],
  ],
  [
    [31.934309521001715, 131.42440561725513],
    [31.934278895275856, 131.42408985288927],
  ],
  [
    [31.933217100420414, 131.42120139209305],
    [31.932592579202183, 131.4212203581733],
  ],
  [
    [31.932028962239468, 131.42122694524858],
    [31.931334679944072, 131.4211867121167],
  ],
  [
    [31.928013406290038, 131.42640855771916],
    [31.9250526919097, 131.4254924130221],
  ],
  [
    [31.916752693008647, 131.43593715494512],
    [31.916220543788455, 131.43596126757924],
  ],
  [
    [31.915742971354486, 131.43588892967685],
    [31.915736148873172, 131.43524592609992],
  ],
  [
    [31.915838486039622, 131.43527003873407],
    [31.915736148873172, 131.43431357091345],
  ],
  [
    [31.915667924026774, 131.43328476502302],
    [31.915722503903527, 131.43288288778749],
  ],
  [
    [31.915783906225894, 131.43158884293837],
    [31.915708858937112, 131.43057611230475],
  ],
  [
    [31.91581119614244, 131.42961964431385],
    [31.915927178161187, 131.42903290354994],
  ],
  [
    [31.915961290491822, 131.4283657873389],
    [31.916063627407823, 131.4278674595668],
  ],
  [
    [31.916090917242155, 131.42729679373772],
    [31.916206898906974, 131.42660556495414],
  ],
  [
    [31.916295355629046, 131.42603975081298],
    [31.916427305738853, 131.42535035907443],
  ],
  [
    [31.916448439342716, 131.42479826233685],
    [31.916509288928495, 131.424067051977],
  ],
  [
    [31.9166188180815, 131.4235939158618],
    [31.91663504461158, 131.42326893347965],
  ],
]

/* ========================================
   青色の危険ポイント
======================================== */

const BLUE_POINTS: [number, number][] = [
  [31.931730450441727, 131.4308392729541],
  [31.921238791996803, 131.43588735976547],
  [31.917013725882978, 131.4359655062107],
  [31.922859959169042, 131.42480725212977],
  [31.928627080306498, 131.4258853043571],
]

/* ========================================
   ハザードレイヤー初期状態
======================================== */

const initialActive = HAZARD_LAYERS.reduce(
  (acc, layer) => {
    acc[layer.id] = false
    return acc
  },
  {} as Record<DisasterType, boolean>,
)

/* ========================================
   地図を指定範囲に合わせる
======================================== */

function FitMiyatoBounds() {
  const map = useMap()

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize()

      map.fitBounds(MIYATO_BOUNDS, {
        padding: [20, 20],
        animate: true,
        duration: 1.0,
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [map])

  return null
}

/* ========================================
   メイン地図
======================================== */

export default function DisasterMap({
  shelters,
  focusShelterId,
  className,
}: DisasterMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const [activeLayers, setActiveLayers] =
    useState<Record<DisasterType, boolean>>(initialActive)

  const [showShelters, setShowShelters] = useState(true)

  const [currentPos, setCurrentPos] =
    useState<[number, number] | null>(null)

  const sheltersWithDistance: ShelterWithDistance[] =
    useMemo(() => {
      return shelters.map((shelter) => ({
        ...shelter,
        distance: currentPos
          ? haversineDistance(
              currentPos[0],
              currentPos[1],
              shelter.latitude,
              shelter.longitude,
            )
          : null,
      }))
    }, [shelters, currentPos])

  const toggleLayer = (id: DisasterType) => {
    setActiveLayers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const center = useMemo<[number, number]>(() => {
    if (focusShelterId) {
      const shelter = shelters.find(
        (item) => item.id === focusShelterId,
      )

      if (shelter) {
        return [
          shelter.latitude,
          shelter.longitude,
        ]
      }
    }

    return MAP_CENTER
  }, [focusShelterId, shelters])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "400px",
      }}
    >
      <HazardLayerPanel
        active={activeLayers}
        onToggle={toggleLayer}
        showShelters={showShelters}
        onToggleShelters={() =>
          setShowShelters((value) => !value)
        }
      />

      <MapContainer
        center={center}
        zoom={focusShelterId ? 16 : 15}
        zoomAnimation={true}
        zoomAnimationThreshold={4}
        fadeAnimation={true}
        markerZoomAnimation={true}
        scrollWheelZoom={true}
        maxBounds={MIYATO_BOUNDS}
        maxBoundsViscosity={1.0}
        minZoom={15}
        maxZoom={19}
        className="h-full w-full"
        style={{
          width: "100%",
          height: "100%",
          minHeight: "400px",
          zIndex: 0,
        }}
      >
        <MapResizeFix />

        {!focusShelterId && <FitMiyatoBounds />}

        {/* OpenStreetMap */}

        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
          maxZoom={19}
        />

        {/* 国土地理院ハザードレイヤー */}

        {HAZARD_LAYERS.map((layer) =>
          activeLayers[layer.id] ? (
            <TileLayer
              key={layer.id}
              url={layer.url}
              attribution={layer.attribution}
              opacity={layer.opacity}
              maxZoom={18}
            />
          ) : null,
        )}

        {/* 緑色の危険な道 */}

        {SAFE_ROUTES.map((route, index) => (
          <Polyline
            key={`danger-route-${index}`}
            positions={route}
            pathOptions={{
              color: "#22c55e",
              weight: 5,
              opacity: 0.9,
            }}
          />
        ))}

        {/* 青色の危険ポイント */}

        {BLUE_POINTS.map((point, index) => (
          <CircleMarker
            key={`blue-point-${index}`}
            center={point}
            radius={10}
            pathOptions={{
              color: "#2563eb",
              fillColor: "#2563eb",
              fillOpacity: 1,
              weight: 1,
            }}
          />
        ))}

        {/* 避難所マーカー */}

        {showShelters &&
          sheltersWithDistance.map((shelter) => (
            <Marker
              key={shelter.id}
              position={[
                shelter.latitude,
                shelter.longitude,
              ]}
              icon={createShelterIcon(shelter)}
              alt={`避難所: ${shelter.name}`}
            >
              <Popup>
                <ShelterPopup shelter={shelter} />
              </Popup>
            </Marker>
          ))}

        {/* 現在地マーカー */}

        {currentPos && (
          <Marker
            position={currentPos}
            icon={createCurrentLocationIcon()}
            alt="現在地"
          >
            <Popup>現在地</Popup>
          </Marker>
        )}

        <ScaleControl
          position="bottomleft"
          imperial={false}
        />

        <SearchControl />

        <LocateControl
          onLocated={(lat, lng) => {
            setCurrentPos([lat, lng])
          }}
        />

        <FullscreenControl
          containerRef={containerRef}
        />

        {/* ========================================
            危険な道についての注意書き
        ======================================== */}

        <div
          style={{
            position: "absolute",
            bottom: "45px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            padding: "8px 14px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: "bold",
            color: "#334155",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          ⚠️ 青色の点・緑色の線は危険な道を示しています
        </div>

        {/* 座標表示 */}

        <CoordinatesDisplay />
      </MapContainer>
    </div>
  )
}