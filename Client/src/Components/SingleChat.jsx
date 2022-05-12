import { useEffect, useState } from "react";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:5001";
var socket;
export const SingleChat = () => {
  const [user, setUser] = useState({ room: "", username: "", message: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const fetchMessages = async () => {
    socket.emit("join chat", user.room);
  };
  const sendMessage = () => {
    socket.emit("new message", user);
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user.room);
    socket.on("connected", (data) => {});
  }, []);
  useEffect(() => {
    socket.on("message recieved", (data) => {
      console.log(Date.now());
      console.log(data);
    });
  }, [socket]);
  return (
    <div>
      <input name="username" onChange={handleChange} type="text" />
      <input name="room" onChange={handleChange} type="text" />
      <input name="message" onChange={handleChange} type="text" />
      <button onClick={fetchMessages}>Connected</button>
      <button onClick={sendMessage}>Message</button>
    </div>
  );
};
