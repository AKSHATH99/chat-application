import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "../components/Chat.css";
import { nanoid } from "nanoid";

const socket = io("http://localhost:3000");
const username = nanoid(4);

function ChatApp() {
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState([]);
  const [connectionMessage, setConnectionMessage] = useState('');

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat message", { msg, username });
    setMsg("");
  };

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
    <div className="App">
      <header className="App-header">
        <h1>CHATTER ..... </h1>

        {connectionMessage?
        <div id="cmsg">
          {connectionMessage  }
        </div>:""
        }
        {chat.map((payload, index) => (
          <p key={index}>
            {payload.msg} <span> id : {payload.username}</span>
          </p>
        ))}

        <form onSubmit={sendChat}>
          <input
            type="text"
            name="chat"
            placeholder="your msg here"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button type="submit">SEND</button>
        </form>
      </header>
    </div>
  );
}

export default ChatApp;
