require("dotenv").config();
const express = require("express");
const app = express();
const dbConecction = require("./config/dbConnection");
const propertiesRouter = require("./routes/property.routes");
const locationRouter = require("./routes/location.routes");
const propertyTypeRouter = require("./routes/propertyType.routes");
const userRouter = require("./routes/user.routes");
const cors = require("cors");
const bodyParser = require("body-parser");

dbConecction();
const allowedOrigins = [
  "http://localhost:3000", // Local frontend for development
  // "https://your-frontend-domain.vercel.app", // Deployed frontend on Vercel
];

// ✅ Configure CORS Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true, // Allows sending cookies & auth headers
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(process.env.PORT || 4000, () => {
  console.log("running now >>>");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/properties", propertiesRouter);
app.use("/api/locations/", locationRouter);
app.use("/api/types/", propertyTypeRouter);
app.use("/api/users/", userRouter);
