"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Plus,
  Trash2,
  RotateCcw,
  Users,
  Pencil,
  Save,
  X,
} from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  CHECKLIST_ITEMS,
  CHECKLIST_CATEGORY_ORDER,
} from "@/lib/checklist"

const CHECKED_KEY = "miyahigashi-checklist-checked"
const CUSTOM_KEY = "miyahigashi-checklist-custom"
const NOTES_KEY = "miyahigashi-checklist-notes"
const FAMILY_KEY = "miyahigashi-checklist-family"
const LOCATION_KEY = "miyahigashi-checklist-location"
const LAST_CHECKED_KEY = "miyahigashi-checklist-last-checked"

type StorageLocation = "持ち出し袋" | "家庭備蓄"

type CustomItem = {
  id: string
  label: string
  category: string
  location: StorageLocation
}

export default function ChecklistPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [customItems, setCustomItems] = useState<CustomItem[]>([])
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [familyCount, setFamilyCount] = useState(1)
  const [locations, setLocations] = useState<Record<string, StorageLocation>>(
    {},
  )
  const [lastChecked, setLastChecked] = useState("")
  const [newItem, setNewItem] = useState("")
  const [newLocation, setNewLocation] =
    useState<StorageLocation>("家庭備蓄")
  const [newNote, setNewNote] = useState("")
  const [editingNote, setEditingNote] = useState<string | null>(null)
  const [noteDraft, setNoteDraft] = useState("")
  const [loaded, setLoaded] = useState(false)

  // 保存データを読み込む
  useEffect(() => {
    try {
      const savedChecked = localStorage.getItem(CHECKED_KEY)
      const savedCustom = localStorage.getItem(CUSTOM_KEY)
      const savedNotes = localStorage.getItem(NOTES_KEY)
      const savedFamily = localStorage.getItem(FAMILY_KEY)
      const savedLocations = localStorage.getItem(LOCATION_KEY)
      const savedLastChecked = localStorage.getItem(LAST_CHECKED_KEY)

      if (savedChecked) {
        setChecked(JSON.parse(savedChecked))
      }

      if (savedCustom) {
        const parsed = JSON.parse(savedCustom)

        // 以前の形式で保存された項目にも対応
        setCustomItems(
          parsed.map((item: Partial<CustomItem>) => ({
            id: item.id ?? `custom-${Date.now()}`,
            label: item.label ?? "",
            category: item.category ?? "自分で追加",
            location: item.location ?? "家庭備蓄",
          })),
        )
      }

      if (savedNotes) {
        setNotes(JSON.parse(savedNotes))
      }

      if (savedFamily) {
        const count = Number(savedFamily)

        if (count >= 1 && count <= 10) {
          setFamilyCount(count)
        }
      }

      if (savedLocations) {
        setLocations(JSON.parse(savedLocations))
      }

      if (savedLastChecked) {
        setLastChecked(savedLastChecked)
      }
    } catch {
      // 保存データが壊れていてもページは表示する
    }

    setLoaded(true)
  }, [])

  // チェック状態を保存
  useEffect(() => {
    if (!loaded) return

    localStorage.setItem(CHECKED_KEY, JSON.stringify(checked))
  }, [checked, loaded])

  // 自分で追加した項目を保存
  useEffect(() => {
    if (!loaded) return

    localStorage.setItem(CUSTOM_KEY, JSON.stringify(customItems))
  }, [customItems, loaded])

  // メモを保存
  useEffect(() => {
    if (!loaded) return

    localStorage.setItem(NOTES_KEY, JSON.stringify(notes))
  }, [notes, loaded])

  // 家族人数を保存
  useEffect(() => {
    if (!loaded) return

    localStorage.setItem(FAMILY_KEY, String(familyCount))
  }, [familyCount, loaded])

  // 持ち出し袋 / 家庭備蓄の設定を保存
  useEffect(() => {
    if (!loaded) return

    localStorage.setItem(LOCATION_KEY, JSON.stringify(locations))
  }, [locations, loaded])

  // 最終確認日を保存
  useEffect(() => {
    if (!loaded) return

    localStorage.setItem(LAST_CHECKED_KEY, lastChecked)
  }, [lastChecked, loaded])

  const totalCount = CHECKLIST_ITEMS.length + customItems.length

  const checkedCount = Object.values(checked).filter(Boolean).length

  const progress =
    totalCount === 0
      ? 0
      : Math.round((checkedCount / totalCount) * 100)

  const waterNeeded = familyCount * 3 * 3

  const allItems = useMemo(() => {
    return [
      ...CHECKLIST_ITEMS.map((item) => ({
        ...item,
        location: locations[item.id] ?? "家庭備蓄",
      })),
      ...customItems,
    ]
  }, [customItems, locations])

  const takeoutItems = allItems.filter(
    (item) => item.location === "持ち出し袋",
  )

  const homeItems = allItems.filter(
    (item) => item.location === "家庭備蓄",
  )

  function updateLastChecked() {
    const today = new Date()

    const date = today.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    setLastChecked(date)
  }

  function toggleItem(id: string, value: boolean) {
    setChecked((current) => ({
      ...current,
      [id]: value,
    }))

    updateLastChecked()
  }

  function changeLocation(
    id: string,
    location: StorageLocation,
  ) {
    setLocations((current) => ({
      ...current,
      [id]: location,
    }))
  }

  function addItem() {
    const label = newItem.trim()

    if (!label) return

    const item: CustomItem = {
      id: `custom-${Date.now()}`,
      label,
      category: "自分で追加",
      location: newLocation,
    }

    setCustomItems((current) => [...current, item])

    if (newNote.trim()) {
      setNotes((current) => ({
        ...current,
        [item.id]: newNote.trim(),
      }))
    }

    setNewItem("")
    setNewNote("")
  }

  function deleteItem(id: string) {
    setCustomItems((current) =>
      current.filter((item) => item.id !== id),
    )

    setChecked((current) => {
      const next = { ...current }
      delete next[id]
      return next
    })

    setNotes((current) => {
      const next = { ...current }
      delete next[id]
      return next
    })
  }

  function startEditNote(id: string) {
    setEditingNote(id)
    setNoteDraft(notes[id] ?? "")
  }

  function saveNote(id: string) {
    setNotes((current) => ({
      ...current,
      [id]: noteDraft.trim(),
    }))

    setEditingNote(null)
    setNoteDraft("")
  }

  function resetChecklist() {
    if (
      !window.confirm(
        "チェック状態・追加項目・メモ・設定をすべてリセットしますか？",
      )
    ) {
      return
    }

    setChecked({})
    setCustomItems([])
    setNotes({})
    setLocations({})
    setFamilyCount(1)
    setLastChecked("")
  }

  function renderItem(
    item: (typeof allItems)[number],
    canDelete: boolean,
  ) {
    const isChecked = checked[item.id] ?? false
    const note = notes[item.id] ?? ""

    return (
      <div
        key={item.id}
        className="border-b border-border last:border-b-0"
      >
        <div className="flex items-start gap-3 p-4">
          <Checkbox
            checked={isChecked}
            onCheckedChange={(value) =>
              toggleItem(item.id, value === true)
            }
            className="mt-0.5"
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-sm font-medium ${
                  isChecked
                    ? "text-muted-foreground line-through"
                    : ""
                }`}
              >
                {item.label}
              </span>

              {canDelete && (
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                  自分で追加
                </span>
              )}
            </div>

            {"note" in item && item.note && (
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {item.note}
              </p>
            )}

            {editingNote === item.id ? (
              <div className="mt-3 flex gap-2">
                <input
                  value={noteDraft}
                  onChange={(event) =>
                    setNoteDraft(event.target.value)
                  }
                  placeholder="自分用メモ"
                  className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-ring"
                  autoFocus
                />

                <button
                  type="button"
                  onClick={() => saveNote(item.id)}
                  className="rounded-md bg-primary p-2 text-primary-foreground"
                  aria-label="メモを保存"
                >
                  <Save className="size-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setEditingNote(null)}
                  className="rounded-md border border-border p-2"
                  aria-label="編集をキャンセル"
                >
                  <X className="size-4" />
                </button>
              </div>
            ) : (
              <div className="mt-2 flex items-center gap-2">
                {note ? (
                  <p className="text-xs text-muted-foreground">
                    📝 {note}
                  </p>
                ) : null}

                <button
                  type="button"
                  onClick={() => startEditNote(item.id)}
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <Pencil className="size-3" />
                  {note ? "メモを編集" : "メモを追加"}
                </button>
              </div>
            )}
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2">
            <select
              value={item.location}
              onChange={(event) =>
                changeLocation(
                  item.id,
                  event.target.value as StorageLocation,
                )
              }
              className="rounded-md border border-input bg-background px-2 py-1 text-xs"
              aria-label={`${item.label}の保管場所`}
            >
              <option value="家庭備蓄">家庭備蓄</option>
              <option value="持ち出し袋">持ち出し袋</option>
            </select>

            {canDelete && (
              <button
                type="button"
                onClick={() => deleteItem(item.id)}
                className="inline-flex items-center gap-1 rounded-md p-1 text-xs text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="size-3.5" />
                削除
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  function renderSection(
    title: string,
    items: typeof allItems,
  ) {
    if (items.length === 0) return null

    return (
      <section>
        <h2 className="mb-3 text-lg font-bold">
          {title}
        </h2>

        <div className="rounded-lg border border-border bg-card">
          {items.map((item) =>
            renderItem(
              item,
              customItems.some(
                (customItem) => customItem.id === item.id,
              ),
            ),
          )}
        </div>
      </section>
    )
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
      {/* タイトル */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">
          備蓄チェックリスト
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          災害に備えて、必要なものを確認しましょう。
          チェック内容・メモ・追加項目はこのブラウザに自動保存されます。
        </p>
      </div>

      {/* 家族人数 */}
      <section className="mb-6 rounded-lg border border-border bg-card p-5">
        <div className="flex items-center gap-2">
          <Users className="size-5 text-primary" />
          <h2 className="font-semibold">
            家族の人数
          </h2>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <select
            value={familyCount}
            onChange={(event) =>
              setFamilyCount(Number(event.target.value))
            }
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {Array.from({ length: 10 }, (_, index) => index + 1).map(
              (number) => (
                <option key={number} value={number}>
                  {number}人
                </option>
              ),
            )}
          </select>

          <p className="text-sm text-muted-foreground">
            3日分の飲料水の目安：
            <span className="font-semibold text-foreground">
              {waterNeeded}L
            </span>
          </p>
        </div>

        <p className="mt-2 text-xs text-muted-foreground">
          ※ 飲料水は1人1日3L × 3日分を目安にしています。
        </p>
      </section>

      {/* 進捗 */}
      <section className="mb-6 rounded-lg border border-border bg-card p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              準備できたもの
            </p>

            <p className="mt-1 text-2xl font-bold">
              {checkedCount} / {totalCount}
            </p>
          </div>

          <p className="text-2xl font-bold text-primary">
            {progress}%
          </p>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {lastChecked && (
          <p className="mt-3 text-xs text-muted-foreground">
            最終確認：{lastChecked}
          </p>
        )}
      </section>

      {/* 自分で追加 */}
      <section className="mb-8 rounded-lg border border-border bg-card p-5">
        <h2 className="font-semibold">
          自分で項目を追加
        </h2>

        <div className="mt-3 space-y-3">
          <input
            type="text"
            value={newItem}
            onChange={(event) => setNewItem(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addItem()
              }
            }}
            placeholder="例：予備のメガネ、ペット用品など"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />

          <div className="flex flex-wrap gap-2">
            <select
              value={newLocation}
              onChange={(event) =>
                setNewLocation(
                  event.target.value as StorageLocation,
                )
              }
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="家庭備蓄">家庭備蓄</option>
              <option value="持ち出し袋">持ち出し袋</option>
            </select>

            <input
              type="text"
              value={newNote}
              onChange={(event) => setNewNote(event.target.value)}
              placeholder="メモ（任意）"
              className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />

            <button
              type="button"
              onClick={addItem}
              className="inline-flex items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              <Plus className="size-4" />
              追加
            </button>
          </div>
        </div>
      </section>

      {/* 持ち出し袋 */}
      {renderSection(
        "🎒 持ち出し袋",
        takeoutItems,
      )}

      {/* 家庭備蓄 */}
      <div className="mt-8 space-y-8">
        {renderSection(
          "🏠 家庭備蓄",
          homeItems.filter(
            (item) =>
              item.category !== "自分で追加",
          ),
        )}

        {renderSection(
          "➕ 自分で追加した項目",
          homeItems.filter(
            (item) =>
              item.category === "自分で追加",
          ),
        )}
      </div>

      {/* リセット */}
      <div className="mt-10 flex justify-end">
        <button
          type="button"
          onClick={resetChecklist}
          className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          <RotateCcw className="size-4" />
          すべてリセット
        </button>
      </div>
    </main>
  )
}