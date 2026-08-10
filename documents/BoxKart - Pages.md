BoxKart Simple MVP — Pages & Features

1. Public Pages
   / — Homepage

Purpose: Explain BoxKart and drive users toward products or bulk RFQ.

Features:

Hero section
Search / Box Finder
Popular box categories
Featured products
"Shop Boxes" CTA
"Request Bulk Quote" CTA
Custom packaging CTA
Why BoxKart
How it works
Trust indicators
FAQ
Footer

Primary CTAs:

Shop Boxes
Request Bulk Quote
Get Custom Packaging 2. /products — Product Listing

This is one of the most important MVP pages.

Features:

Product grid
Category filtering
Search
Dimension filtering
Price filtering
Material filtering
MOQ filtering
Sorting
Pagination / Load more
Product cards
Add to cart
Quick view

Example:

Products

Search boxes...

Filters Products
──────── ──────────────
Category [Box] [Box]
Size [Box] [Box]
Material [Box] [Box]
Price
MOQ 3. /products/[slug] — Product Details

Features:

Product images
Product name
Dimensions
Material
Ply
GSM
MOQ
Price
Quantity selector
Bulk pricing
Add to cart
Buy/request quote
Delivery/pincode check
Product specifications
Related products

Example:

Medium Corrugated Shipping Box

10 × 8 × 4"

₹ XX / piece

MOQ: 100

Quantity
[-] 100 [+]

[Add to Cart]

[Request Bulk Quote] 4. /bulk-orders — Bulk Order / RFQ

This is arguably the most important BoxKart MVP page because your business is B2B packaging.

Features:

Single RFQ

Fields:

Name
Email
Phone
Company name
Product
Dimensions
Quantity
Material
Ply
Printing
Number of colors
Delivery pincode
Expected delivery date
Additional requirements

CTA:

Request Quote
Bulk Upload

Allow:

CSV
XLSX

Flow:

Upload
↓
Parse
↓
Validate
↓
Preview
↓
Submit RFQ

This can initially be a frontend/mock implementation if you don't want to build the parser immediately.

5. /custom-packaging — Custom Boxes

For MVP, keep this simple.

Don't build a complicated 3D box designer.

Features:

Packaging type
Dimensions
Material
Ply
Printing
Colors
Quantity
Upload logo/artwork
Delivery pincode
Additional requirements

CTA:

Request Custom Quote

Flow:

Customer
↓
Custom packaging request
↓
BoxKart reviews
↓
Quote 6. /cart — Shopping Cart

Features:

Cart items
Product image
Product name
Dimensions
Quantity
MOQ validation
Price
Subtotal
Remove
Update quantity
Clear cart

Example:

Your Cart

Medium Shipping Box
10 × 8 × 4"
Qty: 100
₹XXXX

Large Shipping Box
12 × 10 × 6"
Qty: 200
₹XXXX

────────────────────
Subtotal ₹XX,XXX

[Continue Shopping]
[Proceed to Checkout] 7. /checkout — Checkout

For a simple MVP, don't overcomplicate this.

Features:

Customer information
Name
Email
Phone
Company
Delivery
Address
City
State
Pincode
Order summary
Products
Quantity
Price
Shipping
Total
Payment

Initially you can have:

Payment method

○ Pay Online
○ Pay Later / Discuss with BoxKart

You can initially launch with manual payment / payment-after-quote and add Razorpay later.

CTA:

Place Order 8. /order-success

After placing an order:

✓ Order placed successfully

Order #BK-10021

We'll contact you shortly.

[View Order]
[Continue Shopping]

Features:

Order number
Order summary
Customer information
Next steps 9. /login

Features:

Email
Password
Login
Forgot password
Register

Also:

Continue as Guest

You don't want authentication to become a barrier to discovering products.

10. /register

Features:

Name
Email
Phone
Company name
Password
Confirm password

For MVP:

Don't make GSTIN mandatory.

You can add it later.

11. /forgot-password

Simple:

Email

[Send Reset Link] 12. /account

Customer dashboard.

Keep it simple.

My Account

Hello, Customer

Orders 3
RFQs 4
Quotes 2

Sections:

Profile
Orders
RFQs
Quotes
Addresses
Logout 13. /account/orders

Features:

Order list
Order number
Date
Amount
Status

Example:

#BK-10021
₹24,500
Processing

#BK-10018
₹12,800
Delivered 14. /account/orders/[id]

Features:

Order information
Products
Quantities
Price
Delivery address
Payment status
Order status

Status timeline:

Order Placed
↓
Confirmed
↓
Processing
↓
Shipped
↓
Delivered 15. /account/rfqs

Features:

RFQ list
RFQ number
Date
Status
Quote status

Example:

RFQ #RFQ-1002
500 Medium Boxes
Quote Pending

RFQ #RFQ-1001
1000 Printed Boxes
Quoted 16. /account/rfqs/[id]

Features:

RFQ details
Products
Quantity
Requirements
Delivery location
Submitted date
Current status

Statuses:

SUBMITTED
UNDER_REVIEW
QUOTED
ACCEPTED
REJECTED
EXPIRED 17. /account/quotes

You can also combine this into RFQs for the initial MVP.

If kept separate:

Features:

Quote number
RFQ number
Total
Valid until
Status 18. /account/quotes/[id]

Features:

Quote #Q-1002

Products
Quantity
Unit price
Discount
Shipping
Tax
Total

Valid until: XX

[Accept Quote]
[Reject Quote]

This is important for your B2B model.

19. /account/profile

Features:

Name
Email
Phone
Company
Password change 20. /account/addresses

Features:

Saved addresses
Add address
Edit address
Delete address
Default address 21. /admin/login

Separate admin login.

Admin Email
Password

[Login] 22. /admin — Admin Dashboard

Don't overbuild this initially.

Show:

Products 120
Customers 350
RFQs 24
Pending Quotes 8
Orders 32

And recent:

RFQs
Orders
Customers 23. /admin/products

Features:

Product list
Search
Filter
Add product
Edit
Enable/disable
Delete

Columns:

Product
Category
Price
MOQ
Stock
Status
Actions 24. /admin/products/new

Features:

Product name
SKU
Category
Dimensions
Material
Ply
GSM
Price
MOQ
Images
Description
Specifications
Active/inactive 25. /admin/products/[id]

Same as create but for editing.

26. /admin/rfqs

This is very important.

Features:

RFQ list
Search
Status
Customer
Date
Quantity
View RFQ

Statuses:

NEW
IN_REVIEW
QUOTED
ACCEPTED
REJECTED
CLOSED 27. /admin/rfqs/[id]

Admin can see:

Customer
Company
Contact
Products
Dimensions
Quantity
Printing
Delivery
Requirements

And:

[Create Quote] 28. /admin/quotes

Features:

Quote list
Customer
RFQ
Amount
Status
Expiry
Create/edit quote 29. /admin/quotes/[id]

Admin can:

Edit pricing
Add discount
Add shipping
Add tax
Add notes
Set expiry
Send quote 30. /admin/orders

Features:

Order list
Customer
Amount
Status
Payment
Date 31. /admin/orders/[id]

Admin can:

View order
Change status
View customer
View products
View address
View payment status 32. Static Pages

You should also have a few basic pages:

/about
/contact
/faq
/terms
/privacy
/shipping-policy
/refund-policy

For MVP, these can be relatively simple.

Total MVP Pages

I'd organize them like this:

PUBLIC
├── /
├── /products
├── /products/[slug]
├── /bulk-orders
├── /custom-packaging
├── /cart
├── /checkout
├── /order-success
├── /login
├── /register
├── /forgot-password
├── /reset-password
├── /about
├── /contact
├── /faq
├── /terms
├── /privacy
├── /shipping-policy
└── /refund-policy

CUSTOMER
├── /account
├── /account/profile
├── /account/addresses
├── /account/orders
├── /account/orders/[id]
├── /account/rfqs
├── /account/rfqs/[id]
├── /account/quotes
└── /account/quotes/[id]

ADMIN
├── /admin/login
├── /admin
├── /admin/products
├── /admin/products/new
├── /admin/products/[id]
├── /admin/rfqs
├── /admin/rfqs/[id]
├── /admin/quotes
├── /admin/quotes/[id]
├── /admin/orders
└── /admin/orders/[id]

That's roughly 40 pages/routes, but don't let that number scare you. Many are simple CRUD/detail pages.
