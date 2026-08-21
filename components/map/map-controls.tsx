"use client"

import { useState } from "react"
import { useMap, useMapEvents } from "react-leaflet"
import { Crosshair, Loader2, Maximize, Minimize, Search } from "lucide-react"

// 現在地ボタン
export function LocateControl({
  onLocated,
}: {
  onLocated: (lat: number, lng: number) => void
}) {
  const map = useMap()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLocate = () => {
    if (!("geolocation" in navigator)) {
      setError("この端末では現在地を取得できません")
      return
    }
    setLoading(true)
    setError(null)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        onLocated(latitude, longitude)
        map.flyTo([latitude, longitude], 16)
        setLoading(false)
      },
      () => {
        setError("現在地を取得できませんでした。位置情報の許可をご確認ください。")
        setLoading(false)
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  return (
    <div className="leaflet-top leaflet-right" style={{ marginTop: 80 }}>
      <div className="leaflet-control leaflet-bar">
        <button
          type="button"
          onClick={handleLocate}
          className="flex size-9 items-center justify-center bg-card text-foreground hover:bg-secondary"
          aria-label="現在地を表示"
          title="現在地を表示"
        >
          {loading ? (
            <Loader2 className="size-5 animate-spin" aria-hidden="true" />
          ) : (
            <Crosshair className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>
      {error && (
        <div
          role="alert"
          className="leaflet-control mt-1 max-w-52 rounded-md bg-destructive px-2 py-1 text-xs text-destructive-foreground"
        >
          {error}
        </div>
      )}
    </div>
  )
}

// 全画面ボタン
export function FullscreenControl({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>
}) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const map = useMap()

  const toggle = async () => {
    const el = containerRef.current
    if (!el) return
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
      // 表示切替後にサイズを再計算
      setTimeout(() => map.invalidateSize(), 200)
    } catch {
      // フルスクリーン非対応環境は無視
    }
  }

  return (
    <div className="leaflet-top leaflet-right" style={{ marginTop: 128 }}>
      <div className="leaflet-control leaflet-bar">
        <button
          type="button"
          onClick={toggle}
          className="flex size-9 items-center justify-center bg-card text-foreground hover:bg-secondary"
          aria-label={isFullscreen ? "全画面を終了" : "全画面表示"}
          title={isFullscreen ? "全画面を終了" : "全画面表示"}
        >
          {isFullscreen ? (
            <Minimize className="size-5" aria-hidden="true" />
          ) : (
            <Maximize className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  )
}

// 座標表示
export function CoordinatesDisplay() {
  const [coords, setCoords] = useState<{ lat: number; lng: number; zoom: number }>()
  const map = useMap()

  useMapEvents({
    move: () => {
      const c = map.getCenter()
      setCoords({ lat: c.lat, lng: c.lng, zoom: map.getZoom() })
    },
  })

  const c = coords ?? {
    lat: map.getCenter().lat,
    lng: map.getCenter().lng,
    zoom: map.getZoom(),
  }

  return (
    <div className="leaflet-bottom leaflet-left" style={{ marginBottom: 24 }}>
      <div className="leaflet-control rounded-md bg-card/90 px-2 py-1 font-mono text-[11px] text-muted-foreground shadow">
        緯度 {c.lat.toFixed(5)} / 経度 {c.lng.toFixed(5)} / Z{c.zoom}
      </div>
    </div>
  )
}

// 住所・地名検索（国土地理院ジオコーダ API を利用）
export function SearchControl() {
  const map = useMap()
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `https://msearch.gsi.go.jp/address-search/AddressSearch?q=${encodeURIComponent(q)}`,
      )
      const data: Array<{ geometry: { coordinates: [number, number] } }> =
        await res.json()
      if (data.length > 0) {
        const [lng, lat] = data[0].geometry.coordinates
        map.flyTo([lat, lng], 16)
      } else {
        setError("該当する地名が見つかりませんでした")
      }
    } catch {
      setError("検索に失敗しました")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="leaflet-top leaflet-left" style={{ marginTop: 12, marginLeft: 12 }}>
      <div className="leaflet-control">
        <form onSubmit={handleSearch} className="flex items-center gap-1" role="search">
          <label htmlFor="map-search" className="sr-only">
            地名・住所で地図を検索
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id="map-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="地名・住所を検索"
              className="h-9 w-44 rounded-md border border-border bg-card pl-8 pr-2 text-sm shadow outline-none focus:ring-2 focus:ring-ring sm:w-56"
            />
          </div>
          <button
            type="submit"
            className="flex h-9 items-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow hover:opacity-90"
            disabled={loading}
          >
            {loading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : "検索"}
          </button>
        </form>
        {error && (
          <p role="alert" className="mt-1 rounded bg-card/90 px-2 py-1 text-xs text-destructive shadow">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
