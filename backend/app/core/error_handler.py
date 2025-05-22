from fastapi.responses import JSONResponse
from fastapi import Request
from starlette.status import HTTP_500_INTERNAL_SERVER_ERROR

async def unhandled_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An unexpected error occurred."},
    )
