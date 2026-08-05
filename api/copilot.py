from fastapi import APIRouter
from pydantic import BaseModel

from services.ollama_service import ask_llm

router = APIRouter()


class CopilotRequest(BaseModel):
    question: str


class CopilotResponse(BaseModel):
    answer: str


@router.post("/copilot", response_model=CopilotResponse)
async def copilot(request: CopilotRequest):

    answer = ask_llm(request.question)

    return {
        "answer": answer
    }