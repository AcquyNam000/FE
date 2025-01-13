import React, { useState } from "react";
import ChatWindow from "./components/ChatWindow";

function App() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-md">
        <ChatWindow />
      </div>
    </div>
  );
}

export default App;
