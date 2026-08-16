import type { Shelter } from "@/lib/types"

// ========================================
// 地図の初期位置
// ========================================

export const MAP_CENTER: [number, number] = [
  31.930778,
  131.428723,
]

export const MAP_INITIAL_ZOOM = 14

// ========================================
// 避難所一覧
// ========================================

export const SHELTERS: Shelter[] = [

  // ========================================
  // 宮崎東中学校
  // ========================================

  {
    id: "miyazaki-higashi-jhs",

    name: "宮崎東中学校",

    address:
      "〒880-0816 宮崎県宮崎市江平東二丁目7番9号",

    phone: "0985-24-2898",

    latitude: 31.930778,

    longitude: 131.428723,

    capacity: 600,

    disasterTypes: [
      "earthquake",
      "flood",
      "tsunami",
    ],

    facilities: [
      "マンホールトイレ 7基",
      "使い捨てトイレ 多数備蓄済",
      "仕切りあり",
      "貸出毛布あり",
    ],

    accessibility: [
      "バリアフリー対応",
    ],

    openingHours: "災害時に開設",

    petPolicy: "none",

    photo: [
      "https://raw.githubusercontent.com/arinofumiya-python/miyazaki-bousai-images/main/6a976135-58f6-40fa-8407-052cd9cbc5ee.png",
    ],

    description:
      "宮崎東中学校は、地震・風水害・津波に対応する避難所です。約600人の収容を想定し、仕切りや貸出毛布を備えています。",

    notes:
      "ペット完全不可。ペットを連れての避難はできません。オストメイト対応トイレなし。",

    lastUpdated: "2026-08-15",
  },

  // ========================================
  // 宮崎東地区交流センター
  // ========================================

  {
    id: "miyazaki-higashi-community-center",

    name: "宮崎東地区交流センター",

    address:
      "〒880-0843 宮崎県宮崎市下原町332-5",

    phone: "0985-20-3511",

    latitude: 31.92352924871773,

    longitude: 131.43229040081297,

    capacity: 335,

    disasterTypes: [
      "earthquake",
      "flood",
      "tsunami",
    ],

    facilities: [
      "多目的ホール",
      "学習室",
      "会議室",
      "料理実習室",
    ],

    accessibility: [
      "車椅子スロープあり",
      "障がい者用トイレあり",
    ],

    openingHours: "災害時に開設",

    petPolicy: "同行避難",

    photo: [
      "https://raw.githubusercontent.com/arinofumiya-python/miyazaki-bousai-images/main/b68f76c973f67a29efd3313d6311b49b26f466221aab22ef.webp",
    ],

    description:
      "宮崎東地区交流センターは、地震・風水害・津波に対応する指定避難所です。想定収容人数は335人です。",

    notes:
      "オストメイト対応トイレなし。ペット同行避難可・同室避難不可。ペットを連れて避難所に来ることはできますが、避難所内ではケージに入れてまとめて管理されます。",

    lastUpdated: "2026-08-16",
  },

  // ========================================
  // 宮崎県立宮崎大宮高等学校
  // ========================================

  {
    id: "miyazaki-omiya-high-school",

    name: "宮崎県立宮崎大宮高等学校",

    address:
      "〒880-0056 宮崎県宮崎市神宮東1丁目3-10",

    phone: "0985-22-5191",

    latitude: 31.932884791121403,

    longitude: 131.42522341808248,

    capacity: 500,

    disasterTypes: [
      "earthquake",
      "flood",
      "tsunami",
    ],

    facilities: [
      "体育館",
      "AED（体育館）",
      "AED（第2グラウンド）",
    ],

    accessibility: [
      "車椅子スロープあり",
      "障がい者用トイレあり",
    ],

    openingHours: "災害時に開設",

    petPolicy: "none",

    photo: [
      "https://raw.githubusercontent.com/arinofumiya-python/miyazaki-bousai-images/main/images%20MiyazakiOomiya-hs.png",
    ],

    description:
      "宮崎県立宮崎大宮高等学校は、地震・風水害・津波に対応する指定避難所です。体育館を避難所として使用し、想定収容人数は500人です。",

    notes:
      "ペット完全不可。オストメイト対応トイレなし。車椅子スロープあり。障がい者用トイレあり。",

    lastUpdated: "2026-08-16",
  },

  // ========================================
  // 宮崎市青少年プラザ体育館
  // ========================================

  {
    id: "miyazaki-youth-plaza-gym",

    name: "宮崎市青少年プラザ体育館",

    address:
      "〒880-0056 宮崎県宮崎市神宮東1丁目2-27",

    phone: "0985-24-9138",

    latitude: 31.932076515496835,

    longitude: 131.4257942458847,

    capacity: 700,

    disasterTypes: [
      "earthquake",
      "flood",
      "tsunami",
    ],

    facilities: [
      "体育館",
      "AED",
    ],

    accessibility: [
      "車椅子スロープあり",
      "障がい者用トイレあり",
    ],

    openingHours: "災害時に開設",

    petPolicy: "none",

    photo: [
      "https://raw.githubusercontent.com/arinofumiya-python/miyazaki-bousai-images/main/east-area%E4%BA%A4%E6%B5%81%E3%82%BB%E3%83%B3%E3%82%BF%E3%83%BC.jpg",
    ],

    description:
      "宮崎市青少年プラザ体育館は、地震・風水害・津波に対応する指定避難所です。想定収容人数は700人です。",

    notes:
      "ペット完全不可。オストメイト対応トイレなし。令和8年度末まで青少年プラザとして運営され、その後は体育館の名称が「宮崎市神宮東体育館」に変更される予定です。",

    lastUpdated: "2026-08-16",
  },

  // ========================================
  // 宮崎市立江平小学校
  // ========================================

  {
    id: "ehira-elementary-school",

    name: "宮崎市立江平小学校",

    address:
      "〒880-0001 宮崎県宮崎市橘通西5丁目6番37号",

    phone: "0985-24-4364",

    latitude: 31.9236413,

    longitude: 131.423722,

    capacity: 450,

    disasterTypes: [
      "earthquake",
      "flood",
      "tsunami",
    ],

    facilities: [
      "体育館を避難所として使用",
    ],

    accessibility: [
      "車椅子スロープあり",
      "障がい者用トイレあり（校舎・屋内運動場）",
    ],

    openingHours: "災害時に開設",

    petPolicy: "同行避難",

    photo: [
      "https://raw.githubusercontent.com/arinofumiya-python/miyazaki-bousai-images/main/unnamed.webp",
    ],

    description:
      "宮崎市立江平小学校は、地震・風水害・津波に対応する指定避難所です。想定収容人数は448人です。",

    notes:
      "オストメイト対応トイレなし。ペット同行避難可・同室避難不可。",

    lastUpdated: "2026-08-16",
  },

  // ========================================
  // 宮崎県体育館
  // ========================================

  {
    id: "miyazaki-prefectural-gymnasium",

    name: "宮崎県体育館",

    address:
      "〒880-0879 宮崎県宮崎市宮崎駅東2丁目4番地1号",

    phone: "0985-24-3975",

    latitude: 31.917094984390793,

    longitude: 131.43492308588554,

    capacity: 1700,

    disasterTypes: [
      "earthquake",
      "flood",
      "tsunami",
    ],

    facilities: [
      "本館競技場",
      "別館第1競技場",
      "別館第2競技場",
      "別館第3競技場",
      "観客席",
      "トイレ",
      "救護室",
    ],

    accessibility: [
      "バリアフリー対応",
    ],

    openingHours: "災害時に開設",

    petPolicy: "none",

    photo: [
      "https://raw.githubusercontent.com/arinofumiya-python/miyazaki-bousai-images/main/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202026-08-15%20kenntaiikukann.png",
    ],

    description:
      "宮崎県体育館は、地震・風水害・津波に対応する避難所です。競技場などを活用し、想定収容人数は1,700人です。",

    notes:
      "ペット完全不可。宮崎県体育館は令和9年10月頃を目途に利用停止、令和10年4月までに廃止予定とされています。",

    lastUpdated: "2026-08-16",
  },
]

// ========================================
// 避難所一覧を取得する関数
// ========================================

export function getShelters(): Shelter[] {
  return SHELTERS
}

// ========================================
// IDから避難所を取得する関数
// ========================================

export function getShelterById(
  id: string,
): Shelter | undefined {
  return SHELTERS.find(
    (shelter) => shelter.id === id,
  )
}