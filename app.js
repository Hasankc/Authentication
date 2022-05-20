//jshint esversion:6
require('dotenv').config()

const express = require('express')
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")
const app = express()
const bcrypt = require('bcrypt');
const saltRounds = 10


app.use(express.static("public"))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true})

const userSchema = new mongoose.Schema ({
    email: String,
    passowrd: String
})




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
    bcrypt.hash(req.body.password, saltRounds, (err, hash)=> {
        
        const newUser = new User({
            email: req.body.username,
            passowrd: hash
        })
        newUser.save((err)=>{
            if (err) {
                console.log(err)
            }else{
                res.render("secrets")
            }
        })
        
    });


})
app.post("/login", (req, res)=>{
    const username = req.body.username
    const password = req.body.password
    User.findOne({email: username}, (err, founUser)=>{
        if (err) {
            console.log(err)
        }else{
            if (founUser) {
                bcrypt.compare(password, founUser.passowrd, (err, result) => {
                    if (result == true) {
                        res.render("secrets")
                    }
                })
                    
                }
            }
        }
)})


app.listen(3000, (req, res) =>{
    console.log("listening on 3000")
})