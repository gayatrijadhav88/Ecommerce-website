# API Documentation

Base URL: `http://localhost:5000/api`

## Auth

- `POST /auth/register` body `{ name, email, password }`
- `POST /auth/login` body `{ email, password }`
- `GET /auth/me` protected
- `PUT /auth/profile` protected

## Products

- `GET /products?search=&category=&page=`
- `GET /products/categories`
- `GET /products/:id`
- `GET /products/:id/similar`

## Cart

- `GET /cart`
- `POST /cart` body `{ productId, quantity }`
- `PUT /cart/:productId` body `{ quantity }`
- `DELETE /cart/:productId`
- `DELETE /cart`

## Wishlist

- `GET /wishlist`
- `POST /wishlist/toggle` body `{ productId }`

## Orders

- `POST /orders` body `{ shippingAddress, paymentMethod }`
- `GET /orders/my`
- `GET /orders/:id`

## Admin

- `GET /admin/analytics`
- `GET /admin/users`
- `GET /admin/orders`
- `PUT /admin/orders/:id/status`
- `POST /admin/products`
- `PUT /admin/products/:id`
- `DELETE /admin/products/:id`

## AI

- `GET /ai/recommendations`
- `GET /ai/search?q=laptop for students`
- `POST /ai/chat` body `{ message }`

