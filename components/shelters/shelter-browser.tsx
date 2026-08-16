"use client"

import { useMemo, useState } from "react"
import {
  Loader2,
  MapPin,
  Search,
  SlidersHorizontal,
  PawPrint,
} from "lucide-react"

import { ShelterCard } from "@/components/shelters/shelter-card"
import {
  DISASTER_TYPE_ORDER,
  getDisasterLabel,
} from "@/lib/disaster-types"

import { haversineDistance } from "@/lib/geo"

import type {
  DisasterType,
  PetPolicy,
  Shelter,
  ShelterWithDistance,
} from "@/lib/types"

import { cn } from "@/lib/utils"

type SortKey = "name" | "capacity" | "distance"

export function ShelterBrowser({
  shelters,
}: {
  shelters: Shelter[]
}) {
  const [query, setQuery] = useState("")

  const [filter, setFilter] =
    useState<DisasterType | "all">("all")

  const [petFilter, setPetFilter] =
    useState<PetPolicy | "all">("all")

  const [sort, setSort] =
    useState<SortKey>("name")

  const [currentPos, setCurrentPos] =
    useState<[number, number] | null>(null)

  const [locating, setLocating] =
    useState(false)

  const [locateError, setLocateError] =
    useState<string | null>(null)

  /* ========================================
     現在地取得
  ======================================== */

  const findNearest = () => {
    if (!("geolocation" in navigator)) {
      setLocateError(
        "この端末では現在地を取得できません",
      )
      return
    }

    setLocating(true)
    setLocateError(null)

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrentPos([
          pos.coords.latitude,
          pos.coords.longitude,
        ])

        setSort("distance")
        setLocating(false)
      },

      () => {
        setLocateError(
          "現在地を取得できませんでした。位置情報の許可をご確認ください。",
        )

        setLocating(false)
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    )
  }

  /* ========================================
     検索・絞り込み・並び替え
  ======================================== */

  const results: ShelterWithDistance[] =
    useMemo(() => {
      const q = query.trim().toLowerCase()

      let list: ShelterWithDistance[] =
        shelters.map((s) => ({
          ...s,

          distance: currentPos
            ? haversineDistance(
                currentPos[0],
                currentPos[1],
                s.latitude,
                s.longitude,
              )
            : null,
        }))

      /* ------------------------------------
         文字検索
      ------------------------------------ */

      if (q) {
        list = list.filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.address.toLowerCase().includes(q) ||
            s.description
              .toLowerCase()
              .includes(q),
        )
      }

      /* ------------------------------------
         災害種別
      ------------------------------------ */

      if (filter !== "all") {
        list = list.filter((s) =>
          s.disasterTypes.includes(filter),
        )
      }

      /* ------------------------------------
         ペット対応
      ------------------------------------ */

      if (petFilter !== "all") {
        list = list.filter(
          (s) => s.petPolicy === petFilter,
        )
      }

      /* ------------------------------------
         並び替え
      ------------------------------------ */

      list.sort((a, b) => {
        if (sort === "capacity") {
          return b.capacity - a.capacity
        }

        if (sort === "distance") {
          if (a.distance === null) return 1
          if (b.distance === null) return -1

          return a.distance - b.distance
        }

        return a.name.localeCompare(
          b.name,
          "ja",
        )
      })

      return list
    }, [
      shelters,
      query,
      filter,
      petFilter,
      sort,
      currentPos,
    ])

  /* ========================================
     最寄りの避難所
  ======================================== */

  const nearest =
    sort === "distance" &&
    currentPos
      ? results[0]
      : null

  return (
    <div>

      {/* ========================================
          操作パネル
      ======================================== */}

      <div className="rounded-lg border border-border bg-card p-4 shadow-sm">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">

          {/* ------------------------------------
              検索
          ------------------------------------ */}

          <div className="flex-1">

            <label
              htmlFor="shelter-search"
              className="mb-1 block text-sm font-medium"
            >
              避難所を検索
            </label>

            <div className="relative">

              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />

              <input
                id="shelter-search"
                type="search"
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                placeholder="名称・住所で検索"
                className="h-10 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />

            </div>
          </div>

          {/* ------------------------------------
              並び替え
          ------------------------------------ */}

          <div>

            <label
              htmlFor="shelter-sort"
              className="mb-1 block text-sm font-medium"
            >
              <SlidersHorizontal
                className="mr-1 inline size-4"
                aria-hidden="true"
              />

              並び替え
            </label>

            <select
              id="shelter-sort"
              value={sort}
              onChange={(e) =>
                setSort(
                  e.target.value as SortKey,
                )
              }
              className="h-10 rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="name">
                名称順（あいうえお）
              </option>

              <option value="capacity">
                収容人数が多い順
              </option>

              <option value="distance">
                現在地から近い順
              </option>
            </select>

          </div>

          {/* ------------------------------------
              最寄り検索
          ------------------------------------ */}

          <div>

            <button
              type="button"
              onClick={findNearest}
              disabled={locating}
              className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60"
            >

              {locating ? (
                <Loader2
                  className="size-4 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <MapPin
                  className="size-4"
                  aria-hidden="true"
                />
              )}

              最寄りの避難所を探す

            </button>

          </div>

        </div>

        {/* ========================================
            災害種別フィルタ
        ======================================== */}

        <fieldset className="mt-4 border-t border-border pt-4">

          <legend className="mb-2 text-sm font-medium">
            災害種別で絞り込む
          </legend>

          <div className="flex flex-wrap gap-2">

            <FilterChip
              active={filter === "all"}
              onClick={() =>
                setFilter("all")
              }
            >
              すべて
            </FilterChip>

            {DISASTER_TYPE_ORDER.map(
              (t) => (
                <FilterChip
                  key={t}
                  active={filter === t}
                  onClick={() =>
                    setFilter(t)
                  }
                >
                  {getDisasterLabel(t)}
                </FilterChip>
              ),
            )}

          </div>

        </fieldset>

        {/* ========================================
            ペット対応フィルタ
        ======================================== */}

        <fieldset className="mt-4 border-t border-border pt-4">

          <legend className="mb-2 flex items-center gap-1.5 text-sm font-medium">

            <PawPrint
              className="size-4"
              aria-hidden="true"
            />

            ペット対応で絞り込む

          </legend>

          <div className="flex flex-wrap gap-2">

            <PetFilterChip
              active={petFilter === "all"}
              onClick={() =>
                setPetFilter("all")
              }
            >
              すべて
            </PetFilterChip>

            <PetFilterChip
              active={
                petFilter === "none"
              }
              onClick={() =>
                setPetFilter("none")
              }
            >
              ペット完全不可
            </PetFilterChip>

            <PetFilterChip
              active={
                petFilter === "同行避難"
              }
              onClick={() =>
                setPetFilter("同行避難")
              }
            >
              同行避難
            </PetFilterChip>

            <PetFilterChip
              active={
                petFilter === "同室避難"
              }
              onClick={() =>
                setPetFilter("同室避難")
              }
            >
              同室避難
            </PetFilterChip>

          </div>

        </fieldset>

        {/* ========================================
            現在地エラー
        ======================================== */}

        {locateError && (
          <p
            role="alert"
            className="mt-3 text-sm text-destructive"
          >
            {locateError}
          </p>
        )}

      </div>

      {/* ========================================
          最寄り結果
      ======================================== */}

      {nearest && (
        <div
          className="mt-4 rounded-lg border border-accent/40 bg-accent/10 p-4"
          role="status"
        >
          <p className="text-sm">

            現在地から最も近い避難所は{" "}

            <span className="font-bold text-accent">
              {nearest.name}
            </span>

            {" "}です。

          </p>
        </div>
      )}

      {/* ========================================
          件数
      ======================================== */}

      <p
        className="mt-4 text-sm text-muted-foreground"
        aria-live="polite"
      >
        {results.length} 件の避難所を表示中
      </p>

      {/* ========================================
          一覧
      ======================================== */}

      {results.length > 0 ? (

        <ul className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {results.map(
            (shelter) => (

              <li key={shelter.id}>

                <ShelterCard
                  shelter={shelter}
                />

              </li>

            ),
          )}

        </ul>

      ) : (

        <p className="mt-8 rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">

          条件に一致する避難所が見つかりませんでした。
          検索条件を変更してください。

        </p>

      )}

    </div>
  )
}

/* ========================================
   災害種別フィルタボタン
======================================== */

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",

        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-foreground hover:bg-secondary",
      )}
    >
      {children}
    </button>
  )
}

/* ========================================
   ペット対応フィルタボタン
======================================== */

function PetFilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",

        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-foreground hover:bg-secondary",
      )}
    >
      {children}
    </button>
  )
}