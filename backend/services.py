from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage, AIMessage
from langchain.prompts import ChatPromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
from langchain.prompts import PromptTemplate
import os

openai_api_key = os.environ.get('open_ai_key')

session_memory = {}

chat_model = ChatOpenAI(openai_api_key=openai_api_key, model_name="gpt-3.5-turbo")

def chat_with_gpt(messages, session_id):
    if session_id not in session_memory:
        session_memory[session_id] = ConversationBufferMemory()

    memory = session_memory[session_id]

    # Convert messages to Langchain format and add to memory
    for message in messages:
        if message["role"] == "user":
            memory.chat_memory.add_user_message(message["content"])
        elif message["role"] == "assistant":
            memory.chat_memory.add_ai_message(message["content"])

    # Get the latest user message
    latest_message_content = messages[-1]["content"]

    # Use ConversationChain to leverage memory
    conversation = ConversationChain(
        llm=chat_model,
        memory=memory,
        verbose=False  # Set to True for debugging
    )

    response = conversation.predict(input=latest_message_content)

    return response
