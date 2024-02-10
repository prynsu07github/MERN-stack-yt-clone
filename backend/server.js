import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodparser from "body-parser";
import dotenv from 'dotenv'
dotenv.config()
// import HistorySchema from "./histroy.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodparser.urlencoded({ extended: true }));


mongoose
  .connect("mongodb://0.0.0.0:27017/temporary-database", {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("successfully connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const AdminSchema = new mongoose.Schema({
  userName:String , 
  password:String
})

const Admin = new mongoose.model("Admin", AdminSchema);
// const admin = new Admin({userName:"Admin101" , password:"Admin101"})
// admin.save()
const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
  history: Array,
});

const User = new mongoose.model("User", UserSchema);
User.createIndexes();

// const History = new mongoose.model("Historie", HistorySchema);

app.post("/register", async (req, resp) => {
  console.log(req.body);
  try {
    const user = new User(req.body);
    const userData = await User.findOne({ userName: req.body.userName });
    if (userData) {
      // console.log(userData);
      resp.send({
        msg: "Username exists!",
        isUserRegister: false,
      });
    } else {
      user.save();
      // console.log("submitted");
      resp.send({
        msg: "Done",
        isUserRegister: true,
      });
      // sendMail(req.body.email)
    }
  } catch (e) {
    console.log(e);
    resp.send({
      msg: "something went wrong ! ",
    });
  }
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  if (req.body.whoIsLogin == "user") {
    const userData = await User.findOne({
      userName: req.body.userName,
      password: req.body.password,
    });
    // console.log(userData)
    if (userData) {
      console.log("Login Successfully!");
      res.send({
        msg: "Login Successfully!",
        isUserLogin: true,
      });
    } else {
      res.send({
        msg: "Inavlid Username and Password",
        isUserLogin: false,
      });
    }
  }
  else{
    const adminData = await Admin.findOne({userName:req.body.userName , password:req.body.password});
    if (adminData) {
      console.log("Login Successfully!");
      res.send({
        msg: "Login Successfully!",
        isUserLogin: true,
      });
  }}
});

app.post("/history", async (req, res) => {
  // console.log(req.body);
  try {
    User.findOneAndUpdate(
      { userName: req.body.userName, history: req.body },
      { $pull: { history: req.body } },
      { new: true }
    );

    User.findOneAndUpdate(
      { userName: req.body.userName },
      { $push: { history: req.body } },
      { new: true }
    ).then((data) => {
      console.log("history get stored.");
      res.send({
        data: data.history,
      });
    });
  } catch (err) {
    console.log("Error " + err);
    res.send({
      msg: "Something is wrong",
    });
  }
});

app.post("/delete-history", async (req, res) => {
  User.findOneAndUpdate(
    { userName: req.body.userName, history: req.body },
    { $pull: { history: req.body } },
    { new: true }
  ).then((data) => {
    console.log("history deleted on click of button");
    res.send(data);
  });
});

app.post('/delete-user', async(req, res)=>{
  await User.deleteOne({userName:req.body.username})
})

app.post('/add-user' , async(req ,res)=>{
  console.log(req.body)
  const userData = await User.findOne({ userName: req.body.userName });
})

app.get("/get-users-data", async (req, res) => {
  const usersData = await User.find({});
  res.send(usersData);
});

app.listen(process.env.PORT || 5000, (req, res) => {
  console.log("server is on port " + process.env.PORT);
});
