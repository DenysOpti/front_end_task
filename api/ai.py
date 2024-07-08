from fastapi import APIRouter, Depends

from pydantic import BaseModel

from db import User
from main_grumpy import grumpy_chat
from main_poet import poet_chat
from users import current_active_user


class ChatPayload(BaseModel):
    type: str
    content: str


ai_router = APIRouter()


@ai_router.post("chat")
async def chat(prompt: ChatPayload, user: User = Depends(current_active_user)):
    response = ""
    if prompt.type == "grumpy":
        response = grumpy_chat(prompt.content)
    else:
        response = poet_chat(prompt.content)
    return {"response": response}
