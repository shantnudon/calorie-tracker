const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { error } = require("console");

const app = express();
const port = 6969;

let date_time = new Date();
let date = ("0" + date_time.getDate()).slice(-2);
let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
let year = date_time.getFullYear();
let hours = date_time.getHours();
let minutes = date_time.getMinutes();
let seconds = date_time.getSeconds();
let timestamp =
  year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

const Schema = mongoose.Schema;
const calorieDataInSchema = new Schema(
  {
    calorie: String,
    protein: String,
    fat: String,
    carb: String,
  },
  { collection: "data" }
);
const dataInsertionModel = mongoose.model(
  "dataInsertionModel",
  calorieDataInSchema
);

const userRegisterSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: String,
    created_on: String,
  },
  { collection: "users" }
);
const userRegisterModel = mongoose.model(
  "userRegisterModel",
  userRegisterSchema
);

const secretKey = crypto.randomBytes(32).toString("hex");
function generateUserToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, secretKey, { expiresIn: "1hr" });
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected successfully to MongoDB");
  })
  .catch((err) => {
    console.error("Error occurred while connecting to MongoDB", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(cors());

app.post("/insertDataDon", async (req, res) => {
  const { calorie, protein, fat, carb } = req.body;
  if (!req.body) {
    return res.status(400).json({ error: "Meal data is required" });
  }
  try {
    const doc = new dataInsertionModel({ calorie, protein, fat, carb });
    const result = await doc.save();
    // console.log("Document inserted:", result._id);
    res.status(201).json({ message: "Document inserted successfully" });
  } catch (err) {
    console.error("Error occurred while inserting document", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/registerUser", async (req, res) => {
  const { name, email, password } = req.body;
  if (!req.body) {
    return res.status(400).json({ error: "Undefined data" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const doc = new userRegisterModel({
      name,
      email,
      password: hashedPassword,
      role: "customer",
      created_on: timestamp,
    });
    const resultUser = await doc.save();
    // console.log("User Created successfully:", resultUser._id);
    res.status(201).json({ message: "User Created successfully" });
  } catch (err) {
    console.error("Error occurred while inserting document", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/loginUser", async (req, res) => {
  const { email, password } = req.body;
  if (!req.body) {
    return res.status(400).json({ error: "Invalid credentials" });
  }
  try {
    const existingUser = await userRegisterModel.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ error: "User doesn't exists!" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect Password.." });
    }
    const authToken = generateUserToken(existingUser);
    console.log(authToken);
    console.log(email);
    return res.status(200).json({ authToken: authToken, email: email });
  } catch (error) {
    res.status(501).json({ error: "Invalid Credentials!!" });
  }
});

app.get("/getData", async (req, res) => {
  // return console.log(req.header);
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Unauthorized : Missing Auth token" });
  }

  // const [bearer, token] = authHeader.split(" ");

  // if (bearer !== "Bearer" || token) {
  //   return res
  //     .status(401)
  //     .json({ message: "Unauthorized : Invalid token format" });
  // }
  jwt.verify(authHeader, secretKey, async () => {
    // console.log(data)
    if (error) {
      console.log(error);
      return res.status(403).json({ message: "Forbidden : Invalid token" });
    }
    try {
      const data = await dataInsertionModel.find();
      res.json(data);
    } catch (error) {
      console.error("Error occurred while fetching data", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
});

app.post("/authChalak", async (req, res, next) => {
  const chacha = req.body.authToken;
  const userEmailFromRequest = req.body.email;

  if (!chacha || !userEmailFromRequest) {
    return res.status(401).json({ message: "Missing authToken or email" , status : "401" });
  }

  jwt.verify(chacha, secretKey, (error, decode) => {
    if (error) {
      return res.status(401).json({ message: "Invalid authToken", status : "401"  });
    }
    const userEmailFromToken = decode.email;
    if (userEmailFromToken !== userEmailFromRequest) {
      return res.status(401).json({ message: "Email does not match", status : "401" });
    }
    return res.status(200).json({ message: "Authentication successful", status : "200"  });
  });
});

app.get("/getData/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await dataInsertionModel.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.json(data);
  } catch (error) {
    console.error("Error occurred while fetching data", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  // console.log(timestamp);
});
