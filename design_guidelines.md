# Logistics Project Management - Design Guidelines

## Design Approach: Material Design 3 System

Following the user's explicit requirement for Google Apps/Material Design guidelines, this application adopts **Material Design 3 (Material You)** principles, emphasizing clarity, efficiency, and familiarity for logistics professionals.

---

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Primary: 25 70% 47% (Material Blue - trust, professionalism)
- Primary Container: 25 90% 90% (light blue backgrounds)
- On Primary: 0 0% 100% (white text on primary)
- Surface: 0 0% 98% (main background)
- Surface Variant: 220 20% 95% (cards, elevated surfaces)
- Outline: 220 15% 70% (borders, dividers)
- On Surface: 220 10% 15% (primary text)
- On Surface Variant: 220 10% 45% (secondary text)

**Dark Mode:**
- Primary: 200 85% 65% (brighter blue for contrast)
- Primary Container: 200 70% 25% (dark blue backgrounds)
- On Primary: 220 15% 10% (dark text on primary)
- Surface: 220 15% 10% (main background)
- Surface Variant: 220 15% 15% (cards, elevated surfaces)
- Outline: 220 10% 35% (borders, dividers)
- On Surface: 220 5% 95% (primary text)
- On Surface Variant: 220 5% 70% (secondary text)

**Status Colors:**
- Success: 140 60% 45% (green for completed)
- Warning: 40 85% 55% (amber for pending)
- Error: 0 70% 50% (red for issues)
- Info: 210 75% 55% (blue for active)

### B. Typography

**Font Stack:**
- Primary: 'Roboto', system-ui, -apple-system, sans-serif
- Monospace: 'Roboto Mono', monospace (for IDs, codes)

**Type Scale:**
- Display Large: text-5xl font-normal (48px) - Page titles
- Headline Large: text-3xl font-normal (32px) - Section headers
- Headline Medium: text-2xl font-normal (24px) - Card headers
- Title Large: text-xl font-medium (20px) - List items
- Body Large: text-base font-normal (16px) - Primary content
- Body Medium: text-sm font-normal (14px) - Secondary content
- Label Large: text-sm font-medium (14px) - Buttons
- Label Small: text-xs font-medium (12px) - Captions

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16
- Micro spacing: p-2, gap-2 (8px) - tight element groups
- Component spacing: p-4, gap-4 (16px) - within components
- Section spacing: p-6, gap-6 (24px) - between related sections
- Layout spacing: p-8, gap-8 (32px) - major sections
- Page margins: p-12 to p-16 (48-64px) - desktop containers

**Grid System:**
- Container: max-w-7xl mx-auto px-4 md:px-6 lg:px-8
- Forms: max-w-2xl (optimal form width)
- Dashboard: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 (project cards)
- Responsive breakpoints: sm:640px, md:768px, lg:1024px, xl:1280px

### D. Component Library

**Authentication (Login Screen):**
- Centered card (max-w-md) with elevated surface
- Logo/brand at top (h-12)
- Material Design text fields with floating labels
- Filled button style for primary "Login" action
- Outlined button for "Sign in with Google" (with Google logo)
- Subtle divider with "or" text between options
- Helper text for errors (text-sm text-error)
- "Forgot password?" link (text-primary underline-offset-4)

**Navigation:**
- Top app bar (h-16) with elevation shadow
- Application logo/title (left-aligned)
- User profile menu (right-aligned) with avatar
- Navigation drawer for future expansion (hidden on mobile, visible on lg:)
- Breadcrumb navigation for project detail views

**Forms (Project Creation):**
- Card-based layout with px-6 py-8 spacing
- Material outlined text fields (border, focus:ring-2)
- Floating labels that move on focus/input
- Textarea for description (min-h-32)
- Helper text below fields (text-sm text-on-surface-variant)
- Error states with red outline and error text
- Form actions: Text button (Cancel) + Filled button (Save)
- Spacing between fields: space-y-6

**Project List (Overview):**
- Data table with zebra striping (alternate row colors)
- Table headers: sticky top-0 with surface-variant background
- Columns: Project Name | Created Date | Status | Actions
- Status badges: rounded-full px-3 py-1 with status colors
- Action buttons: IconButton for edit/view (24px icons)
- Empty state: centered illustration + "No projects yet" message
- Pagination: Material pagination component at bottom
- Filter chips above table (filled style, dismissible)

**Project Cards (Alternative View):**
- Card elevation: shadow-md hover:shadow-lg transition
- Card padding: p-6
- Card header: Title (text-xl font-medium) + Status badge
- Card body: Description preview (text-sm line-clamp-2)
- Card footer: Date + Actions (separated by border-t)
- Grid: gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3

**Buttons:**
- Filled (primary): bg-primary text-on-primary hover:shadow-md
- Outlined: border-2 border-outline bg-transparent
- Text: text-primary no background
- Icon buttons: p-2 rounded-full hover:bg-surface-variant
- Consistent height: h-10 for standard buttons
- Ripple effect on interaction (Material Design standard)

**Form Fields:**
- Outlined variant (default): border rounded focus:border-primary
- Filled variant (login): bg-surface-variant rounded-t border-b-2
- Input height: h-12 for text fields, h-14 for select
- Label: absolute positioning, transforms on focus
- Focus ring: ring-2 ring-primary ring-offset-0

**Dialogs/Modals:**
- Center-aligned with max-w-lg
- Elevated surface with shadow-xl
- Title: text-2xl font-normal mb-4
- Content: p-6 with divider borders
- Actions: flex justify-end gap-2 p-4 border-t

**Data Display:**
- Chips for tags/filters: rounded-full px-3 py-1 text-sm
- Dividers: border-outline (subtle separation)
- List items: hover:bg-surface-variant cursor-pointer
- Info cards: border-l-4 border-primary pl-4 (highlight important data)

### E. Elevation & Shadows

Following Material Design elevation system:
- Level 1 (Cards): shadow-sm
- Level 2 (App bar): shadow-md
- Level 3 (Dialogs): shadow-lg
- Level 4 (Menus): shadow-xl
- Hover states: Increase elevation by one level

### F. Interaction Patterns

**No elaborate animations** - maintain productivity focus:
- Transitions: transition-all duration-200 (subtle, quick)
- Hover states: opacity, shadow, or background changes only
- Focus indicators: ring-2 ring-primary (accessibility)
- Loading states: Material circular progress indicator
- Micro-interactions: ripple effects on buttons (native Material)

---

## Screen-Specific Guidelines

### Login Screen
- Centered card on full-screen background (bg-surface)
- Optional subtle gradient overlay (from-primary/5 to-primary/10)
- Card: max-w-md shadow-lg rounded-lg
- Brand logo: h-12 mb-8 (centered above form)
- Form fields: space-y-6
- Remember me checkbox (Material Design style)
- Footer: text-sm text-on-surface-variant (links to terms/privacy)

### Project Creation Screen
- Contained within max-w-3xl centered container
- Breadcrumb: Dashboard > Create Project
- Main card: bg-surface-variant shadow-md rounded-lg p-8
- Two-column layout on desktop (lg:grid-cols-2) for related fields
- Rich text editor for description (Material Design styled)
- Parameter inputs with helper text explaining each field
- Sticky footer with Cancel + Save buttons

### Projects Overview Screen
- Page header: flex justify-between items-center mb-8
  - Title (text-3xl) on left
  - Actions (+ New Project button) on right
- Filter bar: flex gap-2 with filter chips mb-6
- View toggle: List/Grid (IconButtons) in top-right
- Table view: Full-width data table with hover states
- Card view: Responsive grid with smooth hover elevation
- Search bar: Filled variant with search icon (sticky on scroll)

---

## Responsive Behavior

- **Mobile (<768px):** Single column, simplified navigation drawer, full-width forms
- **Tablet (768-1024px):** Two-column grids, visible navigation elements
- **Desktop (>1024px):** Three-column grids, persistent navigation drawer, optimized spacing

---

## Accessibility Standards

- WCAG 2.1 AA compliance
- Minimum contrast ratio 4.5:1 for body text, 3:1 for large text
- Keyboard navigation: visible focus indicators (ring-2)
- Screen reader support: proper ARIA labels on all interactive elements
- Form validation: visible error messages with aria-invalid
- Touch targets: minimum 44x44px (h-11 w-11 for icon buttons)