import asyncio
import hashlib
from fastapi import FastAPI, HTTPException

app = FastAPI(title="Workshop API")

db_pool = asyncio.Semaphore(5)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/products")
async def products():
    await asyncio.sleep(0.05)  # شبیه‌سازی query سبک
    return [{"id": i, "name": f"product-{i}"} for i in range(20)]


@app.get("/search")
def search(q: str = "test"):
    h = q.encode()
    for _ in range(100_000):
        h = hashlib.sha256(h).digest()
    return {"query": q, "result": h.hex()[:16]}


@app.get("/report")
async def report():
    try:
        await asyncio.wait_for(db_pool.acquire(), timeout=2)
    except asyncio.TimeoutError:
        raise HTTPException(status_code=503, detail="DB pool exhausted")
    try:
        await asyncio.sleep(0.3)  # query کند
        return {"report": "done"}
    finally:
        db_pool.release()
