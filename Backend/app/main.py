from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, reports

app = FastAPI(title="CivicLens API")

# allow Flutter to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # in hackathon: allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(reports.router, prefix="/reports", tags=["Reports"])

@app.get("/ping")
async def ping():
    return {"message": "Backend is live 🚀"}
