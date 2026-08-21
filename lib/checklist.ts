import type { ChecklistItem } from "@/lib/types"

// 非常用持ち出し・備蓄チェックリスト。編集はこのファイルのみで完結します。
export const CHECKLIST_ITEMS: ChecklistItem[] = [
  // 水・食料
  { id: "water", label: "飲料水（1人1日3L × 3日分）", category: "水・食料" },
  { id: "food", label: "非常食（3日分・調理不要のもの）", category: "水・食料", note: "アルファ米、缶詰、栄養補助食品など" },
  { id: "utensils", label: "使い捨て食器・カトラリー", category: "水・食料" },

  // 情報・電源
  { id: "radio", label: "携帯ラジオ（手回し充電式が便利）", category: "情報・電源" },
  { id: "battery", label: "モバイルバッテリー・乾電池", category: "情報・電源" },
  { id: "flashlight", label: "懐中電灯・ヘッドライト", category: "情報・電源" },

  // 衛生・トイレ
  { id: "toilet", label: "携帯トイレ・簡易トイレ", category: "衛生・トイレ", note: "1人1日5回 × 3日分が目安" },
  { id: "mask", label: "マスク・消毒液", category: "衛生・トイレ" },
  { id: "wetsheet", label: "ウェットティッシュ・除菌シート", category: "衛生・トイレ" },
  { id: "tissue", label: "トイレットペーパー・ティッシュ", category: "衛生・トイレ" },

  // 医療・救急
  { id: "firstaid", label: "救急セット・常備薬", category: "医療・救急" },
  { id: "medicine", label: "持病の薬・お薬手帳のコピー", category: "医療・救急" },

  // 貴重品・書類
  { id: "cash", label: "現金（小銭を含む）", category: "貴重品・書類" },
  { id: "id", label: "身分証・健康保険証のコピー", category: "貴重品・書類" },
  { id: "bankbook", label: "通帳・印鑑のコピー", category: "貴重品・書類" },

  // 衣類・防寒
  { id: "clothes", label: "着替え・下着", category: "衣類・防寒" },
  { id: "blanket", label: "アルミブランケット・毛布", category: "衣類・防寒" },
  { id: "raincoat", label: "レインコート・防寒着", category: "衣類・防寒" },

  // その他
  { id: "gloves", label: "軍手・厚手の手袋", category: "その他" },
  { id: "whistle", label: "ホイッスル（救助要請用）", category: "その他" },
  { id: "tape", label: "ガムテープ・油性ペン", category: "その他" },
  { id: "helmet", label: "防災ずきん・ヘルメット", category: "その他" },

  // 要配慮者向け
  { id: "baby", label: "粉ミルク・離乳食・紙おむつ", category: "要配慮者向け", note: "乳幼児がいる家庭" },
  { id: "senior", label: "大人用紙おむつ・介護用品", category: "要配慮者向け", note: "高齢者・介護が必要な方" },
  { id: "pet", label: "ペットフード・ケージ", category: "要配慮者向け", note: "ペットがいる家庭" },
]

export const CHECKLIST_CATEGORY_ORDER = [
  "水・食料",
  "情報・電源",
  "衛生・トイレ",
  "医療・救急",
  "貴重品・書類",
  "衣類・防寒",
  "その他",
  "要配慮者向け",
]
