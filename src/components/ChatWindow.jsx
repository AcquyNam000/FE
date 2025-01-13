import React, { useState } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";

function ChatWindow() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (type, userMessage, generatedText) => {
    // Tin nhắn của người dùng
    const userMsg = {
      id: Date.now(),
      type,
      content: userMessage,
      sender: "user",
    };

    // Phản hồi từ server (generatedText)
    const aiMsg = {
      id: Date.now() + 1,
      type: "text",
      content: generatedText, // Nội dung phản hồi từ server
      sender: "ai",
    };

    // Cập nhật danh sách tin nhắn
    setMessages((prev) => [...prev, userMsg, aiMsg]);
  };

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <Message
            key={msg.id}
            type={msg.type}
            content={msg.content}
            sender={msg.sender}
          />
        ))}
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default ChatWindow;
