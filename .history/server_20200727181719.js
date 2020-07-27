import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose, { mongo } from 'mongoose'
import path from 'path';
var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}))
const PORT = process.env.PORT || 5000

const mongodbURI = "mongodb+srv://admin:E@sy1ns0mn1@10@cluster0.pp7cv.gcp.mongodb.net/pawcket?retryWrites=true&w=majority"

mongoose.connect(mongodbURI, { useNewUrlParser: true }).then(() => console.log("MongoDB Connected")).catch(err => console.log("Error found" + err));


var Users = require('./routes/Users')
var Projects = require('./routes/Projects')
var Risks = require('./routes/Risks')

app.use('/api', Users)
app.use('/api', Projects)
app.use('/api', Risks)
app.use('/', function (request, response) {
    response.sendFile(path.join(__dirname,'build','index.html'));
  });
app.listen(PORT, () => console.log("Server up and running on port: "+PORT))