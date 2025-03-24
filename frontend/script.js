async function sendMessage() {
    let input = document.getElementById("user-input").value;
    let chatBox = document.getElementById("chat-box");

    let response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: input }] })
    });

    let data = await response.json();
    chatBox.innerHTML += `<p><b>You:</b> ${input}</p>`;
    chatBox.innerHTML += `<p><b>ChatGPT:</b> ${data.response}</p>`;
}
