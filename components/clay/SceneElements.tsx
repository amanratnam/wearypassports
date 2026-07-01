"use client";

/**
 * Ambient scene elements — clouds, pine trees, birds, mountains, passport
 * stamps, fireflies. All animation is CSS-class based (a-* utilities) so it is
 * automatically stilled under prefers-reduced-motion.
 */

export function Cloud({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 120 54" className={className} style={style} aria-hidden>
      <g fill="#FFFFFF" opacity="0.9">
        <ellipse cx="38" cy="34" rx="30" ry="18" />
        <ellipse cx="66" cy="28" rx="26" ry="20" />
        <ellipse cx="90" cy="36" rx="22" ry="15" />
        <rect x="20" y="34" width="80" height="18" rx="9" />
      </g>
    </svg>
  );
}

/** A drifting cloud layer positioned absolutely inside a relative parent. */
export function DriftingClouds({ tone = "#FFFFFF" }: { tone?: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {[
        { top: "12%", size: 150, dur: "58s", delay: "0s", op: 0.85 },
        { top: "26%", size: 96, dur: "78s", delay: "-20s", op: 0.6 },
        { top: "44%", size: 190, dur: "92s", delay: "-45s", op: 0.5 },
      ].map((c, i) => (
        <div
          key={i}
          className="absolute a-float"
          style={{ top: c.top, left: 0, animationDuration: "9s" }}
        >
          <div
            style={{
              animation: `float-cloud ${c.dur} linear infinite`,
              animationDelay: c.delay,
              opacity: c.op,
            }}
          >
            <Cloud style={{ width: c.size, color: tone }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PineTree({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 60 96" className={className} style={style} aria-hidden>
      <rect x="26" y="70" width="8" height="24" rx="3" fill="#7A5233" />
      <g className="a-sway-soft">
        <path d="M30 6 L48 40 L12 40 Z" fill="#335C45" />
        <path d="M30 22 L52 58 L8 58 Z" fill="#2C5A3E" />
        <path d="M30 40 L56 78 L4 78 Z" fill="#1F4D36" />
      </g>
    </svg>
  );
}

/** A simple flapping bird — pass delay to desync a flock. */
export function Bird({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg viewBox="0 0 40 20" className={className} aria-hidden>
      <g
        className="origin-center"
        style={{ animation: `bird-flap 0.5s ease-in-out infinite`, animationDelay: `${delay}s` }}
        fill="none"
        stroke="#3A4436"
        strokeWidth="2.4"
        strokeLinecap="round"
      >
        <path d="M4 14 Q13 4 20 12" />
        <path d="M20 12 Q27 4 36 14" />
      </g>
    </svg>
  );
}

export function BirdFlock({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none flex gap-6 ${className}`} aria-hidden>
      <Bird className="w-9 opacity-70" delay={0} />
      <Bird className="w-7 opacity-55 -translate-y-2" delay={0.15} />
      <Bird className="w-8 opacity-60 translate-y-1" delay={0.3} />
    </div>
  );
}

/** Parallax-ready mountain ridge as an SVG band. */
export function MountainRidge({
  className = "",
  fill = "#335C45",
  style,
}: {
  className?: string;
  fill?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className={className} style={style} aria-hidden>
      <path
        d="M0 320 L0 180 L180 90 L320 170 L470 60 L640 190 L820 80 L1010 200 L1190 110 L1440 210 L1440 320 Z"
        fill={fill}
      />
      <path d="M470 60 L520 130 L400 130 Z" fill="#FAF9F5" opacity="0.55" />
      <path d="M820 80 L865 140 L760 140 Z" fill="#FAF9F5" opacity="0.5" />
    </svg>
  );
}

/** Animated passport stamp — stamps into place when scrolled into view via CSS. */
export function PassportStamp({
  label = "EXPLORED",
  sub = "WEARY PASSPORTS",
  color = "#C56B4A",
  className = "",
  style,
}: {
  label?: string;
  sub?: string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 140 140" className={className} style={{ ...style }} aria-hidden>
      <g style={{ transformOrigin: "70px 70px" }} className="[animation:stamp-in_.7s_cubic-bezier(.34,1.56,.64,1)_both]">
        <circle cx="70" cy="70" r="60" fill="none" stroke={color} strokeWidth="4" opacity="0.9" />
        <circle cx="70" cy="70" r="50" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3 4" opacity="0.7" />
        <path id="stamp-top" d="M70 22 a48 48 0 0 1 0 96 a48 48 0 0 1 0 -96" fill="none" />
        <text fill={color} fontFamily="Manrope, sans-serif" fontWeight="800" fontSize="12" letterSpacing="3">
          <textPath href="#stamp-top" startOffset="6%">{sub} · {sub}</textPath>
        </text>
        <text x="70" y="66" textAnchor="middle" fill={color} fontFamily="Fraunces, serif" fontWeight="600" fontSize="20">{label}</text>
        <text x="70" y="86" textAnchor="middle" fill={color} fontFamily="Manrope, sans-serif" fontWeight="700" fontSize="9" letterSpacing="2">★ ★ ★</text>
      </g>
    </svg>
  );
}

/** Field of flickering fireflies for night scenes. */
export function Fireflies({ count = 14, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {Array.from({ length: count }).map((_, i) => {
        const left = (i * 137.5) % 100;
        const top = (i * 53.7) % 90 + 5;
        return (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: 5,
              height: 5,
              background: "radial-gradient(circle, #F4CF74 0%, rgba(232,178,58,0) 70%)",
              boxShadow: "0 0 8px 2px rgba(232,178,58,0.6)",
              animation: `firefly ${4 + (i % 5)}s ease-in-out infinite`,
              animationDelay: `${(i % 7) * 0.6}s`,
            }}
          />
        );
      })}
    </div>
  );
}
