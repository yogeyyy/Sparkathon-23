const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 9000;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser())

// Define routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/sellers", require("./routes/sellerRoutes"));
app.use("/api/buyers", require("./routes/buyerRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
