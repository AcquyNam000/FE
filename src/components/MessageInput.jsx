import React, { useState } from "react";

function MessageInput({ onSendMessage }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSend = async () => {
    const payload = {}; // Tạo đối tượng JSON để gửi dữ liệu

    if (text) {
      payload.type = "text"; // Gửi kiểu "text"
      payload.text = text; // Gửi trường "text"
      setText(""); // Reset text sau khi gửi
    } else if (image) {
      payload.type = "image"; // Gửi kiểu "image"
      payload.text = image; // Gửi hình ảnh dưới dạng "text" (để giữ tính nhất quán)
      setImage(null);
      setPreview(null); // Xóa preview sau khi gửi
    }

    if (payload.text) { // Kiểm tra nếu có "text"
      try {
        const response = await fetch("http://localhost:8000/api/v1/process", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Đảm bảo rằng gửi dữ liệu dưới dạng JSON
          },
          body: JSON.stringify(payload), // Chuyển đối tượng payload thành chuỗi JSON
        });

        if (response.ok) {
          const result = await response.json(); // Lấy kết quả từ server
          console.log("Server response:", result);

          // Gửi cả tin nhắn của người dùng và phản hồi của server đến ChatWindow
          onSendMessage(payload.type, payload.text, result.generated_text);
        } else {
          console.error("Failed to send message:", response.statusText);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Lưu file thay vì base64
      setPreview(URL.createObjectURL(file)); // Cập nhật preview ảnh
      setText(""); // Xóa text nếu có
    }
  };

  return (
    <div className="flex items-center p-4 border-t bg-white">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-2 border rounded-lg mr-2"
        disabled={!!image} // Vô hiệu hóa nếu đã có ảnh
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="file-input"
      />
      <label htmlFor="file-input" className="cursor-pointer text-blue-500">
        Upload
      </label>
      {preview && (
        <div className="ml-2">
          <img
            src={preview}
            alt="Preview"
            className="w-16 h-16 object-cover rounded"
          />
        </div>
      )}
      <button
        onClick={handleSend}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Send
      </button>
    </div>
  );
}

export default MessageInput;
