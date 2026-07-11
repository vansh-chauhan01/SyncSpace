import isRegistered from "../utils/isRegistered";
import { useState , useEffect } from "react";
import {TextField ,Button} from "@mui/material";
import "../styles/home.css"
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DuoIcon from '@mui/icons-material/Duo';



const server = import.meta.env.VITE_SERVER;

let client = axios.create({
    baseURL : `${server}/api/users`,
    withCredentials : true
})



function Home() {

    let router = useNavigate();

    let [room , setRoom] = useState("");

    let handleLogout= async() =>{
        try{
            await client.get("/logout");
            localStorage.removeItem("token")
            router("/auth");
        }catch(e){
            console.log(e);
        }
    }

    let handleJoin = ()=>{
        try{
            router(`/${room}`);
        }catch(e){
            console.log(e);
        }
    }


    return (
        <div>
            <div style={{backgroundColor: "#0A192F", color : "white"}} className="navbar">
                <div className="left">
                    <DuoIcon sx={{ fontSize: "2.5rem" }} />
                    <p style={{ fontSize : "20px"}}>sync Space</p>
                </div>
                <div className="right">
                    <div role="button" onClick={handleLogout}>
                        Log out
                    </div>
                </div>
                
            </div>
            <div className="cards">
                <div className="homeImage">
                    <img src="/friends-video-calling-concept_23-2148504260.avif" alt="image" />
                </div>
                <div className="text">
                    <h1 style={{color : '#0066cc'}}>Join Meeting call</h1>
                    <p>Video Calls worth showing up for</p>
                    
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={(e)=> setRoom(e.target.value) } onKeyDown={
                        (e)=>{
                            if(e.key == "Enter"){
                                handleJoin();
                            }
                        }
                    }/>
                    <Button variant="contained" onClick={handleJoin}>Join Room</Button>
                    
                </div>
                
            </div>
            
        </div>
    )
}

export default isRegistered(Home);