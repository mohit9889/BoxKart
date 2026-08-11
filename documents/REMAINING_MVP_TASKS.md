# BoxKart - Remaining MVP Integration Tasks

This document summarizes the outstanding modules and features that need to be integrated between the Next.js frontend and the Express backend for the Minimum Viable Product (MVP).

_Last Updated: Module 0 (API Foundation) and Module 1 (Authentication) are fully complete._

---

## 1. Missing Backend API Features (Discovered during integration)

These are features present in the frontend UI but currently lacking backend API endpoints.

- [ ] **Password Recovery Flow**
  - **Needs:** `POST /api/v1/auth/forgot-password` and `POST /api/v1/auth/reset-password`
  - **Dependencies:** Email service integration (e.g., Nodemailer, SendGrid, AWS SES) and database schema for password reset tokens.
  - _Current Status:_ Frontend pages (`/forgot-password`, `/reset-password`) are using a mock 1.5s delay.
- [ ] **Payments / Gateway Integration**
  - **Needs:** Razorpay, Stripe, or similar payment gateway initialization and webhook handling.
  - _Current Status:_ Checkout assumes order placement is sufficient, but actual payment processing logic needs to be defined.

---

## 2. Outstanding Modules (Critical Purchase Path)

These modules form the core e-commerce flow and must be completed in order.

### Module 2 — Catalog / Products

- [ ] Connect `GET /api/v1/products` for product listing.
- [ ] Connect `GET /api/v1/categories` for category filtering.
- [ ] Connect `GET /api/v1/products/:slug` for product details.
- [ ] Implement backend-driven search, filtering, and sorting (no client-side simulated filtering).

### Module 3 — Box Finder

- [ ] Connect `POST /api/v1/box-finder/recommend`.
- [ ] Map recommendations to real product slugs/IDs from the catalog.

### Module 4 — Cart

- [ ] Replace `localStorage` cart with authenticated backend cart (`/api/v1/cart`).
- [ ] Connect add (`POST /api/v1/cart/items`), update (`PATCH`), and remove (`DELETE`) actions.
- [ ] Validate MOQ and inventory limits on the backend.
- [ ] Handle cart loading upon user login.

### Module 5 — Pricing

- [ ] Connect `POST /api/v1/pricing/calculate`.
- [ ] Remove hard-coded business pricing logic from the frontend cart/checkout.
- [ ] Display backend-controlled subtotal, discount, shipping, tax, and total.

### Module 6 — Address Management

- [ ] List, create, update, and delete saved customer addresses.
- [ ] Ensure checkout uses validated, persisted address IDs instead of arbitrary frontend address objects.

### Module 7 — Checkout & Orders

- [ ] Connect checkout preview (`POST /api/v1/checkout/preview`).
- [ ] Connect real order placement (`POST /api/v1/orders`) using an `Idempotency-Key` to prevent double-submission.
- [ ] Clear cart only after successful order placement.
- [ ] Handle backend errors: inventory conflict, validation errors, duplicate requests.

---

## 3. Outstanding Modules (Secondary/B2B Features)

### Module 8 — Account / Order History

- [ ] Fetch real order history (`GET /api/v1/orders`).
- [ ] Display real order details and dynamic backend order status.
- [ ] Calculate account statistics (total spend, order count) dynamically.
- [ ] Replace all `MOCK_ORDERS` data.

### Module 9 — RFQ / Bulk Orders

- [ ] Connect RFQ creation and item addition endpoints.
- [ ] Wire up attachment uploads (respecting size/type limits).
- [ ] Fetch customer quotes and handle quote acceptance, triggering backend order creation.
- [ ] Implement RFQ cancellation flow.

### Module 10 — Bulk CSV/Excel Upload

- **[Decision Required]**: Either implement a real backend CSV/XLSX parser for RFQs, or temporarily hide/disable the UI functionality for the MVP.

### Module 11 — Custom Packaging

- [ ] Connect `POST /api/v1/custom-packaging/requests`.
- [ ] Handle validation errors and duplicate submissions.

### Module 12 — Admin Integration

- [ ] Build backend-connected tables for Products, RFQs, Quotes, and Orders.
- [ ] Implement admin actions (create products, update inventory, issue quotes, update order statuses).
- [ ] Ensure strict role-based access control (RBAC) across all admin endpoints.
