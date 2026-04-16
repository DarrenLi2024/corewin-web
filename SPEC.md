# Corewin Website Redesign — Design Specification

## 1. Concept & Vision

**"Precision Engineered"** — Corewin作为半导体通路商，连接全球顶尖芯片制造商与中国制造。本次网站升级以「精密」为核心视觉隐喻：如同芯片的精密线路布局，构建一个干净、严谨、但富有科技生命力的数字门面。

设计语言：高端制造业的精密感 + 科技行业的未来感 + 国际化的专业气质。整体氛围沉稳但不沉闷，现代但不浮夸。

---

## 2. Design Language

### Aesthetic Direction
**参考风格： Nordic-Tech Industrial** — 北欧式的简洁克制 + 半导体行业的技术精密感。大量留白，内容密度低，但每一个元素都精准到位。

### Color Palette
```
--color-bg-primary:      #0B0E14    /* 深空黑 - 主背景 */
--color-bg-secondary:   #131820    /* 深灰蓝 - 次级背景 */
--color-bg-card:        #1A2130    /* 卡片背景 */
--color-surface:        #212938    /* 表面元素 */
--color-border:         #2A3444    /* 边框线 */
--color-text-primary:   #F1F5F9    /* 主文字 */
--color-text-secondary: #94A3B8    /* 次级文字 */
--color-text-muted:     #64748B    /* 弱化文字 */
--color-accent:         #00D4AA    /* 科技青 - 主强调色 */
--color-accent-glow:    #00D4AA33  /* 强调色辉光 */
--color-blue:           #3B82F6    /* 蓝色辅助 */
--color-warning:        #F59E0B    /* 警告/强调色 */
```

### Typography
- **Headings**: `Inter` (700, 600) — 几何感强，现代无衬线
- **Body**: `Inter` (400, 500) — 高可读性
- **CJK Fallback**: `Noto Sans SC`, `PingFang SC`, sans-serif
- **Monospace** (for tech elements): `JetBrains Mono`, monospace

### Spatial System
- Base unit: 8px
- Section padding: 120px vertical (desktop), 64px (mobile)
- Card padding: 32px
- Component gap: 24px
- Border radius: 8px (cards), 4px (buttons), 2px (inputs)

### Motion Philosophy
- **Entrance**: Elements fade in + translate up (opacity 0→1, translateY 20px→0), 600ms ease-out, staggered 80ms
- **Hover**: Scale 1.02, box-shadow lift, 200ms ease
- **Accent lines**: Subtle drawing animation on scroll-into-view
- **No gratuitous animation** — every motion serves hierarchy or feedback

### Visual Assets
- **Icons**: Lucide Icons (line style, 1.5px stroke)
- **Imagery**: Abstract chip/mircuit imagery, or no images (pure typographic/geometric)
- **Decorative**: Subtle grid pattern overlay, circuit-trace inspired dividers, geometric accent shapes

---

## 3. Layout & Structure

### Page Flow (Single Page, Section-based)
```
[Navbar] — Fixed, transparent → solid on scroll
[Hero] — Full viewport, brand statement + subtle animated bg
[Brands] — Horizontal scrolling logos (international + domestic)
[Products] — Card grid showcasing product categories
[Applications] — Icon + label grid of industries served
[About] — Split layout: text left, key stats right
[Technical Resources] — Datasheet/document links
[Contact] — Minimal contact form + info
[Footer] — Links, copyright, social
```

### Responsive Strategy
- Desktop-first (1280px design width)
- Breakpoints: 1024px (tablet), 768px (large mobile), 480px (mobile)
- Hero text scales: clamp() for fluid typography
- Grid collapses: 3-col → 2-col → 1-col

---

## 4. Features & Interactions

### Navbar
- Fixed position, glass-morphism effect (backdrop-filter: blur)
- Logo left, nav links center/right
- Hamburger menu on mobile (slide-in drawer)
- Active section highlighting on scroll

### Hero Section
- Full-height (100vh)
- Large headline + subheadline + CTA button
- Subtle animated background (gradient shift or grid pulse)
- Scroll indicator at bottom

### Brand Logos
- Horizontal auto-scroll carousel (CSS animation, pauseable on hover)
- Grayscale → color on hover
- 2 rows: International Brands (ST, TI, ON, MPS) | Domestic Brands (ROHM, MsemiTek, etc.)

### Product Cards
- Grid layout, hover lift effect
- Icon + category name + brief description
- Subtle border glow on hover

### Application Industry Pills
- Small icon + label, grid of pills
- Subtle scale on hover

### Contact Form
- Minimal fields: Name, Email, Company, Message
- Client-side validation
- Submit → success state (no backend, demo mode)

---

## 5. Component Inventory

### Button
- Primary: accent color bg, dark text, hover glow
- Secondary: transparent, accent border, hover fill
- Ghost: text only, underline on hover

### Card
- Dark bg with subtle border
- Hover: border brightens, subtle lift shadow
- States: default, hover, focus

### Nav Link
- Default: muted text
- Hover: primary text + accent underline
- Active: accent text

### Input
- Dark bg, subtle border
- Focus: accent border glow
- Error: red border + message

### Logo
- SVG preferred, monochrome
- Grayscale default, color on parent hover

---

## 6. Technical Approach

- **Stack**: Pure HTML5 + CSS3 + Vanilla JavaScript
- **CSS Architecture**: Custom properties for theming, BEM-lite naming
- **No build step**: Direct browser execution
- **Performance**: Lazy animation (IntersectionObserver), minimal DOM
- **Browser Support**: Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
