import express from "express";
import { createServer } from "node:http";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Server } from "socket.io";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { nanoid } from "nanoid";
import { updateDB } from "./DB/helper.js";

// Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: [" GET", "POST"], // Allow these methods
  },
  connectionStateRecovery: {},
});

// Middlewares
app.use(cors({ origin: '*' }));
app.use(bodyParser.json({ limit: "100mb" }));

// Generate unique nanoid for every user
const username = nanoid(5);
console.log("User ", username, "connected");

// MONGODB CONNECTION
mongoose
  .connect(
    "mongodb+srv://akshathpkk:YFxVGhGH2VJ7SDwd@messages.akq2s.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DATABASE CONNECTED"));

// SOCKET CONNECTION LISTENER
io.on("connection", (socket) => {
  console.log("a user connected");

  // Emit message when user connects
  io.emit("connectionMessage", "SOCKET CONNECTED ", username);

  // Listen to "chat message" event
  socket.on("chat message", (msg) => {
    console.log("chat message received");
    io.emit("chat message", msg);

    // UPDATE MESSAGE TO DB
    updateDB(msg, username);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
