var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require('./models/user');

mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();

app.use(require("express-session")({
    secret: "Rusty is the best and cutest in the world",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('view engine', 'ejs');


//routes


app.get("/", function(req,res){
    res.render("home");
});

app.get("/secret", function(req,res){
    res.render("secret");
});

//auth routes
app.get("/register", function(req,res){
    res.render("register");
});

app.post("/register", function(req,res){
    res.send("Register POSt route");
});

app.listen(3000, function(){
    console.log("Authentication Demo has started");
})