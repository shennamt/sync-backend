// const express = require("express");
// const router = express.Router();
// const User = require("../models/userModel.js");

// // USER - Display/Read Index
// router.get("/", async (req, res) => {
//   try {
//     const allUsers = await User.find({});
//     res.render("indexUsers.ejs", { users: allUsers });
//   } catch (error) {
//     console.log(error);
//   }
// });

// // USER - Display/Read New User
// router.get("/new", (req, res) => {
//   res.render("newUsers.ejs");
// });

// // USER - Create New User
// router.post("/", async (req, res) => {
//   if (req.body.student === "on") {
//     // if checked, req.body.student is set to 'on'
//     req.body.student = true;
//   } else {
//     // if not checked, req.body.student is undefined
//     req.body.student = false;
//   }
//   if (req.body.professional === "on") {
//     // if checked, req.body.professional is set to 'on'
//     req.body.professional = true;
//   } else {
//     // if not checked, req.body.professional is undefined
//     req.body.professional = false;
//   }
//   try {
//     const user = await User.create(req.body);
//     // console.log(user);
//     res.redirect("/users");
//   } catch (error) {
//     console.log(error);
//   }
// });

// // USER - Display/Read Each User
// router.get("/:id", async (req, res) => {
//   try {
//     const foundUser = await User.findById(req.params.id);
//     res.render("showUsers.ejs", {
//       user: foundUser
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// // USER - Display Edit User Page
// router.get("/:id/edit", async (req, res) => {
//   try {
//     const foundUser = await User.findById(req.params.id);
//     res.render("editUsers.ejs", {
//       user: foundUser // pass in found project
//     });
//     console.log("foundUser -", foundUser);
//   } catch (error) {
//     console.log(error);
//   }
// });

// // USER - Update User
// router.put("/:id", async (req, res) => {
//   if (req.body.student === "on") {
//     req.body.student = true;
//   } else {
//     req.body.student = false;
//   }
//   if (req.body.professional === "on") {
//     req.body.professional = true;
//   } else {
//     req.body.professional = false;
//   }
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       req.body
//       // { new: true }
//     );
//     console.log("updatedUser -", updatedUser);
//     res.redirect("/users");
//   } catch (error) {
//     console.log(error);
//   }
// });

// // USER - Delete User
// router.delete("/:id", async (req, res) => {
//   try {
//     const removeUser = await User.findByIdAndDelete(req.params.id);
//     console.log(removeUser);
//     res.redirect("/users"); // redirect back to users index
//   } catch (error) {
//     console.log(error);
//   }
// });

// module.exports = router;
