import React, { useEffect, useRef } from "react";

// ChatBubble component
const ChatBubble = ({ message }) => {
  const isUser = message.sender === "user";
  const bubbleColorClass = isUser
    ? "chat-bubble-user text-white"
    : "chat-bubble-bot text-gray-800";
  const bubbleAlignmentClass = isUser
    ? "self-end rounded-br-none"
    : "self-start rounded-bl-none";

  return (
    <div
  className={`max-w-md w-fit p-3 rounded-2xl shadow-md ${bubbleColorClass} ${bubbleAlignmentClass}`}
>
  <p>{message.text}</p>
</div>
  );
};

// ChatHistory component
const ChatHistory = ({ messages }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
  <div className="flex flex-col flex-grow p-6 sm:px-12 md:px-20 lg:px-32 xl:px-48 space-y-6 overflow-y-auto overflow-x-hidden break-words mr-20 scrollbar-hide">
  {messages.map((msg) => (
    <ChatBubble key={msg.id} message={msg} />
  ))}
  <div ref={chatEndRef} />
</div>





  );
};

export default ChatHistory; 
