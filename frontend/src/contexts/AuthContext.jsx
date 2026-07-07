import axios from "axios";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext({});

const server = import.meta.env.VITE_SERVER;

const client = axios.create({
    baseURL: `${server}/api/users`,
     withCredentials: true,
});

//const authContext = useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    
    
    const router = useNavigate();

    const handleRegister = async(name , password , username) => {
        try{
            const res = await client.post("/register" , {name , password , username});
            if(res.status === 201){
                return res.data.message;
            }            
        }catch(e){
            console.log(e);
            throw e;
        }
    }

    const handleLogin = async(username , password) => {
        try{
            const res = await client.post("/login" , {username , password});
            if(res.status === 200){
                localStorage.setItem("token" , res.data.token);
                router("/home");
            }
        }catch(e){
            console.log(e);
            throw e;
        }   
    }

    const data = {handleRegister , handleLogin};

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )



}