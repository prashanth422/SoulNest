import React from 'react';

// ChatBubble component
const ChatBubble = ({ message }) => {
  const isUser = message.sender === 'user';

  // Tailwind CSS classes for user and bot messages
  const userBubbleClasses = 'bg-purple-600 text-white self-end rounded-br-none';
  const botBubbleClasses = 'bg-gray-200 text-gray-800 self-start rounded-bl-none';

  return (
    <div
      className={`relative max-w-xs sm:max-w-md my-1 p-2.5 rounded-2xl shadow-md ${isUser ? userBubbleClasses : botBubbleClasses}`}
    >
      <p className="text-sm">{message.text}</p>
      {/* Add a timestamp */}
      <div className={`mt-1 text-right text-xs ${isUser ? 'text-purple-200' : 'text-gray-500'}`}>
        {message.timestamp}
      </div>
    </div>
  );
};
export {ChatBubble}