// require('dotenv').config({path:'./env'})

import dotenv from "dotenv";
dotenv.config({
    path:'./env'
});

const PORT = 3000; //Typically we should take it from the environment variables

import mongoose from "mongoose";
import { DB_NAME } from "./constants.js"

/*
// function connectDB(){
// }
// connectDB();
// use iffi
import express from "express";
const app = express();

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", (error)=>{
            console.log("ERROR: ", error);
            throw error;
        })
    } catch (error) {
        console.error("ERROR: ", error);
        throw err;        
    }
})()
*/

import connectDB from "./db/index.js";
import { app } from "./app.js";

// connectDB();
// connectDB which we are calling, is asynchronous, tehrefoe it will return a promise, so
connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("Error encountered ", error);
        throw error;
    })
    app.listen( (PORT || 8000), ()=>{
        console.log(`server is listening at port : ${PORT}`);
    });
})
.catch((err) => {
    console.log("MongoDB connection failed !! ", err);
})
