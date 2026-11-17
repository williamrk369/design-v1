# DESIGN.md

These are the rules for every piece of UI in this repo. I read this file before any UI work and check the result against it before I call the work done. If a rule has to bend, I change this file first and say so. I don't make silent exceptions.

---

## 0. Audit record

**Audited on 2026-11-17, branch `claude/keen-ptolemy-3op8pa`.**

| Looked for | Found |
|---|---|
| `package.json` | **Missing.** No dependencies, no framework, no scripts. |
| `tailwind.config.*` | **Missing.** |
| `globals.css` (or any CSS) | **Missing.** |
| Existing components | **None.** The repo has no commits and no files. The remote `origin` has no branches. |

Because nothing existed to derive from, I chose every value below. Nothing was inherited. Three of them are assumptions that need your confirmation:

1. **Stack is Next.js (App Router), Tailwind CSS v4 and shadcn/ui.** Tailwind v4 is configured in CSS (`@theme`), so there will be **no** `tailwind.config.ts`. Tokens live in `app/globals.css`.
2. **Path alias `@/*` points to the project root.** This is shadcn's default, so primitives resolve to `@/components/ui/*`.
3. **Light mode comes first and dark mode is fully specified.** Both themes use the same two hues.

**Update 2026-11-17 (dashboard build):** the stack assumption is now real: Next.js 16.4, React 19.3, Tailwind 4.3. `app/globals.css` implements §2 and also *wipes* Tailwind's default type, weight, shadow and radius scales (`--text-*: initial` etc.), so off-system classes like `text-xl`, `font-semibold`, `shadow-md` and `rounded-xl` do not compile to anything. The allowed classes are `text-meta|body|head-sm|head|hero-sm|hero`, `font-extralight|normal|extrabold`, `shadow-float`, `rounded-control|full`.

**Re-audit rule:** before each UI task I re-read `package.json`, `app/globals.css` and `components/`, and I update §5 when the code no longer matches this file.

---

## 1. Fonts

| Role | Family | Weights loaded | Use |
|---|---|---|---|
| **Display** | **Fraunces** (variable serif, `opsz` axis on) | 200, 800 | Hero and section headings only. Never below 48px. |
| **Body** | **Manrope** (variable sans) | 200, 400, 800 | Running text, UI labels, buttons, form controls. |
| **Mono** | **JetBrains Mono** | 400, 800 | Code, numbers in tables, metadata labels (uppercase, `tracking-[0.08em]`). |

Load them with `next/font/google` in `app/layout.tsx` and expose them as CSS variables:

```ts
// app/layout.tsx
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
// Variable fonts: no `weight`. Loader variables must NOT share a name with the
// Tailwind theme variables (--font-display etc.), or the theme value references itself.
const fraunces  = Fraunces({ subsets: ["latin"], axes: ["opsz"], variable: "--font-fraunces" });
const manrope   = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });
```

### NEVER use these fonts

Not as the primary font, not as a fallback that ships first, not in a one-off `style={{}}`:

- **Inter**
- **Roboto**
- **Open Sans**
- **Arial**
- **system-ui** (also `-apple-system`, `BlinkMacSystemFont`, `"Segoe UI"`, `Helvetica`)

Tailwind's default `font-sans` stack starts with `ui-sans-serif, system-ui`. It is **overridden** in `@theme` (§2) so that it can never leak through. Fallbacks after the brand font are limited to the generic keywords `serif`, `sans-serif` and `monospace`.

---

## 2. Color

There are exactly **two hues**:

- **Pine** is the dominant hue (deep green).
- **Signal** is the accent (hot vermilion).

Every neutral is a tint or shade of Pine, never a third hue. Nothing else is allowed, including blue for links, purple for "AI" or a rainbow of status colors. Status colors are covered by the rule below.

```css
/* app/globals.css */
@import "tailwindcss";

:root {
  /* brand: the only two hues */
  --pine:        #123B2E;   /* dominant */
  --signal:      #FF5B1F;   /* accent */

  /* neutrals derived from pine */
  --paper:       #F4F0E6;   /* page background, warm off-white (never #FFF) */
  --ink:         #0C1A15;   /* primary text */
  --ink-muted:   #5B6B63;   /* secondary text: 4.95:1 on paper */
  --rule:        color-mix(in oklab, var(--ink) 16%, transparent); /* 1px borders */

  /* semantic roles (components read these, never the raw names above) */
  --background:  var(--paper);
  --foreground:  var(--ink);
  --primary:     var(--pine);
  --primary-foreground: var(--paper);
  --accent:      var(--signal);
  --accent-foreground:  var(--ink);
  --muted:       color-mix(in oklab, var(--pine) 6%, var(--paper));
  --muted-foreground: var(--ink-muted);
  --border:      var(--rule);
  --input:       var(--rule);
  --ring:        var(--signal);
  --destructive: var(--signal);  /* errors use the accent and add an icon and text, not a new red */

  /* shadcn surface tokens: kept flat */
  --card: var(--background);       --card-foreground: var(--foreground);
  --popover: var(--background);    --popover-foreground: var(--foreground);
  --secondary: var(--muted);       --secondary-foreground: var(--foreground);

  --radius: 0.25rem;               /* 4px on controls; containers use 0 */
}

.dark {   /* put .dark on <html>: the role tokens above resolve against these */
  --paper:       #0A1F18;          /* the page becomes a deep pine */
  --ink:         #E8E2D3;
  --ink-muted:   #9AA89F;
  --primary:     var(--signal);    /* on dark, the accent carries the primary actions */
  --primary-foreground: #0C1A15;
  --accent:      var(--signal);
  --accent-foreground: #0C1A15;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-destructive: var(--destructive);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);

  --font-display: var(--font-fraunces), serif;
  --font-sans:    var(--font-manrope), sans-serif;  /* overrides Tailwind's system-ui stack */
  --font-mono:    var(--font-jetbrains), monospace;

  --radius-sm: var(--radius);
  --radius-md: var(--radius);
  --radius-lg: var(--radius);
}
```

### Measured contrast (WCAG)

| Pair | Ratio | Allowed for |
|---|---|---|
| ink on paper | 15.7:1 | everything |
| pine on paper | 10.9:1 | everything |
| paper on pine | 10.9:1 | everything |
| ink-muted on paper | 4.95:1 | body text, minimum |
| ink on signal | 5.8:1 | button labels, badges |
| signal on pine | 4.0:1 | **large text (≥24px) and graphics only** |
| signal on paper | 2.7:1 | **never for text.** Only fills, rules and focus rings |

### Color rules

- Use **semantic tokens only** in components (`bg-primary`, `text-muted-foreground`). Never write a raw hex value or a Tailwind palette class (`bg-zinc-100`, `text-indigo-600`) in a component.
- **Signal is scarce.** Use at most **one** Signal element per viewport, normally the primary CTA or the one thing that changed.
- **BANNED: purple, violet or indigo gradients on white,** in any form. That includes `from-purple-*`, `from-indigo-*`, `via-violet-*`, `bg-gradient-to-*` with those hues, and "AI glow" blurs. Gradients in general are off by default. A gradient is allowed only from Pine to a darker Pine, as a full-bleed block background.
- Pure white `#FFFFFF` is not a background. Paper is.

---

## 3. Spacing: an 8px rhythm

Every margin, padding, gap, offset and fixed size is a **multiple of 8px**.

| Token | px | Tailwind class |
|---|---|---|
| 1u | 8 | `2` |
| 2u | 16 | `4` |
| 3u | 24 | `6` |
| 4u | 32 | `8` |
| 6u | 48 | `12` |
| 8u | 64 | `16` |
| 12u | 96 | `24` |
| 16u | 128 | `32` |

- **Banned classes:** `*-1`, `*-3`, `*-5`, `*-7`, `*-9`, `*-11`, any `*-0.5` / `*-1.5` / `*-2.5` / `*-3.5`, and arbitrary values that are not multiples of 8 (`p-[13px]`).
- **One exception:** 4px (`*-1`) is allowed *inside* controls 32px tall or smaller, such as the gap between an icon and its label or a badge's vertical padding. It is never used between blocks.
- Line heights land on the grid: body `16px / 24px`, H `48px / 48px`, hero `144px / 128px`.
- Control heights: 32 (sm), 48 (default), 64 (lg).
- Vertical space between page sections: 96 or 128. Nothing in between.

---

## 4. Type scale: extremes only

There are **three sizes for hierarchy, 3× apart,** plus one size for metadata. No intermediate steps.

| Level | Size / line height | Family | Weight | Tailwind |
|---|---|---|---|---|
| **Hero** | 144 / 128 | Display | **200** | `font-display text-[144px] leading-[128px] font-extralight tracking-[-0.04em]` |
| **Heading** | 48 / 48 | Display | **800** *or* **200** | `font-display text-[48px] leading-[48px] font-extrabold` |
| **Body** | 16 / 24 | Body | 400 (prose), **800** (emphasis, labels, buttons) | `text-base leading-6` |
| **Meta** | 12 / 16 | Mono, uppercase | 400 / 800 | `font-mono text-xs uppercase tracking-[0.08em]` |

- **Size jumps are 3×:** 16 → 48 → 144. A 1.5× step (16 → 24 → 36) is **not allowed**. Meta (12px) is exempt because it changes family (mono) and case. It does not occupy a step on the scale.
- **Weights come in pairs of 200 and 800.** 300, 500, 600 and 700 are banned (`font-light`, `font-medium`, `font-semibold`, `font-bold`). 400 is reserved for long-form body text only, for readability.
- When two levels sit next to each other, they contrast in **weight as well as size**. A light 144 hero sits over an 800 label. A heavy 48 heading sits over 400 prose.
- **Mobile (<640px):** the hero drops to 96/96 and headings to 32/32. That keeps a **2× minimum**. The ratio never falls below 2×, and I accept this compromise only below 640px.
- Prose measure: max `65ch`. Display lines: max `12ch` for the hero.

---

## 5. Components: reuse before writing

### 5a. This repo's own components

**None exist yet.** When one is added, it gets a row here in the same commit:

| Component | Import path | Purpose | Notes |
|---|---|---|---|
| `Shell` | `@/components/dashboard/shell` | Page frame: rail + top bar over a muted canvas | Pass `firstName` etc.; omit them for the loading state |
| `Sidebar` | `@/components/dashboard/sidebar` | Pine icon rail, ≥1024px | Items come from `nav-items.ts` |
| `MobileNav` | `@/components/dashboard/mobile-nav` | Sheet with the same items, <1024px | Client component |
| `Topbar` | `@/components/dashboard/topbar` | Greeting, view switch, search, notifications, date | Shows skeletons when `firstName` is missing |
| `KpiStrip` | `@/components/dashboard/kpi-strip` | Three figures in **one** card | The answer to "three cards in a row" |
| `HoursChart` | `@/components/dashboard/hours-chart` | Block-stack bars, 1 block = 2 h, dashed week-before line | Has empty and error states |
| `EntriesTable` | `@/components/dashboard/entries-table` | 48px table rows ≥768px, list items below | Long text: one line + `title`, three lines on mobile |
| `BudgetAlert`, `BillableRatio`, `Deadlines` | `@/components/dashboard/rail` | Right-rail widgets | `BudgetAlert` is the screen's one Signal element |
| `WidgetError`, `EmptyNote`, `Meta` | `@/components/dashboard/states` | Error, empty and 12px mono label patterns | Reuse for every new widget |
| `DashboardSkeleton` | `@/components/dashboard/dashboard-skeleton` | Loading layout, block for block | Used by `app/loading.tsx` and `?state=loading` |

The rule: if a component in this table covers ≥80% of the need, **extend it with a prop or variant**. Don't fork it or hand-roll a near-duplicate.

### 5b. shadcn/ui primitives

Install each one on demand with `npx shadcn@latest add <name>`. **Installed so far:** button (+ `surface` variant), input, card, table, skeleton, badge, avatar, sheet. These were written from shadcn's source by hand because `ui.shadcn.com` is blocked from the cloud sandbox; run the CLI locally to diff them against upstream. Once installed, it is imported from the path shown and never re-implemented by hand. Restyle through the tokens in §2, not by editing classes in each component.

| Primitive | Import |
|---|---|
| Button | `import { Button } from "@/components/ui/button"` |
| Input | `import { Input } from "@/components/ui/input"` |
| Textarea | `import { Textarea } from "@/components/ui/textarea"` |
| Label | `import { Label } from "@/components/ui/label"` |
| Form | `import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"` |
| Select | `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"` |
| Checkbox | `import { Checkbox } from "@/components/ui/checkbox"` |
| Radio Group | `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"` |
| Switch | `import { Switch } from "@/components/ui/switch"` |
| Dialog | `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"` |
| Sheet | `import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"` |
| Popover | `import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"` |
| Dropdown Menu | `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"` |
| Tooltip | `import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"` |
| Command | `import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command"` |
| Tabs | `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"` |
| Accordion | `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"` |
| Navigation Menu | `import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu"` |
| Table | `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"` |
| Card | `import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"` |
| Badge | `import { Badge } from "@/components/ui/badge"` |
| Avatar | `import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"` |
| Separator | `import { Separator } from "@/components/ui/separator"` |
| Skeleton | `import { Skeleton } from "@/components/ui/skeleton"` |
| Scroll Area | `import { ScrollArea } from "@/components/ui/scroll-area"` |
| Toast (Sonner) | `import { Toaster } from "@/components/ui/sonner"` and `import { toast } from "sonner"` |
| `cn` helper | `import { cn } from "@/lib/utils"` |

If a primitive isn't installed yet, I install it. I do **not** write a lookalike `<button className=…>` or a hand-made modal.

---

## 6. Forbidden patterns

Each pattern below is listed with how I'd catch it in a diff.

| Forbidden | Looks like in code | Do this instead |
|---|---|---|
| **Three rounded cards in a row** | `grid-cols-3` (or `md:grid-cols-3`) whose children are `<Card>` or `rounded-* border p-*` boxes | An asymmetric split (e.g. 7/5 columns), a numbered list with large display numerals, or a single wide row separated by rules (`divide-x divide-border`) |
| **Centered-everything heroes** | A hero wrapper with `text-center` and `items-center` / `mx-auto` on the headline, subcopy and CTAs | Left-aligned, anchored to a 12-column grid. The headline breaks the grid edge and the CTA sits on the baseline. Centering is allowed only for a single short line, such as an empty state |
| **0.1-opacity drop shadows on everything** | `shadow`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, or `shadow-[0_…_rgba(0,0,0,0.1)]` on cards and sections | **Surfaces are flat.** Separate them with a 1px `border-border` rule or a background change (`bg-muted`). Only *floating* layers (Dialog, Popover, Dropdown, Sheet) get elevation: one hard shadow, `shadow-[8px_8px_0_var(--ink)]` |
| Purple, violet or indigo gradient on white | `bg-gradient-to-* from-purple-*`, `from-indigo-*`, `via-violet-*` | Solid Pine block, or paper with a Signal rule |
| Banned fonts | `font-[Inter]`, `Roboto`, `Open_Sans`, `Arial`, `system-ui` anywhere | The §1 families only |
| Off-grid spacing | `p-3`, `gap-5`, `mt-[10px]` | §3 tokens |
| Middle weights / 1.5× sizes | `font-medium`, `font-semibold`, `text-xl`, `text-2xl`, `text-3xl` | §4 levels only |
| Pill-everything | `rounded-full` on buttons, cards or inputs | `rounded-[var(--radius)]` on controls, `rounded-none` on containers. `rounded-full` is allowed only on Avatar and status dots |
| Emoji as icons | 🚀 ✨ in headings or buttons | `lucide-react` icons at 16 or 24px, `strokeWidth={1.5}` |

---

## 7. Pre-flight checklist (run before every UI hand-off)

- [ ] Re-read `package.json`, `app/globals.css` and `components/` and update §0 and §5a if they've changed.
- [ ] Every interactive element uses an import from §5. No hand-rolled primitives.
- [ ] `grep` the diff for: `Inter|Roboto|Open.Sans|Arial|system-ui`, `purple|violet|indigo`, `shadow(-sm|-md|-lg|-xl)?\b`, `font-(light|medium|semibold|bold)\b`, `text-(lg|xl|2xl|3xl|4xl)\b`, `-(1|3|5|7|9|11)\b|\.5\b` in spacing classes, `#[0-9a-fA-F]{3,6}` inside `components/`.
- [ ] No `grid-cols-3` of cards. The hero is not centered.
- [ ] At most one Signal element per viewport. No Signal-colored text on paper.
- [ ] Check at 375px and 1440px widths, in light and dark.
