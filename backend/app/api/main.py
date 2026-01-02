from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
import itsdangerous

from app.api.v1.routes.auth.auth import router as auth_router
from app.api.v1.routes.users.user import router as user_router
from app.api.v1.routes.code.snippets import router as code_router
from app.api.v1.routes.start.run_code import router as run_router
from app.api.v1.routes.github.oauth import router as git_oauth_router
from app.api.v1.routes.google.oauth import router as google_oauth_router
from app.api.v1.routes.chat.gigachat import router as gigachat_router
from app.api.v1.routes.community.contact import router as contact_router

from app.api.config import CORS_ORIGINS

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(SessionMiddleware, secret_key="secret")

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(code_router)
app.include_router(run_router)
app.include_router(git_oauth_router)
app.include_router(google_oauth_router)
app.include_router(gigachat_router)
app.include_router(contact_router)


@app.get("/")
async def root():
    return {"Hello": "World"}
