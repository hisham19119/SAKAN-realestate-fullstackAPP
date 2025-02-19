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
// app.use(
//   cors({
//     origin: "https://lms-mern-stack-client.vercel.app",
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     credentials: true,
//   })
// );
// allowedHeaders: ["Content-Type"],
app.use(cors());
app.use(express.json());
app.listen(process.env.PORT || 4000, () => {
  console.log("running now >>>");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/properties", propertiesRouter);
app.use("/api/locations/", locationRouter);
app.use("/api/types/", propertyTypeRouter);
app.use("/api/users/", userRouter);
