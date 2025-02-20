// require("dotenv").config();
// const express = require("express");
// const app = express();
// const dbConecction = require("./config/dbConnection");
// const propertiesRouter = require("./routes/property.routes");
// const locationRouter = require("./routes/location.routes");
// const propertyTypeRouter = require("./routes/propertyType.routes");
// const userRouter = require("./routes/user.routes");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// dbConecction();
// const allowedOrigins = [
//   "http://localhost:3000", // Local frontend for development
//   // "https://your-frontend-domain.vercel.app", // Deployed frontend on Vercel
// ];

// // ✅ Configure CORS Middleware
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     credentials: true, // Allows sending cookies & auth headers
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.listen(process.env.PORT || 4000, () => {
//   console.log("running now >>>");
// });

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use("/api/properties", propertiesRouter);
// app.use("/api/locations/", locationRouter);
// app.use("/api/types/", propertyTypeRouter);
// app.use("/api/users/", userRouter);

const cookieParser = require("cookie-parser");
require("dotenv").config();
const express = require("express");
const app = express();
const dbConecction = require("./config/dbConnection");
const propertiesRouter = require("./routes/property.routes");
const locationRouter = require("./routes/location.routes");
const propertyTypeRouter = require("./routes/propertyType.routes");
const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");
const cors = require("cors");

dbConecction();

// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
const allowedOrigins = [
  "http://localhost:3000",
  "https://sakan-realestate-server.vercel.app", // أضف هذا العنوان
];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    // allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

app.use(express.json());
app.use(cookieParser());

app.use("/api/properties", propertiesRouter);
app.use("/api/locations/", locationRouter);
app.use("/api/types/", propertyTypeRouter);
app.use("/api/users/", userRouter);
app.use("/api/auth/", authRouter);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is running...");
});
