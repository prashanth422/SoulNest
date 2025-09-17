import React, { useState } from "react";
import GlobalStyles from "./components/common/GlobalStyles.jsx";
import Sidebar from "./components/layout/Sidebar.jsx";
import Header from "./components/layout/Header.jsx";
import Home from "./components/chat/Home.jsx";
import ChatHistory from "./components/chat/ChatHistory.jsx";
import MessageInput from "./components/chat/MessageInput.jsx";
import LoginCard from "./components/layout/LoginCard.jsx";
import CreateAccountCard from "./components/layout/CreateAccountCard.jsx";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isChatActive, setIsChatActive] = useState(false);
  const [authView, setAuthView] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Chat functions
  const handleStartConversation = () => {
    const initialBotMessage = {
      id: 1,
      text: "I'm here to help. It sounds like you're going through a tough time. Can you tell me what's been making you feel overwhelmed?",
      sender: "bot",
    };
    setMessages([initialBotMessage]);
    setIsChatActive(true);
  };

  const handleSendMessage = (text) => {
    const newUserMessage = {
      id: Date.now(),
      text,
      sender: "user",
    };
    setMessages((prev) => [...prev, newUserMessage]);
  };

  const handleSuggestionClick = (text) => {
    const initialBotMessage = {
      id: 1,
      text: "I'm here to help. It sounds like you're going through a tough time. Can you tell me what's been making you feel overwhelmed?",
      sender: "bot",
    };
    const userMessage = {
      id: Date.now(),
      text,
      sender: "user",
    };
    setMessages([initialBotMessage, userMessage]);
    setIsChatActive(true);
  };
  
  // --- 1. NEW FUNCTION ADDED HERE ---
  const handleNewChat = () => {
    setMessages([]); // Clears the old chat messages
    setIsChatActive(false); // Resets the view to the Home component
    setSidebarOpen(false); // Also closes the sidebar
  };

  // Auth functions
  const handleAuthClick = () => setAuthView("login");
  const handleCloseAuth = () => setAuthView(null);
  const handleSwitchAuthView = (view) => setAuthView(view);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsChatActive(false);
    setMessages([]);
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setAuthView(null); // Close modal
    setIsChatActive(false); // Reset chat
  };

  const renderAuthCard = () => {
    if (authView === "login") {
      return (
        <LoginCard
          onSwitchToSignup={() => handleSwitchAuthView("signup")}
          onAuthSuccess={handleAuthSuccess}
        />
      );
    }
    if (authView === "signup") {
      return (
        <CreateAccountCard
          onSwitchToLogin={() => handleSwitchAuthView("login")}
          onAuthSuccess={handleAuthSuccess}
        />
      );
    }
    return null;
  };

  return (
    <>
      <GlobalStyles />
      <div className="flex h-screen w-screen bg-gradient-to-br from-purple-100 via-white to-orange-100 font-sans overflow-hidden">
        {/* Sidebar */}
        {/* --- 2. PROP ADDED TO SIDEBAR HERE --- */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          onNewChat={handleNewChat} 
        />

        {/* Main content */}
        <div className="flex-1 flex flex-col max-h-screen transition-all duration-300 ease-in-out">
          <Header
            onMenuClick={() => setSidebarOpen(true)}
            onAuthClick={handleAuthClick}
            onLogout={handleLogout}
            isLoggedIn={isLoggedIn}
          />

          <main className="flex-1 flex flex-col items-center justify-center text-center overflow-y-auto bg-transparent p-4">
            {!isLoggedIn ? (
              <h2 className="text-xl text-gray-700">
                👋 Welcome! Please{" "}
                <button
                  className="text-purple-600 font-semibold underline"
                  onClick={handleAuthClick}
                >
                  login
                </button>{" "}
                to start chatting.
              </h2>
            ) : !isChatActive ? (
              <Home
                onStartConversation={handleStartConversation}
                onSuggestionClick={handleSuggestionClick}
              />
            ) : (
              <ChatHistory messages={messages} />
            )}
          </main>

          {isLoggedIn && isChatActive && (
            <MessageInput onSendMessage={handleSendMessage} />
          )}
        </div>
      </div>

      {/* Authentication modal */}
      {authView && (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center z-50 p-4">
          <div className="relative">
            <button
              onClick={handleCloseAuth}
              className="absolute -top-3 -right-3 bg-white text-gray-800 rounded-full h-8 w-8 flex items-center justify-center text-xl font-bold shadow-lg hover:bg-gray-100 z-50"
            >
              &times;
            </button>
            {renderAuthCard()}
          </div>
        </div>
      )}
    </>
  );
}