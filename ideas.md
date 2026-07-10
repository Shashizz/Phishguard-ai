# PhishGuard AI — Design Brief

## Brand Essence
An enterprise-grade AI cybersecurity platform that detects and neutralizes phishing emails with surgical precision. Built for security teams, CISOs, and IT professionals who demand real-time intelligence over reactive defense.

**Personality:** Vigilant, Intelligent, Uncompromising

## Brand Voice
- **Headlines:** Direct, authoritative, action-oriented. "Threats Detected in 0.3 Seconds." "Your Inbox, Fortified."
- **CTAs:** Urgent but professional. "Deploy Now" / "Start Protecting" / "Analyze Threat"
- **Microcopy:** Technical precision with zero fluff. No "Welcome to our website" or "Get started today."

## Wordmark & Logo
A bold geometric shield with integrated circuit patterns, glowing in electric blue-to-violet gradient. The mark conveys protection, intelligence, and modernity. Used as favicon and header icon.

## Signature Brand Color
**Electric Indigo** — `#6C5CE7` transitioning to **Cyber Cyan** — `#00D2FF`. This blue-violet spectrum is the brand's ownable color, appearing in all accent elements, borders, and glow effects.

---

## Design Philosophy Chosen: "Cyber-Command"

### Design Movement
Dark Enterprise Cybersecurity — inspired by CrowdStrike, Palo Alto Networks, and Darktrace. Combines military-grade data density with Apple-level polish.

### Core Principles
1. **Data Density with Clarity** — SOC dashboards must show massive information without cognitive overload. Hierarchical layering, not crowding.
2. **Neon Precision** — Blue/purple neon accents serve as status indicators, not decoration. Every glow means something.
3. **Glass Architecture** — Frosted glass panels create depth hierarchy without adding visual noise. Content floats on a dark void.
4. **Motion as Intelligence** — Animations feel like systems coming online, not decorative flourishes. Counters animate up, threat feeds pulse, maps light up.

### Color Philosophy
- **Background:** Deep void black `#0A0A0F` to dark navy `#0D1117` — the canvas of a command center
- **Primary Accent:** Electric Indigo `#6C5CE7` — the brand's signature, used for primary CTAs and key highlights
- **Secondary Accent:** Cyber Cyan `#00D2FF` — used for status indicators, active states, and data highlights
- **Threat Red:** `#FF3B3B` — reserved exclusively for phishing/threat indicators
- **Safe Green:** `#00E676` — reserved for safe/verified indicators
- **Glass White:** `rgba(255,255,255,0.05)` to `rgba(255,255,255,0.08)` — glassmorphism surfaces
- **Text:** Pure white `#FFFFFF` for primary, cool gray `#8B92A8` for secondary

### Layout Paradigm
- **Landing page:** Full-width hero with asymmetric content placement. Content lives on the left, visual elements on the right. Sections alternate between full-bleed and contained layouts.
- **Dashboard:** Sidebar navigation (collapsible) + main content area with a grid of glass cards. Top bar for global actions (search, notifications, profile).
- **Scanner:** Two-panel layout — input on left, results on right. Mobile stacks vertically.
- **Analytics:** Full-width chart containers with sidebar filters.

### Signature Elements
1. **Neon Border Glow** — Active cards and selected states feature a subtle `box-shadow` with the brand's electric indigo, creating a "system alert" feel
2. **Glass Panels** — All cards, modals, and overlays use `backdrop-filter: blur(16px)` with semi-transparent backgrounds
3. **Pulse Indicators** — Live data points (threat counts, active scans) pulse with a subtle glow animation

### Interaction Philosophy
- Hover states reveal additional data layers (cards expand, show details)
- Click-to-analyze feels immediate and decisive — no loading spinners, skeleton loaders instead
- Keyboard-first: `Cmd+K` opens command palette, `Esc` closes everything

### Animation Guidelines
- Page transitions: 300ms ease-out crossfade between routes
- Card entrances: staggered 50ms delay per card, slide-up 20px with opacity 0→1
- Counter animations: counting up from 0 on scroll-into-view
- Neon pulse: 2s infinite subtle glow on active indicators
- Smooth scroll between landing sections: 600ms ease-in-out
- Hover lifts: cards translate Y -4px on hover with enhanced shadow

### Typography System
- **Display/Headlines:** `Space Grotesk` — geometric, authoritative, modern
- **Body/UI:** `Inter` — clean readability for dense data interfaces
- **Monospace:** `JetBrains Mono` — for data values, IP addresses, hashes
- **Hierarchy:** H1 (48-64px bold), H2 (32-40px semibold), H3 (24px medium), Body (16px regular), Caption (14px)

## Style Decisions

- The dark theme is permanent — this is a command center, not a marketing site that toggles themes
- All interactive elements use the electric indigo to cyber cyan gradient for primary actions
- Glassmorphism cards use `backdrop-filter: blur(16px)` with `border: 1px solid rgba(255,255,255,0.08)`
- Landing page uses full-bleed dark sections with contained content areas
- Dashboard uses a persistent left sidebar with collapsible navigation
- Charts use recharts with custom dark-themed styling matching the brand palette
- Loading states use skeleton loaders matching the glass card aesthetic
- Toast notifications use sonner with dark theme styling
- HUD-style panel framing: all cards use `hud-panel` class with indigo left accent border, gradient top line, and darker background than generic glass
- Threat-only red: `#FF3B3B` appears ONLY for phishing/threat indicators, never decorative
- Safe-only green: `#00E676` appears ONLY for verified/safe states
- Cyan/Indigo for intelligence: `#00D2FF` and `#6C5CE7` for charts, data highlights, and interactive elements
- Monospace data values: all operational numbers, IPs, domains, threat IDs use `font-mono` + `data-value` class
- Typography authority: H1 uses `font-display text-xl` (not 2xl), section headings are `text-[10px] uppercase tracking-wider font-mono`
- Operational copy: "Command Center" instead of "Dashboard", "Configuration" instead of "Settings", "Threat Intel" instead of "Threat Intelligence"
- Status dots: `status-dot` utility with live/alert variants for system status indicators
- Grid background motif: subtle 40px grid pattern on dashboard main content area for tactical feel
- Top accent lines: gradient indigo-to-cyan horizontal lines on sidebar and top bar for HUD chrome feel
