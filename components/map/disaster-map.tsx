"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  MapContainer,
  Marker,
  Popup,
  ScaleControl,
  TileLayer,
  useMap,
} from "react-leaflet"

import "leaflet/dist/leaflet.css"

import { HAZARD_LAYERS } from "@/lib/hazard-layers"
import { MAP_CENTER, MAP_INITIAL_ZOOM } from "@/lib/shelters"
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

   左上
   31.935980909027702, 131.4163624006582

   右上
   31.93234275318809, 131.4465752587687

   左下
   31.913759926255338, 131.41626033014597

   右下
   31.91250360896004, 131.44208415819273

   Leafletでは
   南西 → 北東
   で指定する。
======================================== */

const MIYATO_BOUNDS: [
  [number, number],
  [number, number],
] = [
  [31.91250360896004, 131.41626033014597],
  [31.935980909027702, 131.4465752587687],
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

  /* ========================================
     現在地から避難所までの距離
  ======================================== */

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

  /* ========================================
     ハザードレイヤー切り替え
  ======================================== */

  const toggleLayer = (id: DisasterType) => {
    setActiveLayers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  /* ========================================
     地図中心
  ======================================== */

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
      {/* ========================================
          ハザードマップ操作パネル
      ======================================== */}

      <HazardLayerPanel
        active={activeLayers}
        onToggle={toggleLayer}
        showShelters={showShelters}
        onToggleShelters={() =>
          setShowShelters((value) => !value)
        }
      />

      {/* ========================================
          Leaflet地図
      ======================================== */}

      <MapContainer
        center={center}
        zoom={focusShelterId ? 16 : 15}

        /* ズームアニメーション */
        zoomAnimation={true}
        zoomAnimationThreshold={4}
        fadeAnimation={true}
        markerZoomAnimation={true}

        scrollWheelZoom={true}

        /* ========================================
           地図移動範囲を制限
        ======================================== */

        maxBounds={MIYATO_BOUNDS}
        maxBoundsViscosity={1.0}

        /* ========================================
           ズーム範囲
        ======================================== */

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

        {/* ========================================
            初期表示を指定範囲に合わせる
        ======================================== */}

        {!focusShelterId && <FitMiyatoBounds />}

        {/* ========================================
            OpenStreetMap
        ======================================== */}

        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
          maxZoom={19}
        />

        {/* ========================================
            国土地理院ハザードレイヤー
        ======================================== */}

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

        {/* ========================================
            避難所マーカー
        ======================================== */}

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

        {/* ========================================
            現在地マーカー
        ======================================== */}

        {currentPos && (
          <Marker
            position={currentPos}
            icon={createCurrentLocationIcon()}
            alt="現在地"
          >
            <Popup>現在地</Popup>
          </Marker>
        )}

        {/* ========================================
            縮尺
        ======================================== */}

        <ScaleControl
          position="bottomleft"
          imperial={false}
        />

        {/* ========================================
            地図検索
        ======================================== */}

        <SearchControl />

        {/* ========================================
            現在地
        ======================================== */}

        <LocateControl
          onLocated={(lat, lng) => {
            setCurrentPos([lat, lng])
          }}
        />

        {/* ========================================
            全画面表示
        ======================================== */}

        <FullscreenControl
          containerRef={containerRef}
        />

        {/* ========================================
            座標表示
        ======================================== */}

        <CoordinatesDisplay />
      </MapContainer>
    </div>
  )
}