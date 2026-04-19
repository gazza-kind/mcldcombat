import { useState } from "react";
import type { Character } from "../types";
import { SKIN_TONES, HAIR_COLORS, UNIFORM_COLORS, ACCESSORIES } from "../types";
import Avatar from "./Avatar";

type Props = {
  onComplete: (char: Character) => void;
};

export default function CharacterCustomize({ onComplete }: Props) {
  const [character, setCharacter] = useState<Character>({
    name: "",
    skin: SKIN_TONES[1],
    hair: HAIR_COLORS[0],
    uniform: UNIFORM_COLORS[0].value,
    accessory: "none",
    gender: "male",
  });

  const update = <K extends keyof Character>(key: K, value: Character[K]) => {
    setCharacter((c) => ({ ...c, [key]: value }));
  };

  const canContinue = character.name.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 p-4 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-center text-4xl font-black text-white drop-shadow-lg sm:text-5xl">
          🎒 Buat Karaktermu
        </h1>
        <p className="mb-8 text-center text-purple-200">Kustomisasi siswa petarungmu sebelum masuk arena!</p>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Preview */}
          <div className="flex flex-col items-center rounded-3xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20">
            <div className="rounded-2xl bg-gradient-to-b from-sky-200 to-emerald-200 p-6 shadow-inner">
              <Avatar character={character} size={240} />
            </div>
            <p className="mt-4 text-2xl font-bold text-white">
              {character.name || "Tanpa Nama"}
            </p>
          </div>

          {/* Controls */}
          <div className="space-y-5 rounded-3xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20">
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-purple-200">
                Nama Petarung
              </label>
              <input
                type="text"
                value={character.name}
                onChange={(e) => update("name", e.target.value.slice(0, 16))}
                placeholder="Contoh: Budi Pemberani"
                className="w-full rounded-xl border-2 border-white/30 bg-white/20 px-4 py-3 text-lg font-semibold text-white placeholder-white/50 outline-none focus:border-yellow-400"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-purple-200">
                Gender
              </label>
              <div className="flex gap-2">
                {(["male", "female"] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => update("gender", g)}
                    className={`flex-1 rounded-xl py-3 font-bold transition ${
                      character.gender === g
                        ? "bg-yellow-400 text-slate-900 shadow-lg"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {g === "male" ? "👦 Cowok" : "👧 Cewek"}
                  </button>
                ))}
              </div>
            </div>

            {/* Skin */}
            <div>
              <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-purple-200">
                Warna Kulit
              </label>
              <div className="flex flex-wrap gap-2">
                {SKIN_TONES.map((c) => (
                  <button
                    key={c}
                    onClick={() => update("skin", c)}
                    className={`h-10 w-10 rounded-full border-4 transition ${
                      character.skin === c ? "border-yellow-400 scale-110" : "border-white/30"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Hair */}
            <div>
              <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-purple-200">
                Warna Rambut
              </label>
              <div className="flex flex-wrap gap-2">
                {HAIR_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => update("hair", c)}
                    className={`h-10 w-10 rounded-full border-4 transition ${
                      character.hair === c ? "border-yellow-400 scale-110" : "border-white/30"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Uniform */}
            <div>
              <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-purple-200">
                Seragam
              </label>
              <div className="grid grid-cols-3 gap-2">
                {UNIFORM_COLORS.map((u) => (
                  <button
                    key={u.value}
                    onClick={() => update("uniform", u.value)}
                    className={`rounded-lg border-2 px-2 py-2 text-xs font-bold transition ${
                      character.uniform === u.value
                        ? "border-yellow-400 bg-white/20 text-white"
                        : "border-white/20 bg-white/5 text-white/80 hover:bg-white/10"
                    }`}
                  >
                    <div
                      className="mx-auto mb-1 h-5 w-5 rounded-full border border-white/30"
                      style={{ backgroundColor: u.value }}
                    />
                    {u.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Accessory */}
            <div>
              <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-purple-200">
                Aksesoris
              </label>
              <div className="flex flex-wrap gap-2">
                {ACCESSORIES.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => update("accessory", a.id)}
                    className={`rounded-lg border-2 px-3 py-2 text-sm font-bold transition ${
                      character.accessory === a.id
                        ? "border-yellow-400 bg-white/20 text-white"
                        : "border-white/20 bg-white/5 text-white/80 hover:bg-white/10"
                    }`}
                  >
                    {a.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={!canContinue}
              onClick={() => onComplete(character)}
              className="w-full rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 py-4 text-lg font-black uppercase tracking-wide text-slate-900 shadow-lg transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              Pilih Senjata ⚔️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
