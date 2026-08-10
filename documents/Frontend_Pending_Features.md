# BoxKart - Pending Frontend Features

Based on the MVP specification, the following frontend features and pages are pending implementation.

## 1. 🛡️ Admin Dashboard (Entirely Pending)

The entire `/admin` section is currently missing. The following routes and UI components are required:

- **`/admin`**: Main Dashboard (metrics, recent activity).
- **`/admin/products` & `/admin/products/new` & `/admin/products/[id]`**: Product listing, creation, and editing flows.
- **`/admin/categories`**: Category management.
- **`/admin/rfqs` & `/admin/rfqs/[id]`**: RFQ list and detailed review view.
- **`/admin/quotes` & `/admin/quotes/[id]`**: Quote management and quote generation/editing flow.
- **`/admin/orders` & `/admin/orders/[id]`**: Order management and status updates.
- **`/admin/customers` & `/admin/customers/[id]`**: Customer management and detail views.
- **`/admin/custom-packaging`**: Management of custom packaging requests.

## 2. 👤 Customer Account Sub-pages

While the main `/account` page exists, the specific detailed sub-routes required by the MVP are pending:

- **`/account/orders` & `/account/orders/[id]`**: Order history list and detailed order tracking.
- **`/account/rfqs` & `/account/rfqs/[id]`**: RFQ history and detailed RFQ status views.
- **`/account/quotes/[id]`**: Dedicated page for customers to view, accept, or reject quotes sent by the admin.

## 3. ⚙️ Forms & Client-Side Validation

- **Zod Schemas & React Hook Form**: Need to be implemented across all forms (Checkout, Custom Packaging, RFQ, Login/Signup) for robust client-side validation before hitting the APIs.
- **File Uploads**: Implementation of secure file upload UI with size/type validation for the Custom Packaging Wizard (logo/artwork) and Bulk Orders (CSV/XLSX parsing).

## 4. 🔄 UI Production States

Every page needs to be hardened with specific states:

- **Loading States**: Skeletons or spinners for when data is being fetched (`loading.js`).
- **Error & Retry States**: Graceful error boundaries (`error.js`) for API failures.
- **Empty States**: E.g., Empty cart, no orders found, no search results.
- **Success States**: Clear confirmation screens (e.g., after submitting an RFQ or placing an order).

## 5. 🔌 Backend Integration

Wiring up the UI to the actual Next.js API Routes once they are built:

- Replacing mocked product data with actual database queries.
- Connecting the Cart to the Cart API for persistence.
- Hooking up Authentication to protect the `/account` and `/admin` routes.
- Firing the required business events for Analytics (`product_view`, `add_to_cart`, `rfq_submitted`).
