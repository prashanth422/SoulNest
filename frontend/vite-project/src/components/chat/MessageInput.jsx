import React, { useState } from "react";   // <-- ✅ added useState import
import { SendIcon } from "../common/SendIcon";
import MenuIcon from "../common/MenuIcon";
import MicIcon from "../common/MicIcon";
import GlobalStyles from "../common/GlobalStyles";
import './mic.css'
const MessageInput = ({ onSendMessage }) => {
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <footer className="bg-white px-4 py-3 border-t border-gray-200 flex-shrink-0">
      <form onSubmit={handleSend} className="flex items-center justify-center">
        <div className="message-input-container-bg flex items-center w-full max-w-xl border rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-purple-400">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-700 px-2"
          />
          <button type="button" className="mic-btn">
      <MicIcon />
    </button>

          <button
            type="submit"
            className="send-btn-bg p-2 ml-1 rounded-full text-white disabled:opacity-50"
            disabled={!input.trim()}
          >
            <SendIcon />
          </button>
        </div>
      </form>
    </footer>
  );
};

export default MessageInput;   // ✅ use default export (to match your App.jsx import)
