const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const validate = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/userAuth");
const router = require("./routes")
const app = express();
const port = 1010;

// app.post ("/user/login",(req,res)=>{
//     res.send("hey!, logged in successfully🥳🥳")
// })

// app.use("/user",userAuth);

// app.get("/user/getData",(req,res)=>{
// res.send("we got the data!")
// })
// app.get("/user/deleteData",(req,res)=>{
//     res.send('the Data is deleted!')
// })
app.use(express.json());
app.use(cookieParser());

app.use("/",router)

// feed route to get all users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("No users found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(500).send("Error fetching users", error);
  }
});
// get user data by emailId

app.get("/user", async (req, res) => {
  const emailId = req.body.emailId;
  try {
    const user = await User.findOne({ emailId }); // use either findOne or find to get data
    if (user.length === 0) {
      res.status(404).send("No users found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(500).send("Error fetching users", error);
  }
});

// delete user by id
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId); // ({_id:userId})
    res.send("User deleted successfully");
  } catch (error) {
    res.status(500).send("Error saving user data", error);
  }
});
// put to update

app.put("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndUpdate(userId, req.body);
    res.send("User data updated successfully");
  } catch (error) {
    res.status(500).send("Error saving user data", error);
  }
});



//post login


// get profile

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
