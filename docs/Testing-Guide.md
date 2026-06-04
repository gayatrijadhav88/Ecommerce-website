# Testing Guide

## Manual Tests

1. Register a new customer and verify redirect to home.
2. Login with admin credentials and open `/admin`.
3. Add a product from admin dashboard and confirm it appears in `/products`.
4. Search products with regular search and AI search.
5. Open a product details page and confirm similar products appear.
6. Add product to cart, update quantity, remove item.
7. Add product to wishlist and confirm it appears in wishlist.
8. Checkout and verify order appears in orders page.
9. Ask the AI assistant for a budget recommendation.
10. Open analytics dashboard and verify charts render.

## API Smoke Tests

```bash
curl http://localhost:5000/api/health
curl http://localhost:8001/health
curl http://localhost:8002/health
curl http://localhost:8003/health
```

## Production QA Checklist

- Environment variables configured.
- MongoDB Atlas IP access enabled.
- CORS client URL configured.
- JWT secret is long and private.
- Seed script run only in safe demo environments.
- AI service URLs point to deployed Render services.

