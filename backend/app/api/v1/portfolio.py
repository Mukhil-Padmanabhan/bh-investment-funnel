from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.schemas.portfolio import Investment
from app.db.dependency import get_db
from app.models.portfolio import PortfolioItem
from collections import defaultdict

router = APIRouter()

@router.get("/", response_model=List[Investment])
def get_portfolio(db: Session = Depends(get_db)):
    holdings = db.query(PortfolioItem).all()
    total_value = sum(item.value for item in holdings)

    if total_value == 0:
        return []

    sector_totals = defaultdict(float)
    for item in holdings:
        sector_totals[item.sector] += item.value

    return [
        Investment(
            name=sector,
            value=value,
            percentage=round((value / total_value) * 100, 2)
        )
        for sector, value in sector_totals.items()
    ]