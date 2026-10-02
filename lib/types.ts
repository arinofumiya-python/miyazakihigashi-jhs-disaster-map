export type DisasterType =
  | "flood"
  | "tsunami"
  | "landslide"
  | "surge"
  | "earthquake"

export type PetPolicy =
  | "none"
  | "同行避難"
  | "同室避難"

export interface Shelter {
  id: string
  name: string
  latitude: number
  longitude: number
  address: string
  phone: string
  capacity: number

  disasterTypes: DisasterType[]
  facilities: string[]
  accessibility: string[]
  openingHours: string
  website?: string

  /** Google Maps 埋め込みURL */
  googleMapEmbedUrl?: string

  photo: string[]
  description: string
  notes?: string
  lastUpdated: string
  petPolicy: PetPolicy
}

export interface ShelterWithDistance extends Shelter {
  distance: number | null
}

export interface EmergencyContact {
  id: string
  name: string
  category: string
  phone: string
  description?: string
}

export interface ChecklistItem {
  id: string
  category: string
  item: string
  checked?: boolean
}

export interface HazardLayer {
  id: string
  name: string
  url: string
  attribution: string
  opacity: number
}