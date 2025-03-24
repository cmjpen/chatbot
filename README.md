# ChatGPT Clone with Session Memory

This project is a simple ChatGPT clone that utilizes the OpenAI API for generating responses and Langchain for maintaining session memory, allowing the chatbot to remember previous interactions within the same user session. The backend is built using FastAPI, and the frontend uses basic HTML, CSS, and JavaScript.

## File Structure

```
backend/
├── main.py         # FastAPI application entry point
├── .env            # Environment variables (API keys, etc.)
├── models.py       # Pydantic models for request/response data
├── services.py     # Logic for interacting with OpenAI and Langchain
frontend/
├── index.html      # Frontend HTML structure
├── script.js       # Frontend JavaScript logic
├── styles.css      # Frontend CSS styling
README.md           # This file
requirements.txt    # Backend dependencies
```

## Installation Instructions

Follow these steps to set up the project locally:

### 1. Clone the Repository:

```bash
git clone <your_repository_url>
cd <your_repository_name>
```

### 2. Set up the Backend:

**Create a Virtual Environment (Recommended):**

```bash
python -m venv venv
source venv/bin/activate  # On macOS/Linux
# venv\Scripts\activate   # On Windows
```

**Install Backend Dependencies:**

```bash
cd backend
pip install -r requirements.txt
cd ..
```

**Create and Configure the .env File:**

Create a `.env` file in the `backend` directory.

Add your OpenAI API key to the `.env` file:

```
OPENAI_API_KEY=sk-your-openai-api-key-here
```

Replace `sk-your-openai-api-key-here` with your actual OpenAI API key. You can obtain one from the OpenAI website.

### 3. Set up the Frontend:

The frontend consists of static HTML, CSS, and JavaScript files. No specific installation steps are required.

## Running the Application Locally

### 1. Start the Backend (FastAPI):

```bash
cd backend
uvicorn main:app --reload
```

This command will start the FastAPI server on `http://127.0.0.1:8000`. The `--reload` flag enables automatic reloading of the server when you make changes to the code.

### 2. Open the Frontend (HTML):

Navigate to the `frontend` directory in your project.
Open the `index.html` file in your web browser.

## How to Use

Once both the backend and frontend are running, you should see the chat interface in your browser.

- Type your message in the input box at the bottom.
- Click the send button (or press Enter) to send your message to the backend.
- The backend will process your message using the OpenAI API and Langchain for memory, and the response will be displayed in the chat box.
- Subsequent messages within the same browser session will be remembered by the chatbot, thanks to the session memory implemented using Langchain.

## Project Structure Details

- `backend/main.py`: Contains the main FastAPI application setup, including middleware for CORS and the `/chat` endpoint that handles incoming messages.
- `backend/.env`: Stores environment-specific variables, such as your OpenAI API key.
- `backend/models.py`: Defines the `ChatRequest` Pydantic model, which specifies the expected structure of the request body for the `/chat` endpoint.
- `backend/services.py`: Contains the core logic for interacting with the OpenAI API using Langchain. It initializes the chat model, manages session memory using `ConversationBufferMemory`, and handles the conversation flow.
- `frontend/index.html`: The main HTML file for the chat interface. It includes the structure for the chat box and the input area.
- `frontend/script.js`: Contains the JavaScript code that handles user input, sends messages to the backend API, and updates the chat interface with the responses. It also manages the `session_id` using local storage.
- `frontend/styles.css`: Provides the styling for the chat interface.
- `requirements.txt`: Lists the Python dependencies required for the backend application.

## Dependencies

### Backend (Python):

- fastapi
- uvicorn
- langchain
- openai
- pydantic
- python-dotenv
- fastapi-middleware (specifically `fastapi.middleware.cors.CORSMiddleware`)

### Frontend (JavaScript, HTML, CSS):

No specific build tools or package managers are used for this simple frontend. The dependencies are included directly in the `index.html` file (e.g., Google Fonts).

