require("dotenv").config();
const cors = require("cors");
const express = require("express");
const socket = require("socket.io");
// const { Server } = require("socket.io");
const app = express();
app.use(cors());
app.use(express.json());
const connect = require("./config/db");

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

io.on("connection", (socket) => {
  console.log("connected to socket.io", socket.id);
  socket.on("setup", (user) => {
    socket.join(user);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined Room: " + room);
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved;
    socket.in(chat.room).emit("message recieved", newMessageRecieved.message);
  });
  socket.off("setup", () => {
    console.log("user disconnected");
    socket.leave(user);
  });
});
