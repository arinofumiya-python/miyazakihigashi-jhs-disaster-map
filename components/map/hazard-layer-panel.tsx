"use client"

import { useState } from "react"
import { ChevronDown, Layers } from "lucide-react"
import { HAZARD_LAYERS } from "@/lib/hazard-layers"
import type { DisasterType } from "@/lib/types"
import { cn } from "@/lib/utils"

interface HazardLayerPanelProps {
  active: Record<DisasterType, boolean>
  onToggle: (id: DisasterType) => void
  showShelters: boolean
  onToggleShelters: () => void
}

export function HazardLayerPanel({
  active,
  onToggle,
  showShelters,
  onToggleShelters,
}: HazardLayerPanelProps) {
  const [open, setOpen] = useState(true)

  return (
    <div className="absolute right-3 top-3 z-[500] w-64 max-w-[calc(100%-1.5rem)]">
      <div className="overflow-hidden rounded-lg border border-border bg-card/95 shadow-lg backdrop-blur">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-2 px-3 py-2 text-sm font-semibold"
        >
          <span className="flex items-center gap-2">
            <Layers className="size-4 text-primary" aria-hidden="true" />
            表示レイヤー
          </span>
          <ChevronDown
            className={cn("size-4 transition-transform", open ? "rotate-180" : "")}
            aria-hidden="true"
          />
        </button>

        {open && (
          <div className="border-t border-border px-3 py-2">
            <fieldset>
              <legend className="mb-1 text-xs font-medium text-muted-foreground">
                施設
              </legend>
              <label className="flex cursor-pointer items-center gap-2 rounded-md px-1 py-1.5 hover:bg-secondary">
                <input
                  type="checkbox"
                  checked={showShelters}
                  onChange={onToggleShelters}
                  className="size-4 accent-[var(--primary)]"
                />
                <span className="text-sm">避難所マーカー</span>
              </label>
            </fieldset>

            <fieldset className="mt-2 border-t border-border pt-2">
              <legend className="mb-1 text-xs font-medium text-muted-foreground">
                ハザードマップ（国土地理院）
              </legend>
              <ul className="flex flex-col">
                {HAZARD_LAYERS.map((layer) => (
                  <li key={layer.id}>
                    <label className="flex cursor-pointer items-start gap-2 rounded-md px-1 py-1.5 hover:bg-secondary">
                      <input
                        type="checkbox"
                        checked={active[layer.id] ?? false}
                        onChange={() => onToggle(layer.id)}
                        className="mt-0.5 size-4"
                        style={{ accentColor: layer.colorVar }}
                      />
                      <span>
                        <span className="flex items-center gap-1.5 text-sm">
                          <span
                            className="inline-block size-3 rounded-sm"
                            style={{ backgroundColor: layer.colorVar }}
                            aria-hidden="true"
                          />
                          {layer.label}
                        </span>
                        <span className="block text-xs leading-snug text-muted-foreground">
                          {layer.description}
                        </span>
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>
          </div>
        )}
      </div>
    </div>
  )
}
