import React from "react";

function Message({ type, content, sender }) {
  const isUser = sender === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } items-start space-x-4`}
    >
      {type === "text" ? (
        <div
          className={`p-2 rounded-lg ${
            isUser
              ? "bg-blue-500 text-white self-end"
              : "bg-gray-300 text-black self-start"
          }`}
        >
          {content}
        </div>
      ) : (
        <img
          src={content}
          alt="Sent"
          className={`w-32 h-32 object-cover rounded-lg ${
            isUser ? "self-end" : "self-start"
          }`}
        />
      )}
    </div>
  );
}

export default Message;