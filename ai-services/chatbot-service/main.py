import os
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel

load_dotenv()

try:
    from langchain_google_genai import ChatGoogleGenerativeAI
    from langchain_core.prompts import ChatPromptTemplate
except Exception:
    ChatGoogleGenerativeAI = None
    ChatPromptTemplate = None

app = FastAPI(title="SmartCommerce AI Chatbot Service")


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


class ChatRequest(BaseModel):
    message: str
    products: List[Product]
    user: Optional[dict] = None


def build_context(products: List[Product]) -> str:
    return "\n".join(
        f"- {p.name} | {p.category} | Rs {p.price} | rating {p.rating} | {p.description}"
        for p in products[:30]
    )


def fallback_answer(message: str, products: List[Product]) -> str:
    words = set(message.lower().split())
    scored = []
    for product in products:
        haystack = f"{product.name} {product.category} {product.description} {' '.join(product.tags)}".lower()
        score = sum(1 for word in words if word in haystack)
        scored.append((score, product))
    scored.sort(key=lambda item: (item[0], item[1].rating or 0), reverse=True)
    picks = [product for score, product in scored[:3] if score > 0] or sorted(products, key=lambda p: p.rating or 0, reverse=True)[:3]
    names = ", ".join(f"{p.name} (Rs {int(p.price)})" for p in picks)
    return f"Based on your request, I recommend: {names}. These match your intent and have strong ratings in the current catalog."


@app.get("/health")
def health():
    return {"status": "ok", "service": "chatbot-service", "geminiConfigured": bool(os.getenv("GEMINI_API_KEY"))}


@app.post("/chat")
def chat(payload: ChatRequest):
    api_key = os.getenv("GEMINI_API_KEY")
    if api_key and ChatGoogleGenerativeAI and ChatPromptTemplate:
        llm = ChatGoogleGenerativeAI(
            model=os.getenv("GEMINI_MODEL", "gemini-1.5-flash"),
            google_api_key=api_key,
            temperature=0.4,
        )
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are SmartCommerce AI, a concise shopping assistant. Use only the product context. Recommend specific products with reasons."),
            ("human", "Product context:\n{context}\n\nCustomer question: {question}")
        ])
        response = llm.invoke(prompt.format_messages(context=build_context(payload.products), question=payload.message))
        return {"answer": response.content}

    return {"answer": fallback_answer(payload.message, payload.products)}

