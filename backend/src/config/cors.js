const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin || "") !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
