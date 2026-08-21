"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, ShieldAlert, X } from "lucide-react"
import { NAV_ITEMS, SITE_NAME } from "@/lib/nav"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-[900] border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-primary"
          aria-label={`${SITE_NAME} ホームへ`}
        >
          <ShieldAlert className="size-6" aria-hidden="true" />
          <span className="text-base leading-tight sm:text-lg">{SITE_NAME}</span>
        </Link>

        {/* デスクトップナビ */}
        <nav aria-label="メインナビゲーション" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary",
                    isActive(item.href)
                      ? "bg-secondary text-primary"
                      : "text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* モバイルメニューボタン */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-secondary lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* モバイルナビ */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="モバイルナビゲーション"
          className="border-t border-border bg-card lg:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-secondary",
                    isActive(item.href)
                      ? "bg-secondary text-primary"
                      : "text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
