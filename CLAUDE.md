# CLAUDE.md — Aman Ratnam

> Persistent context for Claude. Loads every session. Edit freely.

---

## Who I Am

- **Name:** Aman Ratnam
- **Role:** Product Manager
- **Focus:** B2B SaaS products
- **Side work:** Building visually exceptional websites — the kind that win on Awwwards
- **Design taste:** Swiss editorial grids (Ad Reform), Japanese minimalist rhythm (Nippori/LAMM), confident whitespace, restrained type, intentional emptiness

---

## How I Work

- Get to the output. Skip the preamble.
- Give me options when there's a real choice to make — not when you're just hedging.
- When I ask for copy or a spec, **write it**. Don't describe what you'd write.
- If something can be simple, keep it simple. Do not over-engineer.
- Do **not** change the design context I've set. If I've established a visual system, work within it — don't reinvent it.

---

## PM Work — Defaults

### PRDs & Specs
- Structure: Problem → Context → Goals → Non-goals → User stories → Open questions
- Be opinionated. Flag risks and tradeoffs clearly, not buried in caveats.
- Use tables for comparisons, prose for everything else.

### User Research & Interviews
- Help me write discussion guides, synthesis frameworks, and insight summaries
- Format insights as: Observation → Pattern → Implication
- Don't over-interpret thin data — flag when confidence is low

### Roadmap Prioritization
- Default to RICE or Impact/Effort unless I say otherwise
- Show reasoning, not just scores
- Flag dependencies and sequencing risks

### Stakeholder Communication
- Match the audience: exec = 1 pager with the ask upfront; eng = technical context first
- Never bury the recommendation
- Write it crisp. No corporate softening.

### Competitor Analysis
- Structure: Category → What they do → Differentiation → Gap we can own
- Use tables for comparison, narrative for synthesis
- Flag the "so what" explicitly

### OKRs & Metrics
- Push back if a metric can be gamed easily
- Help me connect OKRs to actual user behavior, not vanity numbers
- Format: Objective → Key Results → Leading indicators

---

## Website / Design Work — Defaults

### My Aesthetic Reference Points
| Site | What I love about it |
|---|---|
| [adreform.com](https://www.adreform.com/) | Editorial grid, confident whitespace, type-forward, no noise |
| [nippori.lamm.tokyo](https://nippori.lamm.tokyo/) | Japanese minimalism, poetic layout rhythm, intentional emptiness |
| Awwwards generally | Scroll-driven storytelling, kinetic type, spatial hierarchy |

### When Writing Design Briefs
- Lead with the feeling, then the structure
- Name exact references (don't say "minimal" — say "Ad Reform minimal")
- Specify: layout system, type scale, motion intent, color philosophy
- One scroll experience = one emotional arc

### When Writing Prompts for AI Tools (v0, Lovable, Bolt)
- Be specific about layout: grid columns, spacing scale, component hierarchy
- Reference design tokens explicitly if a system exists
- State what NOT to do as clearly as what to do
- If iterating: say what to keep, what to change. Don't let the tool reimagine the whole thing.

### When Writing Code or Briefing a Dev
- Establish the design system first (type, color, spacing, motion) — then build components
- No inline style sprawl. Tokens or CSS variables.
- Motion should feel inevitable, not decorative
- Default stack preference: Next.js, Tailwind, Framer Motion unless I say otherwise

### Hard Rules for Any Website Work
- Do not change design context mid-session. If I've set a visual direction, stay in it.
- Don't add components I didn't ask for
- Whitespace is intentional — don't fill it
- Restraint > decoration, always

---

## What I Don't Want

- Long explanations before the actual output
- Over-engineering simple requests
- Changing the design direction I've already set
- Safe, generic suggestions that ignore the reference points I've given
- "You might want to consider…" — just tell me
- Bullet walls where prose works better
- Unsolicited redesigns

---

## Custom Commands

| Command | What it does |
|---|---|
| `/prd` | Draft a PRD — Problem → Context → Goals → Non-goals → Stories → Open Qs |
| `/brief` | Write a design or dev brief with aesthetic references baked in |
| `/competitor` | Run a competitor analysis in table + narrative format |
| `/okr` | Draft OKRs with leading indicators and sanity checks |
| `/prompt` | Write an AI tool prompt (v0/Lovable/Bolt) for a specific UI |

---

## Session Hygiene

- Use `/compact` before large new tasks
- Use `/clear` when switching between PM work and website work — context bleeds
- For long sessions, ask Claude to write a `progress.md` so you can resume cleanly

---

*Last updated: April 2026*