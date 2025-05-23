import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUser } = useParams();
  const [messages, setMessages] = useState([]);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const firstName = user?.firstName;
  const [mssg, newMessage] = useState("");
  const setMessage = (ev) => {
    newMessage(ev.target.value);
  };
  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", { firstName, userId, targetUser, mssg });
    newMessage("")
  };

  // as soon as the page loads, connect to the server
  useEffect(() => {
    if (!user) {
      return;
    }
    const socket = createSocketConnection();

    // use this socket to emit events
    socket.emit("joinChat", { userId, targetUser, firstName });

    socket.on("MessageReceived", ({ firstName, mssg }) => {
      console.log(firstName + ": " + mssg);
      setMessages((prev) => [...prev, { firstName, text: mssg }]);
    });

    // cleanup
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUser]);

  return (
    <div className="w-3/4 mx-auto border border-gray-400 m-5 h-[70vh] flex flex-col">
      <div className="p-5 border-b border-gray-400 flex justify-center">
        Chat Box
      </div>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div key={index}>
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                    />
                  </div>
                </div>

                <div className="chat-header">{msg.firstName}</div>
                <div className="chat-bubble">{msg.text}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-400 flex items-center gap-2">
        <input
          value={mssg}
          onChange={(ev) => setMessage(ev)}
          className="flex-1 border border-gray-400 p-2 bg-slate-300 text-black"
        ></input>
        <button onClick={() => sendMessage()} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
