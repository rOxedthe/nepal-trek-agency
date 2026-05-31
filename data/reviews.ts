export interface Review {
  id: number;
  name: string;
  country: string;
  flag: string;
  trek: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
}

export const reviews: Review[] = [
  {
    id: 1,
    name: "Isabelle Bazer",
    country: "France",
    flag: "🇫🇷",
    trek: "Everest Base Camp",
    rating: 5,
    date: "October 2023",
    text: "I would like to thank Bhupendra, Dip, Sagar and all team members for your incredible enthusiasm and help in organising our two treks. You made our journey a beautiful memory, helped us discover Nepal's people and culture. We made it to Kala Pattar — unforgettable!",
    verified: true,
  },
  {
    id: 2,
    name: "James Whitfield",
    country: "United Kingdom",
    flag: "🇬🇧",
    trek: "Annapurna Circuit",
    rating: 5,
    date: "April 2024",
    text: "Nepal Trek Agency made my solo Annapurna Circuit dream come true. The guide, Dawa, was knowledgeable, patient, and became a true friend by day 3. Logistics were flawless — permits, teahouses, everything sorted without me lifting a finger.",
    verified: true,
  },
  {
    id: 3,
    name: "Priya Sharma",
    country: "India",
    flag: "🇮🇳",
    trek: "Ghorepani Poon Hill",
    rating: 5,
    date: "March 2024",
    text: "My first ever trek and it couldn't have been better. The guides were patient, encouraging, and made the whole experience feel safe and manageable. Poon Hill at sunrise was breathtaking. Highly recommend for first-timers!",
    verified: true,
  },
  {
    id: 4,
    name: "Marcus Hoffmann",
    country: "Germany",
    flag: "🇩🇪",
    trek: "Langtang Valley",
    rating: 5,
    date: "November 2023",
    text: "A deeply moving experience. The Langtang Valley carries a somber history after the 2015 earthquake, and our guide shared the stories of the village with real heart. Stunning scenery, excellent organisation, small group of just 8. Perfect.",
    verified: true,
  },
  {
    id: 5,
    name: "Sarah Chen",
    country: "Australia",
    flag: "🇦🇺",
    trek: "Everest Base Camp",
    rating: 5,
    date: "May 2024",
    text: "Completed EBC last month and I'm still processing how incredible it was. Our guide Sagar kept spirits high even at 5am starts. The acclimatisation schedule was perfect — not a single person in our group suffered serious altitude sickness.",
    verified: true,
  },
  {
    id: 6,
    name: "Tom & Emma Walsh",
    country: "Ireland",
    flag: "🇮🇪",
    trek: "Annapurna Base Camp",
    rating: 5,
    date: "February 2024",
    text: "We did this as a couple and it was the best travel experience we've ever had. Nepal Trek Agency customised our itinerary to add a rest day at Chhomrong which we loved. The rhododendron forests in full bloom were incredible.",
    verified: true,
  },
  {
    id: 7,
    name: "Luca Ferrarese",
    country: "Italy",
    flag: "🇮🇹",
    trek: "Upper Mustang",
    rating: 5,
    date: "September 2023",
    text: "Upper Mustang is unlike anything else on earth. The permit logistics were handled completely by Nepal Trek Agency — I just had to show up. The ancient caves, Lo Manthang walls, and the lunar landscape are sights I will carry forever.",
    verified: true,
  },
  {
    id: 8,
    name: "Aiko Yamamoto",
    country: "Japan",
    flag: "🇯🇵",
    trek: "Mardi Himal",
    rating: 4,
    date: "December 2023",
    text: "Mardi Himal is an off-the-beaten-path gem. Less crowded than Poon Hill but equally stunning. Our guide was excellent — knew every bird and plant along the trail. Only reason for 4 stars instead of 5 is the teahouse at High Camp was a little basic.",
    verified: true,
  },
  {
    id: 9,
    name: "David Okafor",
    country: "Nigeria",
    flag: "🇳🇬",
    trek: "Ghorepani Poon Hill",
    rating: 5,
    date: "January 2024",
    text: "Never thought I'd be a trekker but Nepal changed me. The team was so welcoming and made sure I was comfortable every step of the way. Poon Hill was emotional — I cried watching the Annapurna range light up at sunrise. Book these guys.",
    verified: true,
  },
  {
    id: 10,
    name: "Camille Dupont",
    country: "France",
    flag: "🇫🇷",
    trek: "Gosaikunda",
    rating: 5,
    date: "August 2023",
    text: "Gosaikunda in monsoon was magical — misty, moody, and rarely crowded. The agency adjusted our itinerary based on weather conditions in real-time which I really appreciated. Felt completely in safe hands throughout.",
    verified: true,
  },
  {
    id: 11,
    name: "Ben Nguyen",
    country: "USA",
    flag: "🇺🇸",
    trek: "Manaslu Circuit",
    rating: 5,
    date: "October 2023",
    text: "Manaslu is the holy grail for trekkers who want solitude. Our group of 6 didn't see another Western trekking group for 4 days straight. Nepal Trek Agency managed the restricted area permits without a hitch. Bhupendra was amazing as always.",
    verified: true,
  },
  {
    id: 12,
    name: "Hannah Müller",
    country: "Switzerland",
    flag: "🇨🇭",
    trek: "Everest Base Camp",
    rating: 5,
    date: "April 2024",
    text: "Third time trekking Nepal, first time with Nepal Trek Agency — and I wish I'd found them sooner. The level of local knowledge, care for trekkers' wellbeing, and the sheer joy the guides bring to the trail is unmatched. Already planning Kanchenjunga next year.",
    verified: true,
  },
];

export const reviewStats = {
  average: 4.9,
  total: 127,
  distribution: [
    { stars: 5, percent: 94 },
    { stars: 4, percent: 4 },
    { stars: 3, percent: 1 },
    { stars: 2, percent: 1 },
    { stars: 1, percent: 0 },
  ],
};

export const countries = [
  "Australia", "Austria", "Belgium", "Brazil", "Canada", "China", "Denmark",
  "France", "Germany", "India", "Ireland", "Italy", "Japan", "Netherlands",
  "New Zealand", "Nigeria", "Norway", "Singapore", "South Korea", "Spain",
  "Sweden", "Switzerland", "United Kingdom", "USA", "Other",
];
