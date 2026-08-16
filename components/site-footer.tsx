import Link from "next/link"
import { NAV_ITEMS, SITE_NAME } from "@/lib/nav"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div className="max-w-md">
            <p className="font-bold text-primary">{SITE_NAME}</p>

            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              本サイトは高校の防災プロジェクトとして制作された情報提供サイトです。
              災害時は必ず宮崎市および気象庁などの公式発表を確認してください。
            </p>
          </div>

          <nav aria-label="フッターナビゲーション">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>
            地図データ出典:{" "}
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              © OpenStreetMap contributors
            </a>
            {" / "}
            <a
              href="https://disaportal.gsi.go.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              国土地理院ハザードマップポータルサイト
            </a>
          </p>

          <p className="mt-2">
            © {new Date().getFullYear()} {SITE_NAME}（宮東地区防災プロジェクト）
          </p>
        </div>
      </div>
    </footer>
  )
}