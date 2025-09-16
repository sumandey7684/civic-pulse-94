import React, { useState, useRef, useEffect } from "react";

const GEMINI_API_KEY = "AIzaSyBpfmpdipBLK6v92bY_BsXnw3VkOJOlFpE";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendToGemini = async (userMessage: string) => {
    setLoading(true);
    setTyping(true);
    try {
      // Simulate typing delay for realism
      await new Promise(res => setTimeout(res, 1200));
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
      const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (botReply && botReply.trim().length > 0) {
        setMessages((msgs) => [...msgs, { sender: "bot", text: botReply }]);
      } else if (data?.candidates?.length === 0 && data?.promptFeedback?.blockReason) {
        setMessages((msgs) => [...msgs, { sender: "bot", text: `Gemini blocked this prompt: ${data.promptFeedback.blockReason}` }]);
      } else {
        setMessages((msgs) => [...msgs, { sender: "bot", text: "No response from Gemini. Try again or check your API key/quota." }]);
      }
    } catch (err) {
      setMessages((msgs) => [...msgs, { sender: "bot", text: "Error connecting to Gemini API." }]);
    }
    setTyping(false);
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
      {/* AI ✨ button with smooth animation */}
      {!open && (
        <button
          className="fixed bottom-6 right-6 bg-gradient-to-br from-pink-500 via-purple-500 to-yellow-400 text-white rounded-full shadow-xl w-16 h-16 flex items-center justify-center text-3xl z-50 transition-transform duration-300 hover:scale-110 focus:outline-none animate-fade-in"
          style={{ boxShadow: "0 4px 24px 0 rgba(255, 0, 128, 0.15)" }}
          onClick={() => setOpen(true)}
          aria-label="Open AI Chatbot"
        >
          <span role="img" aria-label="AI">✨</span>
        </button>
      )}
      {/* Chat modal */}
      {open && (
        <div
          className="fixed bottom-6 right-6 w-80 border rounded-2xl shadow-2xl flex flex-col z-50 animate-fade-in"
          style={{
            background: "rgba(255,255,255,0.35)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.25)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)"
          }}
        >
          <div className="px-4 py-3 border-b font-bold flex justify-between items-center rounded-t-2xl" style={{background: "rgba(255,255,255,0.25)", backdropFilter: "blur(16px) saturate(180%)", WebkitBackdropFilter: "blur(16px) saturate(180%)", color: "#222"}}>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full flex items-center justify-center bg-white/60 text-xl shadow-md" style={{backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)"}}>✨</span>
              <span>Civic Ai</span>
            </div>
            <button className="text-lg px-2 py-0 text-gray-600 hover:text-red-400" onClick={() => setOpen(false)} aria-label="Close">×</button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-2" style={{ maxHeight: 300 }}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-3 py-2 rounded-2xl text-sm max-w-[70%] relative animate-fade-in ${msg.sender === "user" ? "text-black" : "text-black"}`}
                  style={{
                    background: "rgba(255,255,255,0.45)",
                    boxShadow: "0 4px 24px 0 rgba(31, 38, 135, 0.13)",
                    backdropFilter: "blur(12px) saturate(180%)",
                    WebkitBackdropFilter: "blur(12px) saturate(180%)"
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="mb-2 flex justify-start">
                <div
                  className="px-3 py-2 rounded-2xl text-sm max-w-[70%] relative animate-fade-in text-gray-500"
                  style={{
                    background: "rgba(255,255,255,0.35)",
                    boxShadow: "0 2px 8px 0 rgba(31, 38, 135, 0.10)",
                    backdropFilter: "blur(8px) saturate(180%)",
                    WebkitBackdropFilter: "blur(8px) saturate(180%)"
                  }}
                >
                  AI is typing...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleSend} className="flex border-t">
            <input
              className="flex-1 px-3 py-2 outline-none bg-transparent text-black dark:text-white"
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={loading ? "Waiting for AI..." : "Type your message..."}
              disabled={loading}
            />
            <button type="submit" className="px-4 py-2 bg-white/60 text-black rounded-r-2xl font-bold" style={{backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)"}} disabled={loading}>Send</button>
          </form>
        </div>
      )}

    </>
  );
};

export default Chatbot;
