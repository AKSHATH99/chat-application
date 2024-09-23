import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";

const socket = io("http://localhost:3000");
const username = nanoid(4);

function ChatApp() {
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState([]);
  const [connectionMessage, setConnectionMessage] = useState('');

  //For nicknames
  const [username , setUsername] = useState("")

  //Handle chat messages
  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat message", { msg, username });
    setMsg("");
  };

  //Listens to incomming messages
  useEffect(() => {
    socket.on("chat message", (payload) => {
      console.log(payload);
      setChat([...chat, payload]);
    });

    socket.on("connectionMessage", ( message) => {
      console.log(message);
      setConnectionMessage(message);
    });
  }, [chat]);

  return (
    <div className="App bg-gray-900 min-h-screen flex justify-center items-center">
  <header className="App-header bg-gray-800 p-6 rounded-lg shadow-lg text-white max-w-3xl w-full">
    <h1 className="text-4xl font-bold text-center mb-6">CHATTER 💬🗨️ </h1>

    {/* Connection Message */}
    {connectionMessage ? (
      <div
        id="cmsg"
        className="bg-green-500 text-white p-2 rounded-lg text-center mb-4"
      >
        {connectionMessage}
      </div>
    ) : (
      ""
    )}

    {/* Chat Messages */}
    <div className="bg-gray-700 p-4 rounded-lg mb-4 h-64 overflow-y-auto">
      {chat.map((payload, index) => (
        <p key={index} className="mb-2">
          <span className="font-semibold text-indigo-400">{payload.username}</span>: {payload.msg}
        </p>
      ))}
    </div>

    {/* Chat Input */}
    <form onSubmit={sendChat} className="flex">
      <input
        type="text"
        name="chat"
        placeholder="
        Your message here"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        className="w-full p-2 text-gray-900 rounded-l-lg focus:outline-none"
      />
      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-r-lg transition-colors"
      >
        SEND
      </button>
    </form>
  </header>
</div>

  );
}

export default ChatApp;
