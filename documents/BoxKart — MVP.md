# BoxKart — MVP Scope & Feature Specification

**Document:** `MVP_SCOPE.md`  
**Version:** 1.0  
**Status:** Development Specification  
**Project:** BoxKart  
**Purpose:** Define the complete scope of the first production-ready BoxKart MVP.

---

# 1. MVP Objective

BoxKart is a B2B packaging procurement platform focused initially on **corrugated boxes and packaging products**.

The first MVP should allow a customer to:

```text
Discover products
        ↓
Search / Filter
        ↓
View product details
        ↓
Select quantity
        ↓
Add to cart
        ↓
Request quote / place order
        ↓
Provide delivery details
        ↓
Receive confirmation
```

For bulk/custom requirements:

```text
Bulk Order
    ↓
Single RFQ / CSV-XLSX Upload
    ↓
Review Requirements
    ↓
Submit RFQ
    ↓
BoxKart Admin Reviews
    ↓
Admin Creates Quote
    ↓
Customer Accepts Quote
    ↓
Order Created
```

The MVP should be simple enough to launch quickly but architected so that future features such as payments, logistics, supplier management, inventory and marketplace functionality can be added without rewriting the core system.

---

# 2. Current Project State

The existing frontend is already a feature-rich Next.js application.

## Current technology

- Next.js 16.3.0
- App Router
- JavaScript
- Tailwind CSS v4
- Framer Motion
- Hugeicons
- Vercel Analytics
- Vercel Speed Insights

## Existing frontend areas

```text
/
├── products
├── custom-packaging
├── bulk-orders
├── cart
├── checkout
└── account
```

## Existing important components/features

- BoxFinder
- CustomPackagingWizard
- CartDrawer
- PincodeChecker
- Pricing utilities
- Cart utilities
- Delivery utilities
- Product UI
- Bulk order UI
- Checkout UI
- Account UI

The backend/services layer is currently not implemented.

---

# 3. MVP Scope

The first MVP consists of:

```text
1. Public Website
2. Product Catalog
3. Product Search & Filtering
4. Product Details
5. Cart
6. Checkout / Order Request
7. Bulk Orders
8. RFQ System
9. CSV/XLSX Bulk Upload
10. Custom Packaging Requests
11. Customer Accounts
12. Admin Dashboard
13. Product Management
14. RFQ Management
15. Quote Management
16. Order Management
17. Customer Management
18. Email Notifications
19. Basic Analytics
20. Production Security
21. Monitoring
22. SEO
23. Accessibility
24. Responsive UI
```

---

# 4. Pages

## 4.1 Public Pages

### `/`

Homepage.

Features:

- Hero section
- Product discovery CTA
- Bulk order CTA
- Product categories
- Featured products
- Popular products
- Why BoxKart
- How BoxKart works
- Custom packaging CTA
- B2B CTA
- FAQ
- Contact CTA
- Footer
- Responsive design
- SEO metadata

Primary CTAs:

```text
Shop Boxes
Request Bulk Quote
Explore Custom Packaging
```

---

## 4.2 `/products`

Product listing page.

Features:

- Product grid
- Search
- Category filtering
- Material filtering
- Ply filtering
- Printing filtering
- Price filtering
- Dimension filtering where applicable
- Sorting
- Pagination / load more
- Empty state
- Loading state
- Error state
- Mobile filter drawer

---

## 4.3 `/products/[slug]`

Product detail page.

Features:

- Product image gallery
- Product name
- Description
- Dimensions
- Material
- Ply
- Flute
- Color
- Printing availability
- Printing options
- MOQ
- Price
- Quantity selector
- Estimated price
- Add to cart
- Request bulk quote
- Product specifications
- Delivery/pincode check
- Related products
- Availability status

Example:

```text
Medium Shipping Box

10 × 8 × 4 inch
5 Ply Corrugated
Brown Kraft

MOQ: 100

Starting from ₹XX / box

Quantity
[-] 500 [+]

Estimated:
₹XX

[Add to Cart]
[Request Bulk Quote]
```

---

# 4.4 `/bulk-orders`

Bulk procurement hub.

Two primary workflows:

```text
Single RFQ
Bulk CSV/XLSX Upload
```

Features:

- Bulk order introduction
- Single RFQ form
- CSV upload
- XLSX upload
- Download sample template
- Validation
- Preview
- Submit RFQ
- Success state
- Error state
- Retry state

---

# 4.5 `/custom-packaging`

Custom packaging request flow.

Use existing:

`CustomPackagingWizard`

Features:

- Packaging type
- Dimensions
- Material
- Ply
- Printing
- Number of colors
- Quantity
- Custom requirements
- Delivery location
- Expected delivery date
- Logo/artwork upload
- Contact information
- Review
- Submit request
- Confirmation

---

# 4.6 `/cart`

Shopping cart.

Features:

- Cart items
- Product image
- Product name
- Dimensions
- Quantity
- Unit price
- Subtotal
- Remove item
- Update quantity
- MOQ validation
- Cart subtotal
- Estimated shipping
- Estimated tax
- Total
- Continue shopping
- Checkout
- Empty cart state

Guest users must be able to use the cart.

---

# 4.7 `/checkout`

Checkout/order creation.

Features:

### Customer information

- Name
- Email
- Phone
- Company name

### Delivery

- Address
- City
- State
- Pincode

### Order summary

- Products
- Quantities
- Unit prices
- Subtotal
- Shipping
- Tax
- Total

### Final action

```text
Place Order / Request Order
```

Payment integration is optional for the first MVP and can initially be handled manually.

---

# 4.8 `/account`

Customer account.

Features:

- Profile
- Personal information
- Company information
- Orders
- RFQs
- Quotes
- Addresses
- Logout

Authentication is required for persistent account functionality.

Guest users should still be able to browse, use cart and submit RFQs.

---

# 4.9 `/account/orders`

Customer order history.

Features:

- Order list
- Order number
- Date
- Amount
- Status
- View order

---

# 4.10 `/account/orders/[id]`

Order details.

Features:

- Order number
- Order date
- Products
- Quantities
- Pricing
- Shipping
- Tax
- Total
- Delivery address
- Order status

Status:

```text
PENDING
CONFIRMED
PROCESSING
READY
SHIPPED
DELIVERED
CANCELLED
```

---

# 4.11 `/account/rfqs`

Customer RFQ history.

Features:

- RFQ number
- Date
- Product/requirement
- Quantity
- Status
- View RFQ

---

# 4.12 `/account/rfqs/[id]`

RFQ details.

Features:

- RFQ information
- Product requirements
- Dimensions
- Quantity
- Printing
- Delivery requirements
- Notes
- RFQ status
- Quote information if available

---

# 4.13 `/account/quotes/[id]`

Customer quotation page.

Features:

- Quote number
- RFQ reference
- Products
- Quantities
- Unit prices
- Subtotal
- Shipping
- Discount
- Tax
- Total
- Quote validity
- Accept quote
- Reject quote

Quote statuses:

```text
DRAFT
SENT
ACCEPTED
REJECTED
EXPIRED
```

---

# 5. Admin Pages

Admin functionality is required for the first MVP.

Base route:

```text
/admin
```

---

# 5.1 `/admin`

Dashboard.

Display:

```text
Total Products
Total Customers
New RFQs
Open Quotes
Orders
Revenue
```

Also:

- Recent RFQs
- Recent orders
- Recent customers
- Quick actions

---

# 5.2 `/admin/products`

Product management.

Features:

- Product list
- Search
- Filter
- Create product
- Edit product
- Delete/deactivate product
- Publish/unpublish
- Product status

---

# 5.3 `/admin/products/new`

Create product.

Fields:

```text
Name
Slug
Category
Description

Length
Width
Height

Material
Ply
Flute
Color

MOQ
Price

Printing Available
Maximum Printing Colors

Availability

Images
```

---

# 5.4 `/admin/products/[id]`

Edit product.

Features:

- Update product
- Update pricing
- Update MOQ
- Update dimensions
- Update specifications
- Upload/remove images
- Enable/disable printing
- Publish/unpublish

---

# 5.5 `/admin/categories`

Category management.

Features:

- List categories
- Create category
- Edit category
- Delete/deactivate category
- Category image
- Category description
- Sort order
- Active/inactive

---

# 5.6 `/admin/rfqs`

RFQ management.

Features:

- RFQ list
- Search
- Filter by status
- Filter by date
- View RFQ
- Change status
- Create quote
- Reject RFQ

---

# 5.7 `/admin/rfqs/[id]`

RFQ detail.

Display:

```text
RFQ Number
Customer
Company
Email
Phone

Products
Dimensions
Quantity
Material
Ply
Printing

Delivery Location
Expected Date

Additional Requirements
```

Actions:

```text
Mark Reviewing
Create Quote
Reject
```

---

# 5.8 `/admin/quotes`

Quote management.

Features:

- Quote list
- Search
- Filter
- Quote status
- View quote
- Edit quote
- Send quote
- Cancel quote

---

# 5.9 `/admin/quotes/[id]`

Quote details.

Admin can modify:

```text
Quantity
Unit price
Shipping
Discount
Tax
Validity
Notes
```

Then:

```text
Save Draft
Send Quote
```

---

# 5.10 `/admin/orders`

Order management.

Features:

- Order list
- Search
- Filter
- Order status
- View order
- Update order status

---

# 5.11 `/admin/orders/[id]`

Order details.

Features:

- Customer
- Products
- Quantities
- Pricing
- Shipping
- Tax
- Delivery address
- Order timeline
- Status updates

---

# 5.12 `/admin/customers`

Customer management.

Features:

- Customer list
- Search
- Company
- Email
- Phone
- Total orders
- Total RFQs
- Total value
- Last activity

---

# 5.13 `/admin/customers/[id]`

Customer details.

Display:

- Profile
- Company
- Contact information
- Addresses
- Orders
- RFQs
- Quotes

---

# 5.14 `/admin/custom-packaging`

Custom packaging request management.

Features:

- Request list
- Search
- Filter
- View request
- Download uploaded files
- Change status
- Create quote

Statuses:

```text
NEW
REVIEWING
QUOTED
ACCEPTED
REJECTED
CLOSED
```

---

# 6. Core Backend Services

The MVP backend should contain the following services.

---

## 6.1 Product Service

Responsibilities:

- Get products
- Get product by slug
- Search products
- Filter products
- Create product
- Update product
- Delete/deactivate product
- Manage product images

File:

```text
lib/services/product.service.js
```

---

## 6.2 Category Service

Responsibilities:

- Get categories
- Get category
- Create category
- Update category
- Delete/deactivate category

File:

```text
lib/services/category.service.js
```

---

## 6.3 Pricing Service

Responsibilities:

- Calculate estimated price
- Apply quantity pricing
- Apply printing cost
- Apply customization cost
- Calculate shipping
- Calculate tax
- Calculate final total

File:

```text
lib/services/pricing.service.js
```

Important:

The frontend may display estimates, but the backend must be the source of truth for final prices.

---

# 6.4 Cart Service

Responsibilities:

- Create cart
- Get cart
- Add item
- Update item
- Remove item
- Clear cart
- Validate MOQ
- Calculate totals

File:

```text
lib/services/cart.service.js
```

Supports:

```text
Guest Cart
Authenticated Cart
```

---

# 6.5 RFQ Service

Responsibilities:

- Create RFQ
- Get RFQ
- List customer RFQs
- List admin RFQs
- Update RFQ status
- Validate RFQ
- Create RFQ items

File:

```text
lib/services/rfq.service.js
```

RFQ statuses:

```text
NEW
REVIEWING
QUOTED
ACCEPTED
REJECTED
CANCELLED
EXPIRED
```

---

# 6.6 Bulk Upload Service

Responsibilities:

- Accept CSV/XLSX
- Validate file type
- Validate file size
- Parse spreadsheet
- Validate rows
- Generate preview
- Return row errors
- Convert valid rows to RFQ items

File:

```text
lib/services/bulk-upload.service.js
```

Example validation:

```text
Missing product
Missing dimensions
Invalid quantity
Invalid material
Invalid printing option
```

---

# 6.7 Custom Packaging Service

Responsibilities:

- Create custom request
- Store requirements
- Store file references
- Retrieve request
- Update request status
- Admin review

File:

```text
lib/services/custom-packaging.service.js
```

---

# 6.8 Quote Service

Responsibilities:

- Create quote
- Add quote items
- Calculate totals
- Update quote
- Send quote
- Accept quote
- Reject quote
- Expire quote

File:

```text
lib/services/quote.service.js
```

---

# 6.9 Order Service

Responsibilities:

- Create order
- Create order items
- Calculate totals
- Get order
- Update order status
- Customer order history
- Admin order management

File:

```text
lib/services/order.service.js
```

---

# 6.10 Customer Service

Responsibilities:

- Create customer
- Get customer
- Update customer
- Customer order history
- Customer RFQ history
- Customer quote history

File:

```text
lib/services/customer.service.js
```

---

# 6.11 Address Service

Responsibilities:

- Add address
- Update address
- Delete address
- Get customer addresses
- Validate pincode

File:

```text
lib/services/address.service.js
```

---

# 6.12 Delivery Service

Responsibilities:

- Pincode validation
- Serviceability
- Delivery estimate
- Shipping calculation

For MVP, this can use a basic provider/mock implementation.

Architecture:

```text
delivery.service.js
        │
        ▼
Delivery Provider
        │
        ├── Mock Provider
        └── Future Shiprocket
```

---

# 6.13 Email Service

Use Resend or equivalent transactional email provider.

Responsibilities:

- RFQ confirmation
- Admin RFQ notification
- Quote notification
- Quote accepted notification
- Order confirmation
- Order status notification

File:

```text
lib/services/email.service.js
```

---

# 6.14 Authentication Service

Responsibilities:

- Customer registration
- Login
- Logout
- Session management
- Password reset
- Admin authentication
- Role-based access

Roles:

```text
CUSTOMER
ADMIN
```

---

# 6.15 Payment Service

Payment is optional in the first MVP release.

Design the service now:

```text
lib/services/payment.service.js
```

Future provider:

```text
Razorpay
```

Responsibilities:

```text
createPayment()
verifyPayment()
handleWebhook()
refundPayment()
```

The architecture must not directly couple orders to Razorpay.

---

# 6.16 File Storage Service

Used for:

- Product images
- Custom packaging artwork
- Customer logos
- Supporting documents

Architecture:

```text
storage.service.js
        │
        ▼
Storage Provider
        │
        ├── Local/temporary
        └── Future S3/Cloudinary
```

---

# 7. API Endpoints

## Products

```text
GET    /api/products
GET    /api/products/:slug

POST   /api/admin/products
PATCH  /api/admin/products/:id
DELETE /api/admin/products/:id
```

---

## Categories

```text
GET    /api/categories
GET    /api/categories/:slug

POST   /api/admin/categories
PATCH  /api/admin/categories/:id
DELETE /api/admin/categories/:id
```

---

## Cart

```text
GET    /api/cart

POST   /api/cart/items
PATCH  /api/cart/items/:id
DELETE /api/cart/items/:id

DELETE /api/cart
```

---

## RFQ

```text
POST   /api/rfqs
GET    /api/rfqs
GET    /api/rfqs/:id
```

Admin:

```text
GET    /api/admin/rfqs
GET    /api/admin/rfqs/:id
PATCH  /api/admin/rfqs/:id
```

---

## Bulk Upload

```text
POST /api/bulk-upload
POST /api/bulk-upload/validate
```

---

## Custom Packaging

```text
POST /api/custom-packaging
GET  /api/custom-packaging/:id
```

Admin:

```text
GET   /api/admin/custom-packaging
GET   /api/admin/custom-packaging/:id
PATCH /api/admin/custom-packaging/:id
```

---

## Quotes

```text
GET /api/quotes/:id
POST /api/admin/rfqs/:id/quote
PATCH /api/admin/quotes/:id

POST /api/quotes/:id/accept
POST /api/quotes/:id/reject
```

---

## Orders

```text
POST /api/orders
GET  /api/orders
GET  /api/orders/:id
```

Admin:

```text
GET   /api/admin/orders
GET   /api/admin/orders/:id
PATCH /api/admin/orders/:id
```

---

## Customers

```text
GET   /api/account
PATCH /api/account

GET   /api/account/orders
GET   /api/account/rfqs
GET   /api/account/quotes
GET   /api/account/addresses
```

---

# 8. Database Entities

The initial database should contain:

```text
User
Address

Category
Product
ProductImage

Cart
CartItem

RFQ
RFQItem

Quote
QuoteItem

Order
OrderItem

CustomPackagingRequest
CustomPackagingFile
```

Optional:

```text
Payment
```

---

# 9. User Roles

## Customer

Can:

- Browse products
- Search
- Filter
- Add to cart
- Request quote
- Upload bulk order
- Submit custom packaging request
- Create account
- View orders
- View RFQs
- View quotes
- Accept/reject quote

---

## Admin

Can:

- Manage products
- Manage categories
- Manage customers
- Manage RFQs
- Create quotes
- Manage orders
- Manage custom packaging requests
- Update order status
- Send quotes

---

# 10. RFQ Workflow

```text
CUSTOMER
   │
   ▼
Create RFQ
   │
   ▼
NEW
   │
   ▼
ADMIN
   │
   ▼
REVIEWING
   │
   ▼
CREATE QUOTE
   │
   ▼
SENT
   │
   ├───────────────┐
   ▼               ▼
ACCEPTED        REJECTED
   │
   ▼
ORDER
```

---

# 11. Order Workflow

```text
PENDING
   │
   ▼
CONFIRMED
   │
   ▼
PROCESSING
   │
   ▼
READY
   │
   ▼
SHIPPED
   │
   ▼
DELIVERED
```

Possible cancellation:

```text
PENDING ──► CANCELLED
CONFIRMED ──► CANCELLED
```

---

# 12. Custom Packaging Workflow

```text
NEW
 │
 ▼
REVIEWING
 │
 ▼
QUOTED
 │
 ├──► ACCEPTED
 │
 └──► REJECTED
```

---

# 13. Email Notifications

## Customer

### RFQ submitted

```text
Your BoxKart RFQ has been received.
```

### Quote available

```text
Your BoxKart quotation is ready.
```

### Quote accepted

```text
Your quotation has been accepted.
```

### Order confirmation

```text
Your BoxKart order has been confirmed.
```

### Order status

```text
Your order status has been updated.
```

---

## Admin

### New RFQ

```text
New bulk quotation request received.
```

### New order

```text
New order received.
```

### Custom request

```text
New custom packaging request received.
```

---

# 14. Search

MVP search should support:

```text
Product name
Category
Dimensions
Material
Ply
```

Examples:

```text
shipping box
10x8x4
5 ply
corrugated
pizza box
```

Start with PostgreSQL search/filtering.

Do not introduce Elasticsearch/Algolia for the MVP.

---

# 15. SEO

Required:

- Product metadata
- Category metadata
- Canonical URLs
- Sitemap
- Robots.txt
- OpenGraph metadata
- Product structured data
- Semantic headings
- SEO-friendly URLs

Example:

```text
/products/medium-shipping-box-10x8x4
```

---

# 16. Analytics

Existing:

```text
Vercel Analytics
Vercel Speed Insights
```

Keep them.

Add business events:

```text
product_view
search
filter_used
add_to_cart
cart_view
checkout_started

bulk_order_started
rfq_started
rfq_submitted

custom_packaging_started
custom_packaging_submitted

quote_viewed
quote_accepted

order_created
payment_started
payment_completed
```

---

# 17. Security

Required before production:

- Server-side validation
- Client-side validation
- Zod schemas
- Authentication
- Authorization
- Admin role protection
- Rate limiting
- Input sanitization
- File type validation
- File size validation
- Secure environment variables
- Secure cookies
- Safe API error messages
- No database errors exposed to client
- No secret keys exposed to browser
- Protection against duplicate submissions

---

# 18. Error Handling

All APIs should return consistent responses.

Success:

```json
{
  "success": true,
  "data": {}
}
```

Validation:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request",
    "fields": {}
  }
}
```

Server error:

```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Something went wrong"
  }
}
```

Never expose:

```text
Database errors
Stack traces
Environment variables
Internal service details
```

---

# 19. UI Production Requirements

Every page must support:

```text
Loading
Success
Empty
Error
Retry
```

Examples:

- Product loading
- Search loading
- Cart loading
- RFQ submission
- Bulk upload
- Quote loading
- Order creation
- Account loading

---

# 20. Accessibility

All MVP pages must support:

- Keyboard navigation
- Focus states
- Screen readers
- Proper labels
- Form error messages
- Accessible dialogs
- Accessible dropdowns
- Accessible file upload
- Alt text
- Proper heading hierarchy
- Sufficient contrast
- Reduced-motion preference

---

# 21. Responsive Design

Supported viewport sizes:

```text
320px
375px
390px
430px
768px
1024px
1280px
1440px
1920px
```

Critical mobile flows:

```text
Product browsing
Product details
Cart
Bulk RFQ
CSV upload
Checkout
Account
```

---

# 22. Performance

Target:

```text
LCP < 2.5s
INP < 200ms
CLS < 0.1
```

Requirements:

- Optimized images
- Lazy loading
- Minimal client JavaScript
- Server rendering where appropriate
- Proper caching
- Avoid unnecessary API requests
- Avoid layout shifts
- Proper loading states

---

# 23. MVP Services

## Required for Launch

```text
PostgreSQL
Prisma
Next.js API
Zod
Authentication
Email
Analytics
Monitoring
```

## Optional at Launch

```text
Payment
File storage
Delivery API
```

## Future

```text
Redis
Search engine
Queue
Object storage
Shipping providers
Payment providers
ERP
Supplier APIs
```

---

# 24. Recommended Infrastructure

```text
                    GitHub
                       │
                       ▼
                    Vercel
                       │
               ┌───────┴────────┐
               │                │
               ▼                ▼
           Next.js            API
               │                │
               └───────┬────────┘
                       │
                     Prisma
                       │
                       ▼
                 PostgreSQL
                    Neon
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
       Resend       Sentry       Analytics
```

---

# 25. MVP Technology Stack

| Area                | Technology               |
| ------------------- | ------------------------ |
| Framework           | Next.js 16               |
| Language            | JavaScript               |
| UI                  | React                    |
| Styling             | Tailwind CSS v4          |
| Animation           | Framer Motion            |
| Icons               | Hugeicons                |
| API                 | Next.js Route Handlers   |
| Database            | PostgreSQL               |
| ORM                 | Prisma                   |
| Validation          | Zod                      |
| Authentication      | Auth.js / equivalent     |
| Email               | Resend                   |
| Analytics           | Vercel Analytics         |
| Performance         | Vercel Speed Insights    |
| Monitoring          | Sentry                   |
| Hosting             | Vercel                   |
| Database Hosting    | Neon                     |
| Spreadsheet Parsing | SheetJS                  |
| Payment             | Razorpay — optional      |
| Storage             | S3/Cloudinary — optional |

---

# 26. Features Explicitly Out of Scope

Do NOT implement these in the first MVP:

```text
Supplier marketplace
Multi-vendor architecture
Supplier dashboard
Warehouse management
Advanced inventory
Multiple warehouses
Automated procurement
Advanced logistics
AI pricing
AI recommendations
Real-time chat
Mobile application
Loyalty program
Referral system
Advanced coupon system
Reviews/ratings
ERP integration
GST automation
Advanced BI
Microservices
Kafka
Kubernetes
Elasticsearch
Redis
```

These can be added after product-market validation.

---

# 27. MVP Priority

## P0 — Must Have

```text
Product catalog
Categories
Product details
Search
Filters
Cart
Bulk orders
Single RFQ
CSV/XLSX upload
RFQ submission
Admin authentication
Admin products
Admin RFQs
Admin quote creation
Email notifications
Responsive UI
Validation
Error handling
```

## P1 — Important

```text
Custom packaging
Customer accounts
Quotes
Quote acceptance
Orders
Customer order history
Customer RFQ history
Admin customers
SEO
Monitoring
Analytics
```

## P2 — After MVP

```text
Online payments
Shipping integration
Advanced inventory
Supplier management
WhatsApp
Advanced pricing
Coupons
Reviews
AI features
```

---

# 28. Recommended Implementation Order

Antigravity should implement the MVP in this order.

### Phase 1 — Backend Foundation

```text
1. PostgreSQL setup
2. Prisma setup
3. Environment configuration
4. Database schema
5. Migrations
6. Zod validation
7. API response standard
8. Error handling
9. Service architecture
```

### Phase 2 — Products

```text
10. Categories
11. Products
12. Product images
13. Product APIs
14. Admin product management
15. Replace mock product data
```

### Phase 3 — Cart

```text
16. Guest cart
17. Authenticated cart
18. Cart APIs
19. Cart persistence
20. Cart UI integration
21. Pricing integration
```

### Phase 4 — RFQ

```text
22. RFQ schema
23. RFQ API
24. Single RFQ
25. RFQ validation
26. Bulk upload
27. CSV/XLSX parsing
28. RFQ preview
29. Admin RFQ management
30. Email notification
```

### Phase 5 — Custom Packaging

```text
31. Custom request schema
32. Custom request API
33. Wizard integration
34. File upload
35. Admin management
```

### Phase 6 — Quotes

```text
36. Quote schema
37. Quote API
38. Admin quote creation
39. Quote editing
40. Customer quote page
41. Quote acceptance/rejection
42. Email notification
```

### Phase 7 — Orders

```text
43. Order schema
44. Order API
45. Order creation
46. Order status
47. Admin order management
48. Customer order history
49. Order confirmation email
```

### Phase 8 — Authentication

```text
50. Customer registration
51. Login
52. Logout
53. Session management
54. Account page
55. Addresses
56. Protected customer routes
57. Admin authentication
58. Admin authorization
```

### Phase 9 — Payment

```text
59. Payment service
60. Razorpay integration
61. Payment creation
62. Payment verification
63. Webhooks
64. Payment status
65. Order/payment reconciliation
```

Payment may be deferred until the RFQ/order workflow is validated.

### Phase 10 — Production Hardening

```text
66. Security audit
67. Rate limiting
68. Database indexes
69. API testing
70. E2E testing
71. Error monitoring
72. Performance testing
73. Accessibility testing
74. SEO testing
75. Production deployment
76. Backup/recovery verification
```

---

# 29. MVP Definition of Done

The BoxKart MVP is considered complete when:

### Customer

```text
✓ Can browse products
✓ Can search products
✓ Can filter products
✓ Can view product details
✓ Can select quantity
✓ Can add products to cart
✓ Can update cart
✓ Can submit bulk RFQ
✓ Can upload CSV/XLSX
✓ Can request custom packaging
✓ Can receive confirmation
✓ Can view quotation
✓ Can accept quotation
✓ Can create/view order
```

### Admin

```text
✓ Can securely login
✓ Can manage categories
✓ Can manage products
✓ Can manage product pricing
✓ Can view RFQs
✓ Can review RFQs
✓ Can create quotations
✓ Can send quotations
✓ Can manage customers
✓ Can manage orders
✓ Can update order status
✓ Can manage custom packaging requests
```

### Platform

```text
✓ PostgreSQL database
✓ Prisma ORM
✓ Server-side validation
✓ API error handling
✓ Authentication
✓ Authorization
✓ Email notifications
✓ Analytics
✓ Monitoring
✓ SEO
✓ Responsive UI
✓ Accessibility
✓ Production security
```

---

# 30. Final MVP Architecture

```text
                              BOXKART
                                 │
             ┌───────────────────┴───────────────────┐
             │                                       │
         CUSTOMER                                  ADMIN
             │                                       │
             ▼                                       ▼
        Next.js UI                              Admin UI
             │                                       │
             └───────────────────┬───────────────────┘
                                 │
                                 ▼
                         Next.js API Layer
                                 │
       ┌─────────────┬───────────┼───────────┬────────────┐
       │             │           │           │            │
       ▼             ▼           ▼           ▼            ▼
   Products        Cart         RFQ        Quotes       Orders
       │             │           │           │            │
       └─────────────┴───────────┼───────────┴────────────┘
                                 │
                         Business Services
                                 │
             ┌───────────────────┼───────────────────┐
             │                   │                   │
             ▼                   ▼                   ▼
          Pricing             Delivery            Storage
             │                   │                   │
             └───────────────────┼───────────────────┘
                                 │
                              Prisma
                                 │
                                 ▼
                            PostgreSQL
                                 │
               ┌─────────────────┼─────────────────┐
               │                 │                 │
               ▼                 ▼                 ▼
             Email            Sentry           Analytics
            (Resend)
```

---

# 31. MVP Business Model

The first version should focus on:

```text
                         BOXKART
                            │
              ┌─────────────┴─────────────┐
              │                           │
        STANDARD PRODUCTS            BULK PROCUREMENT
              │                           │
              ▼                           ▼
             Cart                        RFQ
              │                           │
              ▼                           ▼
           Checkout                    Quote
              │                           │
              │                           ▼
              │                        Accept
              │                           │
              └─────────────┬─────────────┘
                            ▼
                          ORDER
```

The core differentiator should remain:

> **BoxKart makes it easy for Indian businesses to discover, compare and procure packaging boxes in bulk.**

The MVP should therefore optimize for **catalog discovery + bulk RFQ + quotation management**, rather than trying to become a full Amazon-style e-commerce platform on day one.

---

# 32. Important Development Rule

Do not rewrite the existing frontend unnecessarily.

The backend implementation should **integrate with the existing UI**.

Existing components should be reused wherever possible:

```text
BoxFinder
CustomPackagingWizard
CartDrawer
PincodeChecker
Existing pricing utilities
Existing delivery utilities
Existing product components
Existing bulk-order components
Existing checkout components
Existing account components
```

Only modify the frontend where backend integration requires it.

---

# 33. Source of Truth

This document should be treated as the **MVP scope source of truth**.

If a proposed feature is not listed here:

1. Do not automatically implement it.
2. Determine whether it is required for an existing MVP flow.
3. If not required, defer it to a future phase.
4. Avoid scope creep.
5. Preserve the existing frontend design unless a change is necessary for usability, correctness or backend integration.

The objective is to get BoxKart from a sophisticated frontend prototype to a **real, production-ready B2B packaging MVP** with the smallest practical backend.
