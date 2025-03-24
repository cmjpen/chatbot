from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage, AIMessage
import os

openai_api_key = os.environ.get('open_ai_key')

chat_model = ChatOpenAI(openai_api_key=openai_api_key, model_name="gpt-3.5-turbo")

def chat_with_gpt(messages):
    history = [HumanMessage(content=m["content"]) if m["role"] == "user" else AIMessage(content=m["content"]) for m in messages]
    response = chat_model(history)
    return response.content
