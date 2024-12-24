import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { application } from "express";

console.log("BB");

const mongoDB_Uri="mongodb+srv://collectnis:240311035766@learningstage1.rjgxf.mongodb.net";

console.log("CC");

const connectDB = async () => {
   try {
       console.log("ZZ");
       console.log(`Connecting to: ${mongoDB_Uri}/${DB_NAME}`);

       const connectionInstance = await mongoose.connect(`${mongoDB_Uri}/${DB_NAME}`); //Mongoose retuns an object
       console.log("\n mongoDB connected");
       return connectionInstance;
   } catch (error) {
       console.log("MONGODB connection error: ", error);
       process.exit(1);
   }
}

console.log("TT");

connectDB();

console.log("SS");

export default connectDB;


