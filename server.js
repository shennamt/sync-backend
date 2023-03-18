// dependencies //////////////////////////////////////////////////////////////////
const express = require('express');
const app = express();
const PORT = 3000;
const fruits = require("./models/fruits.js"); //NOTE: it must start with ./ if it's just a file, not an NPM package
const methodOverride = require("method-override");

// Middleware //////////////////////////////////////////////////////////////////
app.use((req, res, next) => {
    console.log("I run for all routes");
    next();
}); // functionally for all routes

app.use(express.urlencoded({ extended: false })); // body parser

app.use(express.static("public"));

app.use(methodOverride("_method")); // We'll be adding a query parameter to our delete form named _method

// routes //////////////////////////////////

// test
app.get("/", (req, res) => {
    res.send("The healthy server life chose me!")
});

// index
app.get("/fruits/", (req, res) => {
    res.render("index.ejs", { // file to render
        allFruits: fruits,
    });
});

// post route
app.post("/fruits", (req, res) => {
    console.log(req.body);
    if (req.body.readyToEat === "on") {
      // if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true;
    } else {
      // if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false;
    }
    fruits.push(req.body);
    res.redirect("/fruits");
}); 

// create route
app.get("/fruits/new", (req, res) => {
    res.render("new.ejs");
});
  
// show route
app.get("/fruits/:indexOfFruitsArray", (req, res) => {
    res.render("show.ejs", { // res.render is a function that always takes 2 arguments. first is which file to render which is always a string
        fruit: fruits[req.params.indexOfFruitsArray], // second param is an object - var_name_we_will_access: var
    });
});

// edit route
app.get("/fruits/:index/edit", (req, res) => {
    res.render(
        "edit.ejs", //render views/edit.ejs
        {
            //pass in an object that contains
            fruit: fruits[req.params.index], //the fruit object
            index: req.params.index, //... and its index in the array
        }
    );
});  

// delete route
app.delete("/fruits/:index", (req, res) => {
    fruits.splice(req.params.index, 1); //remove the item from the array
    res.redirect('/fruits');  //redirect back to index route
});

app.put("/fruits/:index", (req, res) => {
    // :index is the index of our fruits array that we want to change
    if (req.body.readyToEat === "on") {
        //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else {
        //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    fruits[req.params.index] = req.body; //in our fruits array, find the index that is specified in the url (:index).  Set that element to the value of req.body (the input data)
    res.redirect("/fruits"); //redirect to the index page
});

// listen //////////////////////////////////////////////////////////////////
app.listen(PORT, () => {
    console.log("listening on port", PORT);
});