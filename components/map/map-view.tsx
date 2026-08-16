"use client"

import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"
import type { Shelter } from "@/lib/types"

// 地図は遅延読み込み（SSR 無効）。初期表示を軽量化する。
const DisasterMap = dynamic(() => import("@/components/map/disaster-map"), {
  ssr: false,
  loading: () => (
    <div className="flex size-full items-center justify-center bg-secondary">
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <Loader2 className="size-8 animate-spin" aria-hidden="true" />
        <p className="text-sm">地図を読み込んでいます...</p>
      </div>
    </div>
  ),
})

interface MapViewProps {
  shelters: Shelter[]
  focusShelterId?: string
  className?: string
}

export function MapView({ shelters, focusShelterId, className }: MapViewProps) {
  return (
    <DisasterMap
      shelters={shelters}
      focusShelterId={focusShelterId}
      className={className}
    />
  )
}
