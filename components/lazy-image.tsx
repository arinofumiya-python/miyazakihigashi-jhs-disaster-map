"use client"

import { useState } from "react"
import { ImageOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  /** アスペクト比を維持するラッパークラス */
  wrapperClassName?: string
}

// 遅延読み込み（loading="lazy"）と読み込み失敗時のフォールバックに対応した画像
export function LazyImage({ src, alt, className, wrapperClassName }: LazyImageProps) {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={cn("relative overflow-hidden bg-secondary", wrapperClassName)}>
      {error ? (
        <div className="flex size-full min-h-32 items-center justify-center text-muted-foreground">
          <ImageOff className="size-8" aria-hidden="true" />
          <span className="sr-only">画像を読み込めませんでした</span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setError(true)}
          onLoad={() => setLoaded(true)}
          className={cn(
            "size-full object-cover transition-opacity duration-300",
            loaded ? "opacity-100" : "opacity-0",
            className,
          )}
        />
      )}
    </div>
  )
}
