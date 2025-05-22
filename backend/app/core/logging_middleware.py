import time
import logging
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request

logger = logging.getLogger(__name__)

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        response = await call_next(request)
        process_time = round(time.time() - start_time, 4)

        logger.info(f"{request.method} {request.url.path} - {response.status_code} - {process_time}s")
        return response
