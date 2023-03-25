// dependencies //////////////////////////////////////////////////////////////////

const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Include dotenv
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;

// Include the method-override package
const methodOverride = require("method-override");

const Fruit = require("./models/Kanban.js");

// const signup = require("./model/signupmodel.js");
// const cors = require("cors");
// const signupRoute = require("./routes/signuproutes");
// const userRoute = require("./routes/userroute");

// const whitelist = ["http://localhost:3000"];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   }
// };

// Middleware //////////////////////////////////////////////////////////////////
app.use(express.urlencoded({ extended: true })); // body parser
// app.use(express.static("public"));
// app.use(express.json());
// app.use(cors(corsOptions));

//connection
mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

mongoose.connect("mongodb://127.0.0.1:27017/sync", {
  useNewUrlParser: true
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

//routes
// app.use("/api/user", signupRoute);
// app.use("/api/user", userRoute);

app.get("/fruits", async (req, res) => {
  try {
    const allFruits = await Fruit.find({});
    res.render("index.ejs", { fruits: allFruits });
  } catch (error) {
    console.log(error);
  }
});

app.get("/fruits/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/fruits/", async (req, res) => {
  if (req.body.readyToEat === "on") {
    // if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true;
  } else {
    // if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false;
  }
  try {
    const fruit = await Fruit.create(req.body);
    // console.log(fruit);
    res.redirect("/fruits");
  } catch (error) {
    console.log(error);
  }
});

app.get("/fruits/:id", async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);
    // res.send(foundFruit);
    res.render("show.ejs", {
      fruit: foundFruit
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/fruits/:id", async (req, res) => {
  // res.send("deleting...");
  // using try method for external systems, so that we can stop any errors.
  try {
    const removeFruit = await Fruit.findByIdAndDelete(req.params.id);
    console.log(removeFruit);
    res.redirect("/fruits"); // redirect back to fruits index
  } catch (error) {
    console.log(error);
  }
});

app.get("/fruits/:id/edit", async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);
    res.render("edit.ejs", {
      fruit: foundFruit // pass in found fruit
    });
  } catch (error) {
    console.log(error);
  }
});

app.put("/fruits/:id", async (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  try {
    const updatedFruit = await Fruit.findByIdAndUpdate(
      req.params.id,
      req.body
      // { new: true }
    );
    // res.send(updatedFruit);
    res.redirect("/fruits");
  } catch (error) {
    console.log(error);
  }
});

//listen for request
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}.`);
});
