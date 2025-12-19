const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const router = require("./routes")
const app = express();
const port = 1010;

app.use(express.json());
app.use(cookieParser());

app.use("/",router)


connectDB()
  .then(() => {
    console.log("Database connected successfully....");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed!", err);
  });
