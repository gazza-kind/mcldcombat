import { useState } from "react";
import type { Weapon, Character } from "../types";
import { WEAPONS } from "../types";
import Avatar from "./Avatar";

type Props = {
  character: Character;
  onSelect: (weapon: Weapon) => void;
  onBack: () => void;
};

export default function WeaponSelect({ character, onSelect, onBack }: Props) {
  const [selected, setSelected] = useState<Weapon | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-950 to-orange-950 p-4 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={onBack}
          className="mb-4 rounded-lg bg-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/20"
        >
          ← Ubah Karakter
        </button>

        <h1 className="mb-2 text-center text-4xl font-black text-white drop-shadow-lg sm:text-5xl">
          ⚔️ Pilih Senjatamu
        </h1>
        <p className="mb-8 text-center text-orange-200">
          Halo <span className="font-bold text-yellow-300">{character.name}</span>! Pilih senjata kelas yang akan kau gunakan.
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {WEAPONS.map((w) => {
            const isSelected = selected?.id === w.id;
            const avgDmg = (w.damage[0] + w.damage[1]) / 2;
            return (
              <button
                key={w.id}
                onClick={() => setSelected(w)}
                className={`group relative overflow-hidden rounded-2xl border-2 p-5 text-left transition ${
                  isSelected
                    ? "border-yellow-400 scale-[1.02] shadow-2xl shadow-yellow-400/30"
                    : "border-white/20 hover:border-white/50"
                } bg-gradient-to-br ${w.color}`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-6xl drop-shadow-lg">{w.emoji}</span>
                  {isSelected && (
                    <span className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-black text-slate-900">
                      ✓ DIPILIH
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-black text-white drop-shadow">{w.name}</h3>
                <p className="mt-1 text-sm text-white/90">{w.description}</p>
                <div className="mt-3 space-y-1 text-xs font-bold text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-16">DAMAGE</span>
                    <div className="h-2 flex-1 rounded-full bg-black/30">
                      <div className="h-full rounded-full bg-white" style={{ width: `${(avgDmg / 25) * 100}%` }} />
                    </div>
                    <span>{w.damage[0]}-{w.damage[1]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-16">SPEED</span>
                    <div className="h-2 flex-1 rounded-full bg-black/30">
                      <div className="h-full rounded-full bg-white" style={{ width: `${(w.speed / 5) * 100}%` }} />
                    </div>
                    <span>{w.speed}/5</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {selected && (
          <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20">
            <div className="flex items-center gap-4">
              <Avatar character={character} size={120} weaponEmoji={selected.emoji} />
              <div className="text-white">
                <p className="text-sm uppercase tracking-wide text-orange-200">Siap bertarung dengan</p>
                <p className="text-2xl font-black">{selected.name}</p>
              </div>
            </div>
            <button
              onClick={() => onSelect(selected)}
              className="w-full max-w-md rounded-xl bg-gradient-to-r from-red-500 to-orange-500 py-4 text-lg font-black uppercase tracking-wide text-white shadow-lg transition hover:scale-[1.02]"
            >
              Mulai Pertarungan! 🔥
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
