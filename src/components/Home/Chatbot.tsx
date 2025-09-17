import React, { useState, useRef, useEffect } from "react";

const GEMINI_API_KEY = "AIzaSyBpfmpdipBLK6v92bY_BsXnw3VkOJOlFpE"; // ⚠️ Don't keep this in frontend for production
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! 👋 How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // Send message to Gemini API
  const sendToGemini = async (userMessage: string) => {
    setLoading(true);
    setTyping(true);

    try {
      const res = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: userMessage }]
            }
          ]
        })
      });

      const data = await res.json();
      console.log("Gemini Response:", data);

      const botReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ Sorry, I couldn't generate a response.";

      setMessages((msgs) => [...msgs, { sender: "bot", text: botReply }]);
    } catch (err) {
      console.error("Gemini API Error:", err);
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: "❌ Error connecting to Gemini API." }
      ]);
    }

    setTyping(false);
    setLoading(false);
  };

  // Handle Send
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((msgs) => [...msgs, { sender: "user", text: input }]);
    const userMessage = input;
    setInput("");
    await sendToGemini(userMessage);
  };

  return (
    <>
      {/* Floating AI button */}
      {!open && (
        <button
          className="fixed bottom-6 right-6 bg-gradient-to-br from-pink-500 via-purple-500 to-yellow-400 text-white rounded-full shadow-xl w-16 h-16 flex items-center justify-center text-3xl z-50 transition-transform duration-300 hover:scale-110"
          onClick={() => setOpen(true)}
        >
          ✨
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div
          className="fixed bottom-6 right-6 w-80 border rounded-2xl shadow-2xl flex flex-col z-50"
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(18px)"
          }}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b font-bold flex justify-between items-center rounded-t-2xl bg-white/60">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-200 text-xl shadow-md">
                ✨
              </span>
              <span>Civic AI</span>
            </div>
            <button
              className="text-lg px-2 py-0 text-gray-600 hover:text-red-400"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-2" style={{ maxHeight: 300 }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-2xl text-sm max-w-[70%] ${
                    msg.sender === "user" ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing */}
            {typing && (
              <div className="mb-2 flex justify-start">
                <div className="px-3 py-2 rounded-2xl text-sm max-w-[70%] bg-gray-200 text-gray-500">
                  AI is typing...
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="flex border-t">
            <input
              className="flex-1 px-3 py-2 outline-none bg-transparent text-black"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={loading ? "Waiting for AI..." : "Type your message..."}
              disabled={loading}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-purple-500 text-white rounded-r-2xl font-bold"
              disabled={loading}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
