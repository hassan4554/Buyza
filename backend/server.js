// config
require("dotenv").config();

const app = require("./app");
const connectDB = require("./db/database");
const cloudinary = require("cloudinary");

const PORT = process.env.PORT || 3000;

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);

  server.close(() => {
    process.exit(1);
  });
});

// connect db
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// create server
const server = app.listen(PORT, () => {
  console.log(`Server is running on Port:${PORT}`);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
