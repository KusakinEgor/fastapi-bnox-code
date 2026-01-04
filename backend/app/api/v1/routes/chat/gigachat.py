from fastapi import APIRouter
from app.api.services.chat.gigachat_client_instance import gigachat_client
from .schemas import ChatRequest

router = APIRouter(tags=["AIChat"])

@router.post("/chat")
def chat(payload: ChatRequest):
    return gigachat_client.send_message(payload.message)
