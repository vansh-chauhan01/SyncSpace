import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";


dotenv.config();


const app = express();

const PORT = 8800;

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

app.use("/api/users", userRouter);



app.listen(PORT, async ()=>{
    await connect();
    console.log(`server started on port ${PORT}`)
})

