// * packages imports
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

// const errorHandler = require("./src/middlewares/error");
// * local imports
const userRoutes = require("./src/routes/userRoute");
const authRoutes = require("./src/routes/authRoute");

// * Connecting to mongodb
mongoose
  .connect("mongodb://localhost:27017/insta")
  .then(() => console.log("Mongodb Connection Successful"))
  .catch((err) => console.log(`Mongodb Connection Failed ${err}`));

const app = express();
const port = process.env.PORT || 3000;

// * Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());

// * Routes
app.use("/", userRoutes);
app.use("/", authRoutes);

// * Creating a web server
app.listen(port, () => console.log(`Listening on Port ${port}...`));
