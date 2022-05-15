require("dotenv").config();
const cors = require("cors");
const express = require("express");
const socket = require("socket.io");
// const { Server } = require("socket.io");
const app = express();
app.use(cors());
app.use(express.json());
const connect = require("./config/db");

const userController = require("./controller/user");
const chatController = require("./controller/chats");
const messageController = require("./controller/messages");
app.use("/auth", userController);
app.use("/chat", chatController);
app.use("/message", messageController);

const PORT = process.env.PORT || 5001;
let server = app.listen(PORT, async (req, res) => {
  try {
    await connect();
  } catch (err) {
    console.log(err.message);
  }
  console.log(`Listening on ${PORT}`);
});
const io = socket(server, {
  pingTimeout: 6000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});
let chat = [
  "627e0bee996e152f3cac915a",
  "627e1ab0a2aa650a0cea3a2c",
  "627e1a80a2aa650a0cea3a2b",
];
io.on("connection", (socket) => {
  console.log("Connected to socket.io ");
  socket.on("setup", (userData) => {
    console.log(userData._id);
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("new message", (newMessageRecieved) => {
    chat.forEach((id) => {
      if (id == newMessageRecieved.username._id) return;
      socket.in(id).emit("message recieved", newMessageRecieved);
    });
    // var chat = newMessageRecieved.chat;
    // if (!chat.users) return console.log("chat.users not defined");
    // chat.users.forEach((user) => {
    //   if (user._id == newMessageRecieved.sender._id) return;
    // socket.in(user._id).emit("message recieved", newMessageRecieved);
    // });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
