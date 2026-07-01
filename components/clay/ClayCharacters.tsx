"use client";

import { ClayDefs } from "./defs";

type CProps = { className?: string; style?: React.CSSProperties };

/* Small helper so each character gets stable, unique gradient ids */
const g = (p: string, n: string) => `url(#${p}-${n})`;

/* ── 1. BACKPACKER (hiking) ── */
export function ClayBackpacker({ className = "", style }: CProps) {
  const p = "bp";
  return (
    <svg viewBox="0 0 200 220" className={className} style={style} role="img" aria-label="Clay backpacker hiking">
      <ClayDefs p={p} />
      {/* ground shadow */}
      <ellipse cx="100" cy="206" rx="52" ry="9" fill="#23291F" opacity="0.12" />
      <g className="a-walk" style={{ transformOrigin: "100px 190px" }} filter={`url(#${p}-soft)`}>
        {/* back leg */}
        <path d="M92 150 q-6 26 -14 44" stroke={g(p, "clay-forestdk")} strokeWidth="16" strokeLinecap="round" fill="none" />
        {/* front leg */}
        <path d="M108 150 q10 22 4 46" stroke={g(p, "clay-forest")} strokeWidth="16" strokeLinecap="round" fill="none" />
        {/* boots */}
        <ellipse cx="76" cy="196" rx="13" ry="8" fill={g(p, "clay-terra")} />
        <ellipse cx="114" cy="198" rx="13" ry="8" fill={g(p, "clay-terra")} />
        {/* backpack */}
        <rect x="112" y="92" width="40" height="56" rx="18" fill={g(p, "clay-sun")} />
        <rect x="120" y="104" width="24" height="18" rx="7" fill="#C9902A" opacity="0.6" />
        {/* torso */}
        <path d="M78 96 q22 -14 44 0 l-4 58 q-18 10 -36 0 Z" fill={g(p, "clay-forest")} />
        {/* arm forward with trekking pole */}
        <path d="M84 108 q-18 14 -22 40" stroke={g(p, "clay-terra")} strokeWidth="13" strokeLinecap="round" fill="none" />
        <line x1="60" y1="146" x2="54" y2="200" stroke="#7A5233" strokeWidth="4" strokeLinecap="round" />
        {/* head + hat */}
        <circle cx="100" cy="70" r="24" fill={g(p, "clay-skin")} />
        <path d="M72 66 q28 -22 56 0 q-6 -30 -28 -30 q-22 0 -28 30 Z" fill={g(p, "clay-forestdk")} />
        <rect x="70" y="62" width="60" height="9" rx="4.5" fill={g(p, "clay-forestdk")} />
        {/* face */}
        <circle cx="108" cy="72" r="2.6" fill="#3A2A22" />
        <path d="M104 82 q6 4 11 0" stroke="#3A2A22" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* ── 2. COUPLE (travelling together) ── */
export function ClayCouple({ className = "", style }: CProps) {
  const p = "cp";
  return (
    <svg viewBox="0 0 240 220" className={className} style={style} role="img" aria-label="Clay couple travelling">
      <ClayDefs p={p} />
      <ellipse cx="120" cy="206" rx="78" ry="10" fill="#23291F" opacity="0.12" />
      {/* figure A */}
      <g filter={`url(#${p}-soft)`} className="a-float-2">
        <path d="M78 150 l-6 46 M96 150 l4 46" stroke={g(p, "clay-forestdk")} strokeWidth="15" strokeLinecap="round" />
        <path d="M70 94 q18 -12 38 0 l-4 60 q-16 8 -30 0 Z" fill={g(p, "clay-terra")} />
        <circle cx="90" cy="66" r="22" fill={g(p, "clay-skin")} />
        <path d="M68 66 q22 -30 44 0 q0 -34 -22 -34 q-22 0 -22 34 Z" fill={g(p, "clay-forestdk")} />
        <circle cx="97" cy="68" r="2.4" fill="#3A2A22" />
        <path d="M92 78 q6 4 11 0" stroke="#3A2A22" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
      {/* figure B */}
      <g filter={`url(#${p}-soft)`} className="a-float" style={{ animationDelay: "-1.5s" }}>
        <path d="M150 150 l-4 46 M168 150 l6 46" stroke={g(p, "clay-forestdk")} strokeWidth="15" strokeLinecap="round" />
        <path d="M138 94 q18 -12 38 0 l-4 60 q-16 8 -30 0 Z" fill={g(p, "clay-sun")} />
        <circle cx="158" cy="66" r="22" fill={g(p, "clay-skin")} />
        <path d="M136 64 q22 -12 44 0 q-2 -32 -22 -32 q-20 0 -22 32 Z" fill={g(p, "clay-forest")} />
        <circle cx="151" cy="68" r="2.4" fill="#3A2A22" />
        <path d="M145 78 q6 4 11 0" stroke="#3A2A22" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
      {/* joined hands */}
      <path d="M108 132 q16 10 30 0" stroke={g(p, "clay-skin")} strokeWidth="11" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/* ── 3. SUV (driving) ── */
export function ClaySUV({ className = "", style }: CProps) {
  const p = "sv";
  return (
    <svg viewBox="0 0 240 150" className={className} style={style} role="img" aria-label="Clay SUV driving">
      <ClayDefs p={p} />
      <ellipse cx="120" cy="130" rx="96" ry="10" fill="#23291F" opacity="0.12" />
      <g filter={`url(#${p}-soft)`}>
        {/* body */}
        <path d="M30 104 q2 -30 26 -34 q10 -22 40 -24 l52 0 q26 2 40 26 l18 4 q14 4 14 22 l0 8 q0 8 -10 8 l-180 0 q-10 0 -10 -10 Z" fill={g(p, "clay-terra")} />
        {/* roof rack */}
        <rect x="72" y="38" width="70" height="7" rx="3.5" fill="#7A4A34" />
        <rect x="80" y="30" width="46" height="12" rx="4" fill={g(p, "clay-sun")} />
        {/* windows */}
        <path d="M74 52 q6 -14 22 -16 l30 0 q14 2 22 16 Z" fill={g(p, "clay-river")} />
        <line x1="104" y1="40" x2="104" y2="66" stroke="#EAE6D9" strokeWidth="3" opacity="0.6" />
        {/* headlight */}
        <circle cx="206" cy="92" r="6" fill={g(p, "clay-sun")} />
      </g>
      {/* wheels — spin */}
      {[74, 168].map((cx) => (
        <g key={cx} style={{ transformOrigin: `${cx}px 112px`, animation: "spin 1.1s linear infinite" }}>
          <circle cx={cx} cy="112" r="22" fill="#23291F" />
          <circle cx={cx} cy="112" r="9" fill="#B4B7A6" />
          <g stroke="#6b6f62" strokeWidth="2.4">
            <line x1={cx} y1="103" x2={cx} y2="121" /><line x1={cx - 9} y1="112" x2={cx + 9} y2="112" />
            <line x1={cx - 6} y1="106" x2={cx + 6} y2="118" /><line x1={cx - 6} y1="118" x2={cx + 6} y2="106" />
          </g>
        </g>
      ))}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </svg>
  );
}

/* ── 4. MOUNTAINEER (climbing) ── */
export function ClayClimber({ className = "", style }: CProps) {
  const p = "cl";
  return (
    <svg viewBox="0 0 200 220" className={className} style={style} role="img" aria-label="Clay mountaineer climbing">
      <ClayDefs p={p} />
      <g filter={`url(#${p}-soft)`}>
        {/* rock face hint */}
        <path d="M150 8 l30 0 l0 210 l-56 0 q10 -40 0 -80 q-8 -40 12 -70 q6 -34 14 -60 Z" fill={g(p, "clay-forestdk")} opacity="0.2" />
        {/* reaching arm up */}
        <path d="M110 96 q26 -20 40 -50" stroke={g(p, "clay-terra")} strokeWidth="13" strokeLinecap="round" fill="none" />
        {/* legs bent for climb */}
        <path d="M92 150 q-16 12 -12 40" stroke={g(p, "clay-forestdk")} strokeWidth="16" strokeLinecap="round" fill="none" />
        <path d="M110 150 q18 6 18 34" stroke={g(p, "clay-forest")} strokeWidth="16" strokeLinecap="round" fill="none" />
        {/* torso */}
        <path d="M80 98 q22 -12 42 0 l-4 56 q-18 8 -34 0 Z" fill={g(p, "clay-sun")} />
        {/* lower arm gripping */}
        <path d="M88 108 q-20 6 -26 26" stroke={g(p, "clay-terra")} strokeWidth="12" strokeLinecap="round" fill="none" />
        {/* head + beanie */}
        <circle cx="104" cy="72" r="22" fill={g(p, "clay-skin")} />
        <path d="M82 68 q22 -26 44 0 q2 -20 -22 -20 q-24 0 -22 20 Z" fill={g(p, "clay-river")} />
        <circle cx="112" cy="74" r="2.4" fill="#3A2A22" />
      </g>
      <ellipse cx="96" cy="210" rx="40" ry="8" fill="#23291F" opacity="0.1" />
    </svg>
  );
}

/* ── 5. CAMP (tent + campfire) ── */
export function ClayCamp({ className = "", style }: CProps) {
  const p = "cm";
  return (
    <svg viewBox="0 0 260 180" className={className} style={style} role="img" aria-label="Clay campsite">
      <ClayDefs p={p} />
      <ellipse cx="130" cy="164" rx="120" ry="12" fill="#23291F" opacity="0.1" />
      {/* tent */}
      <g filter={`url(#${p}-soft)`}>
        <path d="M40 150 L96 58 L152 150 Z" fill={g(p, "clay-forest")} />
        <path d="M96 58 L152 150 L128 150 L96 84 Z" fill={g(p, "clay-forestdk")} />
        <path d="M96 78 L80 150 L112 150 Z" fill="#12281C" opacity="0.85" />
        <circle cx="96" cy="58" r="5" fill={g(p, "clay-sun")} />
      </g>
      {/* campfire */}
      <g>
        <ellipse cx="200" cy="150" rx="26" ry="7" fill="#5A4632" opacity="0.5" />
        <rect x="180" y="146" width="40" height="7" rx="3.5" fill="#7A5233" transform="rotate(-12 200 150)" />
        <rect x="180" y="146" width="40" height="7" rx="3.5" fill="#6B4A2E" transform="rotate(12 200 150)" />
        <g className="a-flicker" style={{ transformOrigin: "200px 146px" }}>
          <path d="M200 100 q16 22 8 40 q-2 8 -8 6 q-6 2 -8 -6 q-8 -18 8 -40 Z" fill={g(p, "clay-sun")} />
          <path d="M200 116 q9 14 4 26 q-4 6 -8 0 q-5 -12 4 -26 Z" fill={g(p, "clay-terra")} />
        </g>
      </g>
    </svg>
  );
}

/* ── 6. MAP READER ── */
export function ClayMapReader({ className = "", style }: CProps) {
  const p = "mr";
  return (
    <svg viewBox="0 0 200 210" className={className} style={style} role="img" aria-label="Clay explorer reading a map">
      <ClayDefs p={p} />
      <ellipse cx="100" cy="200" rx="48" ry="9" fill="#23291F" opacity="0.12" />
      <g filter={`url(#${p}-soft)`}>
        {/* legs seated */}
        <path d="M84 156 q-24 6 -34 26" stroke={g(p, "clay-forestdk")} strokeWidth="16" strokeLinecap="round" fill="none" />
        <path d="M116 156 q24 6 34 26" stroke={g(p, "clay-forest")} strokeWidth="16" strokeLinecap="round" fill="none" />
        {/* torso */}
        <path d="M76 104 q24 -14 48 0 l-2 54 q-22 10 -44 0 Z" fill={g(p, "clay-river")} />
        {/* head */}
        <circle cx="100" cy="74" r="23" fill={g(p, "clay-skin")} />
        <path d="M77 72 q23 -14 46 0 q0 -32 -23 -32 q-23 0 -23 32 Z" fill={g(p, "clay-terra")} />
        <circle cx="93" cy="80" r="2.4" fill="#3A2A22" />
        <circle cx="107" cy="80" r="2.4" fill="#3A2A22" />
      </g>
      {/* the map held up */}
      <g className="a-sway-soft" style={{ transformOrigin: "100px 150px" }}>
        <rect x="52" y="120" width="96" height="66" rx="6" fill={g(p, "clay-paper")} transform="rotate(-3 100 150)" />
        <g transform="rotate(-3 100 150)" stroke="#C56B4A" strokeWidth="2" fill="none" opacity="0.7" strokeLinecap="round">
          <path d="M64 150 q18 -14 34 -2 q16 12 34 0" strokeDasharray="4 5" />
          <circle cx="64" cy="150" r="3" fill="#335C45" stroke="none" />
          <circle cx="132" cy="148" r="3" fill="#C56B4A" stroke="none" />
          <path d="M60 132 h20 M60 168 h30" stroke="#5B8FA3" strokeWidth="2" strokeDasharray="none" opacity="0.5" />
        </g>
      </g>
    </svg>
  );
}

/* ── 7. DRONE (flying) ── */
export function ClayDrone({ className = "", style }: CProps) {
  const p = "dr";
  return (
    <svg viewBox="0 0 200 130" className={className} style={style} role="img" aria-label="Clay drone flying">
      <g className="a-float">
        <ClayDefs p={p} />
        {/* arms */}
        <g stroke={g(p, "clay-forestdk")} strokeWidth="8" strokeLinecap="round">
          <line x1="100" y1="66" x2="52" y2="42" /><line x1="100" y1="66" x2="148" y2="42" />
          <line x1="100" y1="66" x2="58" y2="88" /><line x1="100" y1="66" x2="142" y2="88" />
        </g>
        {/* rotors — spin fast */}
        {[[52, 42], [148, 42], [58, 88], [142, 88]].map(([cx, cy], i) => (
          <g key={i} style={{ transformOrigin: `${cx}px ${cy}px`, animation: "spin .18s linear infinite" }}>
            <ellipse cx={cx} cy={cy} rx="22" ry="4" fill="#5C8A5B" opacity="0.5" />
            <circle cx={cx} cy={cy} r="4" fill={g(p, "clay-forest")} />
          </g>
        ))}
        {/* body */}
        <rect x="78" y="52" width="44" height="30" rx="12" fill={g(p, "clay-sun")} filter={`url(#${p}-soft)`} />
        {/* camera lens */}
        <circle cx="100" cy="86" r="9" fill={g(p, "clay-river")} />
        <circle cx="100" cy="86" r="4" fill="#23291F" />
        <circle cx="98" cy="84" r="1.4" fill="#fff" />
      </g>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <ellipse cx="100" cy="122" rx="30" ry="5" fill="#23291F" opacity="0.1" />
    </svg>
  );
}

/* ── 8. PHOTOGRAPHER ── */
export function ClayPhotographer({ className = "", style }: CProps) {
  const p = "ph";
  return (
    <svg viewBox="0 0 200 220" className={className} style={style} role="img" aria-label="Clay photographer taking a photo">
      <ClayDefs p={p} />
      <ellipse cx="100" cy="204" rx="48" ry="9" fill="#23291F" opacity="0.12" />
      <g filter={`url(#${p}-soft)`}>
        <path d="M86 152 l-8 48 M104 152 l8 48" stroke={g(p, "clay-forestdk")} strokeWidth="16" strokeLinecap="round" />
        <path d="M76 98 q24 -12 48 0 l-4 58 q-20 8 -40 0 Z" fill={g(p, "clay-forest")} />
        {/* head */}
        <circle cx="96" cy="72" r="22" fill={g(p, "clay-skin")} />
        <path d="M74 70 q22 -12 44 0 q0 -30 -22 -30 q-22 0 -22 30 Z" fill={g(p, "clay-sun")} />
        {/* arms holding camera */}
        <path d="M84 106 q16 -6 30 2" stroke={g(p, "clay-terra")} strokeWidth="12" strokeLinecap="round" fill="none" />
        <path d="M120 108 q14 -2 22 6" stroke={g(p, "clay-terra")} strokeWidth="12" strokeLinecap="round" fill="none" />
      </g>
      {/* camera */}
      <g>
        <rect x="112" y="86" width="42" height="30" rx="7" fill={g(p, "clay-forestdk")} />
        <rect x="122" y="80" width="16" height="8" rx="3" fill="#12281C" />
        <circle cx="133" cy="101" r="11" fill={g(p, "clay-river")} />
        <circle cx="133" cy="101" r="5" fill="#23291F" />
        {/* flash */}
        <g className="a-twinkle" style={{ animationDuration: "1.4s" }}>
          <path d="M150 96 l14 -8 M152 101 l16 0 M150 106 l14 8" stroke={g(p, "clay-sun")} strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

/* ── 9. BONFIRE (standalone) ── */
export function ClayBonfire({ className = "", style }: CProps) {
  const p = "bf";
  return (
    <svg viewBox="0 0 180 180" className={className} style={style} role="img" aria-label="Clay bonfire">
      <ClayDefs p={p} />
      <ellipse cx="90" cy="150" rx="60" ry="14" fill="#23291F" opacity="0.14" />
      {/* logs */}
      <g filter={`url(#${p}-soft)`}>
        <rect x="48" y="138" width="84" height="12" rx="6" fill="#7A5233" transform="rotate(-14 90 144)" />
        <rect x="48" y="138" width="84" height="12" rx="6" fill="#6B4A2E" transform="rotate(14 90 144)" />
        <rect x="56" y="140" width="68" height="10" rx="5" fill="#8A5E3B" />
      </g>
      {/* stone ring */}
      {[[42, 150], [66, 158], [114, 158], [138, 150]].map(([cx, cy], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx="9" ry="6" fill="#9CA093" />
      ))}
      {/* flames */}
      <g className="a-flicker" style={{ transformOrigin: "90px 138px" }}>
        <path d="M90 60 q34 40 16 74 q-6 14 -16 10 q-10 4 -16 -10 q-18 -34 16 -74 Z" fill={g(p, "clay-sun")} />
        <path d="M90 86 q20 26 8 48 q-8 12 -16 0 q-10 -24 8 -48 Z" fill={g(p, "clay-terra")} />
        <path d="M90 104 q10 14 4 28 q-6 8 -10 0 q-4 -16 6 -28 Z" fill="#F4CF74" />
      </g>
      {/* sparks */}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={72 + i * 18} cy={70 - i * 8} r="2.5" fill="#F4CF74"
          style={{ animation: `firefly ${2 + i}s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }} />
      ))}
    </svg>
  );
}
