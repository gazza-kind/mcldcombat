import { useEffect, useRef, useState } from "react";
import type { Character, Fighter, Weapon } from "../types";
import { WEAPONS } from "../types";
import Avatar from "./Avatar";

type Props = {
  playerChar: Character;
  playerWeapon: Weapon;
  onRestart: () => void;
};

const ENEMY_NAMES = ["Si Tukang Bully", "Ketua Geng Kelas", "Senior Galak", "Anak Pindahan", "Si Juara Kelas"];
const ENEMY_PRESETS: Character[] = [
  { name: "", skin: "#c68863", hair: "#1a1a1a", uniform: "#1f2937", accessory: "glasses", gender: "male" },
  { name: "", skin: "#e8b48a", hair: "#3b2418", uniform: "#3b82f6", accessory: "headband", gender: "male" },
  { name: "", skin: "#fcd9b6", hair: "#c026d3", uniform: "#ec4899", accessory: "none", gender: "female" },
  { name: "", skin: "#8d5524", hair: "#1a1a1a", uniform: "#16a34a", accessory: "cap", gender: "male" },
  { name: "", skin: "#e8b48a", hair: "#d4a574", uniform: "#ffffff", accessory: "mask", gender: "female" },
];

type LogEntry = { text: string; type: "player" | "enemy" | "info" | "win" | "lose" };

function makeEnemy(): Fighter {
  const idx = Math.floor(Math.random() * ENEMY_PRESETS.length);
  const char = { ...ENEMY_PRESETS[idx], name: ENEMY_NAMES[idx] };
  const weapon = WEAPONS[Math.floor(Math.random() * WEAPONS.length)];
  return { character: char, weapon, hp: 100, maxHp: 100 };
}

export default function BattleArena({ playerChar, playerWeapon, onRestart }: Props) {
  const [player, setPlayer] = useState<Fighter>({
    character: playerChar,
    weapon: playerWeapon,
    hp: 100,
    maxHp: 100,
  });
  const [enemy, setEnemy] = useState<Fighter>(() => makeEnemy());
  const [log, setLog] = useState<LogEntry[]>([
    { text: `Bel istirahat berbunyi! ${playerChar.name} memasuki arena!`, type: "info" },
  ]);
  const [turn, setTurn] = useState<"player" | "enemy" | "over">("player");
  const [playerShake, setPlayerShake] = useState(false);
  const [enemyShake, setEnemyShake] = useState(false);
  const [playerAttack, setPlayerAttack] = useState(false);
  const [enemyAttack, setEnemyAttack] = useState(false);
  const [round, setRound] = useState(1);
  const [wins, setWins] = useState(0);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLog([{ text: `🔔 Bel berbunyi! ${playerChar.name} vs ${enemy.character.name}! Mulai!`, type: "info" }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [log]);

  const addLog = (entry: LogEntry) => setLog((l) => [...l, entry]);

  const calcDamage = (w: Weapon) => {
    const [min, max] = w.damage;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const playerAct = (action: "attack" | "heavy" | "defend") => {
    if (turn !== "player") return;

    if (action === "attack") {
      const dmg = calcDamage(player.weapon);
      const crit = Math.random() < 0.15;
      const finalDmg = crit ? Math.floor(dmg * 1.5) : dmg;
      setPlayerAttack(true);
      setTimeout(() => setPlayerAttack(false), 400);
      setTimeout(() => {
        setEnemyShake(true);
        setEnemy((e) => ({ ...e, hp: Math.max(0, e.hp - finalDmg) }));
        addLog({
          text: `${crit ? "💥 CRITICAL! " : ""}${player.character.name} menyerang dengan ${player.weapon.name} ${player.weapon.emoji} → ${finalDmg} damage!`,
          type: "player",
        });
        setTimeout(() => setEnemyShake(false), 400);
        setTurn("enemy");
      }, 300);
    } else if (action === "heavy") {
      const hit = Math.random() < 0.6;
      setPlayerAttack(true);
      setTimeout(() => setPlayerAttack(false), 400);
      if (hit) {
        const dmg = Math.floor(calcDamage(player.weapon) * 1.8);
        setTimeout(() => {
          setEnemyShake(true);
          setEnemy((e) => ({ ...e, hp: Math.max(0, e.hp - dmg) }));
          addLog({
            text: `🔥 SERANGAN BERAT KENA! ${player.character.name} menghantam keras → ${dmg} damage!`,
            type: "player",
          });
          setTimeout(() => setEnemyShake(false), 400);
          setTurn("enemy");
        }, 300);
      } else {
        addLog({ text: `😵 Serangan berat MELESET! ${player.character.name} kehilangan keseimbangan.`, type: "info" });
        setTurn("enemy");
      }
    } else if (action === "defend") {
      const heal = Math.floor(Math.random() * 8) + 5;
      setPlayer((p) => ({ ...p, hp: Math.min(p.maxHp, p.hp + heal) }));
      addLog({ text: `🛡️ ${player.character.name} bertahan & memulihkan ${heal} HP.`, type: "info" });
      setTurn("enemy");
    }
  };

  // Enemy turn
  useEffect(() => {
    if (turn !== "enemy") return;
    if (enemy.hp <= 0) return;

    const timer = setTimeout(() => {
      const action = Math.random();
      if (action < 0.7) {
        const dmg = calcDamage(enemy.weapon);
        const crit = Math.random() < 0.1;
        const finalDmg = crit ? Math.floor(dmg * 1.5) : dmg;
        setEnemyAttack(true);
        setTimeout(() => setEnemyAttack(false), 400);
        setTimeout(() => {
          setPlayerShake(true);
          setPlayer((p) => ({ ...p, hp: Math.max(0, p.hp - finalDmg) }));
          addLog({
            text: `${crit ? "💢 CRITICAL! " : ""}${enemy.character.name} menyerang dengan ${enemy.weapon.name} ${enemy.weapon.emoji} → ${finalDmg} damage!`,
            type: "enemy",
          });
          setTimeout(() => setPlayerShake(false), 400);
          setTurn("player");
        }, 300);
      } else {
        const heal = Math.floor(Math.random() * 6) + 4;
        setEnemy((e) => ({ ...e, hp: Math.min(e.maxHp, e.hp + heal) }));
        addLog({ text: `🩹 ${enemy.character.name} bertahan & memulihkan ${heal} HP.`, type: "info" });
        setTurn("player");
      }
    }, 900);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn]);

  // Win/Lose check
  useEffect(() => {
    if (player.hp <= 0 && turn !== "over") {
      addLog({ text: `💀 ${player.character.name} K.O.! Kamu kalah...`, type: "lose" });
      setTurn("over");
    } else if (enemy.hp <= 0 && turn !== "over") {
      addLog({ text: `🏆 ${enemy.character.name} K.O.! ${player.character.name} MENANG ronde ${round}!`, type: "win" });
      setWins((w) => w + 1);
      setTurn("over");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player.hp, enemy.hp]);

  const nextRound = () => {
    setEnemy(makeEnemy());
    setPlayer((p) => ({ ...p, hp: Math.min(p.maxHp, p.hp + 30) }));
    setRound((r) => r + 1);
    setTurn("player");
    addLog({ text: `🔔 Ronde ${round + 1} dimulai! Musuh baru muncul!`, type: "info" });
  };

  const hpBar = (current: number, max: number, color: string) => (
    <div className="h-4 w-full overflow-hidden rounded-full border-2 border-black/40 bg-black/40">
      <div
        className={`h-full ${color} transition-all duration-500`}
        style={{ width: `${(current / max) * 100}%` }}
      />
    </div>
  );

  const playerLost = player.hp <= 0;
  const enemyLost = enemy.hp <= 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-emerald-400 p-3 sm:p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between rounded-xl bg-black/70 px-4 py-2 text-white">
          <div className="text-sm font-bold">
            🏫 RONDE {round} • KEMENANGAN: {wins}
          </div>
          <button
            onClick={onRestart}
            className="rounded-lg bg-white/20 px-3 py-1 text-xs font-bold hover:bg-white/30"
          >
            ↻ Ganti Karakter
          </button>
        </div>

        {/* Arena background - school yard */}
        <div className="relative overflow-hidden rounded-3xl border-4 border-black/30 bg-gradient-to-b from-sky-300 to-emerald-500 p-4 shadow-2xl">
          {/* School building */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-sky-300 to-sky-200">
            <div className="absolute bottom-0 left-1/2 h-32 w-72 -translate-x-1/2 rounded-t-2xl bg-amber-200 border-4 border-amber-900 border-b-0">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-black text-amber-900">SMA HARAPAN</div>
              <div className="mt-8 grid grid-cols-3 gap-2 px-4">
                <div className="h-8 rounded bg-sky-400 border border-amber-900" />
                <div className="h-8 rounded bg-sky-400 border border-amber-900" />
                <div className="h-8 rounded bg-sky-400 border border-amber-900" />
              </div>
            </div>
            {/* Clouds */}
            <div className="absolute top-2 left-4 text-3xl">☁️</div>
            <div className="absolute top-6 right-8 text-3xl">☁️</div>
          </div>

          {/* Ground */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-emerald-400 to-emerald-600">
            <div className="absolute bottom-2 left-4 text-2xl">🌳</div>
            <div className="absolute bottom-2 right-4 text-2xl">🌳</div>
          </div>

          {/* Fighters */}
          <div className="relative z-10 flex items-end justify-between gap-2 pt-32 pb-8 sm:pt-40 sm:pb-12">
            <div className="flex flex-col items-center">
              <div className="mb-2 w-32 rounded-lg bg-black/70 p-2 text-white sm:w-40">
                <div className="text-xs font-black">{player.character.name}</div>
                {hpBar(player.hp, player.maxHp, "bg-gradient-to-r from-emerald-400 to-green-500")}
                <div className="mt-1 text-[10px]">HP {player.hp}/{player.maxHp}</div>
              </div>
              <Avatar
                character={player.character}
                size={140}
                shaking={playerShake}
                attacking={playerAttack}
                weaponEmoji={player.weapon.emoji}
              />
            </div>

            <div className="hidden text-6xl sm:block">⚔️</div>

            <div className="flex flex-col items-center">
              <div className="mb-2 w-32 rounded-lg bg-black/70 p-2 text-white sm:w-40">
                <div className="text-xs font-black">{enemy.character.name}</div>
                {hpBar(enemy.hp, enemy.maxHp, "bg-gradient-to-r from-red-500 to-rose-600")}
                <div className="mt-1 text-[10px]">HP {enemy.hp}/{enemy.maxHp}</div>
              </div>
              <Avatar
                character={enemy.character}
                size={140}
                flip
                shaking={enemyShake}
                attacking={enemyAttack}
                weaponEmoji={enemy.weapon.emoji}
              />
            </div>
          </div>
        </div>

        {/* Log */}
        <div className="mt-4 h-32 overflow-y-auto rounded-xl bg-black/80 p-3 font-mono text-sm text-white">
          {log.map((entry, i) => (
            <div
              key={i}
              className={`mb-1 ${
                entry.type === "player"
                  ? "text-emerald-300"
                  : entry.type === "enemy"
                  ? "text-red-300"
                  : entry.type === "win"
                  ? "text-yellow-300 font-black text-base"
                  : entry.type === "lose"
                  ? "text-red-400 font-black text-base"
                  : "text-sky-200"
              }`}
            >
              {entry.text}
            </div>
          ))}
          <div ref={logEndRef} />
        </div>

        {/* Actions */}
        <div className="mt-4">
          {turn === "over" ? (
            <div className="flex flex-col gap-3 sm:flex-row">
              {enemyLost && !playerLost && (
                <button
                  onClick={nextRound}
                  className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 py-4 font-black uppercase text-white shadow-lg hover:scale-[1.02]"
                >
                  Lawan Musuh Baru → Ronde {round + 1}
                </button>
              )}
              {playerLost && (
                <div className="flex-1 rounded-xl bg-red-900 px-4 py-4 text-center font-black uppercase text-white">
                  💀 GAME OVER — Total Menang: {wins}
                </div>
              )}
              <button
                onClick={onRestart}
                className="rounded-xl bg-white/80 px-6 py-4 font-black uppercase text-slate-900 shadow-lg hover:bg-white"
              >
                Main Lagi
              </button>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-3">
              <button
                disabled={turn !== "player"}
                onClick={() => playerAct("attack")}
                className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-4 font-black uppercase text-white shadow-lg transition hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
              >
                ⚔️ Serang
              </button>
              <button
                disabled={turn !== "player"}
                onClick={() => playerAct("heavy")}
                className="rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 py-4 font-black uppercase text-white shadow-lg transition hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
              >
                💥 Hantaman Berat
              </button>
              <button
                disabled={turn !== "player"}
                onClick={() => playerAct("defend")}
                className="rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 py-4 font-black uppercase text-white shadow-lg transition hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
              >
                🛡️ Bertahan
              </button>
            </div>
          )}
          {turn === "enemy" && (
            <p className="mt-2 text-center text-sm font-bold text-slate-700">⏳ Giliran lawan...</p>
          )}
        </div>
      </div>
    </div>
  );
}
