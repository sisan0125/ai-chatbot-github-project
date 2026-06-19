const API_KEY = "你的Gemini API Key";

async function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value;

    if (!message) return;

    addMessage("user", message);
    input.value = "";

    const reply = await callAI(message);
    addMessage("ai", reply);
}

function addMessage(role, text) {
    const chatbox = document.getElementById("chatbox");
    const div = document.createElement("div");

    div.className = role;
    div.innerText = text;

    chatbox.appendChild(div);
}

async function callAI(message) {
    const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: message }]
                }]
            })
        }
    );

    const data = await res.json();

    return data.candidates?.[0]?.content?.parts?.[0]?.text || "沒有回應";
}
