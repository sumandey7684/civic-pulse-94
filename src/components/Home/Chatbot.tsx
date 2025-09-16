import React, { useState, useRef, useEffect } from "react";

const GEMINI_API_KEY = "AIzaSyBpfmpdipBLK6v92bY_BsXnw3VkOJOlFpE";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY;

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendToGemini = async (userMessage: string) => {
    setLoading(true);
    try {
      const res = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }]
        })
      });
      const data = await res.json();
      const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";
      setMessages((msgs) => [...msgs, { sender: "bot", text: botReply }]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { sender: "bot", text: "Error connecting to Gemini API." }]);
    }
    setLoading(false);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { sender: "user", text: input }]);
    await sendToGemini(input);
    setInput("");
  };

  return (
    <>
      {/* Gemini-style floating button */}
      {!open && (
        <button
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl z-50 hover:scale-105 transition"
          onClick={() => setOpen(true)}
          aria-label="Open Gemini Chatbot"
        >
          <span role="img" aria-label="Gemini">💎</span>
        </button>
      )}
      {/* Chat modal */}
      {open && (
        <div className="fixed bottom-6 right-6 w-80 bg-white dark:bg-gray-900 border rounded-lg shadow-lg flex flex-col z-50">
          <div className="px-4 py-2 border-b bg-blue-50 dark:bg-gray-800 font-bold flex justify-between items-center">
            Gemini Assistant
            <button className="text-lg px-2 py-0 text-gray-500 hover:text-red-500" onClick={() => setOpen(false)} aria-label="Close">×</button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-2" style={{ maxHeight: 300 }}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-3 py-2 rounded-lg text-sm max-w-[70%] ${msg.sender === "user" ? "bg-blue-100 text-blue-900" : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleSend} className="flex border-t">
            <input
              className="flex-1 px-3 py-2 outline-none bg-transparent"
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={loading ? "Waiting for Gemini..." : "Type your message..."}
              disabled={loading}
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-r-lg" disabled={loading}>Send</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
