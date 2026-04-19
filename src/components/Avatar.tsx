import type { Character } from "../types";

type Props = {
  character: Character;
  size?: number;
  flip?: boolean;
  shaking?: boolean;
  attacking?: boolean;
  weaponEmoji?: string;
};

export default function Avatar({ character, size = 200, flip = false, shaking = false, attacking = false, weaponEmoji }: Props) {
  const { skin, hair, uniform, accessory, gender } = character;

  return (
    <div
      className={`relative inline-block transition-transform duration-200 ${shaking ? "animate-shake" : ""} ${attacking ? "animate-attack" : ""}`}
      style={{ width: size, height: size, transform: flip ? "scaleX(-1)" : "none" }}
    >
      <svg viewBox="0 0 200 200" width={size} height={size}>
        {/* Body / Uniform */}
        <rect x="60" y="110" width="80" height="70" rx="10" fill={uniform} stroke="#000" strokeWidth="2" />
        {/* Tie / Collar */}
        <polygon points="100,110 90,125 100,160 110,125" fill="#dc2626" stroke="#000" strokeWidth="1.5" />
        {/* Arms */}
        <rect x="40" y="115" width="22" height="55" rx="8" fill={uniform} stroke="#000" strokeWidth="2" />
        <rect x="138" y="115" width="22" height="55" rx="8" fill={uniform} stroke="#000" strokeWidth="2" />
        {/* Hands */}
        <circle cx="51" cy="172" r="10" fill={skin} stroke="#000" strokeWidth="2" />
        <circle cx="149" cy="172" r="10" fill={skin} stroke="#000" strokeWidth="2" />

        {/* Neck */}
        <rect x="92" y="100" width="16" height="15" fill={skin} stroke="#000" strokeWidth="2" />

        {/* Head */}
        <circle cx="100" cy="75" r="32" fill={skin} stroke="#000" strokeWidth="2" />

        {/* Hair */}
        {gender === "male" ? (
          <path
            d="M 70 70 Q 70 40 100 40 Q 130 40 130 70 L 130 60 Q 120 50 100 50 Q 80 50 70 60 Z"
            fill={hair}
            stroke="#000"
            strokeWidth="1.5"
          />
        ) : (
          <>
            <path
              d="M 68 75 Q 68 38 100 38 Q 132 38 132 75 L 135 110 L 128 110 L 128 70 Q 120 55 100 55 Q 80 55 72 70 L 72 110 L 65 110 Z"
              fill={hair}
              stroke="#000"
              strokeWidth="1.5"
            />
          </>
        )}

        {/* Eyes */}
        <circle cx="88" cy="75" r="3" fill="#000" />
        <circle cx="112" cy="75" r="3" fill="#000" />

        {/* Mouth */}
        <path d="M 92 90 Q 100 95 108 90" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Accessories */}
        {accessory === "glasses" && (
          <g>
            <circle cx="88" cy="75" r="8" fill="none" stroke="#1f2937" strokeWidth="2.5" />
            <circle cx="112" cy="75" r="8" fill="none" stroke="#1f2937" strokeWidth="2.5" />
            <line x1="96" y1="75" x2="104" y2="75" stroke="#1f2937" strokeWidth="2.5" />
          </g>
        )}
        {accessory === "cap" && (
          <g>
            <ellipse cx="100" cy="48" rx="34" ry="10" fill="#1e40af" stroke="#000" strokeWidth="1.5" />
            <path d="M 100 48 Q 140 48 145 55 L 130 55 Q 120 50 100 50 Z" fill="#1e40af" stroke="#000" strokeWidth="1.5" />
          </g>
        )}
        {accessory === "mask" && (
          <rect x="80" y="82" width="40" height="18" rx="5" fill="#e5e7eb" stroke="#000" strokeWidth="1.5" />
        )}
        {accessory === "headband" && (
          <rect x="66" y="58" width="68" height="8" fill="#dc2626" stroke="#000" strokeWidth="1.5" />
        )}
      </svg>

      {/* Weapon */}
      {weaponEmoji && (
        <div
          className="absolute text-4xl"
          style={{
            right: flip ? "auto" : "-10px",
            left: flip ? "-10px" : "auto",
            top: "50%",
            transform: flip ? "scaleX(-1)" : "none",
          }}
        >
          {weaponEmoji}
        </div>
      )}
    </div>
  );
}
