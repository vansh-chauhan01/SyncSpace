import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerUser = async(req , res) =>{
    try{

        const { name, username, password } = req.body;
        const alreadyExists = await User.findOne({ username: username });
        if(alreadyExists){
            return res.status(400).json({ message: "User already exists" });
        }
        const hashed =  await bcrypt.hash(password, 10);

        const newUser = new User({ name, username, password: hashed });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    }catch(e){
        res.status(500).json({ message: "Error registering user" });
    }
}


export const loginUser = async(req , res)=>{
    try{
        const {username , password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        const isCorrect = await bcrypt.compare(password, user.password);
        if(!isCorrect){
            return res.status(400).json({ message: "Wrong password or username" });
        }
        const token  = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        user.token = token;
        const obj = user.toObject(user);
        obj.password = undefined;
        res.cookie("access_token", token, {
            httpOnly : true,
        }).status(200).json({token, obj});
    }catch(e){
        res.status(500).json({ message: "Error logging in user" });
    }
}


export const isLoggedIn = async(req , res) =>{
    try{
        res.status(200).json({
            authenticated: true,
            user: req.user,
        });
    }catch(e){
        res.status(500).json({message : "user is either not logged in or wrong credential"});
    }
}


export const logout = async(req , res) =>{
    try{
        
        res.clearCookie("access_token");
        res.status(200).json({message : "user logged out successfully"});

    }catch(e){
        res.status(500).json({message : "couldnt logout"});
    }
}