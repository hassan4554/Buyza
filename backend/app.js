require("dotenv").config();

const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { globalErrorHanlder } = require("./middleware");
const routes = require("./routes");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use("/", express.static("uploads"));

app.use("/ping", (req, res) => {
  res.send("pong");
});
app.use("/api/v2", routes);

app.use(globalErrorHanlder);

module.exports = app;
