import type { HazardLayer } from "@/lib/types"

// ハザードマップの出典
const GSI_ATTRIBUTION =
  "出典: 国土地理院ハザードマップポータルサイト"

// 背景地図：OpenStreetMap
export const GSI_BASE_TILE = {
  url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution: "© OpenStreetMap contributors",
  maxZoom: 19,
}

// OpenStreetMap
export const GSI_PALE_TILE = {
  url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution: "© OpenStreetMap contributors",
  maxZoom: 19,
}

// ハザードレイヤー
export const HAZARD_LAYERS: HazardLayer[] = [
  {
    id: "flood",
    label: "洪水浸水想定区域",
    url: "https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_data/{z}/{x}/{y}.png",
    attribution: GSI_ATTRIBUTION,
    description: "想定最大規模の降雨による河川氾濫の浸水深",
    colorVar: "var(--flood)",
    opacity: 0.7,
  },
  {
    id: "tsunami",
    label: "津波浸水想定",
    url: "https://disaportaldata.gsi.go.jp/raster/04_tsunami_newlegend_data/{z}/{x}/{y}.png",
    attribution: GSI_ATTRIBUTION,
    description: "津波による浸水が想定される区域と浸水深",
    colorVar: "var(--tsunami)",
    opacity: 0.7,
  },
  {
    id: "landslide",
    label: "土砂災害警戒区域",
    url: "https://disaportaldata.gsi.go.jp/raster/05_dosekiryukeikaikuiki/{z}/{x}/{y}.png",
    attribution: GSI_ATTRIBUTION,
    description: "土石流・急傾斜地の崩壊などの警戒区域",
    colorVar: "var(--landslide)",
    opacity: 0.7,
  },
  {
    id: "surge",
    label: "高潮浸水想定区域",
    url: "https://disaportaldata.gsi.go.jp/raster/03_hightide_l2_shinsuishin_data/{z}/{x}/{y}.png",
    attribution: GSI_ATTRIBUTION,
    description: "想定最大規模の高潮による浸水深",
    colorVar: "var(--surge)",
    opacity: 0.7,
  },
  {
    id: "earthquake",
    label: "地震危険度（参考）",
    url: "https://disaportaldata.gsi.go.jp/raster/06_shindomap_data/{z}/{x}/{y}.png",
    attribution: GSI_ATTRIBUTION,
    description: "想定される地震の揺れやすさ（参考情報）",
    colorVar: "var(--earthquake)",
    opacity: 0.6,
  },
]