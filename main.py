from typing import List, Optional

from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI(title="SmartCommerce AI Recommendation Engine")


class Product(BaseModel):
    id: str
    name: str
    brand: Optional[str] = ""
    category: str
    description: str
    price: float
    rating: Optional[float] = 0
    tags: List[str] = []
    image: Optional[str] = None


class RecommendationRequest(BaseModel):
    products: List[Product]
    history: List[Product] = []
    limit: int = 8


def product_text(product: Product) -> str:
    return " ".join([
        product.name,
        product.brand or "",
        product.category,
        product.description,
        " ".join(product.tags),
    ])


@app.get("/health")
def health():
    return {"status": "ok", "service": "recommendation-engine"}


@app.post("/recommend")
def recommend(payload: RecommendationRequest):
    products = payload.products
    if not products:
        return {"recommendations": []}

    if not payload.history:
        ranked = sorted(products, key=lambda item: (item.rating or 0, -item.price), reverse=True)
        return {"recommendations": [item.model_dump() for item in ranked[: payload.limit]]}

    corpus = [product_text(product) for product in products]
    history_text = " ".join(product_text(product) for product in payload.history)
    vectorizer = TfidfVectorizer(stop_words="english")
    matrix = vectorizer.fit_transform(corpus + [history_text])
    scores = cosine_similarity(matrix[-1], matrix[:-1]).flatten()
    viewed_ids = {item.id for item in payload.history}
    ranked = [
        (product, float(scores[index]))
        for index, product in enumerate(products)
        if product.id not in viewed_ids
    ]
    ranked.sort(key=lambda item: (item[1], item[0].rating or 0), reverse=True)
    return {
        "recommendations": [
            {**product.model_dump(), "score": round(score, 4)}
            for product, score in ranked[: payload.limit]
        ]
    }

