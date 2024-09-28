import React, { useEffect, useState , useCallback } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import debounce from "lodash.debounce";

const socket = io("http://localhost:3000");
const NickName = nanoid(4);

function ChatApp() {
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState([]);
  const [connectionMessage, setConnectionMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false); // To show "user is typing" notification.
  const [typingUser, setTypingUser] = useState(''); // User who is typing.
  // const [onlineUsers , setOnlineUsers] = useState([]);
  const [newUser ,setNewUser ] = useState("")

  //For nicknames
  const [username , setUsername] = useState("")

  //Handle chat messages
  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat message", { msg, username });
    setMsg("");
  };

  // Debounce typing notification to prevent spamming the server
  const debounceEmitTypingNotification = useCallback(
    debounce(() => {
      socket.emit("typingNotification", { username });
    }, 1000), // Emit typing event after 1 second of no typing.
    []
  );

  const HandleInputChage=(e)=>{
    setMsg(e.target.value);
    debounceEmitTypingNotification();
  }

  //Listens to incomming messages
  useEffect(() => {

  setUsername(localStorage.getItem("username"))

    socket.on("chat message", (payload) => {
      console.log(payload);
      setChat([...chat, payload]);
    });

    socket.on("connectionMessage", ( message) => {
      console.log(message);
      setConnectionMessage(message);
      socket.emit("OnlineNotification", { username });
      setNewUser(username)
    });

    socket.on("typingNotification", (data) => {
      setTypingUser(data.username);
      setIsTyping(true);

      // Remove "is typing" notification after 3 seconds
      setTimeout(() => {
        setIsTyping(false);
      }, 3000);
    });

    socket.on("newUserOnline",(data)=>{
      console.log("new user just connected bruhh",data);
      
    })

    // Clean up listeners on unmount
    return () => {
      socket.off("chat message");
      socket.off("connectionMessage");
      socket.off("typingNotification");
    };

  }, [chat]);

  useEffect(()=>{
    console.log(username)
  },[username])

  return (
    <div className="App bg-gray-900 min-h-screen flex justify-center items-center">
      <header className="App-header bg-gray-800 p-6 rounded-lg shadow-lg text-white max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-center mb-6">CHATTER 💬🗨️ </h1>

        {/* <span className=" flex m-10 ">
          <p className="font-bold mt-1">USERNAME : </p>{" "}
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Enter your username"
            className="rounded-l-md ml-5 p-2 text-black"
            type="text"
          ></input>
          <button className="bg-green-500 text-white p-2 rounded-r-md  w-28">
            Submit
          </button>
        </span> */}
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

        {/* Typing Notification */}
        {isTyping && (
          <div className="text-yellow-300 mb-2">{typingUser} is typing...</div>
        )}


        <div className="flex">

          <div className="p-3">
            <h1 className="text-green-400 font-bold text-xl">Online Users</h1>

            <ul className="mt-4 flex-col flex-wrap">
              
              { NickName?<li className="mt-5 flex hover:bg-gray-600 w-full  hover:cursor-pointer p-1"><img className="w-5 h-5 mr-2   " src="/images/tick.png"/>{NickName}</li>:""}
              <li className="mt-5 flex hover:bg-gray-600 w-full  hover:cursor-pointer p-1"><img className="w-5 h-5 mr-2   " src="/images/tick.png"/>Arjun</li>
              <li className="mt-5 flex hover:bg-gray-600 w-full  hover:cursor-pointer p-1"><img className="w-5 h-5 mr-2   " src="/images/tick.png"/>Adwaith</li> 
              <li className="mt-5 flex hover:bg-gray-600 w-full  hover:cursor-pointer p-1"><img className="w-5 h-5 mr-2   " src="/images/tick.png"/>Amith</li>
              <li className="mt-5 flex hover:bg-gray-600 w-full  hover:cursor-pointer p-1"><img className="w-5 h-5 mr-2   " src="/images/tick.png"/>Tony Stark</li>
              
            </ul>
          </div>
          <div className="ml-10">
            {/* Chat Messages */}
            <div className="bg-gray-700 p-4 rounded-lg mb-4 h-64 overflow-y-auto w-[500px]">
              {chat.map((payload, index) => (
                <p key={index} className="mb-2">
                  <span className="font-semibold text-indigo-400">
                    {payload.username}
                  </span>
                  : {payload.msg}
                </p>
              ))}
            </div>

            {/* Chat Input */}

            <form onSubmit={sendChat} className="flex">
              <input
                type="text"
                name="chat"
                placeholder="Your message here"
                value={msg}
                onChange={HandleInputChage}
                className="w-full p-2 text-gray-900 rounded-l-lg focus:outline-none"
              />
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-r-lg transition-colors"
              >
                SEND
              </button>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
}

export default ChatApp;
