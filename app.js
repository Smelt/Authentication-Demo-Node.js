var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require('./models/user');

mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "Rusty is the best and cutest in the world",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('view engine', 'ejs');


//routes


app.get("/", function(req,res){
    res.render("home");
});

app.get("/secret", isLoggedIn,  function(req,res){
    res.render("secret");
});

//auth routes
app.get("/register", function(req,res){
    res.render("register");
});

app.post("/register", function(req,res){
    req.body.username;
    req.body.password;
    User.register(new User({
      username: req.body.username  
    }),
    req.body.password,
    function(err,user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        });
    })

});

//login routes
app.get("/login", function(req,res){
    res.render("login");
}); 

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req,res){

});

//log out form
app.get("/logout", function(req,res){
    req.logOut();
    res.redirect("/");
})

//check logged in 
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

app.listen(3000, function(){
    console.log("Authentication Demo has started");
})