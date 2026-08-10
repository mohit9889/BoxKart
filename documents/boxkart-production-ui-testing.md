# BoxKart Production-Ready UI Testing Scenarios

## Purpose

AI-agent-executable QA checklist for validating the BoxKart frontend before backend integration and production release.

The agent must execute scenarios systematically, record failures, fix frontend issues where appropriate, and re-run failed scenarios after fixes.

## Scope

Test:

- Homepage
- Product listing
- Product detail
- Search and filters
- Cart
- Checkout
- Bulk Orders / B2B RFQ
- CSV/XLSX upload UI
- Authentication/account UI if present
- Navigation
- Responsive layouts
- Accessibility
- Loading/error/empty/success states
- Forms and validation
- Animations
- SEO
- Performance
- Frontend security-sensitive behavior
- Browser compatibility
- Mock API/service behavior

---

# 1. Agent Execution Rules

- Work through scenarios in order.
- Do not skip a scenario because the UI appears correct visually.
- Test happy paths and failure paths.
- Use realistic test data; never use real payment credentials, secrets, or production customer data.
- If backend/API is unavailable, use approved mock services.
- Record every failure with scenario ID, URL, steps, expected result, actual result, console/network error, severity, and fix.
- Re-run failed scenarios after fixes.
- Run regression tests after major changes.

### Severity

- P0 — Blocker: app unusable, data loss, critical checkout/order failure, severe security issue.
- P1 — Critical: major feature broken or serious accessibility/responsive issue.
- P2 — Major: important feature degraded but workaround exists.
- P3 — Minor: noticeable UX/visual defect.
- P4 — Cosmetic: low-impact visual/content defect.

### Pass Criteria

A scenario passes only when the expected interaction works, no unexpected console/network errors occur, state transitions are correct, and there is no related accessibility or layout defect.

---

# 2. Test Environment Matrix

## Browsers

- Chrome latest
- Safari latest
- Firefox latest
- Edge latest
- Chrome Android
- Safari iOS

## Viewports

- 320 × 568
- 375 × 667
- 390 × 844
- 430 × 932
- 768 × 1024
- 1024 × 768
- 1280 × 800
- 1440 × 900
- 1920 × 1080

---

# 3. Homepage

- [ ] HOME-001 Homepage loads correctly.
- [ ] HOME-002 Hard refresh works without hydration errors.
- [ ] HOME-003 Every header link works.
- [ ] HOME-004 Logo returns to homepage.
- [ ] HOME-005 Every hero CTA works.
- [ ] HOME-006 Product/category cards navigate correctly.
- [ ] HOME-007 Promotional sections have working images and CTAs.
- [ ] HOME-008 Footer links and legal links work.
- [ ] HOME-009 No broken images or layout shifts.
- [ ] HOME-010 Homepage works on all target viewports.

---

# 4. Navigation

- [ ] NAV-001 Every important route works by direct URL.
- [ ] NAV-002 Browser Back preserves sensible state.
- [ ] NAV-003 Browser Forward works.
- [ ] NAV-004 Deep-link refresh works.
- [ ] NAV-005 Unknown routes show a useful 404.
- [ ] NAV-006 Mobile navigation opens and closes correctly.
- [ ] NAV-007 Escape closes open navigation menus where appropriate.
- [ ] NAV-008 Focus returns correctly after closing menus.

---

# 5. Product Listing

- [ ] PLP-001 Product listing loads.
- [ ] PLP-002 Empty product list has a useful empty state.
- [ ] PLP-003 Product cards show all required information.
- [ ] PLP-004 Product card hover/focus states work without layout shifts.
- [ ] PLP-005 Product cards are keyboard accessible.
- [ ] PLP-006 Pagination/load-more works.
- [ ] PLP-007 Loading state works.
- [ ] PLP-008 End-of-results state works.
- [ ] PLP-009 Product images have correct aspect ratios.
- [ ] PLP-010 No duplicate/missing products after pagination or loading.

---

# 6. Search

- [ ] SEARCH-001 Search known product.
- [ ] SEARCH-002 Search partial term.
- [ ] SEARCH-003 Search uppercase/lowercase.
- [ ] SEARCH-004 Search special characters safely.
- [ ] SEARCH-005 Search no-results state.
- [ ] SEARCH-006 Search loading state.
- [ ] SEARCH-007 Clear search.
- [ ] SEARCH-008 Search query persistence behaves as intended.
- [ ] SEARCH-009 Rapidly changing search queries do not produce stale results.
- [ ] SEARCH-010 Search input is keyboard accessible.

---

# 7. Filters and Sorting

- [ ] FILTER-001 Apply one filter.
- [ ] FILTER-002 Apply multiple filters.
- [ ] FILTER-003 Remove one filter.
- [ ] FILTER-004 Clear all filters.
- [ ] FILTER-005 Filter produces no results.
- [ ] FILTER-006 Filter persistence behaves correctly.
- [ ] FILTER-007 Test every sorting option.
- [ ] FILTER-008 Sorting does not lose selected filters.
- [ ] FILTER-009 Mobile filter drawer works.
- [ ] FILTER-010 Filter drawer closes correctly and restores focus.

---

# 8. Product Detail

- [ ] PDP-001 Product page loads.
- [ ] PDP-002 Image gallery works.
- [ ] PDP-003 Image zoom/lightbox works if present.
- [ ] PDP-004 Keyboard gallery controls work.
- [ ] PDP-005 Product variants update correctly.
- [ ] PDP-006 Quantity plus/minus works.
- [ ] PDP-007 Direct quantity input validates correctly.
- [ ] PDP-008 MOQ is enforced where applicable.
- [ ] PDP-009 Add to cart adds the correct product/variant/quantity.
- [ ] PDP-010 Repeated Add to Cart behaves correctly.
- [ ] PDP-011 Out-of-stock state works.
- [ ] PDP-012 Missing product/not-found state works.
- [ ] PDP-013 Product detail works on mobile.

---

# 9. Cart

- [ ] CART-001 Empty cart state.
- [ ] CART-002 Add one product.
- [ ] CART-003 Add multiple products.
- [ ] CART-004 Increase quantity.
- [ ] CART-005 Decrease quantity.
- [ ] CART-006 Remove product.
- [ ] CART-007 Invalid quantity values.
- [ ] CART-008 Line totals are correct.
- [ ] CART-009 Subtotal is correct.
- [ ] CART-010 Discount logic works if present.
- [ ] CART-011 Shipping/tax totals are correct if present.
- [ ] CART-012 Cart persistence after refresh.
- [ ] CART-013 Cart persists across navigation.
- [ ] CART-014 Invalid/corrupted stored cart data does not crash the app.
- [ ] CART-015 Unavailable product is handled safely.
- [ ] CART-016 Cart count/badge stays synchronized.
- [ ] CART-017 Cart works on mobile.

---

# 10. Checkout

- [ ] CHECKOUT-001 Empty cart cannot enter misleading checkout.
- [ ] CHECKOUT-002 Checkout layout loads.
- [ ] CHECKOUT-003 Contact validation.
- [ ] CHECKOUT-004 Guest checkout works if supported.
- [ ] CHECKOUT-005 Individual customer flow.
- [ ] CHECKOUT-006 Business customer flow.
- [ ] CHECKOUT-007 Business fields appear/disappear correctly.
- [ ] CHECKOUT-008 GSTIN validation.
- [ ] CHECKOUT-009 Address validation.
- [ ] CHECKOUT-010 Indian state selection.
- [ ] CHECKOUT-011 Pincode validation.
- [ ] CHECKOUT-012 Pincode serviceability loading/success/failure states.
- [ ] CHECKOUT-013 Shipping method selection.
- [ ] CHECKOUT-014 Order summary matches cart.
- [ ] CHECKOUT-015 Cart and checkout pricing remain consistent.
- [ ] CHECKOUT-016 Terms checkbox blocks submission when required.
- [ ] CHECKOUT-017 Review step displays all data correctly.
- [ ] CHECKOUT-018 Edit actions preserve entered data.
- [ ] CHECKOUT-019 Place Order loading state.
- [ ] CHECKOUT-020 Duplicate clicks cannot create duplicate submission.
- [ ] CHECKOUT-021 Payment success flow.
- [ ] CHECKOUT-022 Payment failure flow.
- [ ] CHECKOUT-023 Payment retry.
- [ ] CHECKOUT-024 Order creation failure state.
- [ ] CHECKOUT-025 Confirmation page.
- [ ] CHECKOUT-026 Checkout refresh/recovery behavior.
- [ ] CHECKOUT-027 No sensitive payment data is stored client-side.
- [ ] CHECKOUT-028 Checkout works on mobile.

---

# 11. Bulk Orders / B2B RFQ

- [ ] RFQ-001 `/bulk-orders` loads.
- [ ] RFQ-002 Request Quote workflow starts correctly.
- [ ] RFQ-003 Product category selection.
- [ ] RFQ-004 Product selection.
- [ ] RFQ-005 Dimensions validation: empty, zero, negative, decimal, very large, valid.
- [ ] RFQ-006 Quantity validation including MOQ.
- [ ] RFQ-007 Printing Yes/No conditional fields.
- [ ] RFQ-008 Hidden printing fields do not block submission.
- [ ] RFQ-009 Artwork upload valid/invalid/loading/remove/retry states.
- [ ] RFQ-010 Pincode validation.
- [ ] RFQ-011 Expected delivery date validation.
- [ ] RFQ-012 Additional requirements character limit.
- [ ] RFQ-013 RFQ review accurately reflects entered data.
- [ ] RFQ-014 RFQ edit flow preserves data.
- [ ] RFQ-015 RFQ submit loading state.
- [ ] RFQ-016 Duplicate RFQ submission is prevented.
- [ ] RFQ-017 RFQ success state.
- [ ] RFQ-018 RFQ failure state.
- [ ] RFQ-019 RFQ retry preserves form data.
- [ ] RFQ-020 RFQ works on mobile.

---

# 12. Bulk CSV/XLSX Upload

- [ ] UPLOAD-001 Bulk upload page/section loads.
- [ ] UPLOAD-002 Browse button opens file picker.
- [ ] UPLOAD-003 Drag-and-drop works.
- [ ] UPLOAD-004 Keyboard-accessible upload works.
- [ ] UPLOAD-005 Valid CSV is accepted.
- [ ] UPLOAD-006 Valid XLSX is accepted.
- [ ] UPLOAD-007 PDF/JPG/TXT/ZIP are rejected.
- [ ] UPLOAD-008 Oversized file is rejected.
- [ ] UPLOAD-009 Empty file is handled.
- [ ] UPLOAD-010 Processing/loading state works.
- [ ] UPLOAD-011 Mock parser returns preview data.
- [ ] UPLOAD-012 Valid rows are correctly identified.
- [ ] UPLOAD-013 Invalid rows are correctly identified.
- [ ] UPLOAD-014 Missing dimensions produce row-level errors.
- [ ] UPLOAD-015 Invalid quantity produces row-level errors.
- [ ] UPLOAD-016 Invalid product produces row-level errors.
- [ ] UPLOAD-017 Mixed valid/invalid rows produce correct counts.
- [ ] UPLOAD-018 Specific validation errors are shown per row.
- [ ] UPLOAD-019 Continue with valid rows works.
- [ ] UPLOAD-020 Upload another file resets state safely.
- [ ] UPLOAD-021 Sample template downloads correctly.
- [ ] UPLOAD-022 Bulk review shows correct products and quantities.
- [ ] UPLOAD-023 Bulk submission uses the shared quote service.
- [ ] UPLOAD-024 Upload success state.
- [ ] UPLOAD-025 Upload failure/retry state.
- [ ] UPLOAD-026 Upload preview is usable on mobile.

---

# 13. Forms

- [ ] FORM-001 Required fields reject empty values.
- [ ] FORM-002 Optional fields do not block submission.
- [ ] FORM-003 Whitespace-only values are handled correctly.
- [ ] FORM-004 Special characters are handled safely.
- [ ] FORM-005 Paste works.
- [ ] FORM-006 Browser autofill does not break forms.
- [ ] FORM-007 Tab order is logical.
- [ ] FORM-008 Enter key behavior is correct.
- [ ] FORM-009 Invalid input can be corrected.
- [ ] FORM-010 Error messages disappear/update correctly after correction.
- [ ] FORM-011 Form state is preserved during recoverable errors.
- [ ] FORM-012 Submit buttons are disabled while processing.

---

# 14. Loading States

Test every asynchronous feature.

- [ ] LOAD-001 Initial page loading.
- [ ] LOAD-002 Product loading.
- [ ] LOAD-003 Search loading.
- [ ] LOAD-004 Filter loading.
- [ ] LOAD-005 Cart operation loading.
- [ ] LOAD-006 Checkout loading.
- [ ] LOAD-007 Payment loading.
- [ ] LOAD-008 Order creation loading.
- [ ] LOAD-009 RFQ submission loading.
- [ ] LOAD-010 File processing loading.
- [ ] LOAD-011 No infinite spinner.
- [ ] LOAD-012 Loading states do not cause layout collapse.
- [ ] LOAD-013 Loading states prevent inappropriate duplicate actions.

---

# 15. Error States

Force failures for:

- [ ] ERROR-001 Product API.
- [ ] ERROR-002 Search API.
- [ ] ERROR-003 Filter API.
- [ ] ERROR-004 Cart operation.
- [ ] ERROR-005 Checkout.
- [ ] ERROR-006 Payment.
- [ ] ERROR-007 Order creation.
- [ ] ERROR-008 RFQ submission.
- [ ] ERROR-009 File parser.
- [ ] ERROR-010 Network offline.

For each:

- [ ] Friendly error message.
- [ ] Retry where appropriate.
- [ ] No raw stack traces.
- [ ] No secrets exposed.
- [ ] User-entered data preserved where appropriate.

---

# 16. Empty States

- [ ] EMPTY-001 Empty cart.
- [ ] EMPTY-002 No products.
- [ ] EMPTY-003 No search results.
- [ ] EMPTY-004 No filter results.
- [ ] EMPTY-005 No orders if applicable.
- [ ] EMPTY-006 No upload rows.
- [ ] EMPTY-007 No valid upload rows.
- [ ] EMPTY-008 Every empty state explains what happened.
- [ ] EMPTY-009 Every actionable empty state provides a useful next step.

---

# 17. Responsive Testing

Run core flows at:

- [ ] RESP-001 320px.
- [ ] RESP-002 375px.
- [ ] RESP-003 390px.
- [ ] RESP-004 430px.
- [ ] RESP-005 768px.
- [ ] RESP-006 1024px.
- [ ] RESP-007 1280px.
- [ ] RESP-008 1440px.
- [ ] RESP-009 1920px.
- [ ] RESP-010 Portrait.
- [ ] RESP-011 Landscape.

Check:

- no horizontal overflow
- no clipped content
- no inaccessible buttons
- no broken grids
- no oversized headings
- no unusable tables
- no overlapping sticky elements

---

# 18. Visual Regression

Capture screenshots for:

- [ ] VISUAL-001 Homepage.
- [ ] VISUAL-002 Product listing.
- [ ] VISUAL-003 Product detail.
- [ ] VISUAL-004 Cart.
- [ ] VISUAL-005 Checkout.
- [ ] VISUAL-006 Bulk Orders.
- [ ] VISUAL-007 RFQ form.
- [ ] VISUAL-008 Upload preview.
- [ ] VISUAL-009 Success state.
- [ ] VISUAL-010 Error state.
- [ ] VISUAL-011 Empty states.

Check:

- typography
- spacing
- buttons
- forms
- cards
- borders/radius
- shadows
- image aspect ratios
- responsive alignment

---

# 19. Accessibility

- [ ] A11Y-001 Complete site navigable using keyboard only.
- [ ] A11Y-002 Visible focus exists for interactive elements.
- [ ] A11Y-003 Logical focus order.
- [ ] A11Y-004 Inputs have accessible labels.
- [ ] A11Y-005 Buttons have accessible names.
- [ ] A11Y-006 Images have appropriate alt text.
- [ ] A11Y-007 Form errors are programmatically associated.
- [ ] A11Y-008 Errors do not rely only on color.
- [ ] A11Y-009 Radio groups use appropriate semantics.
- [ ] A11Y-010 Checkboxes are keyboard accessible.
- [ ] A11Y-011 Dialog focus management works.
- [ ] A11Y-012 Escape closes dialogs/menus where appropriate.
- [ ] A11Y-013 Focus returns to trigger after closing overlays.
- [ ] A11Y-014 `prefers-reduced-motion` is respected.
- [ ] A11Y-015 Color contrast is acceptable.
- [ ] A11Y-016 Mobile touch targets are appropriately sized.
- [ ] A11Y-017 Upload dropzone has a keyboard alternative.

---

# 20. Animation / Framer Motion

- [ ] MOTION-001 Page transitions are smooth.
- [ ] MOTION-002 Hover effects do not cause layout shifts.
- [ ] MOTION-003 Form transitions remain usable.
- [ ] MOTION-004 Loading animations are lightweight.
- [ ] MOTION-005 Success animations are restrained.
- [ ] MOTION-006 Error animations do not obscure messages.
- [ ] MOTION-007 Reduced-motion behavior works.
- [ ] MOTION-008 Animations do not block keyboard interaction.
- [ ] MOTION-009 No excessive animation on repeated renders.

---

# 21. Performance

- [ ] PERF-001 Measure LCP.
- [ ] PERF-002 Measure INP.
- [ ] PERF-003 Measure CLS.
- [ ] PERF-004 Inspect TTFB where applicable.
- [ ] PERF-005 Images are optimized.
- [ ] PERF-006 Images have correct dimensions.
- [ ] PERF-007 Below-fold images use appropriate lazy loading.
- [ ] PERF-008 No obviously unnecessary large dependencies.
- [ ] PERF-009 No duplicate libraries where avoidable.
- [ ] PERF-010 Slow 3G remains usable.
- [ ] PERF-011 Fast 3G remains usable.
- [ ] PERF-012 CPU throttling remains responsive.
- [ ] PERF-013 Repeated navigation does not show obvious memory/listener leaks.

---

# 22. SEO

- [ ] SEO-001 Unique title per important page.
- [ ] SEO-002 Meta description.
- [ ] SEO-003 Canonical URL where appropriate.
- [ ] SEO-004 Appropriate H1.
- [ ] SEO-005 Correct heading hierarchy.
- [ ] SEO-006 Product metadata where appropriate.
- [ ] SEO-007 Meaningful image alt text.
- [ ] SEO-008 Robots configuration.
- [ ] SEO-009 Sitemap configuration.
- [ ] SEO-010 Open Graph metadata where appropriate.
- [ ] SEO-011 Important content is server-rendered/indexable where intended.

---

# 23. Security-Sensitive Frontend Checks

- [ ] SEC-001 `<script>alert(1)</script>` is safely handled in text inputs.
- [ ] SEC-002 HTML markup is safely handled.
- [ ] SEC-003 URL/query parameters cannot inject markup/scripts.
- [ ] SEC-004 No payment secrets are stored in localStorage/sessionStorage.
- [ ] SEC-005 No private environment variables are exposed client-side.
- [ ] SEC-006 Error messages do not expose tokens or stack traces.
- [ ] SEC-007 User-provided content is safely rendered.
- [ ] SEC-008 File upload validation cannot be bypassed by UI alone in any future server integration; frontend validation is treated only as UX.

---

# 24. Browser Storage

- [ ] STORAGE-001 Only intended localStorage/sessionStorage data exists.
- [ ] STORAGE-002 Clearing storage does not crash the app.
- [ ] STORAGE-003 Corrupted cart storage is handled safely.
- [ ] STORAGE-004 Corrupted checkout/RFQ state is handled safely.
- [ ] STORAGE-005 Sensitive payment information is never persisted.
- [ ] STORAGE-006 Stored state has sensible expiry/cleanup where applicable.

---

# 25. Network Conditions

- [ ] NETWORK-001 Slow API response.
- [ ] NETWORK-002 HTTP 400.
- [ ] NETWORK-003 HTTP 401 where applicable.
- [ ] NETWORK-004 HTTP 403 where applicable.
- [ ] NETWORK-005 HTTP 404.
- [ ] NETWORK-006 HTTP 500.
- [ ] NETWORK-007 Network timeout.
- [ ] NETWORK-008 Offline mode.
- [ ] NETWORK-009 Recovery after network returns.
- [ ] NETWORK-010 No stale response overwrites newer user input/state.

---

# 26. Duplicate Actions

Rapidly double-click or repeatedly activate:

- [ ] DUP-001 Add to Cart.
- [ ] DUP-002 Quantity controls.
- [ ] DUP-003 Checkout.
- [ ] DUP-004 Place Order.
- [ ] DUP-005 Submit RFQ.
- [ ] DUP-006 Upload.
- [ ] DUP-007 Retry.

Expected:

- No duplicate orders/RFQs.
- No duplicated cart items unless intended.
- Buttons become appropriately disabled while processing.

---

# 27. Data Integrity

- [ ] DATA-001 Cart quantity matches checkout quantity.
- [ ] DATA-002 Cart product matches checkout product.
- [ ] DATA-003 Cart pricing matches checkout pricing.
- [ ] DATA-004 RFQ review matches entered form.
- [ ] DATA-005 Uploaded valid rows match preview.
- [ ] DATA-006 Uploaded valid rows match final review.
- [ ] DATA-007 Success reference matches mock service response.
- [ ] DATA-008 Changing one field does not unexpectedly change unrelated fields.

---

# 28. State Persistence and Recovery

- [ ] STATE-001 Refresh product page.
- [ ] STATE-002 Refresh cart.
- [ ] STATE-003 Refresh checkout.
- [ ] STATE-004 Refresh RFQ.
- [ ] STATE-005 Refresh upload flow.
- [ ] STATE-006 Loading/submitting transient states are not incorrectly persisted.
- [ ] STATE-007 Recoverable errors do not erase user input.
- [ ] STATE-008 Back/forward navigation does not corrupt state.

---

# 29. Final End-to-End Scenarios

## E2E-001 Normal Shopping

```text
Homepage
→ Category
→ Product
→ Add to Cart
→ Cart
→ Checkout
→ Contact
→ Address
→ Review
→ Payment
→ Order Success
```

- [ ] Complete successfully.

## E2E-002 Business Checkout

```text
Product
→ Cart
→ Checkout
→ Business
→ GSTIN
→ Address
→ Review
→ Payment
→ Success
```

- [ ] Complete successfully.

## E2E-003 Single RFQ

```text
Bulk Orders
→ Request Quote
→ Product
→ Dimensions
→ Quantity
→ Printing
→ Delivery
→ Review
→ Submit
→ RFQ Success
```

- [ ] Complete successfully.

## E2E-004 Bulk Spreadsheet RFQ

```text
Bulk Orders
→ Upload Bulk Order
→ CSV/XLSX
→ Parse
→ Preview
→ Invalid Rows
→ Continue Valid Rows
→ Review
→ Submit
→ Success
```

- [ ] Complete successfully.

## E2E-005 RFQ Failure Recovery

```text
RFQ
→ Submit
→ Error
→ Retry
→ Success
```

- [ ] Complete successfully.

## E2E-006 Payment Failure Recovery

```text
Checkout
→ Payment
→ Failure
→ Retry
→ Success
```

- [ ] Complete successfully.

## E2E-007 Empty Cart Recovery

```text
Cart
→ Empty
→ Browse Products
→ Product
→ Add to Cart
→ Checkout
```

- [ ] Complete successfully.

## E2E-008 Mobile Shopping

Run the complete shopping flow at 390px.

- [ ] Complete successfully.

## E2E-009 Mobile Bulk Orders

Run RFQ and upload flows at 390px.

- [ ] Complete successfully.

## E2E-010 Slow Network Shopping

Run a critical E2E flow under Slow 3G.

- [ ] Complete successfully.

---

# 30. Regression Suite

After every significant frontend change, re-run at minimum:

- [ ] REG-001 HOME-001
- [ ] REG-002 NAV-001
- [ ] REG-003 PLP-001
- [ ] REG-004 PDP-001
- [ ] REG-005 PDP-009
- [ ] REG-006 CART-001
- [ ] REG-007 CART-003
- [ ] REG-008 CART-006
- [ ] REG-009 CHECKOUT-001
- [ ] REG-010 CHECKOUT-002
- [ ] REG-011 CHECKOUT-020
- [ ] REG-012 CHECKOUT-021
- [ ] REG-013 RFQ-001
- [ ] REG-014 RFQ-016
- [ ] REG-015 UPLOAD-001
- [ ] REG-016 UPLOAD-005
- [ ] REG-017 UPLOAD-017
- [ ] REG-018 E2E-001
- [ ] REG-019 E2E-003
- [ ] REG-020 RESP-003
- [ ] REG-021 A11Y-001

---

# 31. Production Build

- [ ] BUILD-001 Production build succeeds.
- [ ] BUILD-002 Lint passes.
- [ ] BUILD-003 Automated tests pass.
- [ ] BUILD-004 Production server works locally.
- [ ] BUILD-005 Browser console has no unexpected errors.
- [ ] BUILD-006 No hydration mismatch.
- [ ] BUILD-007 No missing static assets.
- [ ] BUILD-008 No broken production routes.

---

# 32. AI Agent Bug Report Format

For every failure create:

```md
### BUG-[number]

Scenario:
[Scenario ID]

Severity:
[P0/P1/P2/P3/P4]

Page:
[URL]

Steps:

1. ...
2. ...
3. ...

Expected:
...

Actual:
...

Console Error:
...

Network Error:
...

Root Cause:
...

Fix:
...

Verification:
...

Status:
[OPEN/FIXED/VERIFIED]
```

---

# 33. Final QA Report

At completion create:

```md
# BoxKart UI QA Report

Date:
Build/Commit:

## Summary

Total Scenarios:
Passed:
Failed:
Blocked:
Skipped:

## Severity

P0:
P1:
P2:
P3:
P4:

## Critical Issues

-

## Major Issues

-

## Minor Issues

-

## Accessibility

PASS / FAIL

## Responsive

PASS / FAIL

## Performance

PASS / FAIL

## SEO

PASS / FAIL

## Security Checks

PASS / FAIL

## Production Build

PASS / FAIL

## Final Recommendation

READY / NOT READY

## Remaining Issues

-

## Recommended Next Actions

-
```

---

# 34. Production Readiness Gate

BoxKart must NOT be marked production-ready if:

- Any unresolved P0 exists.
- Any unresolved P1 exists.
- Checkout cannot complete successfully.
- Cart calculations are inconsistent.
- RFQ submission is broken.
- Critical mobile layouts are broken.
- Major keyboard navigation is broken.
- Major forms cannot be completed accessibly.
- Production build fails.
- Hydration errors remain.
- Critical console errors remain.
- Secrets are exposed client-side.
- User input is lost during expected recoverable error states.

P2/P3 issues may only be accepted if explicitly documented.

---

# 35. Final AI Agent Instructions

The AI agent must:

1. Inspect the existing BoxKart implementation before testing.
2. Discover all routes and major interactive components.
3. Execute this checklist systematically.
4. Prefer browser automation when available.
5. Capture screenshots for visual verification.
6. Inspect browser console.
7. Inspect network requests.
8. Test responsive breakpoints.
9. Test keyboard navigation.
10. Fix frontend bugs it can safely fix.
11. Never silently skip failed scenarios.
12. Re-run failed scenarios after fixes.
13. Run the regression suite after major changes.
14. Maintain a bug log.
15. Generate the final QA report.
16. Do not claim production readiness if critical scenarios remain unresolved.

## Completion Requirement

The final agent response MUST include:

- Total scenarios executed
- Passed
- Failed
- Blocked
- Skipped
- Bugs found
- Bugs fixed
- Remaining issues
- P0/P1/P2/P3/P4 counts
- Production-readiness status
- Recommended next actions
