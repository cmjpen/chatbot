from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import ChatRequest
from services import chat_with_gpt

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change "*" to specific domains if needed
    allow_credentials=True,
    allow_methods=["*"],  # Allows POST requests
    allow_headers=["*"],
)

@app.post("/chat")
async def chat(request: ChatRequest):
    response = chat_with_gpt(request.messages, request.session_id)
    return {"response": response}
