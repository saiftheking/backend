const express = require('express')
const mangoose = require('mongoose')
const routes = require ('./routes/homepage.html')
const cors = require('cors');
//use cors 
app.use(cors())
const port = 4000;
const dbURL =  'mongodb+srv://saif:sameerissaif@saif.qy04uoj.mongodb.net/?retryWrites=true&w=majority'

//connecting to the mongo cloud db through the mongoose package 
mangoose.connect(dbURL).then(() => {
    console.log("connected to the cloud")
}).catch((error) => { console.log(error) })

//in order to let express parse JSON 
app.use(express.json())
//routes 
app.use('/api',routes)

//starting the server at the port of your choice 
app.listen(port, () => {
    console.log("app is listening at port", port)
})
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test');

var publicFolder = path.join(_dirname,'public');

app.use(express.static(publicFolder));
app.use(bodyParser.urlencoded({ extended: true }))

var user = mongoose.model('user', userSchema, {email: String, password: Number});

app.get("signup.html", (req, res) =>{
    res.render(publicFolder + '/signup.html');
});

app.post('/user', (req, res) =>{
    var user = new User({name: req.body.username, age: req.body.age});

    user.save().then(newUser => {
        res.send("created new user successfully!");
    }).catch(err => {
        res.send("somthing went wrong!");
    })
})
app.listen(4000, () => {
    console.log("Server is runing on port 4000");
});