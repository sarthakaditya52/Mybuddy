const express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    path = require("path"),
    methodOverride = require("method-override"),
    flash = require('connect-flash'),
    port=process.env.PORT||3000,
    cookieParser =require('cookie-parser'),
    dotenv=require('dotenv');


//App Config
app.use(cookieParser('secret'));

app.use(flash());


//App other config


// app.use(express.cookieParser('keyboard cat'));
// app.use(express.session({ cookie: { maxAge: 60000 }}));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname+"/public"));

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
 });



//---------------
//Mongo Config
//---------------
//Mongo URI
dotenv.config();
const mongoURI = "mongodb://localhost/stickman_game_project";
// const mongoURI = "mongodb+srv://"+process.env.MLAB_USER+":"+process.env.MLAB_PASS+"@cluster0-kw5s2.mongodb.net/stickman?retryWrites=true&w=majority";
//Mongo connection
mongoose.connect(mongoURI);




// @HOME ROUTE
app.get('/',(req,res)=>{
    res.render('index');
})