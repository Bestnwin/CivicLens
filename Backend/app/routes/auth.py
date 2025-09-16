from fastapi import APIRouter, HTTPException
from app.models.user import UserCreate, UserLogin, UserOut
from app.utils.auth import hash_password, verify_password, create_access_token
from app.config import db
from bson import ObjectId

router = APIRouter()

@router.post("/signup", response_model=UserOut)
async def signup(user: UserCreate):
    existing = await db.users.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed = hash_password(user.password)
    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hashed,
        "points": 0,
        "role": "citizen"
    }
    result = await db.users.insert_one(new_user)
    return UserOut(id=str(result.inserted_id), name=user.name, email=user.email, points=0, role="citizen")

@router.post("/login")
async def login(payload: UserLogin):
    db_user = await db.users.find_one({"email": payload.email})
    if not db_user or not verify_password(payload.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": str(db_user["_id"])})
    return {"access_token": token, "token_type": "bearer"}
