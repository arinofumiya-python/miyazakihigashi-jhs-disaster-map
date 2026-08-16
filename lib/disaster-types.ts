import type { DisasterType } from "@/lib/types"

interface DisasterTypeMeta {
  label: string
  /** マーカー・凡例に使う CSS 変数（globals.css で定義） */
  colorVar: string
  description: string
}

// 災害種別のメタ情報（ラベル・色・説明）
export const DISASTER_TYPES: Record<DisasterType, DisasterTypeMeta> = {
  flood: {
    label: "洪水",
    colorVar: "var(--flood)",
    description: "河川の氾濫や内水氾濫による浸水",
  },
  tsunami: {
    label: "津波",
    colorVar: "var(--tsunami)",
    description: "地震に伴う津波による浸水",
  },
  landslide: {
    label: "土砂災害",
    colorVar: "var(--landslide)",
    description: "がけ崩れ・土石流・地すべり",
  },
  surge: {
    label: "高潮",
    colorVar: "var(--surge)",
    description: "台風などによる海面上昇と浸水",
  },
  earthquake: {
    label: "地震",
    colorVar: "var(--earthquake)",
    description: "地震の揺れによる被害",
  },
}

export const DISASTER_TYPE_ORDER: DisasterType[] = [
  "flood",
  "tsunami",
  "landslide",
  "surge",
  "earthquake",
]

export function getDisasterLabel(type: DisasterType): string {
  return DISASTER_TYPES[type]?.label ?? type
}

export function getDisasterColor(type: DisasterType): string {
  return DISASTER_TYPES[type]?.colorVar ?? "var(--muted-foreground)"
}
