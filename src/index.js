// require('dotenv').config({path:'./env'})

console.log("\n AA \n");

import dotenv from "dotenv";
dotenv.config({
    path:'./env'
});

console.log("\n BB \n");

import mongoose from "mongoose";
import { DB_NAME } from "./constants.js"

console.log("\n CC \n");

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

console.log("\n DD \n");

console.log("\n AA \n")
import connectDB from "./db/index.js";
 connectDB();