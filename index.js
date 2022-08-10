import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

//DATABASE CONNECTION LINK
import DB_CONN from "./database/dbCon.js";

//Router IMPORT
import router from "./router/auths.js";


//Express inicilization

const app = express();

//JSON converter
app.use(bodyParser.json());

//Main route
app.use('/api/user', router);


//Port

const PORT = 5000;

//Listener

app.listen(PORT, () => {
    console.log(`The server is running on PORT: ${PORT}`);
    console.log('http://localhost:5000/api/user');
})

//Database

mongoose.connect(DB_CONN, () => {
    console.log ('DATABASE CONNECTED AT THIS SERVER!')
})