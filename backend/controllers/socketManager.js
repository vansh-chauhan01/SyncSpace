import { Server } from "socket.io";

let connections= {};
let messages = {};
let timeOnline = {};


export const connectToSocket = (server) =>{
    const io = new Server(server);

    io.on("connection" , (socket) =>{


        socket.on("join-call", (path) =>{
            
            if(!connections[path]) connections[path] = []; // if room doesnt exsist create a new room
            // if room already exsit we will push its id in that room

            connections[path].push(socket.id);

            connections[path].forEach(id =>{
                io.to(id).emit("user-joined", socket.id, connections[path]); 
            })

            if(messages[path]){
                messages[path].forEach((message) =>{
                    io.to(socket.id).emit("chat-message", message['data'], message['sender'] , message['socket-id-sender']);
                })
            }



        })


    })



    return io;
}