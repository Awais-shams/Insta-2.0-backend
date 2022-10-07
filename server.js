// * packages imports
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
var cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./src/config/config.env" });

// const errorHandler = require("./src/middlewares/error");

// * local imports
const userRoutes = require("./src/routes/userRoute");
const authRoutes = require("./src/routes/authRoute");
const userPostRoutes = require("./src/routes/userPostRoute");
const { createServer } = require("http");

// * Connecting to mongodb
mongoose
  .connect("mongodb://localhost:27017/insta")
  .then(() => console.log("Mongodb Connection Successful"))
  .catch((err) => console.log(`Mongodb Connection Failed ${err}`));

const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    allowedHeaders: ["my-custom-header"],
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id}: user is connected`);
  console.log("socket is active");

  socket.on("disconnect", () => {
    console.log("User is disconnected");
  });

  socket.on("chat", (payload) => {
    console.log("What is payload", payload);
    io.emit("chatResponse", payload);
  });
});

// * Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(cookieParser());

// * Routes
app.use("/", userRoutes);
app.use("/", userPostRoutes);
app.use("/", authRoutes);

// * Creating a web server
server.listen(port, () => console.log(`Listening on Port ${port}...`));
