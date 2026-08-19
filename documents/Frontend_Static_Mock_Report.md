# Frontend Static & Mock Data Report

_(Excluding Admin Panel: `app/admin` and `services/admin`)_

### 1. Forms & Submissions (Mocked)

All of these pages have working UI and validation, but the final submission is faked using a `setTimeout` (mock network delay) instead of hitting the backend:

- ~~**Contact Us** (`app/contact/page.js`): Fake submission delay.~~ _(Integrated)_
- [x] **Forgot Password** (`app/forgot-password/page.js`): Fake submission delay removed, integrated with `authApi.forgotPassword`.
- [x] **Reset Password** (`app/reset-password/page.js`): Fake submission delay removed, integrated with `authApi.resetPassword` reading token from URL.
- **Custom Packaging Wizard** (`components/custom-packaging/CustomPackagingWizard.jsx`): Fake submission delay; no real endpoint exists to catch the complex configuration.

### 2. Products & Catalog (Static Data)

Several components are still pulling data directly from the hardcoded `data/` folder instead of hitting `/api/v1/catalog`:

- [x] **Global Search** (`lib/search.js`): Refactored to fetch dynamic suggestions and products from the API endpoint.
- [x] **Products Listing Page** (`app/products/page.js`): Imports `categories` directly from `data/categories.js`.
- [x] **Product Details Page** (`app/products/[slug]/page.js`): Imports `getPriceForQuantity()` directly from `data/products.js` to calculate pricing on the client side.
- [x] **Packaging Bundles** (`components/product/PackagingBundles.jsx`): Imports `staticBundles` from `data/bundles.js`.

### 3. Account Dashboard (Mocked)

While Orders, Addresses, and Profile Details are connected to the API, these two pages still use hardcoded arrays at the top of the file:

- **RFQs Page** (`app/account/rfqs/page.js`): Renders a static `MOCK_RFQS` array.
- **Quotes Page** (`app/account/quotes/page.js`): Renders a static `MOCK_QUOTES` array.

### 4. Checkout & Payments (Left out)

- **Checkout Page** (`app/checkout/page.js`): Contains hardcoded logic for payment modes and displays the message `"Payment integration coming soon"`.
- **FAQ Section** (`components/home/FAQ.jsx`): Has a question stating that online payment integration is "coming soon".

### 5. Dead Links

- ~~**Profile Page** (`app/account/profile/page.js`): There is a `href="#"` dead link in the "Update Password" section.~~ _(Fixed)_

---

_Note: Authentication, Profile, Orders, Addresses, BoxFinder, and Homepage Server-Side data fetching are properly integrated._
