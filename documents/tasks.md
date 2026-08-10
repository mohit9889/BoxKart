# BoxKart — Production-Ready Frontend MVP Task Plan

## Purpose

Use this task list to take the existing BoxKart frontend and make it production-ready before backend implementation begins.

Reference:
https://box-kart.vercel.app/

The goal is **not to redesign BoxKart from scratch**. Preserve the current brand and visual direction while improving UX/UI, architecture, responsiveness, accessibility, performance, interactions, and production states.

---

# IMPORTANT WORKING RULES

## 1. Work One Task at a Time

Implement tasks in the exact order below.

After each task:

1. Inspect the current implementation.
2. Implement only the task.
3. Run the application.
4. Verify affected pages/components.
5. Check desktop and mobile behavior.
6. Fix regressions.
7. Run available lint/build/test checks.
8. Mark the task `[x]` only after verification.
9. Move to the next task.

Do not implement unrelated tasks together.

## 2. Do Not Redesign BoxKart

Do not replace the brand, color direction, overall visual language, or useful existing sections without a strong reason.

Refine the existing design.

## 3. Use JavaScript, Not TypeScript

Use `.js` and `.jsx`. Do not introduce TypeScript unless required by the existing project.

## 4. Use Framer Motion Carefully

Use Motion for meaningful interactions:

- page/section entrance
- Box Finder steps
- modals/drawers
- add-to-cart feedback
- quantity/price changes
- filters
- accordions
- toasts

Avoid excessive animation, bouncing, parallax, or animation on every element.

Respect reduced-motion preferences.

## 5. Preserve Existing Functionality

Before modifying a component, understand what it does and preserve existing routes, links, data, and working behavior.

## 6. Production Quality Over Demo Quality

Every important interactive feature must support:

- initial
- loading
- success
- empty
- error
- disabled
- submitting
- mobile
- keyboard interaction

Do not implement only the happy path.

## 7. Use Mock Data Until Backend Exists

Create a clean service/data layer such as:

```js
getProducts();
getProductBySlug();
getCategories();
getBundles();
getRecommendedProducts();
getOrders();
getQuotes();
```

UI components should consume service functions rather than raw mock arrays.

## 8. Separate Business Logic From UI

Use reusable modules such as:

```text
lib/
  pricing.js
  cart.js
  validation.js
  box-finder.js
  shipping.js
  analytics.js
```

Do not put complex business logic directly inside JSX.

## 9. Keep Server/Client Responsibilities Clean

Prefer Server Components for static content and SEO-friendly pages.

Use Client Components only where interaction requires them:

- search
- filters
- Box Finder
- cart
- quantity
- checkout
- interactive animations

Do not make the whole app a Client Component unnecessarily.

## 10. Accessibility Is Required

Consider:

- semantic HTML
- keyboard navigation
- visible focus states
- labels
- screen-reader behavior
- contrast
- touch targets
- modal/drawer focus management
- Escape-to-close
- reduced motion
- alt text

---

# STATUS

Use:

- `[ ]` Not started
- `[~]` In progress
- `[x]` Completed
- `[!]` Blocked

---

# PHASE 0 — PROJECT AUDIT

## TASK 001 — Audit Existing Frontend

Status: `[x]`

Inspect the complete current frontend:

- routes
- components
- styling
- dependencies
- state management
- mock data
- images
- fonts
- icons
- Motion usage
- API calls
- Server/Client Components
- SEO
- accessibility
- responsive behavior

Identify reusable components, duplicated patterns, and technical debt.

Acceptance:

- All routes identified.
- Major components identified.
- Shared components identified.
- Existing problems documented.
- No functionality broken.

## TASK 002 — Establish Baseline

Status: `[x]`

Record:

- build status
- lint status
- console errors
- broken links
- missing images
- responsive issues
- accessibility issues
- performance issues
- duplicated UI
- hardcoded data
- hardcoded business logic

---

# PHASE 1 — DESIGN SYSTEM

## TASK 003 — Design Tokens

Status: `[x]`

Centralize:

- colors
- typography
- font sizes/weights
- spacing
- radii
- shadows
- container widths
- breakpoints
- z-index
- Motion durations

Preserve the current BoxKart brand.

## TASK 004 — Typography

Status: `[x]`

Standardize:

- H1–H4
- body
- small text
- labels
- captions
- buttons
- navigation
- pricing

Ensure responsive typography and semantic heading hierarchy.

## TASK 005 — Core UI Components

Status: `[x]`

Create/reuse:

- Button
- IconButton
- Link
- Badge
- Chip
- Divider
- Tooltip
- Card
- Container
- Section
- Skeleton
- Spinner
- Alert
- Toast
- Modal
- Drawer
- EmptyState
- ErrorState

## TASK 006 — Form Components

Status: `[x]`

Create/reuse:

- Input
- NumberInput
- Select
- Checkbox
- Radio
- Textarea
- SearchInput
- PincodeInput
- DimensionInput
- QuantityInput

Support default, focus, hover, disabled, error, loading, and helper states.

---

# PHASE 2 — GLOBAL LAYOUT

## TASK 007 — Production Header

Status: `[x]`

Improve desktop header:

- navigation hierarchy
- search
- cart
- account
- active route
- sticky behavior where appropriate
- focus/hover states
- responsive behavior

## TASK 008 — Mobile Navigation

Status: `[x]`

Create a dedicated mobile navigation.

Include:

- menu
- search
- cart
- Products
- Custom Packaging
- Bulk Orders
- How It Works
- Box Finder

Implement focus management, Escape-to-close, and body scroll locking.

## TASK 009 — Announcement Bar

Status: `[x]`

Make responsive, accessible, stable, and free of layout shift.

Remove unsupported claims.

## TASK 010 — Footer

Status: `[x]`

Verify every footer link and make the footer responsive and consistent.

---

# PHASE 3 — HOMEPAGE

## TASK 011 — Hero

Status: `[x]`

Refine the existing hero.

Primary actions:

- Find My Box
- Browse Products

Improve hierarchy, copy, visuals, trust messaging, responsive layout, and subtle entrance Motion.

## TASK 012 — Use-Case Selector

Status: `[x]`

Improve the section that asks what the customer is shipping.

Support selected, hover, focus, routing/filtering, and mobile touch states.

## TASK 013 — Trust/Metrics

Status: `[x]`

Remove fake or unverified numbers, testimonials, ratings, or business claims.

Prefer truthful value statements such as:

- Bulk pricing
- Low MOQ
- Fast delivery
- Business-ready ordering

## TASK 014 — Homepage Box Finder

Status: `[x]`

Make Box Finder a flagship interaction.

Inputs:

- product category
- dimensions
- weight
- quantity

Add:

- progress indicator
- validation
- loading
- recommendation
- alternatives
- product CTA
- bulk quote CTA when no exact match

Use polished Motion transitions.

## TASK 015 — Shop by Category

Status: `[x]`

Improve cards, imagery/icons, hover/focus states, responsive layout, and routes.

## TASK 016 — Shop by Size

Status: `[x]`

Improve visual hierarchy, dimensions, responsive layout, links, and states.

## TASK 017 — Popular Products

Status: `[x]`

Use the reusable ProductCard.

Show:

- image
- name
- dimensions
- ply
- MOQ
- starting price
- bulk pricing
- CTA

## TASK 018 — Bulk Savings

Status: `[x]`

Present quantity tiers clearly and highlight best value.

## TASK 019 — Why BoxKart

Status: `[x]`

Focus on concrete customer benefits:

- low MOQ
- bulk pricing
- right-size recommendations
- reliable packaging
- easy reordering
- business-friendly ordering

## TASK 020 — Custom Packaging

Status: `[x]`

Clearly distinguish standard products from custom/printed packaging and explain that custom orders may have different MOQs.

## TASK 021 — Packaging Bundles

Status: `[x]`

Make bundles feel like real products with included items, quantities, price, savings where valid, and CTA.

## TASK 022 — How It Works

Status: `[x]`

Clearly show:

```text
Choose Packaging
↓
Select Quantity
↓
Confirm Delivery
↓
Receive Order
```

## TASK 023 — Reorder Section

Status: `[x]`

Do not show fake personal order history to logged-out users.

Use mock authenticated data only for development.

## TASK 024 — FAQ

Status: `[x]`

Improve accordion behavior, keyboard support, Motion, mobile spacing, and heading hierarchy.

## TASK 025 — Final CTA

Status: `[x]`

Use a focused final conversion area:

- Find My Box
- Browse Products
- Request Bulk Quote

Avoid excessive CTA choices.

---

# PHASE 4 — PRODUCT CATALOGUE

## TASK 026 — Product Listing Architecture

Status: `[x]`

Build reusable:

```text
PageHeader
Filters
Sort
ProductGrid
Pagination/LoadMore
```

Support loading, empty, error, and success states.

## TASK 027 — ProductCard

Status: `[x]`

Create production-quality variants:

- default
- compact
- featured
- recommendation
- horizontal

Prioritize:

1. image
2. name
3. dimensions
4. ply
5. MOQ
6. starting price
7. bulk pricing
8. CTA

## TASK 028 — Product Search

Status: `[x]`

Support search by:

- product name
- dimensions
- category
- use case
- ply

Add debouncing and useful suggestions.

## TASK 029 — Product Filters

Status: `[x]`

Support:

- category
- size
- dimensions
- ply
- price
- MOQ
- material
- use case

Desktop sidebar; mobile drawer/bottom sheet.

## TASK 030 — Product Sorting

Status: `[x]`

Implement:

- Recommended
- Price low → high
- Price high → low
- Popular
- Best value
- Lowest MOQ

## TASK 031 — URL-Synced Filters

Status: `[x]`

Persist filters/sorting in URL query parameters.

Example:

```text
/products?category=corrugated&ply=3&size=medium
```

Back/forward navigation must preserve state.

## TASK 032 — Listing Empty State

Status: `[x]`

Create:

> No packaging matches these filters.

Actions:

- Clear filters
- Browse all
- Try Box Finder

## TASK 033 — Listing Error State

Status: `[x]`

Create a friendly error state with Retry and alternative navigation.

## TASK 034 — Listing Loading State

Status: `[x]`

Use skeleton cards matching real ProductCard dimensions.

---

# PHASE 5 — PRODUCT DETAIL

## TASK 035 — Product Detail Layout

Status: `[x]`

Structure:

```text
Breadcrumb
Gallery
Product Information
Pricing
Quantity
Delivery
CTA
Specifications
Best For
FAQs
Related Products
```

## TASK 036 — Product Gallery

Status: `[x]`

Support:

- main image
- thumbnails
- mobile swipe
- image count
- zoom where appropriate
- loading
- missing-image fallback

Optimize images.

## TASK 037 — Product Specifications

Status: `[x]`

Show available:

- dimensions
- ply
- material
- GSM
- flute
- weight capacity
- box type
- MOQ

## TASK 038 — Best For

Status: `[x]`

Show suitable use cases.

## TASK 039 — Pricing Tiers

Status: `[x]`

Changing quantity updates:

- unit price
- subtotal
- savings
- total

Use subtle number Motion.

## TASK 040 — Quantity Selector

Status: `[x]`

Support:

- minus
- plus
- direct input
- MOQ validation
- maximum validation
- disabled states

## TASK 041 — Pincode/Delivery UI

Status: `[x]`

Build frontend pincode states:

- valid
- invalid
- unavailable
- loading
- estimated delivery

Use mock responses until backend exists.

## TASK 042 — Product CTA

Status: `[x]`

Support:

- Add to Cart
- Request Bulk Quote

On mobile, use a sticky purchase CTA where appropriate.

## TASK 043 — Related Products

Status: `[x]`

Show relevant products by category, dimensions, or complementary packaging.

---

# PHASE 6 — CART

## TASK 044 — Cart State

Status: `[x]`

Support:

```text
items
subtotal
discount
shipping
gst
total
```

Keep calculations outside UI components.

## TASK 045 — Cart Persistence

Status: `[x]`

Persist guest cart locally and restore it after refresh.

Handle removed/invalid products.

## TASK 046 — Add-to-Cart Interaction

Status: `[x]`

Support:

```text
Add → Loading → Success
```

and:

```text
Add → Error → Retry
```

Use Motion for feedback.

## TASK 047 — Cart Drawer

Status: `[x]`

Support:

- products
- quantities
- remove
- subtotal
- View Cart
- Checkout

Implement focus trap, Escape, and focus restoration.

## TASK 048 — Cart Page

Status: `[x]`

Support:

- multiple products
- quantity update
- remove
- pricing
- discount
- shipping placeholder
- GST placeholder
- total
- checkout

## TASK 049 — Empty Cart

Status: `[x]`

Show useful CTAs and recommended products.

---

# PHASE 7 — CHECKOUT

## TASK 050 — Checkout Flow

Status: `[x]`

Build:

```text
Cart
↓
Contact
↓
Business
↓
Address
↓
Review
↓
Payment
↓
Confirmation
```

Backend/payment may remain mocked.

## TASK 051 — Contact Information

Status: `[x]`

Fields:

- name
- email
- phone

Validate inline.

## TASK 052 — Business Information

Status: `[x]`

Support Individual/Business.

Business:

- business name
- GSTIN
- billing address

## TASK 053 — Address Form

Status: `[x]`

Support:

- address
- city
- state
- pincode
- landmark where appropriate

## TASK 054 — Order Summary

Status: `[x]`

Show transparent:

- products
- quantity
- unit price
- discount
- shipping
- GST
- total

## TASK 055 — Checkout Validation

Status: `[x]`

Block progression when required information is invalid.

## TASK 056 — Confirmation

Status: `[x]`

Show:

- order number
- summary
- delivery estimate
- customer/business details
- continue shopping
- view order

---

# PHASE 8 — BULK ORDERS

## TASK 057 — Bulk Order Page

Status: `[x]`

Create a B2B RFQ flow:

- product
- dimensions
- quantity
- printing
- delivery location
- expected date
- requirements

## TASK 058 — Bulk Quote States

Status: `[x]`

Support validation, submitting, success, error, and retry.

## TASK 059 — Bulk Upload UI

Status: `[x]`

Create frontend CSV/Excel upload UI with:

- file selection
- validation
- preview
- invalid rows
- valid rows

Backend processing can remain mocked.

---

# PHASE 9 — CUSTOM PACKAGING

## TASK 060 — Custom Packaging Wizard

Status: `[ ]`

Steps:

```text
1. Dimensions
2. Material
3. Printing
4. Quantity
5. Contact
6. Quote
```

## TASK 061 — Custom Dimensions

Status: `[ ]`

Support length, width, height, unit, and validation.

## TASK 062 — Material Selection

Status: `[ ]`

Support appropriate material/ply options with simple explanations.

## TASK 063 — Logo Upload UI

Status: `[ ]`

Support:

- empty
- selected
- preview
- invalid file
- uploading
- success
- remove

Backend upload can remain mocked.

---

# PHASE 10 — ACCOUNT / REORDER

## TASK 064 — Account UI

Status: `[ ]`

Create:

- profile
- orders
- quotes
- saved products
- addresses
- business details

## TASK 065 — Orders Page

Status: `[ ]`

Show:

- order number
- date
- items
- quantity
- total
- status
- view order
- buy again

## TASK 066 — Order Detail

Status: `[ ]`

Show:

- order details
- products
- address
- payment summary
- status timeline
- reorder

## TASK 067 — Reorder

Status: `[ ]`

Support Buy Again from order history and order details.

---

# PHASE 11 — INFORMATIONAL PAGES

## TASK 068 — About

Status: `[ ]`

Keep authentic. Do not invent company history.

## TASK 069 — How It Works

Status: `[ ]`

Explain discover → choose → order → deliver → reorder.

## TASK 070 — Shipping Policy

Status: `[ ]`

Create readable, responsive policy structure without unsupported claims.

## TASK 071 — Returns/Refunds

Status: `[ ]`

Create clear policy structure.

## TASK 072 — Terms/Privacy

Status: `[ ]`

Ensure readable typography, spacing, navigation, and mobile behavior.

## TASK 073 — Help Centre

Status: `[ ]`

Support search, categories, FAQ, and contact support.

## TASK 074 — Blog

Status: `[ ]`

If the route exists, build production-quality listing/detail UI with featured content, categories, search, related articles, and responsive layouts.

---

# PHASE 12 — RESPONSIVE QA

## TASK 075 — Mobile Audit

Status: `[ ]`

Test:

- 320
- 375
- 390
- 430
- 768

Fix overflow, clipping, grids, spacing, forms, sticky elements, and touch targets.

## TASK 076 — Tablet Audit

Status: `[ ]`

Test 768, 820, and 1024.

## TASK 077 — Desktop Audit

Status: `[ ]`

Test 1280, 1440, and 1600+.

Avoid excessively wide content.

---

# PHASE 13 — ACCESSIBILITY

## TASK 078 — Keyboard Navigation

Status: `[ ]`

Test complete site using keyboard only.

## TASK 079 — Focus States

Status: `[ ]`

Every interactive element needs a visible focus state.

## TASK 080 — Semantic HTML

Status: `[ ]`

Review headings, nav, main, footer, lists, links, buttons, and forms.

Do not use clickable divs where a button/link is appropriate.

## TASK 081 — Screen Reader Labels

Status: `[ ]`

Label icon buttons, menu, search, cart, close buttons, and form controls.

## TASK 082 — Contrast

Status: `[ ]`

Fix significant contrast issues while preserving brand identity.

## TASK 083 — Reduced Motion

Status: `[ ]`

Respect user reduced-motion preferences.

---

# PHASE 14 — MOTION SYSTEM

## TASK 084 — Motion Presets

Status: `[ ]`

Create reusable variants:

- fadeUp
- fadeIn
- scaleIn
- slideIn
- drawer
- modal
- staggerChildren

Avoid arbitrary transitions throughout the codebase.

## TASK 085 — Section Entrance Motion

Status: `[ ]`

Add subtle entrance animations only where useful.

## TASK 086 — Product Motion

Status: `[ ]`

Animate:

- add to cart
- quantity changes
- price changes
- gallery
- recommendations

## TASK 087 — Box Finder Motion

Status: `[ ]`

Polish step transitions and recommendation reveal.

## TASK 088 — Modal/Drawer Motion

Status: `[ ]`

Standardize enter/exit/backdrop animations.

---

# PHASE 15 — PERFORMANCE

## TASK 089 — Image Optimization

Status: `[ ]`

Review all images for:

- responsive sizing
- lazy loading
- correct dimensions
- optimized formats
- priority loading only where needed

## TASK 090 — Font Optimization

Status: `[ ]`

Remove unnecessary font weights and optimize loading.

## TASK 091 — Client Component Audit

Status: `[ ]`

Remove unnecessary Client Components where possible.

## TASK 092 — Bundle Review

Status: `[ ]`

Identify large dependencies, duplicate dependencies, unnecessary imports, and globally loaded client-only libraries.

## TASK 093 — Core Web Vitals

Status: `[ ]`

Review and improve:

- LCP
- INP
- CLS
- TTFB

---

# PHASE 16 — SEO

## TASK 094 — Page Metadata

Status: `[ ]`

Verify title, description, canonical, OpenGraph, and social metadata for important pages.

## TASK 095 — Product SEO

Status: `[ ]`

Every product should have unique metadata.

## TASK 096 — Breadcrumbs

Status: `[ ]`

Add breadcrumbs to relevant catalogue/product pages.

## TASK 097 — Structured Data

Status: `[ ]`

Where valid, implement:

- Product
- Offer
- BreadcrumbList
- FAQPage

Only use real data.

---

# PHASE 17 — FRONTEND BUSINESS LOGIC

## TASK 098 — Pricing Engine

Status: `[ ]`

Create:

```js
getPriceForQuantity(product, quantity);
```

Support MOQ, price tiers, discounts, and subtotal.

## TASK 099 — Cart Calculation Engine

Status: `[ ]`

Centralize subtotal, discount, shipping, GST, and total.

## TASK 100 — Box Recommendation Engine

Status: `[ ]`

Create mock recommendation logic based on dimensions, weight, category, and quantity.

Return best match, alternatives, and recommendation reason.

## TASK 101 — Validation Layer

Status: `[ ]`

Centralize validation for email, phone, pincode, dimensions, quantity, GSTIN, and address.

---

# PHASE 18 — FRONTEND DATA/API CONTRACTS

## TASK 102 — Product Contract

Status: `[ ]`

Define a stable product shape:

```js
{
  (id,
    slug,
    name,
    description,
    category,
    images,
    dimensions,
    material,
    ply,
    gsm,
    flute,
    weightCapacity,
    minOrderQuantity,
    pricing,
    availability);
}
```

## TASK 103 — Category Contract

Status: `[ ]`

Define:

```js
{
  (id, slug, name, description, image, productCount);
}
```

## TASK 104 — Order Contract

Status: `[ ]`

Define:

```js
{
  (id,
    orderNumber,
    status,
    items,
    subtotal,
    discount,
    shipping,
    gst,
    total,
    shippingAddress,
    createdAt);
}
```

## TASK 105 — Quote Contract

Status: `[ ]`

Define:

```js
{
  (id, status, products, quantity, deliveryLocation, requirements, createdAt);
}
```

## TASK 106 — Service Layer

Status: `[ ]`

Replace direct mock-data imports in UI components with service functions.

Example:

```js
const products = await getProducts();
```

---

# PHASE 19 — ANALYTICS

## TASK 107 — Analytics Event Architecture

Status: `[ ]`

Define centralized events:

```text
page_viewed
product_viewed
search_started
search_completed
box_finder_started
box_finder_completed
box_recommendation_clicked
quantity_changed
add_to_cart
cart_viewed
checkout_started
quote_started
quote_submitted
reorder_clicked
```

Do not tightly couple components to a specific analytics provider.

---

# PHASE 20 — ERROR HANDLING

## TASK 108 — Global Error Boundary

Status: `[ ]`

Create a friendly global error experience.

## TASK 109 — Route Error States

Status: `[ ]`

Add route-level error handling where supported.

## TASK 110 — 404 Page

Status: `[ ]`

Create a polished 404 page consistent with BoxKart.

Example:

> Looks like this box doesn't exist.

CTA:

**Back to Packaging**

---

# PHASE 21 — TESTING

## TASK 111 — Unit Tests

Status: `[ ]`

Test:

- pricing
- cart calculations
- quantity validation
- dimension validation
- box recommendation
- form validation

## TASK 112 — Component Tests

Status: `[ ]`

Prioritize:

- ProductCard
- ProductGrid
- BoxFinder
- QuantitySelector
- Cart
- Checkout
- Search
- Filters

## TASK 113 — E2E Critical Flow

Status: `[ ]`

Test:

```text
Homepage
↓
Find My Box
↓
Recommendation
↓
Product
↓
Quantity
↓
Add to Cart
↓
Cart
↓
Checkout
```

## TASK 114 — E2E Bulk Quote

Status: `[ ]`

Test form → validation → submit → success.

## TASK 115 — E2E Custom Packaging

Status: `[ ]`

Test:

```text
Custom Packaging
↓
Dimensions
↓
Material
↓
Printing
↓
Quantity
↓
Quote
```

## TASK 116 — Visual Regression

Status: `[ ]`

Create screenshot baselines for:

- homepage desktop
- homepage mobile
- product listing
- product detail
- Box Finder
- cart
- checkout
- bulk quote
- custom packaging

---

# PHASE 22 — FINAL PRODUCTION QA

## TASK 117 — Broken Links

Status: `[ ]`

Verify every internal link. No placeholder hrefs, dead CTAs, or incorrect routes.

## TASK 118 — Console Errors

Status: `[ ]`

Production build should not contain unexpected errors, hydration warnings, React key warnings, or accessibility warnings.

## TASK 119 — Hydration Audit

Status: `[ ]`

Check for:

- hydration mismatches
- browser-only APIs in Server Components
- unstable rendering
- random SSR values
- date/time inconsistencies

## TASK 120 — Final Responsive Audit

Status: `[ ]`

Run through every major route at:

```text
320
375
390
430
768
1024
1280
1440
1600+
```

## TASK 121 — Final Accessibility Audit

Status: `[ ]`

Run automated accessibility checks plus manual keyboard testing.

## TASK 122 — Final Performance Audit

Status: `[ ]`

Review:

- Lighthouse
- Core Web Vitals
- bundle size
- image sizes
- network requests
- rendering performance

## TASK 123 — Production Build

Status: `[ ]`

Run existing project commands such as:

```bash
npm run lint
npm run build
```

and available tests.

Fix all blocking issues.

## TASK 124 — Final Code Cleanup

Status: `[ ]`

Remove verified-unused:

- components
- imports
- utilities
- CSS
- dependencies
- debug logs
- temporary UI

## TASK 125 — Backend Integration Readiness

Status: `[ ]`

Confirm that the frontend has stable contracts for:

- products
- categories
- orders
- quotes
- cart
- authentication
- pricing
- shipping
- errors
- analytics

The frontend must be able to replace mock services with real backend services without redesigning the UI.

---

# FINAL DEFINITION OF DONE

The frontend is ready for backend development only when:

## Design

- [ ] Consistent design system
- [ ] Typography
- [ ] Spacing
- [ ] Buttons
- [ ] Cards
- [ ] Forms
- [ ] Motion

## Pages

- [ ] Homepage
- [ ] Product listing
- [ ] Category pages
- [ ] Product detail
- [ ] Box Finder
- [ ] Cart
- [ ] Checkout
- [ ] Bulk Orders
- [ ] Custom Packaging
- [ ] Bundles
- [ ] Account
- [ ] Orders
- [ ] Reorder
- [ ] About
- [ ] How It Works
- [ ] Help/FAQ
- [ ] Blog if present
- [ ] Shipping
- [ ] Returns
- [ ] Privacy
- [ ] Terms
- [ ] 404

## UX

- [ ] Search
- [ ] Filters
- [ ] Sorting
- [ ] Quantity
- [ ] Bulk pricing
- [ ] Cart
- [ ] Checkout
- [ ] Box Finder
- [ ] Quote flow
- [ ] Reorder

## States

Every important interaction supports:

- [ ] Initial
- [ ] Loading
- [ ] Success
- [ ] Empty
- [ ] Error
- [ ] Disabled
- [ ] Submitting
- [ ] Retry

## Responsive

- [ ] 320px
- [ ] 375px
- [ ] 390px
- [ ] 430px
- [ ] 768px
- [ ] 1024px
- [ ] 1280px
- [ ] 1440px
- [ ] 1600px+

## Accessibility

- [ ] Keyboard navigation
- [ ] Focus states
- [ ] Screen reader support
- [ ] Semantic HTML
- [ ] Form labels
- [ ] Contrast
- [ ] Modal/drawer focus
- [ ] Reduced motion

## Performance

- [ ] Images optimized
- [ ] Fonts optimized
- [ ] Client components minimized
- [ ] Dependencies reviewed
- [ ] LCP reviewed
- [ ] INP reviewed
- [ ] CLS reviewed

## Engineering

- [ ] Reusable components
- [ ] Mock service layer
- [ ] API contracts
- [ ] Central pricing
- [ ] Central cart calculations
- [ ] Central validation
- [ ] Error boundaries
- [ ] Analytics architecture
- [ ] Unit tests
- [ ] Component tests
- [ ] E2E tests
- [ ] Production build passes

---

# FINAL HANDOFF

When all tasks are complete, **do not start backend implementation automatically**.

Produce a final frontend report containing:

1. Completed tasks.
2. Remaining tasks.
3. Known limitations.
4. Component architecture.
5. Mock API/service architecture.
6. API contracts required from backend.
7. Database entities expected by the frontend.
8. Authentication requirements.
9. Pricing requirements.
10. Shipping requirements.
11. Analytics events.
12. Frontend decisions the backend must respect.

Then stop.

The next phase will be backend implementation.

---

# BOXKART PRODUCT PRINCIPLE

Always optimize around:

```text
What are you shipping?
        ↓
What size is your product?
        ↓
How heavy is it?
        ↓
How many do you need?
        ↓
BoxKart recommends packaging
        ↓
Customer sees transparent pricing
        ↓
Customer orders
        ↓
Customer receives packaging
        ↓
Customer reorders easily
```

The goal is not to build another generic e-commerce UI.

The goal is to make BoxKart feel like:

> **A smart packaging procurement platform for e-commerce businesses.**

The frontend should communicate:

**Simple. Reliable. Transparent. Fast. Business-friendly.**
