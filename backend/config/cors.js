const allowedOrigins = [
  "http://localhost:5173/",
  "https://buyza.vercel.app",
  "https://ca236dbfdedb.ngrok-free.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
      return true;
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  enablePreflight: true,
};

module.exports = { corsOptions };
