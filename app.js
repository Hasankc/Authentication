//jshint esversion:6

const express = require('express')
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")
const app = express()

app.use(express.static("public"))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true})

const userSchema = { 
    email: String,
    passowrd: String
}

const User = new mongoose.model("User", userSchema)

app.get('/', (req, res) =>{
    res.render("home")
})
app.get('/login', (req, res) =>{
    res.render("login")
})
app.get('/register', (req, res) =>{
    res.render("register")
})

app.post("/register", (req, res)=>{
    const newUser = new User({
        email: req.body.username,
        passowrd: req.body.passowrd
    })
    newUser.save((err)=>{
        if (err) {
            console.log(err)
        }else{
            res.render("secrets")
        }
    })
})

app.listen(3000, (req, res) =>{
    console.log("listening on 3000")
})