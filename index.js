//Enables express
var express = require("express");
var app = express();
//Enables fs
var fs = require("fs");
//Enables body parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

//Takes the public folder in use
app.use(express.static(__dirname + "/public"));

//Enables ejs views folder
app.set("view engine", "ejs");

//Sends main.ejs for the route "/"
app.get("/", function (req, res) {
    res.render("pages/main");
});

//Sends error message in case the user navigates to path which doesn't exist
app.get("*", function (req, res) {
    res.status(404).send("Error, cannot find page!");
});

//Enables server
var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    //Sends a message in the console that the server is running
    console.log("The guestbook app is running on port %d", PORT);
});