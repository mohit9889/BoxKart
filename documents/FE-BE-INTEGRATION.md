# BoxKart Frontend ↔ Backend Integration Plan

## Purpose

This document is the implementation plan for connecting the BoxKart Next.js frontend to the BoxKart backend.

The goal is to replace mock/local functionality with the real backend **module by module**, and inside each module, implement and verify **one functionality at a time**.

> **Important:** Do not integrate the entire application in one pass. Complete one functionality, test it end-to-end, verify regressions, then move to the next functionality.

---

## Repositories

- Frontend: `mohit9889/BoxKart`
- Backend: `mohit9889/boxkart-backend`

---

# 1. Integration Rules

## 1.1 Module-first, functionality-second

Use this hierarchy:

```text
Module
  ├── Functionality 1
  │     ├── API integration
  │     ├── Loading state
  │     ├── Success state
  │     ├── Error state
  │     ├── Empty state (if applicable)
  │     ├── Auth/authorization check
  │     ├── UI verification
  │     └── Regression test
  │
  ├── Functionality 2
  └── Functionality 3
```

Never mark a module complete merely because its API calls have been added.

A functionality is complete only when:

1. Frontend calls the correct backend endpoint.
2. Request payload matches backend validation/schema.
3. Response is mapped into the frontend model.
4. Authentication headers are correct where required.
5. Loading state works.
6. Success state works.
7. Error state works.
8. Empty state works where applicable.
9. Existing mock/local implementation is removed or intentionally retained only where documented.
10. The functionality is manually verified against the deployed/staging backend.
11. Relevant automated tests are updated.

---

# 2. Source of Truth Rules

## Backend is the source of truth for

- Product data
- Category data
- Product availability/inventory
- Pricing used for orders
- Cart state for authenticated users
- Checkout totals
- Order creation
- Order status
- RFQs
- RFQ items
- RFQ attachments
- Quotes
- Quote acceptance
- Custom packaging requests
- Authentication/authorization

## Frontend is responsible for

- Presentation
- User interaction
- Local UI state
- Form state before submission
- Loading/error/empty states
- Client-side UX validation

## Never trust the frontend for

- Final order total
- Inventory availability
- Inventory deduction
- Order status transitions
- User authorization
- Quote acceptance authorization
- Payment/order identifiers

---

# 3. Integration Architecture

Create a centralized API layer rather than calling `fetch()` directly throughout components.

Recommended structure:

```text
lib/
  api/
    client.js
    auth.js
    catalog.js
    cart.js
    pricing.js
    checkout.js
    orders.js
    rfq.js
    customPackaging.js
    boxFinder.js
```

The exact folder/file names may be adapted to the existing frontend architecture, but the responsibilities should remain separated.

Recommended flow:

```text
Page / Component
      ↓
Feature hook/action
      ↓
API module
      ↓
API client
      ↓
BoxKart Backend
      ↓
PostgreSQL / Supabase Storage
```

Do not put backend URLs, authorization logic, payload transformation, and business calculations directly inside UI components.

---

# 4. Environment Configuration

Before feature integration:

- Add the backend base URL to frontend environment configuration.
- Do not hard-code production URLs in components.
- Define development/staging/production behavior where required.
- Verify CORS against the frontend origin.
- Verify authentication token handling.

Example concept:

```text
NEXT_PUBLIC_API_BASE_URL
```

Use the actual environment variable naming convention already used by the frontend if one exists.

---

# 5. Module 0 — API Foundation

**Goal:** Build the common integration infrastructure before connecting business modules.

## Module 0 Technical Decisions

### Framework

- Next.js App Router
- React Server Components supported
- Client Components used only where interactivity/browser APIs are required

### HTTP

- Native `fetch`
- No Axios for MVP

### Server State

- Backend is the source of truth
- No React Query/SWR for initial MVP
- Can be introduced later if server-state complexity justifies it

### Global State

- Do not introduce Redux/Zustand solely for API integration
- Use React state/context where necessary
- Authentication state is centralized
- Backend owns authenticated cart state

### Authentication

- Prefer HTTP-only secure cookies
- Do not store access tokens in localStorage
- If backend remains Bearer-token-only, use a secure Next.js server-side proxy/BFF approach

### API Architecture

UI
↓
Feature hook/action
↓
API module
↓
Central API client
↓
Backend

### Data Ownership

Backend:

- users
- products
- inventory
- prices
- carts
- orders
- RFQs
- quotes

Frontend:

- form state
- UI state
- loading state
- error state
- presentation state

### Functionality 0.1 — API client

- [x] Create centralized HTTP/API client.
- [x] Configure base URL.
- [x] Support JSON requests/responses.
- [x] Centralize common headers.
- [x] Centralize API error normalization.
- [x] Add request timeout handling if appropriate.

### Functionality 0.2 — Authentication header

- [x] Add access-token handling (via HTTP-only cookies).
- [x] Send `Authorization: Bearer <token>` where required (using cookies instead).
- [x] Do not expose secrets in client code.
- [x] Handle missing/expired authentication consistently.

### Functionality 0.3 — Global API error handling

- [x] Normalize backend error responses.
- [x] Handle 400 validation errors.
- [x] Handle 401 authentication errors.
- [x] Handle 403 authorization errors.
- [x] Handle 404 errors.
- [x] Handle 409 conflicts.
- [x] Handle 429 rate limits.
- [x] Handle 5xx errors.

### Functionality 0.4 — API loading/error utilities

- [ ] Establish consistent loading behavior.
- [ ] Establish consistent error UI.
- [ ] Prevent duplicate submissions.

**Exit criteria:** A frontend API call can be made through one standard client with consistent authentication and error handling.

---

# 6. Module 1 — Authentication

**Goal:** Connect signup/login/session behavior first because most subsequent modules depend on authentication.

### Functionality 1.1 — Signup

Backend capability:

```text
POST /api/v1/auth/signup
```

- [ ] Connect signup form.
- [ ] Match backend validation.
- [ ] Display validation errors.
- [ ] Handle duplicate email.
- [ ] Handle successful authentication/session response.
- [ ] Redirect to appropriate destination.

### Functionality 1.2 — Login

Backend capability:

```text
POST /api/v1/auth/login
```

- [ ] Connect login form.
- [x] Connect login form.
- [x] Send credentials to backend.
- [x] Handle incorrect credentials.
- [x] Verify cookie is received and stored.

### Functionality 1.3 — Current user/session

- [x] Restore authentication state on refresh.
- [x] Fetch/resolve current user.
- [x] Handle expired access token.

### Functionality 1.4 — Logout

- [x] Clear frontend authentication state.
- [x] Clear access/refresh token according to the chosen auth strategy.
- [x] Return user to logged-out state.

**Exit criteria:** Signup, login, refresh/session restoration, and logout work against the real backend.

---

# 7. Module 2 — Catalog / Products

**Goal:** Replace frontend mock product data with backend catalog data.

### Functionality 2.1 — Product listing

Backend capability:

```text
GET /api/v1/products
```

- [ ] Replace local `products` source.
- [ ] Connect search/filter parameters.
- [ ] Connect pagination if supported/required.
- [ ] Map backend product fields to frontend product model.
- [ ] Add loading state.
- [ ] Add empty state.
- [ ] Add API error state.

### Functionality 2.2 — Category listing

```text
GET /api/v1/categories
```

- [ ] Replace hard-coded category data where applicable.
- [ ] Connect category filters/navigation.

### Functionality 2.3 — Product detail

```text
GET /api/v1/products/:slug
```

- [ ] Connect product detail page.
- [ ] Remove product-detail mock data.
- [ ] Handle invalid slug/404.
- [ ] Display backend inventory/availability data.

### Functionality 2.4 — Product search/filter/sort

- [ ] Connect supported backend filters.
- [ ] Do not invent unsupported server-side filters.
- [ ] Keep purely visual sorting client-side only when appropriate.

**Exit criteria:** All customer-facing product information comes from the backend.

---

# 8. Module 3 — Box Finder

Backend capability:

```text
POST /api/v1/box-finder/recommend
```

### Functionality 3.1 — Recommendation request

- [ ] Connect Box Finder form.
- [ ] Map form inputs to backend payload.
- [ ] Display backend recommendations.
- [ ] Handle no recommendation.
- [ ] Handle invalid inputs.
- [ ] Handle API failure.

### Functionality 3.2 — Recommendation → Product

- [ ] Ensure recommended products link to real product detail pages.
- [ ] Ensure product IDs/slugs match catalog API data.

**Exit criteria:** Box Finder recommendations come from the backend.

---

# 9. Module 4 — Cart

Backend capability:

```text
GET    /api/v1/cart
POST   /api/v1/cart/items
PATCH  /api/v1/cart/items/:itemId
DELETE /api/v1/cart/items/:itemId
DELETE /api/v1/cart
POST   /api/v1/cart/validate
```

### Functionality 4.1 — Load cart

- [ ] Replace authenticated local/mock cart with backend cart.
- [ ] Load cart after login.
- [ ] Handle empty cart.

### Functionality 4.2 — Add item

- [ ] Add product/quantity through backend.
- [ ] Validate MOQ.
- [ ] Handle insufficient inventory.
- [ ] Update UI from backend response.

### Functionality 4.3 — Update quantity

- [ ] Connect quantity changes.
- [ ] Validate quantity against backend rules.
- [ ] Handle inventory errors.

### Functionality 4.4 — Remove item

- [ ] Connect remove action.
- [ ] Refresh/update cart state.

### Functionality 4.5 — Clear cart

- [ ] Connect clear cart.
- [ ] Verify UI state.

### Functionality 4.6 — Cart validation

- [ ] Call backend validation before checkout.
- [ ] Handle changed price/inventory.

**Important:** The frontend may keep temporary cart state for UX, but the authenticated backend cart is the source of truth before checkout.

**Exit criteria:** Cart survives refresh/login and matches backend state.

---

# 10. Module 5 — Pricing

Backend capability:

```text
POST /api/v1/pricing/calculate
```

### Functionality 5.1 — Product pricing

- [ ] Connect pricing API where dynamic pricing is required.
- [ ] Remove hard-coded business pricing calculations from checkout.

### Functionality 5.2 — Cart pricing

- [ ] Request backend calculation.
- [ ] Display subtotal/discount/shipping/tax/total from backend response.

### Functionality 5.3 — Price change handling

- [ ] Handle backend total differing from local preview.
- [ ] Inform user when price changes.

**Exit criteria:** Final checkout pricing is backend-controlled.

---

# 11. Module 6 — Address Management

**Goal:** Ensure checkout and RFQ use backend-valid addresses.

### Functionality 6.1 — List addresses

- [ ] Load customer's saved addresses.

### Functionality 6.2 — Create address

- [ ] Connect address form.
- [ ] Validate backend-required fields.

### Functionality 6.3 — Update/delete address

- [ ] Connect edit.
- [ ] Connect delete.
- [ ] Handle default address behavior if supported.

### Functionality 6.4 — Select checkout address

- [ ] Return selected address ID to checkout.
- [ ] Do not send arbitrary frontend-only address objects when backend expects persisted addresses.

**Exit criteria:** Checkout uses real backend address records.

---

# 12. Module 7 — Checkout

Backend capability:

```text
POST /api/v1/checkout/preview
POST /api/v1/orders
```

### Functionality 7.1 — Checkout preview

- [ ] Connect checkout page to preview API.
- [ ] Send cart/address/payment information required by backend.
- [ ] Display backend totals.

### Functionality 7.2 — Place order

- [ ] Replace simulated `setTimeout` order creation.
- [ ] Call real order API.
- [ ] Generate/send a unique `Idempotency-Key`.
- [ ] Prevent double-click/double-submit.

### Functionality 7.3 — Order success

- [ ] Use backend order ID/order number.
- [ ] Do not generate fake frontend order numbers.
- [ ] Clear cart only after confirmed order creation.
- [ ] Redirect to order confirmation/details.

### Functionality 7.4 — Checkout failure/retry

- [ ] Handle inventory conflict.
- [ ] Handle validation error.
- [ ] Handle duplicate/idempotent request.
- [ ] Preserve checkout form data where practical.

**Exit criteria:** A real database order can be created from the frontend and inventory changes correctly.

---

# 13. Module 8 — Orders / Account

Backend capability:

```text
GET /api/v1/orders
GET /api/v1/orders/:id
```

### Functionality 8.1 — Order list

- [ ] Replace `MOCK_ORDERS`.
- [ ] Fetch real orders.
- [ ] Add loading/empty/error states.

### Functionality 8.2 — Order detail

- [ ] Connect order detail page.
- [ ] Display real items, totals, addresses, status.

### Functionality 8.3 — Order status

- [ ] Display backend status.
- [ ] Do not infer status from frontend state.

### Functionality 8.4 — Cancel order

- [ ] Connect only if customer cancellation is supported by backend.
- [ ] Update UI from backend response.
- [ ] Verify inventory restoration.

### Functionality 8.5 — Reorder

MVP approach:

```text
Previous order
      ↓
Add previous items to cart
      ↓
Backend cart
```

- [ ] Implement using existing cart APIs unless a dedicated reorder API is later required.

### Functionality 8.6 — Account statistics

- [ ] Remove hard-coded order counts/spend.
- [ ] Derive from real order data or add a dedicated backend summary endpoint if performance requires it.

**Exit criteria:** Account/order pages contain no fake order data.

---

# 14. Module 9 — RFQ / Bulk Orders

Backend capabilities include RFQ creation, items, submission, attachments, quotes, acceptance, and cancellation.

### Functionality 9.1 — Create RFQ

- [ ] Connect RFQ form to backend.
- [ ] Match backend validation exactly.
- [ ] Remove mock submission logic.

### Functionality 9.2 — Add RFQ items

- [ ] Support multiple RFQ items.
- [ ] Send each product and quantity correctly.
- [ ] Validate quantities.

### Functionality 9.3 — Submit RFQ

- [ ] Connect submit action.
- [ ] Prevent duplicate submission.
- [ ] Display backend RFQ number/status.

### Functionality 9.4 — Attachment upload

- [ ] Connect upload API.
- [ ] Respect backend file size/type/count restrictions.
- [ ] Display upload progress/state.
- [ ] Handle rejected files.

### Functionality 9.5 — RFQ list

- [ ] Connect customer's RFQ list.
- [ ] Replace mock RFQ data.

### Functionality 9.6 — RFQ detail

- [ ] Connect detail page.
- [ ] Display items, status, attachments, quotes.

### Functionality 9.7 — Quotes

- [ ] Fetch quotes.
- [ ] Display quote totals/status/expiry.
- [ ] Handle no quote state.

### Functionality 9.8 — Accept quote

- [ ] Connect quote acceptance API.
- [ ] Confirm before acceptance.
- [ ] Handle already-accepted/expired quote.
- [ ] Redirect to generated order when successful.

### Functionality 9.9 — Cancel RFQ

- [ ] Connect cancellation.
- [ ] Disable cancellation when backend says RFQ is not cancellable.

**Important business rule:** When an RFQ becomes an order, the backend must create order items for every RFQ item and reserve inventory per item quantity. The frontend must display the resulting backend order rather than constructing its own order representation.

**Exit criteria:** Customer can complete the complete RFQ → Quote → Accept → Order flow using real APIs.

---

# 15. Module 10 — Bulk CSV/Excel Upload

The frontend currently advertises CSV/Excel bulk upload, while the existing RFQ attachment flow is not equivalent to structured bulk-item import.

### Functionality 10.1 — Decide MVP behavior

Choose exactly one:

- [ ] Implement real CSV/XLSX import in backend.
- [ ] Temporarily hide/disable CSV/XLSX functionality.

Do not leave a UI that appears to support CSV/XLSX while the backend rejects it.

### Functionality 10.2 — If implemented

Recommended flow:

```text
CSV/XLSX
   ↓
Frontend upload
   ↓
Backend parser/validation
   ↓
Validated RFQ items
   ↓
Frontend preview
   ↓
Customer confirms
   ↓
Create RFQ
```

**Exit criteria:** Bulk upload behavior matches the UI exactly.

---

# 16. Module 11 — Custom Packaging

Backend capability:

```text
POST /api/v1/custom-packaging/requests
```

### Functionality 11.1 — Submit request

- [ ] Connect custom packaging form.
- [ ] Match backend payload.
- [ ] Require authentication if backend requires it.
- [ ] Display request confirmation.

### Functionality 11.2 — Error handling

- [ ] Validation errors.
- [ ] Unauthorized state.
- [ ] Duplicate submission protection where appropriate.

**Exit criteria:** Custom packaging submissions create real backend requests.

---

# 17. Module 12 — Admin Integration

Admin functionality should be treated as a separate module from the customer-facing frontend.

### Functionality 12.1 — Product management

- [ ] List products.
- [ ] Create product.
- [ ] Update product.
- [ ] Inventory updates.

### Functionality 12.2 — RFQ management

- [ ] List RFQs.
- [ ] View RFQ.
- [ ] Create quote.
- [ ] Manage quote state.

### Functionality 12.3 — Orders

- [ ] List orders.
- [ ] View order.
- [ ] Perform permitted status transitions.

### Functionality 12.4 — Authorization

- [ ] Verify admin-only routes with real backend authorization.
- [ ] Never rely only on hiding admin UI.

---

# 18. Functionality Completion Template

For every functionality, use this checklist before moving on:

```text
### [ ] Functionality: <name>

Backend endpoint:
<method> <endpoint>

Frontend location:
<page/component>

Request:
- [ ] Payload mapped correctly
- [ ] Required fields present
- [ ] IDs/slugs mapped correctly

Authentication:
- [ ] Public/private behavior verified
- [ ] Authorization verified

UI:
- [ ] Loading
- [ ] Success
- [ ] Error
- [ ] Empty state
- [ ] Disabled/submitting state

Data:
- [ ] Response mapped correctly
- [ ] No mock data remains for this functionality
- [ ] No business calculation duplicated incorrectly in frontend

Testing:
- [ ] Happy path
- [ ] Validation failure
- [ ] Unauthorized/forbidden case
- [ ] Not found case where applicable
- [ ] Network/server failure
- [ ] Regression check

Status:
- [ ] COMPLETE
```

---

# 19. Integration Order

Do the work strictly in this order unless a dependency requires otherwise:

```text
MODULE 0  API Foundation
    ↓
MODULE 1  Authentication
    ↓
MODULE 2  Catalog / Products
    ↓
MODULE 3  Box Finder
    ↓
MODULE 4  Cart
    ↓
MODULE 5  Pricing
    ↓
MODULE 6  Address Management
    ↓
MODULE 7  Checkout / Orders
    ↓
MODULE 8  Account / Order History
    ↓
MODULE 9  RFQ / Bulk Orders
    ↓
MODULE 10 CSV/XLSX Bulk Upload
    ↓
MODULE 11 Custom Packaging
    ↓
MODULE 12 Admin
```

The critical customer purchase path is:

```text
Auth
 ↓
Catalog
 ↓
Cart
 ↓
Pricing
 ↓
Address
 ↓
Checkout
 ↓
Order
```

Complete this path before spending significant time on secondary features.

---

# 20. Rules for Antigravity

When implementing this document:

1. **Work on one module at a time.**
2. **Within a module, work on one functionality at a time.**
3. Do not modify unrelated modules unless required by the current functionality.
4. Before changing code, inspect the existing frontend implementation and corresponding backend route/controller/service/validation.
5. Never assume the frontend payload matches the backend payload.
6. Verify the backend validation/schema before writing the API call.
7. Never duplicate backend business logic in the frontend.
8. Remove mock data only after the real API functionality works.
9. Do not remove a mock implementation prematurely if it is needed as a temporary fallback; mark it clearly and remove it after verification.
10. Do not introduce a new backend endpoint when an existing endpoint already satisfies the requirement.
11. If an existing backend endpoint cannot support the frontend requirement, document the mismatch before changing the backend.
12. Keep JavaScript/JSX consistent with the existing frontend project conventions.
13. Do not convert existing JavaScript files to TypeScript as part of integration.
14. Preserve the existing UI/UX unless a change is necessary for API behavior.
15. After each functionality, run the relevant frontend tests/lint/build checks.
16. After each module, run the full available regression suite.
17. Do not mark a functionality complete based only on compilation.
18. Verify the actual browser flow against the backend.
19. Do not install a new state-management or data-fetching library (e.g. React Query, swr, axios, zustand, redux) during Module 0 unless the existing codebase demonstrates a concrete requirement that cannot be reasonably solved with the current architecture.

---

# 21. Definition of Done — Module

A module is complete only when:

- [ ] All planned functionalities are implemented.
- [ ] All mock/local implementations for those functionalities are removed or explicitly documented.
- [ ] API payloads match backend validation.
- [ ] API responses are correctly mapped.
- [ ] Authentication is correct.
- [ ] Authorization behavior is verified.
- [ ] Loading/error/empty states work.
- [ ] Browser happy path works.
- [ ] Failure scenarios work.
- [ ] Relevant tests pass.
- [ ] Frontend build passes.
- [ ] No unrelated regressions are introduced.
- [ ] Documentation/task status is updated.

---

# 22. Definition of Done — Entire FE/BE Integration

The integration phase is complete when:

- [ ] Authentication is real.
- [ ] Product/catalog data is real.
- [ ] Box Finder uses backend recommendations.
- [ ] Cart is backend-backed for authenticated users.
- [ ] Pricing comes from backend for checkout.
- [ ] Address management is backend-backed.
- [ ] Checkout creates real orders.
- [ ] Inventory is updated by backend transactions.
- [ ] Account/order history uses real data.
- [ ] RFQ creation is real.
- [ ] RFQ attachments are real.
- [ ] Quotes are real.
- [ ] Quote acceptance creates the correct order.
- [ ] Custom packaging requests are real.
- [ ] CSV/XLSX functionality is either implemented or removed from the UI.
- [ ] Admin flows are secured by backend authorization.
- [ ] No critical customer flow depends on mock data.
- [ ] Production/staging smoke tests pass.

---

# 23. Current Priority

Start with:

```text
[x] Module 0 — API Foundation
[x] Module 1 — Authentication / Login
[x] Module 1 — Signup
[x] Module 1 — Session restoration
[x] Module 1 — Logout

[ ] Module 2 — Product listing
[ ] Module 2 — Product detail
[ ] Module 2 — Categories

[ ] Module 4 — Cart load
[ ] Module 4 — Add item
[ ] Module 4 — Update quantity
[ ] Module 4 — Remove item

[ ] Module 5 — Pricing
[ ] Module 6 — Address

[ ] Module 7 — Checkout preview
[ ] Module 7 — Create order
[ ] Module 8 — Order list/detail

[ ] Module 9 — RFQ creation
[ ] Module 9 — RFQ items
[ ] Module 9 — RFQ submission
[ ] Module 9 — Attachments
[ ] Module 9 — Quotes
[ ] Module 9 — Quote acceptance

[ ] Module 11 — Custom packaging
[ ] Module 3 — Box Finder

[ ] Module 10 — CSV/XLSX decision
[ ] Module 12 — Admin
```

## Final principle

> **One module → one functionality → implement → test → verify → mark complete → move to the next functionality.**

Do not attempt a large FE/BE migration in a single change. Small, independently verifiable integration steps will make it much easier to identify API mismatches, prevent regressions, and keep the BoxKart MVP stable while development continues.
