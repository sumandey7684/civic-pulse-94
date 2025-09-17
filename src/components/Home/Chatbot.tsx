
import React, { useState, useRef, useEffect } from "react";

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


  // Send message to Botpress API
  const sendToBotpress = async (userMessage: string) => {
    setLoading(true);
    setTyping(true);

    try {
      // Replace with your Botpress Cloud endpoint and botId
      const BOT_ID = "YOUR_BOTPRESS_BOT_ID";
      const BOTPRESS_API_KEY = "bp_bak_lo7pU-IYlMnhSmLqaaosoxBOwmwBSeHvBL_R";
      const BOTPRESS_API_URL = `https://api.botpress.cloud/v1/bots/${BOT_ID}/converse`;
      const res = await fetch(BOTPRESS_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${BOTPRESS_API_KEY}`
        },
        body: JSON.stringify({ messages: [{ type: "text", text: userMessage }] })
      });
      const data = await res.json();
      console.log("Botpress Response:", data);
      const botReply = data?.responses?.[0]?.text || "⚠️ Sorry, I couldn't generate a response.";
      setMessages((msgs) => [...msgs, { sender: "bot", text: botReply }]);
    } catch (err) {
      console.error("Botpress API Error:", err);
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: "❌ Error connecting to Botpress API." }
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
    await sendToBotpress(userMessage);
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
          className="fixed bottom-6 right-6 w-80 border-0 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] flex flex-col z-50 transition-all duration-500"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.55) 60%, rgba(245,245,255,0.35) 100%)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            boxShadow: "0 8px 32px 0 rgba(31,38,135,0.37)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b-0 font-bold flex justify-between items-center rounded-t-3xl bg-white/40 backdrop-blur-md shadow-sm">
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
          <div className="flex-1 overflow-y-auto px-4 py-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300" style={{ maxHeight: 320 }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-2xl text-sm max-w-[70%] shadow-sm ${
                    msg.sender === "user"
                      ? "bg-gradient-to-br from-blue-100 via-white to-blue-200 text-gray-900"
                      : "bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-700"
                  }`}
                  style={{
                    border: msg.sender === "user" ? "1px solid #c7d2fe" : "1px solid #e5e7eb",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing */}
            {typing && (
              <div className="mb-2 flex justify-start">
                <div className="px-3 py-2 rounded-2xl text-sm max-w-[70%] bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-500 shadow-sm" style={{backdropFilter: "blur(8px)", border: "1px solid #e5e7eb"}}>
                  AI is typing...
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="flex border-t-0 bg-white/30 backdrop-blur-md rounded-b-3xl shadow-sm">
            <input
              className="flex-1 px-3 py-2 outline-none bg-transparent text-black placeholder:text-gray-400"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={loading ? "Waiting for AI..." : "Type your message..."}
              disabled={loading}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-400 text-white rounded-r-3xl font-bold shadow-md hover:scale-105 transition-transform"
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
