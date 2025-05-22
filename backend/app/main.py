from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.logger import setup_logging
from app.core.logging_middleware import LoggingMiddleware
from app.core.error_handler import unhandled_exception_handler
from app.core.rate_limiter import limiter
from app.core.cache import init_cache

from slowapi.middleware import SlowAPIMiddleware

from app.api.v1 import (
    opportunities,
    rejections,
    auth,
    portfolio,
    analyzer,
    admin,
    admin_opportunity
)

app = FastAPI(
    title="Berkshire Investment Funnel API",
    version="1.0.0",
    description="Public-facing API for crowdsourcing and reviewing investment ideas"
)

@app.on_event("startup")
async def on_startup():
    await init_cache()

app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)
app.add_middleware(LoggingMiddleware)
app.add_exception_handler(Exception, unhandled_exception_handler)

setup_logging()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(portfolio.router, prefix="/api/portfolio", tags=["Portfolio"])
app.include_router(opportunities.router, prefix="/api/opportunities", tags=["Opportunities"])
app.include_router(rejections.router, prefix="/api/rejections", tags=["Rejections"])
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(analyzer.router, prefix="/api/analyzer", tags=["Analyzer"])
app.include_router(admin_opportunity.router, prefix="/api/admin", tags=["Admin: Opportunities"])

@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok"}
