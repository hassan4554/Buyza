require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = require("./config/cors");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});
const port = process.env.PORT || 4000;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.get("/ping", (req, res) => {
  res.send("Pong");
});

const users = new Map();

const addUser = (userId, socketId) => {
  users.set(userId, socketId);
};

const getUser = (userId) => {
  return { userId, socketId: users.get(userId) };
};

const removeUser = (socketId) => {
  for (const [userId, sId] of users.entries()) {
    if (sId === socketId) {
      users.delete(userId);
      break;
    }
  }
};

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    // Convert Map to object for frontend compatibility
    const usersObject = Object.fromEntries(users);
    io.emit("getUsers", usersObject);
  });

  console.log(users);

  ///   Send Message
  socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {

    const user = getUser(receiverId);

    if (user && user.socketId) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
        images,
        createdAt: Date.now(),
      });
    } else {
      console.log("User not found or not online:", receiverId);
    }
  });

  /// Message Seen
  socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
    const user = getUser(senderId);

    if (user && user.socketId) {
      io.to(user.socketId).emit("messageSeen", {
        senderId,
        receiverId,
        messageId,
      });
    }
  });

  /// Disconnect User
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id);
    // Convert Map to object for frontend compatibility
    const usersObject = Object.fromEntries(users);
    io.emit("getUsers", usersObject);
  });
});

server.listen(port, () => {
  console.log(`Socket server listening on port: ${port}`);
});
