# BoxKart Frontend Testing Strategy

**Project:** BoxKart  
**Document:** Frontend Testing Strategy  
**Primary Automation Tool:** Playwright  
**Secondary Tools:** Vitest, React Testing Library, axe-core  
**Target:** Production-ready automated frontend testing  
**Status:** Active  
**Last Updated:** 2026-08-10

---

## 1. Purpose

This document defines the complete automated frontend testing strategy for BoxKart.

The objective is to verify:

- Every application route
- Every critical user interaction
- Every button and navigation action
- Every form
- Every validation rule
- Loading states
- Empty states
- Success states
- Error states
- Authentication and authorization
- Customer workflows
- Admin workflows
- Cart and checkout
- RFQ and quotation workflows
- Responsive behavior
- Accessibility
- Visual regressions
- API/network failure handling
- Cross-browser compatibility
- Critical business journeys

The test suite must be automated and executable locally and in CI/CD.

---

# 2. Testing Principles

## 2.1 Test the actual application

Antigravity MUST inspect the existing BoxKart implementation before creating tests.

Do not assume that a feature exists simply because a route exists.

For every route:

1. Inspect the page.
2. Identify components.
3. Identify interactive elements.
4. Identify forms.
5. Identify API calls.
6. Identify loading states.
7. Identify empty states.
8. Identify error handling.
9. Identify authentication requirements.
10. Create tests based on actual behavior.

---

## 2.2 Never modify application behavior just to make tests pass

If a test fails:

```text
Test failure
    ↓
Determine root cause
    ↓
Is test incorrect?
    ├── Yes → fix test
    └── No → application defect
```

Do NOT modify production code solely to make an assertion pass.

Application fixes should be reported separately.

---

## 2.3 Prefer user-facing selectors

Preferred:

```javascript
page.getByRole('button', { name: 'Add to Cart' });
page.getByRole('link', { name: 'Products' });
page.getByLabel('Email');
page.getByPlaceholder('Enter email');
```

Avoid:

```javascript
page.locator('.some-random-class');
```

Use `data-testid` only when no stable semantic selector exists.

---

# 3. Testing Stack

## 3.1 End-to-End

Use:

```text
Playwright
```

Primary responsibilities:

- Navigation
- Authentication
- Forms
- User interactions
- API mocking
- Business journeys
- Browser testing
- Screenshots
- Accessibility integration

---

## 3.2 Component Testing

Use:

```text
Vitest
React Testing Library
```

Use component tests for:

- Complex reusable components
- Form validation
- Cart calculations
- Quantity selectors
- Modals
- Wizards
- Dropdowns
- Tabs
- Product cards
- Status components

---

## 3.3 Accessibility

Use:

```text
@axe-core/playwright
```

Every major route must have automated accessibility checks.

---

# 4. Browser Matrix

Run the full critical suite against:

```text
Chromium
Firefox
WebKit
```

Smoke tests may initially run against Chromium only.

Regression tests should run against all three.

---

# 5. Responsive Matrix

Test at minimum:

```text
Mobile:
375 × 667
390 × 844

Tablet:
768 × 1024

Desktop:
1280 × 720
1440 × 900

Large desktop:
1920 × 1080
```

Critical pages must be tested at mobile and desktop minimum.

---

# 6. Application Route Inventory

## Public

```text
/
 /products
 /products/[slug]
 /bulk-orders
 /custom-packaging
 /cart
 /checkout
 /order-success
 /about
 /contact
 /faq
```

## Authentication

```text
/login
/signup
/forgot-password
/reset-password
```

## Legal

```text
/terms
/privacy
/shipping-policy
/refund-policy
```

## Customer

```text
/account
/account/profile
/account/addresses
/account/orders
/account/orders/[id]
/account/rfqs
/account/rfqs/[id]
/account/quotes
/account/quotes/[id]
```

## Admin

```text
/admin/login
/admin
/admin/products
/admin/products/new
/admin/products/[id]
/admin/rfqs
/admin/rfqs/[id]
/admin/quotes
/admin/quotes/new
/admin/quotes/[id]
/admin/orders
/admin/orders/[id]
```

---

# 7. Universal Route Test

Every route must have the following baseline checks where applicable:

```text
[ ] Route loads
[ ] Correct URL
[ ] No uncaught JavaScript exception
[ ] No unexpected console error
[ ] No critical failed network request
[ ] Page has expected heading
[ ] Header renders
[ ] Footer renders where applicable
[ ] Navigation works
[ ] Mobile layout works
[ ] Desktop layout works
[ ] Loading state works
[ ] Empty state works
[ ] Error state works
[ ] Not-found behavior works
[ ] Authentication guard works
[ ] Accessibility check passes
```

---

# 8. Public Page Testing

## 8.1 Homepage `/`

Test:

```text
[ ] Hero renders
[ ] Hero CTA works
[ ] Featured products render
[ ] Product card links work
[ ] Product CTA works
[ ] Testimonials render
[ ] Main CTA works
[ ] Header navigation works
[ ] Footer navigation works
[ ] Logo returns home
[ ] Cart navigation works
[ ] Login navigation works
[ ] Mobile navigation works
```

Error states:

```text
[ ] Featured products API failure
[ ] Empty featured products
[ ] Broken product image
[ ] Network failure
```

---

# 9. Product Catalog `/products`

Test:

```text
[ ] Products load
[ ] Product cards render
[ ] Product image
[ ] Product name
[ ] Product price
[ ] Product metadata
[ ] Product details link
[ ] Add to cart
[ ] Search
[ ] Filter
[ ] Sort
[ ] Pagination/load more
[ ] Clear filters
```

Filtering:

```text
[ ] Category
[ ] Size
[ ] Price
[ ] Multiple filters
[ ] Clear all
[ ] No results
```

Sorting:

```text
[ ] Price ascending
[ ] Price descending
[ ] Name ascending
[ ] Name descending
```

---

# 10. Product Details `/products/[slug]`

Test:

```text
[ ] Valid product loads
[ ] Product title
[ ] Product description
[ ] Product images
[ ] Specifications
[ ] Price
[ ] Quantity selector
[ ] Quantity increment
[ ] Quantity decrement
[ ] Manual quantity input
[ ] Add to cart
[ ] Buy now
[ ] Related products
```

Negative:

```text
[ ] Invalid slug
[ ] Product not found
[ ] Product API failure
[ ] Missing image
[ ] Missing price
[ ] Quantity = 0
[ ] Negative quantity
[ ] Excessive quantity
[ ] Invalid quantity input
```

---

# 11. Bulk Orders `/bulk-orders`

This is a critical BoxKart business feature.

Test:

```text
[ ] Page loads
[ ] RFQ form renders
[ ] All required fields render
[ ] Optional fields render
[ ] Product selection
[ ] Quantity
[ ] Dimensions
[ ] Material
[ ] Printing
[ ] Delivery location
[ ] Expected delivery date
[ ] Additional requirements
[ ] Attachment upload
```

Validation:

```text
[ ] Empty form
[ ] Required fields
[ ] Invalid email
[ ] Invalid phone
[ ] Invalid quantity
[ ] Zero quantity
[ ] Negative quantity
[ ] Invalid file
[ ] Oversized file
```

Submission:

```text
[ ] Submit
[ ] Loading state
[ ] Duplicate submission prevented
[ ] Successful submission
[ ] Success message
[ ] RFQ ID
[ ] Redirect
```

Failure:

```text
[ ] 400
[ ] 401
[ ] 403
[ ] 422
[ ] 429
[ ] 500
[ ] Network failure
[ ] Timeout
[ ] Retry
```

---

# 12. Custom Packaging `/custom-packaging`

Test every wizard step.

```text
[ ] Step 1
[ ] Step 2
[ ] Step 3
[ ] Step 4
[ ] Next
[ ] Previous
[ ] Cancel
[ ] Reset
[ ] Progress indicator
```

Configuration:

```text
[ ] Box type
[ ] Length
[ ] Width
[ ] Height
[ ] Material
[ ] Thickness
[ ] Printing
[ ] Color
[ ] Quantity
[ ] Finishing
```

Validation:

```text
[ ] Empty dimensions
[ ] Zero
[ ] Negative
[ ] Decimal
[ ] Excessively large values
[ ] Invalid characters
[ ] Missing required configuration
```

Final:

```text
[ ] Review
[ ] Edit configuration
[ ] Submit
[ ] Loading
[ ] Success
[ ] Error
```

---

# 13. Cart `/cart`

Test:

```text
[ ] Empty cart
[ ] Product added
[ ] Product removed
[ ] Increase quantity
[ ] Decrease quantity
[ ] Manual quantity
[ ] Subtotal
[ ] Total
[ ] Cart persistence
[ ] Continue shopping
[ ] Checkout
```

Edge cases:

```text
[ ] Quantity zero
[ ] Negative quantity
[ ] Maximum quantity
[ ] Unavailable product
[ ] Changed product price
[ ] Cart API failure
[ ] Empty cart checkout
```

---

# 14. Checkout `/checkout`

Test:

```text
[ ] Cart validation
[ ] Customer information
[ ] Address selection
[ ] New address
[ ] Billing information
[ ] Order summary
[ ] Shipping calculation
[ ] Payment method
[ ] Terms checkbox
[ ] Place order
```

Validation:

```text
[ ] Name
[ ] Email
[ ] Phone
[ ] Address
[ ] City
[ ] State
[ ] Pincode
[ ] Terms
```

Payment:

```text
[ ] Payment success
[ ] Payment failure
[ ] Payment cancelled
[ ] Payment timeout
[ ] Duplicate payment
[ ] Order creation failure
```

---

# 15. Order Success `/order-success`

Test:

```text
[ ] Order ID
[ ] Order summary
[ ] Customer information
[ ] Continue shopping
[ ] View order
```

Security:

```text
[ ] Direct navigation without order
[ ] Invalid order
[ ] Missing order data
```

---

# 16. Static Pages

## `/about`

```text
[ ] Loads
[ ] Content
[ ] Images
[ ] Links
[ ] CTA
```

## `/contact`

```text
[ ] Name
[ ] Email
[ ] Phone
[ ] Message
[ ] Required validation
[ ] Invalid email
[ ] Submit
[ ] Loading
[ ] Success
[ ] API failure
```

## `/faq`

```text
[ ] FAQ list
[ ] Accordion opens
[ ] Accordion closes
[ ] Multiple FAQ behavior
[ ] Keyboard accessibility
```

---

# 17. Authentication

## Login

```text
[ ] Valid credentials
[ ] Invalid credentials
[ ] Empty email
[ ] Invalid email
[ ] Empty password
[ ] Wrong password
[ ] Unknown user
[ ] Loading state
[ ] Duplicate submit
[ ] API failure
[ ] Network failure
[ ] Password visibility
[ ] Forgot password link
[ ] Signup link
[ ] Redirect after login
```

## Signup

```text
[ ] Valid registration
[ ] Required fields
[ ] Invalid email
[ ] Invalid phone
[ ] Weak password
[ ] Password mismatch
[ ] Duplicate email
[ ] Terms checkbox
[ ] Loading
[ ] API failure
[ ] Success
```

## Forgot Password

```text
[ ] Valid email
[ ] Invalid email
[ ] Unknown email
[ ] Loading
[ ] Success
[ ] API failure
[ ] Rate limiting
```

## Reset Password

```text
[ ] Valid token
[ ] Expired token
[ ] Invalid token
[ ] Weak password
[ ] Password mismatch
[ ] Successful reset
[ ] API failure
```

---

# 18. Customer Authorization

Every `/account/*` route must test:

```text
[ ] Authenticated user allowed
[ ] Guest redirected to login
[ ] Session expiry handled
[ ] Logout works
[ ] Refresh preserves session
[ ] Protected data not exposed
```

---

# 19. Customer Account

## `/account`

```text
[ ] Dashboard
[ ] Order metrics
[ ] RFQ metrics
[ ] Quote metrics
[ ] Recent orders
[ ] Recent RFQs
[ ] Quick actions
[ ] Empty states
```

## Profile

```text
[ ] Load profile
[ ] Edit name
[ ] Edit phone
[ ] Edit email
[ ] Save
[ ] Cancel
[ ] Validation
[ ] API failure
[ ] Change password
```

## Addresses

```text
[ ] Empty state
[ ] Add
[ ] Edit
[ ] Delete
[ ] Set default
[ ] Multiple addresses
[ ] Validation
```

## Orders

```text
[ ] List
[ ] Empty state
[ ] Search
[ ] Filter
[ ] Pagination
[ ] Status
[ ] Details
```

## Order Details

```text
[ ] Order information
[ ] Items
[ ] Quantity
[ ] Price
[ ] Address
[ ] Payment
[ ] Status
[ ] Tracking
[ ] AWB
[ ] Invalid ID
[ ] Unauthorized order
```

## RFQs

```text
[ ] List
[ ] Empty state
[ ] Status
[ ] Date
[ ] Product
[ ] Quantity
[ ] Details
```

## RFQ Details

```text
[ ] Customer information
[ ] Requirements
[ ] Attachments
[ ] Status
[ ] Quote availability
[ ] Unauthorized RFQ
```

## Quotes

```text
[ ] List
[ ] Status
[ ] Price
[ ] Expiry
[ ] Details
```

## Quote Details

```text
[ ] Quote details
[ ] Items
[ ] Price
[ ] Quantity
[ ] Delivery
[ ] Expiry
[ ] Accept
[ ] Reject
```

Accept:

```text
[ ] Confirmation
[ ] Submit
[ ] Loading
[ ] Success
[ ] Order created
[ ] Duplicate accept prevented
```

Reject:

```text
[ ] Confirmation
[ ] Reason
[ ] Submit
[ ] Success
```

---

# 20. Admin Authentication

## `/admin/login`

Test:

```text
[ ] Admin credentials
[ ] Invalid credentials
[ ] Customer credentials rejected
[ ] Loading
[ ] API error
[ ] Logout
[ ] Session persistence
```

---

# 21. Admin Authorization

Test:

```text
[ ] Guest cannot access admin
[ ] Customer cannot access admin
[ ] Admin can access admin
[ ] Direct protected URL
[ ] Session expiration
[ ] Logout
```

---

# 22. Admin Dashboard

```text
[ ] Metrics
[ ] Orders
[ ] RFQs
[ ] Quotes
[ ] Products
[ ] Navigation
[ ] Loading
[ ] Empty
[ ] API failure
```

---

# 23. Admin Products

## List

```text
[ ] Product list
[ ] Search
[ ] Filter
[ ] Sort
[ ] Pagination
[ ] Create
[ ] Edit
[ ] Delete
```

## Create

```text
[ ] Name
[ ] Slug
[ ] Description
[ ] Category
[ ] Images
[ ] Price
[ ] MOQ
[ ] Dimensions
[ ] Material
[ ] Stock
[ ] Status
```

Validation:

```text
[ ] Required fields
[ ] Invalid price
[ ] Negative price
[ ] Invalid MOQ
[ ] Duplicate slug
[ ] Invalid image
[ ] API failure
```

## Edit

```text
[ ] Load
[ ] Edit
[ ] Save
[ ] Cancel
[ ] Delete
[ ] Validation
[ ] API failure
[ ] Invalid ID
```

---

# 24. Admin RFQs

## List

```text
[ ] List
[ ] Search
[ ] Filter
[ ] Sort
[ ] Pagination
[ ] Open
```

## Details

```text
[ ] Customer
[ ] Requirements
[ ] Attachments
[ ] Quantity
[ ] Delivery
[ ] Status
[ ] Create quote
[ ] Reject
```

---

# 25. Admin Quotes

## List

```text
[ ] List
[ ] Search
[ ] Filter
[ ] Status
[ ] Open
```

## Create

```text
[ ] Customer
[ ] RFQ
[ ] Items
[ ] Quantity
[ ] Unit price
[ ] Discount
[ ] Shipping
[ ] Tax
[ ] Total
[ ] Validity
[ ] Notes
[ ] Submit
```

Calculation tests:

```text
[ ] Subtotal
[ ] Discount
[ ] Shipping
[ ] Tax
[ ] Final total
[ ] Decimal handling
[ ] Rounding
```

## Details

```text
[ ] View
[ ] Edit
[ ] Send
[ ] Cancel
[ ] Status
[ ] Customer visibility
```

---

# 26. Admin Orders

## List

```text
[ ] List
[ ] Search
[ ] Filter
[ ] Date filter
[ ] Customer filter
[ ] Status filter
[ ] Pagination
[ ] Open
```

## Details

```text
[ ] Customer
[ ] Items
[ ] Payment
[ ] Address
[ ] Status
[ ] Courier
[ ] AWB
[ ] Tracking URL
[ ] Save
```

Status transitions:

```text
Pending
→ Confirmed
→ Processing
→ Shipped
→ Delivered
```

Test:

```text
[ ] Valid transitions
[ ] Invalid transitions
[ ] Loading
[ ] Failure
[ ] Duplicate update
```

---

# 27. Legal Pages

Test:

```text
/terms
/privacy
/shipping-policy
/refund-policy
```

Each:

```text
[ ] Loads
[ ] Content renders
[ ] Navigation works
[ ] Mobile layout
[ ] Desktop layout
```

---

# 28. Error Testing

Every API-driven feature must test:

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Validation Error
429 Rate Limited
500 Server Error
502 Bad Gateway
503 Service Unavailable
Network Error
Timeout
Malformed Response
Empty Response
```

The UI must never expose raw server errors or stack traces.

---

# 29. Loading States

Every asynchronous interaction must test:

```text
[ ] Loading indicator
[ ] Button disabled
[ ] Duplicate submission prevented
[ ] Layout does not break
[ ] Loading ends after success
[ ] Loading ends after failure
```

---

# 30. Empty States

Test:

```text
[ ] Empty cart
[ ] No products
[ ] No search results
[ ] No orders
[ ] No RFQs
[ ] No quotes
[ ] No addresses
[ ] No admin products
[ ] No admin RFQs
[ ] No admin quotes
[ ] No admin orders
```

---

# 31. Accessibility

Run axe on all major pages.

Check:

```text
[ ] Missing labels
[ ] Button names
[ ] Link names
[ ] Heading hierarchy
[ ] Image alt text
[ ] Color contrast
[ ] Keyboard navigation
[ ] Focus state
[ ] Modal focus trap
[ ] Tab order
[ ] ARIA attributes
[ ] Form errors
```

Critical accessibility violations must fail CI.

---

# 32. Visual Regression

Create screenshot baselines for:

```text
Homepage
Products
Product Details
Bulk Orders
Custom Packaging
Cart
Checkout
Login
Signup
Account
Orders
RFQs
Quotes
Admin Dashboard
Admin Products
Admin RFQs
Admin Quotes
Admin Orders
```

Screenshots should be taken at mobile and desktop.

---

# 33. Business Journeys

These are the highest-value tests.

## Journey A — Product Purchase

```text
Homepage
→ Products
→ Product Details
→ Add to Cart
→ Cart
→ Checkout
→ Payment
→ Order Success
→ Account
→ Orders
→ Order Details
```

## Journey B — Bulk RFQ

```text
Homepage
→ Bulk Orders
→ Fill RFQ
→ Submit
→ Success
→ Login
→ Account
→ RFQs
→ RFQ Details
```

## Journey C — RFQ → Quote → Order

```text
Customer
→ Create RFQ

Admin
→ Login
→ RFQs
→ Open RFQ
→ Create Quote
→ Submit

Customer
→ Quotes
→ Open Quote
→ Accept

System
→ Order Created

Customer
→ Orders
→ Order Details
```

## Journey D — Product Management

```text
Admin
→ Login
→ Products
→ Create Product
→ Save
→ Product List
→ Edit Product
→ Save

Customer
→ Products
→ Product Details
→ Verify Product
```

## Journey E — Order Fulfillment

```text
Admin
→ Orders
→ Open Order
→ Confirm
→ Processing
→ Shipped
→ Add AWB
→ Add Tracking
→ Delivered

Customer
→ Order Details
→ Verify status
→ Verify tracking
```

---

# 34. Test Data

Use deterministic test data.

Recommended fixtures:

```text
customer
admin
product
cart
address
order
rfq
quote
```

Do not depend on random production data.

Use isolated test users.

---

# 35. Authentication Fixtures

Create reusable fixtures:

```text
guestPage
customerPage
adminPage
```

Tests should not repeat login code unnecessarily.

---

# 36. Test Tags

Use:

```text
@smoke
@critical
@regression
@auth
@customer
@admin
@cart
@checkout
@rfq
@quote
@accessibility
@visual
```

Examples:

```bash
npx playwright test --grep @smoke
npx playwright test --grep @critical
npx playwright test --grep @regression
```

---

# 37. Smoke Suite

Smoke tests must cover:

```text
Homepage
Products
Product Details
Login
Signup
Cart
Checkout
Bulk Orders
Customer Dashboard
Admin Login
Admin Dashboard
```

Smoke suite must finish quickly enough to run on every PR.

---

# 38. Regression Suite

Regression includes:

- All routes
- All forms
- All validations
- All critical buttons
- All major API states
- All business journeys
- Accessibility
- Responsive behavior
- Browser matrix

---

# 39. CI Pipeline

Recommended:

```text
Pull Request
    ↓
Install dependencies
    ↓
Lint
    ↓
Unit tests
    ↓
Build
    ↓
Playwright smoke
    ↓
PASS
```

Main branch:

```text
Lint
 ↓
Unit tests
 ↓
Build
 ↓
Full Playwright regression
 ↓
Chromium
Firefox
WebKit
 ↓
Accessibility
 ↓
Visual regression
 ↓
Deploy
```

---

# 40. Failure Artifacts

For failed tests capture:

```text
[ ] Screenshot
[ ] Video where useful
[ ] Trace
[ ] Console logs
[ ] Network information
[ ] Error message
```

Playwright traces should be retained for failed tests.

---

# 41. Test Naming

Use descriptive names.

Good:

```javascript
test('customer cannot access another customer order', async ({
  customerPage,
}) => {});
```

Bad:

```javascript
test('order test', async () => {});
```

---

# 42. Definition of Done

A testing task is complete only when:

```text
[ ] Test implemented
[ ] Test executed
[ ] Test passes
[ ] Failure scenarios tested
[ ] Loading state tested
[ ] Empty state tested
[ ] Responsive behavior tested where applicable
[ ] Accessibility tested where applicable
[ ] No flaky behavior
[ ] Test uses stable selectors
[ ] Test data is deterministic
[ ] Documentation updated
```

---

# 43. Definition of Production Ready

BoxKart frontend testing is considered production-ready when:

```text
100% critical routes covered
100% critical business journeys covered
100% critical forms covered
100% critical authentication flows covered
100% critical authorization scenarios covered
All important API failures covered
Smoke suite passes
Regression suite passes
Chromium passes
Firefox passes
WebKit passes
Accessibility passes
Visual regression passes
No known critical test failures
No high-severity flaky tests
CI pipeline is automated
```

---

# 44. Antigravity Rules

Antigravity MUST:

1. Inspect before modifying.
2. Never invent routes.
3. Never invent fields.
4. Never assume API behavior.
5. Reuse existing components and selectors.
6. Prefer accessible selectors.
7. Avoid arbitrary waits such as `waitForTimeout`.
8. Use Playwright auto-waiting.
9. Create reusable fixtures.
10. Keep test data deterministic.
11. Mock external services where appropriate.
12. Never weaken assertions simply to pass.
13. Never delete failing tests without explanation.
14. Report application defects separately.
15. Run tests after implementation.
16. Fix flaky tests properly.
17. Keep tests independent.
18. Avoid test-order dependencies.
19. Keep critical business journeys separate from page tests.
20. Update the task status after each completed task.

---

# 45. Expected Test Architecture

```text
tests/
├── e2e/
│   ├── public/
│   ├── auth/
│   ├── customer/
│   ├── admin/
│   └── journeys/
│
├── components/
├── fixtures/
├── helpers/
├── mocks/
├── data/
└── visual/
```

---

# 46. Final Goal

The BoxKart test system should provide confidence that:

> A customer can discover a product, configure or purchase it, submit a bulk RFQ, receive a quote, accept the quote, create an order, and track that order — while the BoxKart admin can manage products, RFQs, quotes, and fulfillment without breaking the customer experience.

Every critical part of that journey must be automatically verified.
