from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserLogin, UserRead
from app.services.user_service import register_user, authenticate_user, generate_token
from app.db.dependency import get_db
from app.api.deps.current_user import get_current_user

router = APIRouter()

@router.post("/register", response_model=UserRead)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    return register_user(db, payload)

@router.post("/login")
def login(payload: UserLogin, db: Session = Depends(get_db)):
    user = authenticate_user(db, payload.email, payload.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = generate_token(user)
    return {"access_token": token, "token_type": "bearer", "is_admin": user.is_admin}

@router.get("/me", response_model=UserRead)
def me(current_user: UserRead = Depends(get_current_user)):
    return current_user
