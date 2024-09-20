import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "../components/Chat.css"; // If you want to move the styles to a CSS file

const ChatApp = () => {
  const [socket, setSocket] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    const newSocket = io({
      auth: {
        serverOffset: 0,
      },
    });

    setSocket(newSocket);

    newSocket.on("connectionMessage", (msg, username, serverOffset) => {
      console.log(msg);
      console.log(username);
      setUser(username);
    });

    newSocket.on("chat message", (msg, serverOffset) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        `${user}: ${msg}`,
      ]);
      newSocket.auth.serverOffset = serverOffset;
    });

    return () => newSocket.close(); // Cleanup on component unmount
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      socket.emit("chat message", input);
      setMessages((prevMessages) => [...prevMessages, `user: ${input}`]);
      setInput("");
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  return (
    <div>
      <h1>MESSAGING APP</h1>
      <ul id="messages">
        {messages.map((msg, index) => (
          <li key={index} className={index % 2 === 0 ? "even" : "odd"}>
            {msg}
          </li>
        ))}
      </ul>
      <form id="form" onSubmit={handleSubmit}>
        <input
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatApp;
