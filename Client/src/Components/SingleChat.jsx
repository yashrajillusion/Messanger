import { useEffect, useState } from "react";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:5001";
var socket;
export const SingleChat = () => {
  const [user, setUser] = useState({ room: "", username: "", message: "" });
  const [message, setMessage] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const fetchMessages = async () => {
    socket.emit("join chat", user.room);
  };
  const sendMessage = () => {
    setUser({ ...user, message: "" });
    socket.emit("new message", user);
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user.room);
    socket.on("connected", (data) => {});
  }, []);
  useEffect(() => {
    socket.on("message recieved", ({ message }) => {
      console.log(message);
      // if (user.message === message) return;
      // setMessage((prev) => [...prev, message]);
    });
  }, [socket]);
  return (
    <div>
      <input name="username" onChange={handleChange} type="text" />
      <input name="room" onChange={handleChange} type="text" />
      <input name="message" onChange={handleChange} type="text" />
      <button onClick={fetchMessages}>Connected</button>
      <button onClick={sendMessage}>Message</button>
      {message.map((chat, id) => (
        <p key={id}>{chat}</p>
      ))}
    </div>
  );
};
