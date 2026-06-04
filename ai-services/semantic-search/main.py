import os
from typing import List, Optional

import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

try:
    import faiss
    from sentence_transformers import SentenceTransformer
except Exception:
    faiss = None
    SentenceTransformer = None

app = FastAPI(title="SmartCommerce AI Semantic Search")
model = None


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


class SearchRequest(BaseModel):
    query: str
    products: List[Product]
    limit: int = 12


def text(product: Product) -> str:
    return f"{product.name} {product.brand or ''} {product.category} {product.description} {' '.join(product.tags)}"


@app.get("/health")
def health():
    return {"status": "ok", "service": "semantic-search", "faiss": bool(faiss)}


@app.post("/search")
def search(payload: SearchRequest):
    products = payload.products
    if not payload.query or not products:
        return {"results": []}

    docs = [text(product) for product in products]

    if faiss and SentenceTransformer:
        global model
        if model is None:
            model = SentenceTransformer(os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2"))
        doc_embeddings = model.encode(docs, normalize_embeddings=True)
        query_embedding = model.encode([payload.query], normalize_embeddings=True)
        index = faiss.IndexFlatIP(doc_embeddings.shape[1])
        index.add(np.array(doc_embeddings, dtype="float32"))
        scores, indices = index.search(np.array(query_embedding, dtype="float32"), min(payload.limit, len(products)))
        results = [
            {**products[index].model_dump(), "score": round(float(scores[0][rank]), 4)}
            for rank, index in enumerate(indices[0])
        ]
        return {"results": results}

    vectorizer = TfidfVectorizer(stop_words="english")
    matrix = vectorizer.fit_transform(docs + [payload.query])
    scores = cosine_similarity(matrix[-1], matrix[:-1]).flatten()
    ranked = sorted(enumerate(products), key=lambda item: scores[item[0]], reverse=True)
    return {
        "results": [
            {**product.model_dump(), "score": round(float(scores[index]), 4)}
            for index, product in ranked[: payload.limit]
        ]
    }

