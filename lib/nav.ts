// サイト全体のナビゲーション定義
export interface NavItem {
  href: string
  label: string
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "ホーム" },
  { href: "/shelters", label: "避難所一覧" },
  { href: "/checklist", label: "備蓄チェックリスト" },
  { href: "/disaster-info", label: "災害情報" },
  { href: "/emergency-contacts", label: "緊急連絡先" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "このサイトについて" },
]
export const SITE_NAME = "宮東地区 防災マップ"
export const SITE_DESCRIPTION =
  "宮崎県宮崎市宮東地区の避難所・ハザード情報・緊急連絡先をまとめた防災情報サイトです。"
