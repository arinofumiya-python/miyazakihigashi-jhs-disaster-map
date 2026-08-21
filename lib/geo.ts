// 地理計算に関するユーティリティ

const EARTH_RADIUS_M = 6371000

/**
 * 2地点間の距離をメートル単位で返す（ハバーサイン公式）
 */
export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return EARTH_RADIUS_M * c
}

/**
 * 距離（メートル）を読みやすい日本語表記に整形する
 */
export function formatDistance(meters: number | null): string {
  if (meters === null || Number.isNaN(meters)) return "―"
  if (meters < 1000) {
    return `約${Math.round(meters / 10) * 10}m`
  }
  return `約${(meters / 1000).toFixed(1)}km`
}
