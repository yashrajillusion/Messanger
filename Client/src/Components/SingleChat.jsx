import { useEffect, useState } from "react";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:5001";
var socket;

// const curr = JSON.parse(localStorage.getItem("userInfo"));
export const SingleChat = () => {
  const [user, setUser] = useState({ room: "", username: curr, message: "" });
  const [message, setMessage] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const fetchMessages = async () => {
    socket.emit("join chat", user.room);
  };
  const sendMessage = () => {
    socket.emit("new message", user);
    setUser({ ...user, message: "" });
    setMessage([...message, user.message + " " + "you"]);
  };
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user.username);
    socket.on("connected", (data) => {});
  }, []);
  useEffect(() => {
    socket.on("message recieved", (data) => {
      setMessage([...message, data.message + " - " + data.username.name]);
    });
  });
  return (
    <div>
      <input
        value={user.username.name}
        name="username"
        onChange={handleChange}
        type="text"
      />
      <input
        value={user.room}
        name="room"
        onChange={handleChange}
        type="text"
      />
      <input
        value={user.message}
        name="message"
        onChange={handleChange}
        type="text"
      />
      <button onClick={fetchMessages}>Connected</button>
      <button onClick={sendMessage}>Message</button>
      {message.map((chat, id) => (
        <p key={id}>{chat}</p>
      ))}
    </div>
  );
};
