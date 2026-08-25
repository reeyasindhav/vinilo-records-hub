export type Grade = "M" | "NM" | "VG+" | "VG" | "G+";

export const grades: Record<
  Grade,
  { name: string; blurb: string; tone: "sage" | "tan" | "stone" | "clay" }
> = {
  M: {
    name: "Mint",
    blurb: "Sealed or unplayed. Absolutely perfect in every way.",
    tone: "sage",
  },
  NM: {
    name: "Near Mint",
    blurb: "Looks and sounds nearly perfect. No visible marks.",
    tone: "sage",
  },
  "VG+": {
    name: "Very Good Plus",
    blurb: "Light signs of play, excellent sound with no distraction.",
    tone: "tan",
  },
  VG: {
    name: "Very Good",
    blurb: "Some wear and surface noise, still a great listen.",
    tone: "stone",
  },
  "G+": {
    name: "Good Plus",
    blurb: "Well-loved with audible character. Plays all the way through.",
    tone: "clay",
  },
};

export const genres = ["Jazz", "Rock", "Hip-Hop", "Electronic", "Folk", "Soul"] as const;

export type Genre = (typeof genres)[number];

export type Record_ = {
  id: string;
  title: string;
  artist: string;
  year: number;
  price: number;
  grade: Grade;
  sleeveGrade: Grade;
  genre: Genre;
  pressing: string;
  label: string;
  image: string;
  sellerId: string;
  featured?: boolean;
  notes: string;
  tracks: { n: string; title: string; length: string }[];
};

const img = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const records: Record_[] = [
  {
    id: "kind-of-blue",
    title: "Kind of Blue",
    artist: "Miles Davis",
    year: 1959,
    price: 42,
    grade: "NM",
    sleeveGrade: "VG+",
    genre: "Jazz",
    pressing: "1976 Columbia reissue, 180g",
    label: "Columbia",
    image: img("1461360370896-922624d12aa1"),
    sellerId: "groove-society",
    featured: true,
    notes:
      "Deep groove pressing with a beautifully quiet surface. Original inner sleeve included, spine intact.",
    tracks: [
      { n: "A1", title: "So What", length: "9:22" },
      { n: "A2", title: "Freddie Freeloader", length: "9:46" },
      { n: "B1", title: "Blue in Green", length: "5:37" },
      { n: "B2", title: "All Blues", length: "11:33" },
    ],
  },
  {
    id: "rumours",
    title: "Rumours",
    artist: "Fleetwood Mac",
    year: 1977,
    price: 28,
    grade: "VG+",
    sleeveGrade: "VG",
    genre: "Rock",
    pressing: "First US pressing, Warner Bros.",
    label: "Warner Bros.",
    image: img("1524650359799-842906ca1c06"),
    sellerId: "maggies-crate",
    featured: true,
    notes:
      "Plays clean throughout with faint marks that don't affect the listen. Light ring wear on the sleeve.",
    tracks: [
      { n: "A1", title: "Second Hand News", length: "2:43" },
      { n: "A2", title: "Dreams", length: "4:14" },
      { n: "B1", title: "The Chain", length: "4:28" },
      { n: "B2", title: "Gold Dust Woman", length: "4:51" },
    ],
  },
  {
    id: "blue-train",
    title: "Blue Train",
    artist: "John Coltrane",
    year: 1957,
    price: 76,
    grade: "VG+",
    sleeveGrade: "VG+",
    genre: "Jazz",
    pressing: "Blue Note 1577, mono",
    label: "Blue Note",
    image: img("1511671782779-c97d3d27a1d4"),
    sellerId: "needle-drop",
    featured: true,
    notes:
      "A serious collector copy. Labels are clean, audio is warm and forward with a touch of surface noise in quiet passages.",
    tracks: [
      { n: "A1", title: "Blue Train", length: "10:43" },
      { n: "A2", title: "Moment's Notice", length: "9:10" },
      { n: "B1", title: "Locomotion", length: "7:13" },
      { n: "B2", title: "Lazy Bird", length: "7:07" },
    ],
  },
  {
    id: "miseducation",
    title: "The Miseducation of Lauryn Hill",
    artist: "Lauryn Hill",
    year: 1998,
    price: 64,
    grade: "NM",
    sleeveGrade: "NM",
    genre: "Hip-Hop",
    pressing: "2018 double LP reissue",
    label: "Ruffhouse",
    image: img("1495305379050-64540d6ee95d"),
    sellerId: "groove-society",
    featured: true,
    notes: "Opened once for a single listen. Gatefold is sharp, both discs are flawless.",
    tracks: [
      { n: "A1", title: "Lost Ones", length: "5:33" },
      { n: "A2", title: "Ex-Factor", length: "5:26" },
      { n: "C1", title: "Doo Wop (That Thing)", length: "5:20" },
      { n: "D1", title: "Everything Is Everything", length: "4:54" },
    ],
  },
  {
    id: "vespertine",
    title: "Vespertine",
    artist: "Björk",
    year: 2001,
    price: 51,
    grade: "VG",
    sleeveGrade: "VG+",
    genre: "Electronic",
    pressing: "One Little Indian, original",
    label: "One Little Indian",
    image: img("1501386761578-eac5c94b800a"),
    sellerId: "maggies-crate",
    featured: true,
    notes:
      "Honest player copy. A few light scuffs on side B with mild surface noise between tracks.",
    tracks: [
      { n: "A1", title: "Hidden Place", length: "5:28" },
      { n: "A2", title: "Cocoon", length: "4:28" },
      { n: "B1", title: "Pagan Poetry", length: "5:14" },
      { n: "B2", title: "Aurora", length: "4:39" },
    ],
  },
  {
    id: "blue",
    title: "Blue",
    artist: "Joni Mitchell",
    year: 1971,
    price: 35,
    grade: "VG+",
    sleeveGrade: "VG",
    genre: "Folk",
    pressing: "Reprise, 1971 gatefold",
    label: "Reprise",
    image: img("1470225620780-dba8ba36b745"),
    sellerId: "needle-drop",
    featured: true,
    notes: "Warm, intimate pressing. Sleeve shows honest shelf wear at the corners.",
    tracks: [
      { n: "A1", title: "All I Want", length: "3:34" },
      { n: "A2", title: "My Old Man", length: "3:34" },
      { n: "B1", title: "California", length: "3:51" },
      { n: "B2", title: "A Case of You", length: "4:22" },
    ],
  },
  {
    id: "voodoo",
    title: "Voodoo",
    artist: "D'Angelo",
    year: 2000,
    price: 88,
    grade: "NM",
    sleeveGrade: "VG+",
    genre: "Soul",
    pressing: "Virgin double LP, original",
    label: "Virgin",
    image: img("1487180144351-b8472da7d491"),
    sellerId: "groove-society",
    notes:
      "Hard to find original. Discs are glossy and quiet; sleeve has a small seam split at the bottom.",
    tracks: [
      { n: "A1", title: "Playa Playa", length: "7:12" },
      { n: "B1", title: "Devil's Pie", length: "5:19" },
      { n: "C1", title: "Untitled (How Does It Feel)", length: "7:10" },
      { n: "D1", title: "Africa", length: "6:38" },
    ],
  },
  {
    id: "selected-ambient",
    title: "Selected Ambient Works 85–92",
    artist: "Aphex Twin",
    year: 1992,
    price: 59,
    grade: "VG+",
    sleeveGrade: "VG+",
    genre: "Electronic",
    pressing: "Apollo, 2xLP repress",
    label: "Apollo",
    image: img("1483412033650-1015ddeb83d1"),
    sellerId: "needle-drop",
    notes: "Plays beautifully. Light paper scuffs from storage, nothing audible.",
    tracks: [
      { n: "A1", title: "Xtal", length: "4:52" },
      { n: "A2", title: "Tha", length: "9:01" },
      { n: "C1", title: "Heliosphan", length: "4:51" },
      { n: "D1", title: "Actium", length: "7:33" },
    ],
  },
  {
    id: "songs-in-key",
    title: "Songs in the Key of Life",
    artist: "Stevie Wonder",
    year: 1976,
    price: 74,
    grade: "VG",
    sleeveGrade: "VG",
    genre: "Soul",
    pressing: 'Tamla, with bonus 7"',
    label: "Tamla",
    image: img("1459749411175-04bf5292ceea"),
    sellerId: "maggies-crate",
    notes: "Complete with booklet and the bonus EP. Well played but full of life.",
    tracks: [
      { n: "A1", title: "Love's in Need of Love Today", length: "7:06" },
      { n: "B1", title: "Sir Duke", length: "3:52" },
      { n: "C1", title: "I Wish", length: "4:12" },
      { n: "D2", title: "As", length: "7:08" },
    ],
  },
  {
    id: "midnight-marauders",
    title: "Midnight Marauders",
    artist: "A Tribe Called Quest",
    year: 1993,
    price: 46,
    grade: "VG+",
    sleeveGrade: "NM",
    genre: "Hip-Hop",
    pressing: "Jive, 2015 reissue",
    label: "Jive",
    image: img("1516450360452-9312f5e86fc7"),
    sellerId: "needle-drop",
    notes: "Crisp low end, tight pressing. Sleeve is near flawless.",
    tracks: [
      { n: "A1", title: "Steve Biko (Stir It Up)", length: "3:07" },
      { n: "A3", title: "Award Tour", length: "3:47" },
      { n: "B2", title: "Electric Relaxation", length: "4:06" },
      { n: "B4", title: "Lyrics to Go", length: "3:53" },
    ],
  },
  {
    id: "pink-moon",
    title: "Pink Moon",
    artist: "Nick Drake",
    year: 1972,
    price: 39,
    grade: "G+",
    sleeveGrade: "VG",
    genre: "Folk",
    pressing: "Island pink rim, original",
    label: "Island",
    image: img("1508700929628-666bc8bd84ea"),
    sellerId: "maggies-crate",
    notes: "A true crate find. Audible surface noise but the performance shines through.",
    tracks: [
      { n: "A1", title: "Pink Moon", length: "2:04" },
      { n: "A3", title: "Which Will", length: "2:58" },
      { n: "B1", title: "Things Behind the Sun", length: "3:56" },
      { n: "B3", title: "From the Morning", length: "2:30" },
    ],
  },
  {
    id: "led-zeppelin-iv",
    title: "Led Zeppelin IV",
    artist: "Led Zeppelin",
    year: 1971,
    price: 55,
    grade: "VG+",
    sleeveGrade: "VG+",
    genre: "Rock",
    pressing: "Atlantic, 1971 gatefold",
    label: "Atlantic",
    image: img("1550985616-10810253b84d"),
    sellerId: "groove-society",
    notes: "Strong original with a clean gatefold and lyric insert.",
    tracks: [
      { n: "A1", title: "Black Dog", length: "4:54" },
      { n: "A2", title: "Rock and Roll", length: "3:40" },
      { n: "B1", title: "Misty Mountain Hop", length: "4:38" },
      { n: "B3", title: "Stairway to Heaven", length: "8:02" },
    ],
  },
];

export type Seller = {
  id: string;
  name: string;
  city: string;
  rating: number;
  sales: number;
  since: number;
  tags: string[];
  bio: string;
  avatar: string;
  responseTime: string;
  shipsFrom: string;
};

export const sellers: Seller[] = [
  {
    id: "groove-society",
    name: "Groove Society",
    city: "Brooklyn, NY",
    rating: 4.9,
    sales: 842,
    since: 2016,
    tags: ["Jazz", "Soul", "Brazilian"],
    bio: "Two crate diggers running a small shop out of Bushwick. Every record is cleaned on a Degritter and graded under a bright lamp before it goes up.",
    avatar: img("1514320291840-2e0a9bf2a9ae", 400),
    responseTime: "under 4 hours",
    shipsFrom: "Brooklyn, New York",
  },
  {
    id: "maggies-crate",
    name: "Maggie's Crate",
    city: "Chicago, IL",
    rating: 5.0,
    sales: 1204,
    since: 2013,
    tags: ["Rock", "Folk", "70s"],
    bio: "Maggie has been selling records since the days of paper classifieds. Honest grades, thick mailers, and a handwritten note in every parcel.",
    avatar: img("1519892300165-cb5542fb47c7", 400),
    responseTime: "under 2 hours",
    shipsFrom: "Chicago, Illinois",
  },
  {
    id: "needle-drop",
    name: "Needle Drop",
    city: "Los Angeles, CA",
    rating: 4.8,
    sales: 509,
    since: 2019,
    tags: ["Jazz", "Blues", "Mono"],
    bio: "Specialists in mono pressings and early jazz sides. If a record has a story, it's in the listing notes.",
    avatar: img("1471478331149-c72f17e33c73", 400),
    responseTime: "same day",
    shipsFrom: "Los Angeles, California",
  },
];

export const getRecord = (id: string) => records.find((r) => r.id === id);
export const getSeller = (id: string) => sellers.find((s) => s.id === id);
export const recordsBySeller = (id: string) => records.filter((r) => r.sellerId === id);

export const reviews = [
  {
    id: 1,
    author: "Dana R.",
    seller: "groove-society",
    rating: 5,
    text: "Graded conservatively — arrived quieter than described. Packed like a fortress.",
    date: "2 weeks ago",
  },
  {
    id: 2,
    author: "Theo M.",
    seller: "groove-society",
    rating: 5,
    text: "Third order and still perfect. The listing photos actually match the record.",
    date: "1 month ago",
  },
  {
    id: 3,
    author: "Priya S.",
    seller: "maggies-crate",
    rating: 5,
    text: "Handwritten note, spotless disc. This is how you sell records.",
    date: "5 days ago",
  },
  {
    id: 4,
    author: "Luis A.",
    seller: "needle-drop",
    rating: 4,
    text: "Small sleeve wear not mentioned, but the pressing itself is a dream.",
    date: "3 weeks ago",
  },
];

export const orders = [
  {
    id: "VN-4471",
    record: "Blue Train",
    seller: "Needle Drop",
    price: 76,
    status: "In transit",
    date: "Aug 18, 2026",
  },
  {
    id: "VN-4402",
    record: "Rumours",
    seller: "Maggie's Crate",
    price: 28,
    status: "Delivered",
    date: "Aug 04, 2026",
  },
  {
    id: "VN-4388",
    record: "Voodoo",
    seller: "Groove Society",
    price: 88,
    status: "Delivered",
    date: "Jul 27, 2026",
  },
  {
    id: "VN-4310",
    record: "Pink Moon",
    seller: "Maggie's Crate",
    price: 39,
    status: "Graded & shipped",
    date: "Jul 11, 2026",
  },
];

export const listings = [
  {
    id: "L-201",
    record: "Kind of Blue",
    grade: "NM",
    price: 42,
    views: 318,
    offers: 4,
    status: "Live",
  },
  {
    id: "L-198",
    record: "Led Zeppelin IV",
    grade: "VG+",
    price: 55,
    views: 204,
    offers: 2,
    status: "Live",
  },
  {
    id: "L-190",
    record: "Songs in the Key of Life",
    grade: "VG",
    price: 74,
    views: 96,
    offers: 0,
    status: "Draft",
  },
  {
    id: "L-184",
    record: "Midnight Marauders",
    grade: "VG+",
    price: 46,
    views: 512,
    offers: 7,
    status: "Sold",
  },
];

export const salesTrend = [
  { month: "Mar", sales: 4 },
  { month: "Apr", sales: 7 },
  { month: "May", sales: 6 },
  { month: "Jun", sales: 11 },
  { month: "Jul", sales: 9 },
  { month: "Aug", sales: 14 },
];
