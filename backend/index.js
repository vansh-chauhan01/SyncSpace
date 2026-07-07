import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import cors from "cors";


import { createServer } from "http";// http express server ke sath socket.io ka use karne ke liye http server create karna padta hai
import { Server } from "socket.io";// actual socket.io server 
import { connectToSocket } from "./controllers/socketManager.js";// socket.io server ko express ke sath connect karne ke liye function import kiya

const app = express();

const server = createServer(app);// now our server will forward http req to app
const io = connectToSocket(server);// connect express and socket.io server together



dotenv.config();



const PORT = process.env.PORT || 8800;

const connect = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to mongoDB");
    }catch(e){
        console.log(e);
    }
}

// app.get("/", (req , res) =>{
//     res.send("hello world");
// })

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use("/api/users", userRouter);


server.listen(PORT, async ()=>{
    await connect();
    console.log(`server started on port ${PORT}`)
})

