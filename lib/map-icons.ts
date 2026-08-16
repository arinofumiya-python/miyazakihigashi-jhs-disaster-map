import L from "leaflet"
import type { Shelter } from "@/lib/types"

// 避難所の主たる対応災害に応じてマーカー色を決める
function shelterColor(shelter: Shelter): string {
  const types = shelter.disasterTypes
  if (types.includes("tsunami")) return "#2b6cb0" // 津波対応（青）
  if (types.includes("flood")) return "#3b5bdb" // 洪水対応（藍）
  if (types.includes("landslide")) return "#b7791f" // 土砂対応（黄土）
  if (types.includes("surge")) return "#805ad5" // 高潮対応（紫）
  return "#c53030" // 地震ほか（赤）
}

/**
 * 避難所用のカスタム DivIcon を生成する。
 * SVG のピンにアイコンを重ねて種別ごとに色分けする。
 */
export function createShelterIcon(shelter: Shelter): L.DivIcon {
  const color = shelterColor(shelter)
  const html = `
    <span class="relative flex items-center justify-center" style="width:32px;height:42px;" aria-hidden="true">
      <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 10.5 16 26 16 26s16-15.5 16-26C32 7.163 24.837 0 16 0z" fill="${color}"/>
        <circle cx="16" cy="16" r="11" fill="#ffffff"/>
      </svg>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="position:absolute;top:8px;">
        <path d="M3 9.5 12 3l9 6.5"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/>
      </svg>
    </span>`
  return L.divIcon({
    html,
    className: "shelter-marker",
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -38],
  })
}

/**
 * 現在地マーカー
 */
export function createCurrentLocationIcon(): L.DivIcon {
  const html = `
    <span style="display:block;width:20px;height:20px;" aria-hidden="true">
      <span style="display:block;width:20px;height:20px;border-radius:9999px;background:#2563eb;border:3px solid #ffffff;box-shadow:0 0 0 3px rgba(37,99,235,0.35);"></span>
    </span>`
  return L.divIcon({
    html,
    className: "current-location-marker",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  })
}
