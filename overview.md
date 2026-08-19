WEBSITE & ADMIN PANEL DEVELOPMENT PROPOSAL

Modern Furniture / Product Catalogue Platform

Reference Website: MODA Furnitures (for feature and structure reference only)
Proposed Technology: ReactJS + Node.js / Express.js + MongoDB


---

1. Project Overview

This proposal covers the design and development of a modern, responsive and scalable front website and administration panel for a furniture/product-based business. The MODA Furnitures website is used only as a reference for understanding the desired website structure, product presentation and feature set. MODA Furnitures is not the client and is not included as the client identity in this proposal.

The proposed platform will provide a premium product-catalogue experience where visitors can discover products, browse categories, view detailed specifications, save products to a wishlist, and submit product enquiries. The project intentionally excludes Add to Cart, Checkout and Online Payment functionality.


---

2. Project Objectives

Create a premium and visually engaging product-catalogue website.

Provide a responsive experience across desktop, tablet and mobile devices.

Build an easy-to-use administration panel for products, categories, banners and enquiries.

Allow customers to enquire about individual products without purchasing online.

Build a scalable backend and database architecture for future expansion.



---

3. Front Website - Major Modules

3.1 Homepage

Header with logo, navigation, search and contact/enquiry call-to-action.

Hero/banner slider for promotional campaigns.

Shop by Category.

Featured Products.

New Arrivals.

Best Sellers / Popular Products.

Why Choose Us.

Showroom / Contact section.

Social media sharing.

Footer with policies, contact information and quick links.


3.2 Category & Product Listing

Category and subcategory navigation.

Product grid with responsive product cards.

Product image, name, price and availability.

Featured, New Arrival and Popular product labels.

Sorting and filtering.

Filters for price, colour, size, availability and other configurable attributes.

Pagination or Load More.

Enquire Now action.

Social media sharing.


3.3 Product Detail Page

Multiple product images and gallery.

Image zoom / preview.

Product name.

Price and optional sale price.

Detailed product description.

Specifications and dimensions.

Material, colour and configurable options.

Availability / stock status.

Delivery, warranty and care information.

Related products.

Enquire About This Product.


3.4 Product Enquiry System

Enquire Now button on product pages.

Customer name, email, phone number and message.

Selected product automatically attached to the enquiry.

Optional quantity, colour, size and other requirements.

Email notification to the business.


3.5 Search & Discovery

Keyword-based product search.

Search by product name.

Search suggestions.

Filter and sort integration.

No-result handling with relevant suggestions.


3.6 Informational & CMS Pages

About Us.

Our Story / Brand page.

Care Guide.

Homepage slider/banner management.

Contact Us.

Showroom / Locations.

Privacy Policy.

Terms & Conditions.



---

4. Admin Panel

A secure ReactJS-based administration panel will allow authorised staff to manage website content and product-catalogue updates without requiring developer intervention for routine content changes.

4.1 Dashboard

Total Products.

Active / Inactive Products.

Categories and Subcategories.

Customer Count.

Low / Out-of-Stock Products.

Number of Enquiries and Recent Products.


4.2 Product Management

Add, edit, activate/deactivate and delete products.

Upload multiple product images.

Manage price, sale price and availability.

Manage descriptions, specifications, dimensions and materials.

Manage colours.

Mark products as Featured, New Arrival.


4.3 Category Management

Create/edit/delete categories and subcategories.

Upload category images.

Manage category order.

Activate/deactivate categories.


4.4 Banner & Campaign Management

Create homepage banners.

Desktop and mobile banner images.

Heading, subtitle and CTA.

Campaign start/end dates.

Active/inactive status.

Display priority/order.

Manage seasonal promotional campaigns.


4.5 Enquiry Management

View all product enquiries.

View customer contact details and enquiry messages.

View the product associated with each enquiry.

Track enquiry status.

Search and filter enquiries.

Maintain enquiry records for follow-up.


4.6 Customer Management

View customer records generated through enquiries.

Search and filter customer information.

Review customer enquiry history.


4.7 User & Role Management

Secure administrator login.

Create and manage authorised admin users.

Role-based access control.

Activate/deactivate administrative access.


4.8 CMS / Website Content Management

Manage selected homepage content.

Manage About, FAQ and informational pages.

Manage contact details and footer content.

Manage social media links.

Maintain SEO-ready content structure.



---

5. Security

JWT-based authentication.

Secure password hashing.

Role-based access control.

Protected admin routes and APIs.

Input validation and sanitisation.

Rate limiting.

CORS configuration.

Secure HTTP headers.

Environment-variable-based secrets.

Database access protection.



---

6. Technology Stack

Component	Proposed Technology

Front Website	ReactJS
Admin Panel	ReactJS
Backend	Node.js + Express.js
Database	MongoDB
API	REST API
Authentication	JWT
Version Control	Git
Deployment	Cloud / VPS
Responsive UI	Desktop, Tablet & Mobile



---

Additional CMS / Performance Requirements

Manage selected homepage content.

Manage About, FAQ and informational pages.

Manage contact details and footer content.

Manage social media links.

Code splitting and API optimisation.

Database indexing and caching-ready architecture.



---

Note: The original document has a numbering inconsistency: one page labels the Technology Stack as “7. Technology Stack”, while another labels it “6. Technology Stack.” It also contains two versions of section 4.8. The above combines the content from all four supplied pages.