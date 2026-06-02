export type Difficulty =
  | "Easy"
  | "Easy-Moderate"
  | "Moderate"
  | "Moderate-Hard"
  | "Strenuous";

export type Region =
  | "Everest"
  | "Annapurna"
  | "Langtang"
  | "Manaslu"
  | "Restricted";

export interface ItineraryDay {
  day: number;
  title: string;
  detail: string;
  altitude: number; // metres
}

export interface Trek {
  slug: string;
  name: string;
  region: Region;
  days: number;
  difficulty: Difficulty;
  price: number;
  maxAltitude: number;
  bestSeason: string;
  blurb: string;
  description: string;
  image: string;
  gallery: string[];
  highlights: string[];
  includes: string[];
  excludes: string[];
  itinerary: ItineraryDay[];
  departures: { date: string; status: "Available" | "Limited" | "Full" }[];
  featured?: boolean;
}

export const difficultyColor: Record<Difficulty, string> = {
  Easy: "bg-sky-200/90 text-stone-900",
  "Easy-Moderate": "bg-sky-100/90 text-stone-900",
  Moderate: "bg-amber-400/90 text-snow",
  "Moderate-Hard": "bg-amber-600/90 text-snow",
  Strenuous: "bg-green-900/95 text-snow",
};

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

// Seven distinct scenic photo IDs — used to build diverse per-trek galleries
const A = "1544735716-392fe2489ffa"; // Khumbu glacier & Everest
const B = "1506905925346-21bda4d32df4"; // Annapurna peaks
const C = "1518020382113-a7e8fc38eac9"; // Open mountain landscape
const D = "1524492412937-b28074a5d7da"; // Desert canyon — Mustang-style
const E = "1585409677983-0f6c41ca9c3b"; // Rhododendron forest
const F = "1528360983277-13d401cdc186"; // Mountain valley
const G = "1508739773434-c26b3d09e071"; // Trail / trekker

const commonIncludes = [
  "Airport pick-up and drop-off in Kathmandu",
  "Licensed, English-speaking local guide",
  "All trekking permits and TIMS card",
  "Teahouse accommodation on the trek",
  "Three meals a day while trekking (breakfast, lunch, dinner)",
  "Porter support (1 porter per 2 trekkers)",
  "Guide and porter insurance, wages and meals",
  "First-aid kit and pulse oximeter for altitude monitoring",
];

const commonExcludes = [
  "International flights to/from Kathmandu",
  "Nepal entry visa fee",
  "Travel and rescue insurance (mandatory)",
  "Meals in Kathmandu (except welcome dinner)",
  "Personal trekking gear and equipment",
  "Hot showers, Wi-Fi and battery charging on the trail",
  "Tips for guide and porter",
];

// Compact itinerary builder: [title, detail, altitude]
type D3 = [string, string, number];
function days(arr: D3[]): ItineraryDay[] {
  return arr.map(([title, detail, altitude], i) => ({
    day: i + 1,
    title,
    detail,
    altitude,
  }));
}

export const treks: Trek[] = [
  // ─────────────────────────────────────────
  // EVEREST BASE CAMP
  // ─────────────────────────────────────────
  {
    slug: "everest-base-camp",
    name: "Everest Base Camp Trek",
    region: "Everest",
    days: 14,
    difficulty: "Strenuous",
    price: 1200,
    maxAltitude: 5364,
    bestSeason: "Mar–May · Sep–Nov",
    blurb: "Walk in the footsteps of legends to the foot of the world's highest peak.",
    description:
      "The classic Everest Base Camp trek is a pilgrimage for trekkers worldwide. Fly into Lukla, climb through Sherpa heartland, sip butter tea in Namche Bazaar, and stand at 5,364 m beneath the Khumbu Icefall. We build in two full acclimatisation days and carry pulse oximeters daily so you summit Kala Patthar strong and safe.",
    image: img(A),
    gallery: [A, F, C, G, E, D].map((id) => img(id, 900)),
    highlights: [
      "Sunrise from Kala Patthar (5,545 m)",
      "Stand at Everest Base Camp (5,364 m)",
      "Namche Bazaar, the Sherpa capital",
      "Tengboche Monastery views of Ama Dablam",
    ],
    includes: [...commonIncludes, "Round-trip Kathmandu–Lukla flights", "Sagarmatha National Park permit"],
    excludes: commonExcludes,
    itinerary: days([
      ["Fly Kathmandu → Lukla · Trek to Phakding",    "Dramatic Tenzing-Hillary Airport landing, then a gentle downhill walk along the Dudh Koshi river to overnight at Phakding.", 2652],
      ["Phakding → Namche Bazaar",                    "Cross suspension bridges over the Dudh Koshi gorge and pass the Sagarmatha NP gate. The final steep climb into Namche rewards you with your first Himalayan skyline.", 3440],
      ["Acclimatisation day — Namche Bazaar",         "Hike to the Everest View Hotel (3,880 m) for a first glimpse of the world's highest peak. Explore Namche's bakeries, gear shops, and the colourful Saturday market.", 3440],
      ["Namche Bazaar → Tengboche",                   "A high-traverse trail delivers panoramic Ama Dablam views all the way to Tengboche Monastery, where evening prayers echo across the valley.", 3860],
      ["Tengboche → Dingboche",                       "Pass Pangboche — the oldest village in Khumbu — and enter the wide glacial valley framed by Lhotse and Island Peak.", 4360],
      ["Acclimatisation day — Dingboche",             "Hike the Nangkartshang ridge to 4,900 m for views of Makalu and Cholatse, then return for rest, hydration, and altitude monitoring.", 4360],
      ["Dingboche → Lobuche",                         "Pass the Thukla Memorial cairns honouring climbers lost on Everest. The valley narrows as the Khumbu Glacier edge comes into view.", 4940],
      ["Lobuche → Gorak Shep · Everest Base Camp",   "Trek past crevassed lateral moraine to Gorak Shep, then continue to EBC (5,364 m) and stand at the foot of the Khumbu Icefall.", 5364],
      ["Kala Patthar (5,545 m) · Descend to Pheriche", "Pre-dawn climb to the sunrise viewpoint above Gorak Shep — the Everest horizon at dawn is one of the world's great views. Long descent to the warmer pastures of Pheriche.", 5545],
      ["Pheriche → Namche Bazaar",                   "Enjoy the rapid descent and the welcome return of trees and vegetation. Celebrate in Namche with a hot shower and pizza.", 3440],
      ["Namche Bazaar → Lukla",                       "Final walking day through familiar forests and river trails. A last cup of butter tea in Lukla before tomorrow's flight.", 2860],
      ["Fly Lukla → Kathmandu",                       "Weather-dependent morning flight back over the mountains. Afternoon free in Kathmandu to rest and reflect.", 1400],
      ["Kathmandu — sightseeing and farewell dinner", "Visit Boudhanath Stupa and Pashupatinath temple. Celebrate the expedition with your guides over a traditional Nepali dinner.", 1400],
      ["Departure day",                               "Airport transfer and fond farewells — the end of an unforgettable journey.", 1400],
    ]),
    departures: [
      { date: "15 Sep 2026", status: "Available" },
      { date: "06 Oct 2026", status: "Limited" },
      { date: "20 Oct 2026", status: "Available" },
      { date: "10 Nov 2026", status: "Limited" },
    ],
    featured: true,
  },

  // ─────────────────────────────────────────
  // ANNAPURNA BASE CAMP
  // ─────────────────────────────────────────
  {
    slug: "annapurna-base-camp",
    name: "Annapurna Base Camp Trek",
    region: "Annapurna",
    days: 16,
    difficulty: "Strenuous",
    price: 1100,
    maxAltitude: 4130,
    bestSeason: "Mar–May · Oct–Nov",
    blurb: "Into the natural amphitheatre of giants — the Annapurna Sanctuary.",
    description:
      "Trek through terraced farmland and rhododendron forest into the glacial sanctuary ringed by Annapurna I, Machapuchare and Hiunchuli. A favourite for its dramatic scenery-to-effort ratio, with hot springs at Jhinu Danda waiting on the way down.",
    image: img(B),
    gallery: [B, E, F, C, A, G].map((id) => img(id, 900)),
    highlights: [
      "360° panorama from the Sanctuary",
      "Machapuchare (Fishtail) up close",
      "Natural hot springs at Jhinu Danda",
      "Gurung culture in Chhomrong",
    ],
    includes: [...commonIncludes, "Annapurna Conservation Area permit", "Pokhara–Kathmandu tourist transfer"],
    excludes: commonExcludes,
    itinerary: days([
      ["Drive Kathmandu → Pokhara",                   "Scenic road through river valleys and terraced hillsides (7 h), or a 30-minute domestic flight. Check into a lakeside hotel with full Annapurna views.", 820],
      ["Drive Pokhara → Nayapul · Trek to Tikhedhunga", "Leave the tourist hub behind and enter rural Nepal, following the Modi Khola south to overnight at Tikhedhunga.", 1540],
      ["Tikhedhunga → Ghorepani",                     "The 3,276 stone steps up through Ulleri are famously relentless, but rhododendron forest and Gurung village life lift the spirit all the way to Ghorepani.", 2860],
      ["Sunrise at Poon Hill (3,210 m) · Trek to Tadapani", "A 4 am start brings you to the hilltop for dawn over Annapurna South and Dhaulagiri. Return for breakfast, then descend through damp mossy forest to Tadapani.", 3210],
      ["Tadapani → Chhomrong",                        "Teahouse trail with constant Machapuchare (Fishtail) views. Chhomrong is the last large village before the Sanctuary's gate.", 2170],
      ["Chhomrong → Bamboo",                          "Descend to the Modi Khola then enter deep bamboo and rhododendron forest; the valley walls close in with dramatic effect.", 2310],
      ["Bamboo → Deurali",                            "Follow the river into the heart of the Sanctuary. Annapurna South and Hiunchuli tower overhead; avalanche zones require an early-morning start.", 3230],
      ["Deurali → Annapurna Base Camp",               "Cross the glacier moraine and enter the legendary arena — a 360° amphitheatre of Annapurna I (8,091 m), Machapuchare and Hiunchuli.", 4130],
      ["Sunrise at ABC · Descend to Bamboo",          "Watch first light strike the summits from the sanctuary floor. Long descent back through Deurali to Bamboo teahouse.", 2310],
      ["Bamboo → Jhinu Danda · Hot springs",          "A welcome soak in the riverside hot springs eases every muscle after days of hard trail — well-earned bliss.", 1780],
      ["Jhinu Danda → Nayapul · Drive to Pokhara",   "Final descent through terraced rice paddies and a drive back to Pokhara for a lakeside sunset dinner.", 820],
      ["Pokhara — rest and exploration",              "Boat on Phewa Lake, visit Davis Falls, and explore the International Mountain Museum.", 820],
      ["Fly or drive Pokhara → Kathmandu",            "Morning departure with the Annapurna massif as a final backdrop. Afternoon free in Kathmandu.", 1400],
      ["Kathmandu — Swayambhunath and old city",      "Visit the Monkey Temple and stroll through Kathmandu Durbar Square's living heritage.", 1400],
      ["Cultural day and farewell dinner",            "Boudhanath Stupa, Thamel shopping, and a final celebratory dinner with the team.", 1400],
      ["Departure day",                               "Airport transfer — end of the Annapurna adventure.", 1400],
    ]),
    departures: [
      { date: "22 Sep 2026", status: "Available" },
      { date: "13 Oct 2026", status: "Available" },
      { date: "03 Nov 2026", status: "Limited" },
    ],
  },

  // ─────────────────────────────────────────
  // ANNAPURNA CIRCUIT
  // ─────────────────────────────────────────
  {
    slug: "annapurna-circuit",
    name: "Annapurna Circuit Trek",
    region: "Annapurna",
    days: 12,
    difficulty: "Moderate-Hard",
    price: 950,
    maxAltitude: 5416,
    bestSeason: "Mar–May · Oct–Nov",
    blurb: "The world's greatest tea-house trek over the legendary Thorong La.",
    description:
      "A complete circuit through every climate zone Nepal offers — subtropical valleys to the high desert of Manang — crowned by the Thorong La pass at 5,416 m and the sacred temple of Muktinath.",
    image: img(C),
    gallery: [C, D, B, G, F, E].map((id) => img(id, 900)),
    highlights: [
      "Crossing Thorong La (5,416 m)",
      "Sacred Muktinath temple",
      "Dramatic Manang high desert",
      "Apple orchards of Marpha",
    ],
    includes: [...commonIncludes, "Annapurna Conservation Area permit"],
    excludes: commonExcludes,
    itinerary: days([
      ["Drive Kathmandu → Besisahar",                 "Scenic drive through the Marsyangdi valley to the circuit trailhead, with first views of Lamjung Himal.", 760],
      ["Besisahar → Chame",                           "Wind through pine forest, waterfalls and cliff-side paths. Chame has a district hot spring perfect for sore feet.", 2670],
      ["Chame → Pisang",                              "The valley opens dramatically — Upper Pisang's white gompa perched on a clifftop is one of the circuit's iconic images.", 3200],
      ["Pisang → Manang",                             "Take the high route via Ghyaru village for extra altitude gain and panoramic views, or the lower trail for a gentler day. Manang is the circuit's largest village.", 3500],
      ["Acclimatisation day — Manang",                "Hike to Ice Lake (4,600 m) or Gangapurna Lake for altitude adaptation. Afternoon talk by Himalayan Rescue Association doctors.", 3500],
      ["Manang → Yak Kharka",                         "Trees thin out and the landscape turns alpine tundra. Yaks graze on open grassland as Thorong La's white wall looms ahead.", 4018],
      ["Yak Kharka → Thorong Phedi / High Camp",      "Short but critical acclimatisation day. Rest well and eat plenty — the pass crossing starts before 5 am tomorrow.", 4450],
      ["Cross Thorong La (5,416 m) → Muktinath",     "The circuit's crowning moment: a pre-dawn pass crossing with prayer flags and panoramic Himalayan silence. Descend to the sacred Muktinath temple.", 5416],
      ["Muktinath → Jomsom via Marpha",               "Descend into the Kali Gandaki gorge, one of the world's deepest. Stop in Marpha village for its famous apple brandy and orchards.", 2720],
      ["Jomsom → Tatopani",                           "Long but almost entirely downhill day through the arid rain-shadow landscape. Natural hot springs greet you at Tatopani.", 1190],
      ["Tatopani → Pokhara",                          "Final trail descent through subtropical terraces, then a bus or taxi to Pokhara's lakeside for a sunset celebration.", 820],
      ["Pokhara → Kathmandu · Departure",             "Morning flight or drive back to Kathmandu. Afternoon at leisure before your international departure.", 1400],
    ]),
    departures: [
      { date: "18 Sep 2026", status: "Available" },
      { date: "09 Oct 2026", status: "Limited" },
      { date: "30 Oct 2026", status: "Available" },
    ],
    featured: true,
  },

  // ─────────────────────────────────────────
  // GHOREPANI POON HILL
  // ─────────────────────────────────────────
  {
    slug: "ghorepani-poon-hill",
    name: "Ghorepani Poon Hill Trek",
    region: "Annapurna",
    days: 5,
    difficulty: "Easy-Moderate",
    price: 380,
    maxAltitude: 3210,
    bestSeason: "Year-round",
    blurb: "Nepal's most loved short trek — sunrise fireworks over the Annapurnas.",
    description:
      "Perfect for first-timers and families: gentle stone-stepped trails through rhododendron forest and Gurung villages to the famous Poon Hill viewpoint, where dawn ignites Dhaulagiri and Annapurna South.",
    image: img(E),
    gallery: [E, F, B, D, C, G].map((id) => img(id, 900)),
    highlights: [
      "Sunrise from Poon Hill (3,210 m)",
      "Rhododendron forests in bloom",
      "Ghandruk Gurung village",
      "Ideal first Himalayan trek",
    ],
    includes: [...commonIncludes, "Annapurna Conservation Area permit", "Pokhara transfers"],
    excludes: commonExcludes,
    itinerary: days([
      ["Drive Pokhara → Nayapul · Trek to Tikhedhunga", "A 90-minute drive to the trailhead, then an easy afternoon walk along the Modi Khola to the first overnight village.", 1540],
      ["Tikhedhunga → Ghorepani",                     "The famous stone staircase up through Ulleri village — relentless but beautiful. Arrive in Ghorepani by early afternoon and rest for tomorrow's predawn start.", 2860],
      ["Pre-dawn hike to Poon Hill · Trek to Tadapani", "Leave at 4 am with headlamps to catch the sunrise over Dhaulagiri and the Annapurna massif. Explore the hilltop, then descend through damp mossy forest.", 3210],
      ["Tadapani → Ghandruk",                         "Winding trail through rhododendron and oak forest with constant mountain views. Ghandruk is one of Nepal's finest traditional Gurung villages.", 1940],
      ["Ghandruk → Nayapul · Drive to Pokhara",       "Short morning walk then transfer back to Pokhara. Afternoon free on Phewa Lakeside.", 820],
    ]),
    departures: [
      { date: "Daily departures", status: "Available" },
      { date: "12 Oct 2026", status: "Available" },
      { date: "26 Oct 2026", status: "Limited" },
    ],
    featured: true,
  },

  // ─────────────────────────────────────────
  // LANGTANG VALLEY
  // ─────────────────────────────────────────
  {
    slug: "langtang-valley",
    name: "Langtang Valley Trek",
    region: "Langtang",
    days: 7,
    difficulty: "Moderate",
    price: 620,
    maxAltitude: 4773,
    bestSeason: "Mar–May · Oct–Nov",
    blurb: "A soulful valley of glaciers, yaks and Tamang heritage near Kathmandu.",
    description:
      "The closest Himalayan valley to Kathmandu, Langtang rebuilt itself with grace after the 2015 earthquake. Walk through glacial moraine to Kyanjin Gompa, climb Kyanjin Ri for a panorama, and share yak cheese with the resilient Tamang community.",
    image: img(F),
    gallery: [F, C, G, A, E, D].map((id) => img(id, 900)),
    highlights: [
      "Kyanjin Ri viewpoint (4,773 m)",
      "Local yak-cheese factory",
      "Tamang culture and warmth",
      "Short drive from Kathmandu",
    ],
    includes: [...commonIncludes, "Langtang National Park permit", "Kathmandu–Syabrubesi jeep transfers"],
    excludes: commonExcludes,
    itinerary: days([
      ["Drive Kathmandu → Syabrubesi",               "5-hour drive through the Trisuli valley to the Langtang trailhead village. Overnight at Syabrubesi.", 1460],
      ["Syabrubesi → Lama Hotel",                    "Trek up the Langtang Khola through dense forest of oak and rhododendron. Keep an eye out for langur monkeys and red pandas.", 2380],
      ["Lama Hotel → Langtang Village",              "The forest gives way to open pastures and yak meadows. The rebuilt Langtang village is a moving testament to community resilience after the 2015 earthquake and avalanche.", 3430],
      ["Langtang Village → Kyanjin Gompa",           "A short day with time to visit the 300-year-old Kyanjin Gompa and the famous yak-cheese factory. Settle in for acclimatisation.", 3870],
      ["Ascend Kyanjin Ri (4,773 m) · Rest",         "Early start up the ridge behind the monastery for a sweeping panorama of Langtang Lirung (7,227 m) and the surrounding glaciers. Afternoon rest in Kyanjin.", 4773],
      ["Kyanjin Gompa → Lama Hotel",                 "Long descent back through the valley — familiar scenery seen from a different direction.", 2380],
      ["Lama Hotel → Syabrubesi · Drive to Kathmandu", "Final trail walk along the river, then the full-day drive back to Kathmandu arriving by evening.", 1460],
    ]),
    departures: [
      { date: "20 Sep 2026", status: "Available" },
      { date: "11 Oct 2026", status: "Available" },
      { date: "08 Nov 2026", status: "Limited" },
    ],
  },

  // ─────────────────────────────────────────
  // GOSAIKUNDA
  // ─────────────────────────────────────────
  {
    slug: "gosaikunda",
    name: "Gosaikunda Trek",
    region: "Langtang",
    days: 9,
    difficulty: "Moderate",
    price: 680,
    maxAltitude: 4380,
    bestSeason: "Mar–May · Oct–Nov",
    blurb: "Sacred alpine lakes revered by Hindus and Buddhists alike.",
    description:
      "Climb from Dhunche into a high basin holding the holy Gosaikunda lakes, believed to be created by Lord Shiva. Misty ridgelines, prayer flags and pilgrim trails make this a quietly spiritual journey.",
    image: img(E),
    gallery: [E, B, C, F, G, D].map((id) => img(id, 900)),
    highlights: [
      "Sacred Gosaikunda lakes (4,380 m)",
      "Lauribina ridge panoramas",
      "Pilgrim and prayer-flag trails",
      "Quiet, uncrowded paths",
    ],
    includes: [...commonIncludes, "Langtang National Park permit", "Kathmandu–Dhunche transfers"],
    excludes: commonExcludes,
    itinerary: days([
      ["Drive Kathmandu → Dhunche",                  "5-hour drive along the Trisuli River to the starting point of this ancient pilgrimage route.", 1950],
      ["Dhunche → Sing Gompa",                       "Steep climb through rhododendron and fir forest to a small ridge-top community with the first sweeping high views.", 3330],
      ["Sing Gompa → Cholang Pati",                  "Beautiful ridge walk with Langtang Himal and Ganesh Himal unfolding to the east. Prayer flags mark the way at every saddle.", 3584],
      ["Cholang Pati → Gosaikunda Lake",             "Ascend to the sacred basin at 4,380 m. Gosaikunda glitters in its cirque, ringed by ridges and revered by Hindu and Buddhist pilgrims alike.", 4380],
      ["Gosaikunda — rest and lake exploration",     "Walk the lakeshore and visit the smaller Saraswatikunda and Bhairavkunda. Optional ridge climb for wider views into Tibet.", 4380],
      ["Gosaikunda → Ghopte",                        "Begin the onward crossing to the Helambu side via a dramatic ridge descent with views of the Jugal Himal.", 3430],
      ["Ghopte → Kutumsang",                         "Descend through damp fir forest and farmstead villages as the trail broadens toward the Helambu valley.", 2470],
      ["Kutumsang → Sundarijal",                     "Final hiking day through Shivapuri-Nagarjun National Park. End at the Sundarijal reservoir trailhead on Kathmandu's edge.", 1460],
      ["Drive Sundarijal → Kathmandu",               "1-hour drive back into the city. Farewell dinner and a chance to relive the pilgrimage trail over dal bhat.", 1400],
    ]),
    departures: [
      { date: "27 Sep 2026", status: "Available" },
      { date: "18 Oct 2026", status: "Limited" },
    ],
  },

  // ─────────────────────────────────────────
  // UPPER MUSTANG
  // ─────────────────────────────────────────
  {
    slug: "upper-mustang",
    name: "Upper Mustang Trek",
    region: "Restricted",
    days: 16,
    difficulty: "Moderate",
    price: 2500,
    maxAltitude: 3840,
    bestSeason: "Mar–Nov (incl. monsoon)",
    blurb: "The walled kingdom of Lo — a living museum of Tibetan Buddhism.",
    description:
      "Beyond the Himalayan rain shadow lies Mustang, a lunar landscape of ochre cliffs, sky caves and the medieval walled city of Lo Manthang. A restricted-area special permit and our local logistics open this once-forbidden kingdom to you.",
    image: img(D),
    gallery: [D, C, A, F, E, G].map((id) => img(id, 900)),
    highlights: [
      "Walled city of Lo Manthang",
      "Ancient sky caves of Chhoser",
      "Tiji-festival monasteries",
      "Otherworldly desert canyons",
    ],
    includes: [
      ...commonIncludes,
      "Upper Mustang restricted-area permit (USD 500)",
      "Annapurna Conservation Area permit",
      "Pokhara–Jomsom flights",
    ],
    excludes: commonExcludes,
    itinerary: days([
      ["Fly Pokhara → Jomsom · Acclimatisation walk", "20-minute scenic flight into the Kali Gandaki. Collect final permits, then a short walk to acclimatise to the Mustang plateau altitude.", 2720],
      ["Jomsom → Kagbeni",                            "Trek north through the windy gorge to medieval Kagbeni, gateway to the restricted zone. The 15th-century monastery here is your first taste of Lo culture.", 2810],
      ["Kagbeni → Chele",                             "Pass the permit checkpoint and enter Upper Mustang. The ochre cliffs and wind-sculpted canyon walls begin in earnest as the landscape turns lunar.", 3050],
      ["Chele → Syangboche",                          "Climb through eroded ravines and past mani walls onto the high desert plateau with views of the Nilgiri and Tilicho massifs.", 3800],
      ["Syangboche → Ghami",                          "Pass ancient chortens and the longest mani wall in Nepal, stretching hundreds of metres across the hillside.", 3520],
      ["Ghami → Tsarang",                             "Visit the crumbling Tsarang Castle, built by the Lo king in the 15th century. The village monastery holds remarkable thangka paintings.", 3640],
      ["Tsarang → Lo Manthang",                       "Enter the walled capital of the Kingdom of Lo through its medieval gate and walk the narrow lanes among the Lo-ba people.", 3840],
      ["Lo Manthang — full day exploration",          "Visit the palace, the Thubchen and Jampa lhakhangs, and the red Champa Gompa. Optional afternoon walk to ancient cliff-side sky caves.", 3840],
      ["Lo Manthang → Drakmar via Chhoser sky caves", "Explore the clifftop Chhoser Caves — man-made grottos carved hundreds of metres above the valley floor, some still containing ancient murals.", 3810],
      ["Drakmar → Ghami",                             "Return along an alternate canyon trail through different geological formations — red, white, and ochre cliffs in rapid succession.", 3520],
      ["Ghami → Tsele",                               "Descend toward the Kali Gandaki on the western route through Chhuksang and the lower canyon.", 3100],
      ["Tsele → Jomsom",                              "Final walking day in Mustang. Arrive Jomsom for a well-earned hot shower and afternoon rest.", 2720],
      ["Fly Jomsom → Pokhara",                        "Morning flight before valley winds pick up. Afternoon leisure on Phewa Lakeside — quite the contrast to the desert kingdom.", 820],
      ["Pokhara — debrief and exploration",           "Boat on Phewa Lake, World Peace Pagoda hike, and a celebratory dinner with the team.", 820],
      ["Drive or fly Pokhara → Kathmandu",            "Transfer back to the capital for your final night in Nepal.", 1400],
      ["Departure from Kathmandu",                    "Airport transfer — end of the journey to the forbidden kingdom.", 1400],
    ]),
    departures: [
      { date: "01 Oct 2026", status: "Available" },
      { date: "29 Oct 2026", status: "Limited" },
    ],
  },

  // ─────────────────────────────────────────
  // MANASLU CIRCUIT
  // ─────────────────────────────────────────
  {
    slug: "manaslu-circuit",
    name: "Manaslu Circuit Trek",
    region: "Manaslu",
    days: 18,
    difficulty: "Strenuous",
    price: 1800,
    maxAltitude: 5106,
    bestSeason: "Mar–May · Sep–Nov",
    blurb: "Raw, remote and uncrowded — the wild circuit of the eighth-highest peak.",
    description:
      "Circle the 8,163 m Manaslu massif through restricted territory few trekkers reach. Cross the Larkya La (5,106 m), pass Tibetan-influenced villages, and trek for days without seeing another Western group.",
    image: img(C),
    gallery: [C, F, D, E, G, B].map((id) => img(id, 900)),
    highlights: [
      "Larkya La pass (5,106 m)",
      "Restricted, crowd-free trails",
      "Tibetan-Buddhist Samagaon",
      "Views of Manaslu (8,163 m)",
    ],
    includes: [
      ...commonIncludes,
      "Manaslu restricted-area permit",
      "Manaslu & Annapurna conservation permits",
    ],
    excludes: commonExcludes,
    itinerary: days([
      ["Drive Kathmandu → Soti Khola",               "7-hour drive to the subtropical jungle trailhead where the Budi Gandaki river begins its gorge.", 710],
      ["Soti Khola → Machhakhola",                   "First trekking day through lowland forest along the Budi Gandaki, crossing numerous suspension bridges.", 869],
      ["Machhakhola → Jagat",                        "The gorge narrows between towering cliffs. Pass the Manaslu permit checkpost at Jagat.", 1410],
      ["Jagat → Deng",                               "Trek through villages untouched by mass tourism, crossing the roaring river on high-cable bridges.", 1804],
      ["Deng → Namrung",                             "The valley opens and Tibetan-influenced architecture begins to emerge — mani walls and flat-roofed houses announce the cultural shift.", 2630],
      ["Namrung → Samagaon",                         "Pass through Lho with dramatic Manaslu (8,163 m) views, then on to the largest village in the circuit, surrounded by monasteries.", 3530],
      ["Acclimatisation day — Pungyen Gompa hike",   "Trek to the ancient Pungyen Gompa above Samagaon for the full Manaslu ice-face panorama reflected in a glacial lake.", 3530],
      ["Samagaon → Samdo",                           "Short but important acclimatisation day. Samdo sits close to the Tibetan border, its culture deeply Tibetan-Buddhist.", 3875],
      ["Samdo → Larkya Base Camp",                   "Final camp before the pass. Arrive early, rest, eat and sleep well — the Larkya La crossing begins before first light.", 4460],
      ["Cross Larkya La (5,106 m) → Bimthang",      "The circuit's crowning 5,106 m pass. Dawn crossing through glacial terrain with panoramic views of Himlung and Cheo Himal, then descend to the green meadows of Bimthang.", 5106],
      ["Bimthang → Dharapani",                       "Long descent from high alpine into forest. Rejoin the Annapurna Circuit trail at Dharapani.", 1960],
      ["Dharapani → Besisahar",                      "Final trekking day through rice terraces and the lower Marsyangdi valley.", 760],
      ["Drive Besisahar → Pokhara",                  "5-hour scenic drive along the river highway to Pokhara's lakeside.", 820],
      ["Pokhara — rest and celebration",             "A well-deserved leisure day after one of Nepal's toughest circuits.", 820],
      ["Drive or fly Pokhara → Kathmandu",           "Transfer back to the capital.", 1400],
      ["Kathmandu — cultural sightseeing",           "Visit Pashupatinath, Boudhanath, and Kathmandu Durbar Square.", 1400],
      ["Shopping and farewell dinner",               "Last Thamel evening with your guides over a traditional Nepali dinner.", 1400],
      ["Departure from Kathmandu",                   "Airport transfer — end of the Manaslu adventure.", 1400],
    ]),
    departures: [
      { date: "14 Sep 2026", status: "Available" },
      { date: "12 Oct 2026", status: "Limited" },
    ],
    featured: false,
  },

  // ─────────────────────────────────────────
  // MARDI HIMAL
  // ─────────────────────────────────────────
  {
    slug: "mardi-himal",
    name: "Mardi Himal Trek",
    region: "Annapurna",
    days: 6,
    difficulty: "Moderate",
    price: 450,
    maxAltitude: 4500,
    bestSeason: "Mar–May · Oct–Dec",
    blurb: "A hidden ridge trek beneath the fishtail summit of Machapuchare.",
    description:
      "An off-the-beaten-path gem on a high forested ridge, Mardi Himal delivers Poon-Hill-grade views with a fraction of the crowds. High Camp to Upper Viewpoint is one of Nepal's most rewarding mornings.",
    image: img(F),
    gallery: [F, E, B, A, G, C].map((id) => img(id, 900)),
    highlights: [
      "Mardi Himal Upper Viewpoint (4,500 m)",
      "Close-up Machapuchare ridge",
      "Mossy forest high camps",
      "Quiet alternative to Poon Hill",
    ],
    includes: [...commonIncludes, "Annapurna Conservation Area permit", "Pokhara transfers"],
    excludes: commonExcludes,
    itinerary: days([
      ["Drive Pokhara → Kande · Trek to Forest Camp", "Short drive to the trailhead, then a steady climb into old-growth oak and rhododendron forest.", 2550],
      ["Forest Camp → Low Camp",                     "Continue up the Mardi Himal ridge as views open southward over the Pokhara valley far below.", 2985],
      ["Low Camp → High Camp",                       "The forest gives way to sub-alpine meadow. Machapuchare (Fishtail) grows dramatically with every step northward on the open ridge.", 3580],
      ["High Camp → Upper Viewpoint (4,500 m) · Descend to Low Camp", "Pre-dawn departure to the viewpoint for sunrise on Machapuchare, Annapurna South and the full massif — arguably the best views for the effort anywhere in Nepal.", 4500],
      ["Low Camp → Siding Village",                  "Descend the western ridge through Gurung terraces and farmland to the lower valley village of Siding.", 1750],
      ["Siding Village → Pokhara",                   "Short walk to the transport point then drive back to Pokhara. Afternoon free on Phewa Lakeside.", 820],
    ]),
    departures: [
      { date: "24 Sep 2026", status: "Available" },
      { date: "15 Oct 2026", status: "Available" },
    ],
  },

  // ─────────────────────────────────────────
  // KANCHENJUNGA
  // ─────────────────────────────────────────
  {
    slug: "kanchenjunga",
    name: "Kanchenjunga Trek",
    region: "Restricted",
    days: 22,
    difficulty: "Strenuous",
    price: 2200,
    maxAltitude: 5143,
    bestSeason: "Mar–May · Oct–Nov",
    blurb: "An expedition to the base of the world's third-highest mountain.",
    description:
      "Deep in far-eastern Nepal, the Kanchenjunga trek is true wilderness — both north and south base camps, rhododendron jungle, glaciers and remote Limbu villages. For seasoned trekkers seeking the road less travelled.",
    image: img(A),
    gallery: [A, E, F, G, D, C].map((id) => img(id, 900)),
    highlights: [
      "North & South base camps",
      "Pang Pema (5,143 m)",
      "Remote Limbu culture",
      "Untouched wilderness",
    ],
    includes: [
      ...commonIncludes,
      "Kanchenjunga restricted-area permit",
      "Domestic flights to Bhadrapur",
    ],
    excludes: commonExcludes,
    itinerary: days([
      ["Fly Kathmandu → Bhadrapur · Drive to Taplejung", "Long transfer to the far east of Nepal. Overnight in Taplejung, the gateway to the Kanchenjunga trails.", 1820],
      ["Taplejung → Chirwa",                          "Begin the trail through lowland subtropical forest. Far Eastern Nepal feels remote and genuinely off the beaten track.", 1270],
      ["Chirwa → Tapeythok",                          "Cross the Tamor River and climb through Rai and Limbu villages. Cultural encounters are authentic here — few tourists reach this far.", 1756],
      ["Tapeythok → Amjilosa",                        "Multi-day climb through stunning old-growth forest ascending toward the high valley.", 2490],
      ["Amjilosa → Ghunsa",                           "Arrive at the Tibetan-Buddhist village of Ghunsa. Visit the monastery above town and rest for acclimatisation.", 3595],
      ["Ghunsa → Khambachen",                         "Trek up the Ghunsa Khola valley with Kanchenjunga's massive ice face visible ahead.", 4050],
      ["Khambachen → Lhonak",                         "Open glacial terrain and a high desolate valley enclosed by the ice walls of Kanchenjunga's northern buttresses.", 4780],
      ["Lhonak → Pangpema North Base Camp (5,143 m)", "Stand at the foot of the world's third-highest mountain in genuine Himalayan wilderness — a landmark achievement.", 5143],
      ["Pangpema rest day · Glacier exploration",     "Explore the base camp area and moraine of the Kanchenjunga glacier. Return to Khambachen by evening.", 4050],
      ["Khambachen → Ghunsa",                         "Descent back through the familiar glacial valley.", 3595],
      ["Ghunsa → Sele La Base Camp",                  "Begin the traverse toward the southern approach, climbing over the linking ridge.", 3800],
      ["Cross Sele La (4,290 m) → Ramche",            "High pass crossing linking the two base camp approaches. Dramatic ridgeline views in both directions.", 4580],
      ["Ramche → Oktang South Base Camp (4,730 m)",  "The Yalung Glacier and Kanchenjunga's great southern face come into view — a profoundly remote and wild place.", 4730],
      ["Oktang → Tseram",                             "Begin the long return via the southern route through ancient forests.", 3870],
      ["Tseram → Yamphudin",                          "Descend through old-growth rhododendron and bamboo thickets on the western trail.", 2080],
      ["Yamphudin → Taplejung",                       "Retrace the final approach through Limbu villages and reach the road at Taplejung.", 1820],
      ["Drive Taplejung → Ilam",                      "Scenic drive through Rai hill country and tea gardens.", 1600],
      ["Drive Ilam → Bhadrapur",                      "Complete the crossing of far-eastern Nepal to the airport town.", 200],
      ["Fly Bhadrapur → Kathmandu",                   "Return flight to the capital. Afternoon rest and hotel check-in.", 1400],
      ["Kathmandu — rest and celebration",            "Recovery day and team debrief over a celebratory dinner.", 1400],
      ["Kathmandu sightseeing and shopping",          "Final Kathmandu day — Boudhanath, Pashupatinath, and Thamel souvenirs.", 1400],
      ["Departure from Kathmandu",                    "Airport transfer — end of the Kanchenjunga odyssey.", 1400],
    ]),
    departures: [
      { date: "28 Sep 2026", status: "Limited" },
      { date: "19 Oct 2026", status: "Available" },
    ],
  },

  // ─────────────────────────────────────────
  // GOKYO LAKE
  // ─────────────────────────────────────────
  {
    slug: "gokyo-lake",
    name: "Gokyo Lake Trek",
    region: "Everest",
    days: 14,
    difficulty: "Strenuous",
    price: 1150,
    maxAltitude: 5357,
    bestSeason: "Mar–May · Sep–Nov",
    blurb: "Turquoise glacial lakes and the finest Everest view in the Khumbu.",
    description:
      "A quieter alternative to EBC, the Gokyo trek climbs past six shimmering glacial lakes to Gokyo Ri (5,357 m) — arguably the best panorama of Everest, Lhotse, Makalu and Cho Oyu anywhere in Nepal.",
    image: img(F),
    gallery: [F, A, C, E, B, G].map((id) => img(id, 900)),
    highlights: [
      "Gokyo Ri panorama (5,357 m)",
      "Six turquoise glacial lakes",
      "Ngozumpa, Nepal's largest glacier",
      "Four 8,000 m peaks in one view",
    ],
    includes: [...commonIncludes, "Round-trip Lukla flights", "Sagarmatha National Park permit"],
    excludes: commonExcludes,
    itinerary: days([
      ["Fly Kathmandu → Lukla · Trek to Phakding",   "Classic Khumbu opener: the dramatic Lukla landing followed by a gentle riverside warm-up walk to Phakding.", 2652],
      ["Phakding → Namche Bazaar",                   "Climb through high suspension bridges and pine forest into the Sherpa capital of the Khumbu.", 3440],
      ["Acclimatisation day — Namche Bazaar",         "Hike to the Everest viewpoint above town for your first glimpse of the world's highest peak. Explore the Saturday market.", 3440],
      ["Namche Bazaar → Dole",                        "Branch off the main EBC trail onto the quieter Gokyo route, walking through rhododendron forest and yak pastures.", 4200],
      ["Dole → Machhermo",                            "Continue up the Dudh Koshi valley as the trail grows wilder. Machhermo has a small Himalayan Rescue Association clinic.", 4470],
      ["Machhermo → Gokyo · First lake",             "Arrive at the turquoise Dudh Pokhari (First Lake) and the small village of Gokyo, perched beside the vast Ngozumpa Glacier.", 4790],
      ["Ascend Gokyo Ri (5,357 m) · Lakes exploration", "Pre-dawn climb to Gokyo Ri: four 8,000 m peaks — Everest, Lhotse, Makalu, Cho Oyu — visible in a single panorama. Afternoon walk to the upper lakes.", 5357],
      ["Gokyo → Dole",                                "Begin the return descent. The Khumbu feels warmer and more colourful with each step down.", 4200],
      ["Dole → Namche Bazaar",                        "Continue descending through the forest trail back to the Sherpa capital.", 3440],
      ["Namche Bazaar → Lukla",                       "Final trail day. Commemorate the trek over a last coffee in Namche before the morning flight.", 2860],
      ["Fly Lukla → Kathmandu",                       "Weather-dependent morning flight. Hotel check-in and free afternoon in the city.", 1400],
      ["Kathmandu — cultural sightseeing",            "Visit Boudhanath and Swayambhunath, two of Nepal's most sacred Buddhist sites.", 1400],
      ["Shopping and farewell dinner",                "Last evening in Thamel with the team to relive the Gokyo adventure.", 1400],
      ["Departure day",                               "Airport transfer — the journey to Nepal's glacial lakes is complete.", 1400],
    ]),
    departures: [
      { date: "21 Sep 2026", status: "Available" },
      { date: "16 Oct 2026", status: "Limited" },
    ],
  },

  // ─────────────────────────────────────────
  // TSUM VALLEY
  // ─────────────────────────────────────────
  {
    slug: "tsum-valley",
    name: "Tsum Valley Trek",
    region: "Manaslu",
    days: 16,
    difficulty: "Moderate",
    price: 2100,
    maxAltitude: 3700,
    bestSeason: "Mar–May · Sep–Nov",
    blurb: "A hidden sacred valley of Tibetan Buddhism, sealed in time.",
    description:
      "The 'hidden valley of happiness' was opened to trekkers only recently. Tsum is a sacred Buddhist enclave of gompas, mani walls and a non-violence tradition where hunting is forbidden — profoundly peaceful and culturally rich.",
    image: img(C),
    gallery: [C, E, A, D, B, F].map((id) => img(id, 900)),
    highlights: [
      "Mu Gompa monastery (3,700 m)",
      "Sacred non-violence valley",
      "Ancient mani walls",
      "Authentic Tibetan culture",
    ],
    includes: [
      ...commonIncludes,
      "Tsum Valley restricted-area permit",
      "Manaslu Conservation Area permit",
    ],
    excludes: commonExcludes,
    itinerary: days([
      ["Drive Kathmandu → Arughat",                  "7-hour drive to the lowland gateway of the Tsum and Manaslu routes.", 400],
      ["Arughat → Soti Khola",                       "Begin the ascent along the Budi Gandaki in humid subtropical landscape.", 710],
      ["Soti Khola → Jagat",                         "Enter the Manaslu restricted zone. The valley narrows into a dramatic limestone gorge.", 1410],
      ["Jagat → Philim",                             "Trek through riverside settlements to the junction where the Tsum route diverges north.", 1570],
      ["Philim → Chhokangparo",                      "Turn north into the hidden Tsum valley. The ascent is rapid and the landscape shifts from subtropical to alpine within a single day.", 3010],
      ["Chhokangparo → Nile",                        "Walk past ancient mani walls and chortens lining the valley path. Juniper and prayer flags frame every view.", 3361],
      ["Nile → Mu Gompa",                            "Arrive at the valley's spiritual heart — a large monastery complex where the atmosphere of deep Buddhist peace is tangible.", 3700],
      ["Mu Gompa — full day exploration",            "Visit all four gompa compounds and walk to the nearby Milarepa's Cave, where the 11th-century sage meditated in retreat.", 3700],
      ["Day hike above Mu Gompa",                    "Climb above the valley for views into Tibet and across the hanging glaciers. Return to Mu Gompa for the night.", 3700],
      ["Mu Gompa → Rachen Gompa",                    "Visit the active nunnery at Rachen on the descent — approximately 50 nuns live and study here year-round.", 3240],
      ["Rachen → Chhokangparo",                      "Retrace the valley walk with the high peaks now behind you.", 3010],
      ["Chhokangparo → Philim",                      "Continue the descent back toward the main Manaslu trail junction.", 1570],
      ["Philim → Jagat",                             "Return along the Budi Gandaki gorge.", 1410],
      ["Jagat → Arughat",                            "Final trekking day through the river canyon.", 400],
      ["Drive Arughat → Kathmandu",                  "Full-day drive back to the capital.", 1400],
      ["Departure from Kathmandu",                   "Airport transfer — end of the Tsum Valley sacred journey.", 1400],
    ]),
    departures: [
      { date: "05 Oct 2026", status: "Available" },
      { date: "02 Nov 2026", status: "Limited" },
    ],
  },
];

export const featuredTreks = treks.filter((t) => t.featured);

export function getTrek(slug: string) {
  return treks.find((t) => t.slug === slug);
}

export const regions: Region[] = [
  "Everest",
  "Annapurna",
  "Langtang",
  "Manaslu",
  "Restricted",
];

export const difficulties: Difficulty[] = [
  "Easy",
  "Easy-Moderate",
  "Moderate",
  "Moderate-Hard",
  "Strenuous",
];
