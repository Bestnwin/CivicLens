from fastapi import APIRouter, HTTPException
from app.models.user import UserCreate, UserLogin, UserOut
from app.utils.auth import hash_password, verify_password, create_access_token
from app.config import db
from bson import ObjectId

router = APIRouter()

# ---------------------------
# SIGNUP
# ---------------------------
@router.post("/signup", response_model=UserOut)
@router.post("/signup", response_model=UserOut)
async def signup(user: UserCreate):
    # Check if username already exists
    existing = await db.users.find_one({"username": user.username})
    if existing:
        raise HTTPException(status_code=400, detail="Username already registered")

    # Check if email already exists
    existing_email = await db.users.find_one({"email": user.email})
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash password
    hashed = hash_password(user.password)

    # Create user document
    new_user = {
        "username": user.username,
        "email": user.email,
        "password": hashed,
        "points": 0,
        "role": "citizen"
    }

    result = await db.users.insert_one(new_user)

    return UserOut(
        id=str(result.inserted_id),
        username=user.username,
        email=user.email,
        points=0,
        role="citizen"
    )


# ---------------------------
# LOGIN
# ---------------------------
@router.post("/login")
async def login(payload: UserLogin):
    db_user = await db.users.find_one({"username": payload.username})
    if not db_user or not verify_password(payload.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": str(db_user["_id"])})
    return {"access_token": token, "token_type": "bearer"}
