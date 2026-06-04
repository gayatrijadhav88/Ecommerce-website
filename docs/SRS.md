# Software Requirements Specification

## Project

SmartCommerce AI is an AI-powered e-commerce platform that supports customer shopping workflows, admin product management, analytics, semantic product search, personalized recommendations, and an AI shopping assistant.

## Functional Requirements

- Users can register, login, update profile, and logout.
- Customers can browse products, filter categories, view details, track browsing history, manage cart, manage wishlist, checkout, and view orders.
- Admins can create, update, delete, and monitor products.
- Admins can view users, orders, revenue metrics, category distribution, and monthly analytics.
- The recommendation engine suggests products using content-based filtering and cosine similarity.
- Semantic search ranks catalog products using Sentence Transformers and FAISS, with TF-IDF fallback.
- The AI assistant answers product questions using Gemini API, LangChain, and product-context RAG, with deterministic fallback.

## Non-Functional Requirements

- Responsive UI for desktop and mobile.
- JWT authentication with role-based access control.
- Clean separation between client, server, and AI services.
- MongoDB Atlas-ready persistence.
- Deployment-ready for Vercel and Render.
- Beginner-friendly structure with clear documentation.

## Users

- Customer: shops, asks AI, manages orders and profile.
- Admin: manages products, orders, and analytics.

## Constraints

- JavaScript only for MERN apps.
- Python is used only for AI services.
- External services require environment variables.

