import type { EmergencyContact } from "@/lib/types"

// 緊急連絡先。編集はこのファイルのみで完結します。
// ※電話番号はサンプルを含みます。公開前に必ず最新の正式な情報へ更新してください。
export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: "police-emergency",
    category: "警察",
    name: "警察（緊急）",
    phone: "110",
    description: "事件・事故など緊急時の通報",
  },
  {
    id: "police-miyazaki",
    category: "警察",
    name: "宮崎警察署",
    phone: "0985-00-0110",
    description: "緊急でない相談・届出",
  },
  {
    id: "fire-emergency",
    category: "消防・救急",
    name: "消防・救急（緊急）",
    phone: "119",
    description: "火災の通報・救急車の要請",
  },
  {
    id: "fire-miyazaki",
    category: "消防・救急",
    name: "宮崎市消防局",
    phone: "0985-00-0119",
    description: "消防に関する問い合わせ",
  },
  {
    id: "ambulance-guide",
    category: "消防・救急",
    name: "救急安心センター（#7119）",
    phone: "#7119",
    description: "救急車を呼ぶか迷ったときの相談窓口",
  },
  {
    id: "city-office",
    category: "自治体",
    name: "宮崎市役所（代表）",
    phone: "0985-25-2111",
    description: "各種手続き・生活支援に関する問い合わせ",
    website: "https://www.city.miyazaki.miyazaki.jp/",
  },
  {
    id: "disaster-office",
    category: "防災",
    name: "宮崎市 危機管理課（防災）",
    phone: "0985-00-0200",
    description: "防災・避難情報に関する問い合わせ",
  },
  {
    id: "hospital-city",
    category: "医療機関",
    name: "宮崎市郡医師会病院",
    phone: "0985-00-0300",
    description: "救急対応可能な地域の中核病院",
  },
  {
    id: "hospital-univ",
    category: "医療機関",
    name: "宮崎大学医学部附属病院",
    phone: "0985-00-0400",
    description: "高度医療・重症救急に対応",
  },
]

// カテゴリ表示順
export const CONTACT_CATEGORY_ORDER = [
  "警察",
  "消防・救急",
  "自治体",
  "防災",
  "医療機関",
]
