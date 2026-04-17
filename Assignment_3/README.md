# FSDL Assignment 3 — Dynamic Fashion Store

A frontend-only Fashion E-Commerce web application built using **HTML5, CSS3, JavaScript (Vanilla), Bootstrap 5 CDN**, and **Font Awesome**.

## Features Implemented

- Sticky responsive navbar with links, live search, cart badge, and wishlist badge
- Hero banner with CTA (Shop Now)
- Dynamic product rendering from `products.js` (12 fashion products)
- Category filtering: Men, Women, Kids, Accessories
- Sorting: Newest, Price Low→High, Price High→Low, Rating
- Search with real-time filtering
- Product cards with image, category, rating, price, Add to Cart, and wishlist heart toggle
- Product detail modal with image, description, size selector, color options, quantity input, and Add to Cart
- Cart offcanvas with quantity controls (`+`/`−`), remove, subtotal, item count, and checkout simulation
- Cart and wishlist persistence using `localStorage`
- Newsletter subscription form with email regex validation
- Footer with links and social icons
- Toast feedback for user actions

## File Structure

- `index.html` — Main structure and Bootstrap components
- `style.css` — Custom fashion UI styling and responsive behavior
- `products.js` — Product dataset array
- `script.js` — Dynamic rendering and all JS functionality

## How to Run

1. Open the `Assignment_3` folder.
2. Double-click `index.html` (or open with any browser).
3. No backend/server setup is required.

## Notes

- Data is fully client-side.
- Cart and wishlist state are saved in browser `localStorage`.
