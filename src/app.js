import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";

const app = express();

let CORS_ORIGIN = "*"; // * is for allowing any connection 
//It should typically be in environment varaibles

app.use(cors({
    origin: CORS_ORIGIN, 
    credentials: true,
}))

//To handle data from json
app.use(express.json({
    limit:"16kb",
}))

app.use(express.urlencoded({
    extended: true,
    limit: "16kb",
}));

app.use(express.static("public"))

app.use(cookieParser());


//routes import
import userRouter from "./routes/user.routes.js"




//routes declaration
/* we used to use app.get(), but it was then, when we used to write the router and controller here only, but since we have our router (and controllers) in different files, we'll need to use middleware. so, we'll use app.use()*/
app.use("/api/v1/users", userRouter)



export { app };