export type GalleryCategory =
  | "Everest"
  | "Annapurna"
  | "Langtang"
  | "Culture"
  | "Wildlife"
  | "People";

export interface GalleryPhoto {
  id: number;
  src: string;
  full: string;
  title: string;
  location: string;
  category: GalleryCategory;
  tall?: boolean;
}

const u = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

// Seven distinct landscape / scenic IDs
const A = "1544735716-392fe2489ffa"; // Khumbu glacier & Everest region
const B = "1506905925346-21bda4d32df4"; // Annapurna peaks
const C = "1518020382113-a7e8fc38eac9"; // Open mountain landscape
const D = "1524492412937-b28074a5d7da"; // Desert canyon — Mustang-style
const E = "1585409677983-0f6c41ca9c3b"; // Rhododendron forest trail
const F = "1528360983277-13d401cdc186"; // Mountain valley
const G = "1508739773434-c26b3d09e071"; // Trail / trekker on path

// Four portrait IDs — used exclusively for People category
const H = "1539701938214-0d9736e1c16b"; // Male guide portrait
const I = "1500648767791-00dcc994a43e"; // Male trekker portrait
const J = "1506794778202-cad84cf45f1d"; // Male local portrait
const K = "1551836022-deb4988cc6c0";   // Female local portrait

// [title, location, photoId, category, tall?]
type Seed = [string, string, string, GalleryCategory, true?];

const seeds: Seed[] = [
  ["Dawn at Everest Base Camp",     "Khumbu, Everest",       A, "Everest"],
  ["Annapurna Sanctuary",           "Annapurna Region",      B, "Annapurna", true],
  ["High desert of Manang",         "Annapurna Circuit",     D, "Annapurna"],
  ["The forbidden trail",           "Upper Mustang",         G, "Culture"],
  ["Himalayan vista",               "Khumbu Valley",         F, "Everest"],
  ["Prayer flags at the pass",      "Thorong La",            E, "Culture"],
  ["Our lead guide",                "Namche Bazaar",         H, "People"],
  ["Mountain village morning",      "Langtang",              C, "Langtang", true],
  ["Glacial lake mirror",           "Gokyo Lakes",           A, "Langtang"],
  ["Rhododendron forest trail",     "Ghorepani",             E, "Wildlife"],
  ["Sherpa porters at rest",        "Tengboche",             I, "People"],
  ["Sunrise on the giants",         "Poon Hill",             B, "Annapurna"],
  ["Yak caravan",                   "Manaslu Circuit",       F, "Wildlife", true],
  ["Monastery of the clouds",       "Tengboche",             D, "Culture"],
  ["Suspension bridge crossing",    "Dudh Koshi",            G, "Everest"],
  ["Tamang heritage",               "Langtang Valley",       J, "People"],
  ["Frozen alpine lake",            "Gosaikunda",            C, "Langtang"],
  ["Terraced hills",                "Annapurna foothills",   B, "Annapurna"],
  ["Himalayan tahr",                "Sagarmatha NP",         F, "Wildlife"],
  ["Mani stones path",              "Tsum Valley",           E, "Culture"],
  ["Camp beneath the stars",        "Everest Region",        A, "Everest", true],
  ["Village children",              "Khumjung",              K, "People"],
  ["Misty ridge walk",              "Mardi Himal",           C, "Annapurna"],
  ["Eagle over the valley",         "Kali Gandaki",          D, "Wildlife"],
];

export const gallery: GalleryPhoto[] = seeds.map(
  ([title, location, id, category, tall], i) => ({
    id: i + 1,
    title,
    location,
    category,
    tall: tall ?? false,
    src: u(id, 800),
    full: u(id, 1600),
  }),
);

export const galleryCategories: ("All" | GalleryCategory)[] = [
  "All",
  "Everest",
  "Annapurna",
  "Langtang",
  "Culture",
  "Wildlife",
  "People",
];
