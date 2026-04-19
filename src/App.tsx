import { useState } from "react";
import type { Character, Weapon } from "./types";
import CharacterCustomize from "./components/CharacterCustomize";
import WeaponSelect from "./components/WeaponSelect";
import BattleArena from "./components/BattleArena";

type Screen = "intro" | "customize" | "weapon" | "battle";

export default function App() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [character, setCharacter] = useState<Character | null>(null);
  const [weapon, setWeapon] = useState<Weapon | null>(null);

  if (screen === "intro") {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-rose-900 flex items-center justify-center p-6">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 text-8xl">📚</div>
          <div className="absolute top-32 right-20 text-7xl">✏️</div>
          <div className="absolute bottom-20 left-20 text-7xl">🎒</div>
          <div className="absolute bottom-32 right-10 text-8xl">📏</div>
          <div className="absolute top-1/2 left-1/3 text-6xl">🧹</div>
        </div>

        <div className="relative z-10 max-w-2xl text-center">
          <div className="mb-4 inline-block rounded-full bg-yellow-400 px-4 py-1 text-xs font-black uppercase tracking-widest text-slate-900">
            School Brawl ⚔️ 2026
          </div>
          <h1 className="mb-4 text-5xl font-black leading-tight text-white drop-shadow-2xl sm:text-7xl">
            🏫 SCHOOL <span className="text-yellow-400">BRAWL</span>
          </h1>
          <p className="mb-2 text-xl font-bold text-purple-200">
            Kombat Anak Sekolah!
          </p>
          <p className="mx-auto mb-8 max-w-md text-purple-100/80">
            Buat karakter siswamu, pilih senjata kelas favoritmu, dan tunjukkan siapa raja sekolah di arena pertarungan!
          </p>

          <div className="mb-8 grid grid-cols-3 gap-3 text-white">
            <div className="rounded-xl bg-white/10 p-3 backdrop-blur ring-1 ring-white/20">
              <div className="text-2xl">👕</div>
              <div className="text-xs font-bold">Karakter Custom</div>
            </div>
            <div className="rounded-xl bg-white/10 p-3 backdrop-blur ring-1 ring-white/20">
              <div className="text-2xl">⚔️</div>
              <div className="text-xs font-bold">6 Senjata Unik</div>
            </div>
            <div className="rounded-xl bg-white/10 p-3 backdrop-blur ring-1 ring-white/20">
              <div className="text-2xl">🏆</div>
              <div className="text-xs font-bold">Mode Endless</div>
            </div>
          </div>

          <button
            onClick={() => setScreen("customize")}
            className="rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 px-12 py-5 text-2xl font-black uppercase tracking-wide text-white shadow-2xl shadow-orange-500/40 transition hover:scale-105"
          >
            MULAI BERTARUNG ▶
          </button>

          <p className="mt-6 text-xs text-purple-300/70">
            ⚠️ Game ini hanya hiburan. Jangan berkelahi di sekolah beneran!
          </p>
        </div>
      </div>
    );
  }

  if (screen === "customize") {
    return (
      <CharacterCustomize
        onComplete={(c) => {
          setCharacter(c);
          setScreen("weapon");
        }}
      />
    );
  }

  if (screen === "weapon" && character) {
    return (
      <WeaponSelect
        character={character}
        onSelect={(w) => {
          setWeapon(w);
          setScreen("battle");
        }}
        onBack={() => setScreen("customize")}
      />
    );
  }

  if (screen === "battle" && character && weapon) {
    return (
      <BattleArena
        playerChar={character}
        playerWeapon={weapon}
        onRestart={() => {
          setCharacter(null);
          setWeapon(null);
          setScreen("customize");
        }}
      />
    );
  }

  return null;
}
