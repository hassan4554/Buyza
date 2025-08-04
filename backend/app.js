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
    origin: "https://buyza.vercel.app",
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.use("/ping", (req, res) => {
  res.send("pong");
});
app.use("/api/v2", routes);

app.use(globalErrorHanlder);

module.exports = app;
