// ========================================
// 災害種別
// ========================================

export type DisasterType =
  | "flood" // 洪水
  | "tsunami" // 津波
  | "landslide" // 土砂災害
  | "surge" // 高潮
  | "earthquake" // 地震

// ========================================
// ペット避難の対応
// ========================================

export type PetPolicy =
  | "none" // ペット不可
  | "同行避難" // ペットを連れて避難所まで来られる
  | "同室避難" // ペットと同じ部屋で過ごせる

// ========================================
// 避難所データの型定義
// ========================================

export interface Shelter {
  id: string
  name: string
  latitude: number
  longitude: number
  address: string
  phone: string
  capacity: number

  /** 対応する災害種別 */
  disasterTypes: DisasterType[]

  /** 設備（例: 毛布、非常食、発電機 など） */
  facilities: string[]

  /** バリアフリー対応情報 */
  accessibility: string[]

  openingHours: string

  website?: string

  /** 代表写真（複数可） */
  photo: string[]

  description: string

  notes?: string

  /** 最終更新日 (YYYY-MM-DD) */
  lastUpdated: string

  /** ペット避難の対応 */
  petPolicy: PetPolicy
}

// ========================================
// 距離情報を付与した避難所
// ========================================

export interface ShelterWithDistance extends Shelter {
  /** 現在地からの距離（メートル）。未計測の場合は null */
  distance: number | null
}

// ========================================
// 緊急連絡先
// ========================================

export interface EmergencyContact {
  id: string
  category: string
  name: string
  phone: string
  description?: string
  website?: string
}

// ========================================
// 備蓄チェックリスト項目
// ========================================

export interface ChecklistItem {
  id: string
  label: string
  category: string
  note?: string
}

// ========================================
// ハザードレイヤー定義
// ========================================

export interface HazardLayer {
  id: DisasterType
  label: string

  /** GSI タイル URL テンプレート */
  url: string

  attribution: string

  /** レイヤーの説明 */
  description: string

  /** 凡例カラー（CSS 変数名） */
  colorVar: string

  opacity: number
}