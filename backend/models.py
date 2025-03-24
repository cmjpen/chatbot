from pydantic import BaseModel
from typing import List

class ChatRequest(BaseModel):
    messages: List[dict]  # [{"role": "user", "content": "Hello"}]
