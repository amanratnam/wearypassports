/**
 * Shared SVG defs for the clay explorer set — soft puffy gradients + drop shadow.
 * Rendered once per SVG (ids are namespaced by `p` prefix to avoid collisions
 * when multiple characters appear on one page).
 */
export function ClayDefs({ p }: { p: string }) {
  return (
    <defs>
      <filter id={`${p}-soft`} x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#23291F" floodOpacity="0.16" />
      </filter>

      <radialGradient id={`${p}-clay-forest`} cx="35%" cy="28%" r="75%">
        <stop offset="0%" stopColor="#6FA06B" />
        <stop offset="55%" stopColor="#335C45" />
        <stop offset="100%" stopColor="#1F4D36" />
      </radialGradient>
      <radialGradient id={`${p}-clay-forestdk`} cx="35%" cy="28%" r="75%">
        <stop offset="0%" stopColor="#335C45" />
        <stop offset="100%" stopColor="#12281C" />
      </radialGradient>
      <radialGradient id={`${p}-clay-terra`} cx="35%" cy="28%" r="75%">
        <stop offset="0%" stopColor="#E39072" />
        <stop offset="60%" stopColor="#C56B4A" />
        <stop offset="100%" stopColor="#9F4F31" />
      </radialGradient>
      <radialGradient id={`${p}-clay-sun`} cx="35%" cy="28%" r="75%">
        <stop offset="0%" stopColor="#F4CF74" />
        <stop offset="60%" stopColor="#E8B23A" />
        <stop offset="100%" stopColor="#C9902A" />
      </radialGradient>
      <radialGradient id={`${p}-clay-river`} cx="35%" cy="28%" r="75%">
        <stop offset="0%" stopColor="#84B0C1" />
        <stop offset="60%" stopColor="#5B8FA3" />
        <stop offset="100%" stopColor="#3F6E80" />
      </radialGradient>
      <radialGradient id={`${p}-clay-skin`} cx="38%" cy="30%" r="75%">
        <stop offset="0%" stopColor="#F0C4A0" />
        <stop offset="100%" stopColor="#D89A6E" />
      </radialGradient>
      <radialGradient id={`${p}-clay-paper`} cx="35%" cy="28%" r="80%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#EAE6D9" />
      </radialGradient>
    </defs>
  );
}
