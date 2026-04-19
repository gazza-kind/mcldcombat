export type Weapon = {
  id: string;
  name: string;
  emoji: string;
  damage: [number, number]; // min, max
  speed: number; // attacks per turn modifier (lower = slower)
  description: string;
  color: string;
};

export type Character = {
  name: string;
  skin: string; // skin tone color
  hair: string; // hair color
  uniform: string; // uniform color
  accessory: string; // glasses, hat, etc.
  gender: "male" | "female";
};

export type Fighter = {
  character: Character;
  weapon: Weapon;
  hp: number;
  maxHp: number;
};

export const WEAPONS: Weapon[] = [
  {
    id: "ruler",
    name: "Penggaris Besi",
    emoji: "📏",
    damage: [8, 15],
    speed: 5,
    description: "Cepat dan ringan, cocok untuk serangan beruntun.",
    color: "from-sky-400 to-blue-600",
  },
  {
    id: "book",
    name: "Buku Tebal RPUL",
    emoji: "📚",
    damage: [12, 20],
    speed: 3,
    description: "Berat tapi mematikan. Hantaman ilmu pengetahuan!",
    color: "from-amber-400 to-orange-600",
  },
  {
    id: "chalk",
    name: "Kapur & Penghapus",
    emoji: "🧽",
    damage: [5, 22],
    speed: 4,
    description: "Damage tidak menentu, tapi bisa melumpuhkan musuh.",
    color: "from-fuchsia-400 to-pink-600",
  },
  {
    id: "broom",
    name: "Sapu Ijuk",
    emoji: "🧹",
    damage: [10, 18],
    speed: 4,
    description: "Senjata legenda penjaga kelas. Jangkauan jauh.",
    color: "from-emerald-400 to-green-600",
  },
  {
    id: "bottle",
    name: "Botol Minum",
    emoji: "🧴",
    damage: [7, 25],
    speed: 3,
    description: "Berisi air? Atau es batu? Hanya Tuhan yang tahu.",
    color: "from-cyan-400 to-teal-600",
  },
  {
    id: "bag",
    name: "Tas Ransel",
    emoji: "🎒",
    damage: [14, 22],
    speed: 2,
    description: "Penuh buku pelajaran. Sekali ayun, musuh terkapar.",
    color: "from-red-400 to-rose-600",
  },
];

export const SKIN_TONES = ["#fcd9b6", "#e8b48a", "#c68863", "#8d5524", "#5d3a1a"];
export const HAIR_COLORS = ["#1a1a1a", "#3b2418", "#6b4423", "#a0522d", "#d4a574", "#2d1b69", "#c026d3"];
export const UNIFORM_COLORS = [
  { name: "Putih SMA", value: "#ffffff" },
  { name: "Biru SMP", value: "#3b82f6" },
  { name: "Merah SD", value: "#ef4444" },
  { name: "Hijau Pramuka", value: "#16a34a" },
  { name: "Hitam OSIS", value: "#1f2937" },
  { name: "Pink Kustom", value: "#ec4899" },
];
export const ACCESSORIES = [
  { id: "none", name: "Tanpa" },
  { id: "glasses", name: "Kacamata" },
  { id: "cap", name: "Topi" },
  { id: "mask", name: "Masker" },
  { id: "headband", name: "Bandana" },
];
