from fastapi import Depends, HTTPException, status
from app.models.user import User
from app.api.deps.current_user import get_current_user

def require_admin(current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access only.")
    return current_user
