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


        // we are sending id because so that reciever knows who is sending the message
        // user1->server->user2
        socket.on("signal" , (id , message)=>{
            io.to(id).emit("signal" , message , socket.id); // send message to the user with the id of the user that is joining the call
        })



        socket.on("chat-message" , (data , sender) =>{
            let currRoom = undefined;
            for(let room in connections){
                if(connections[room].includes(socket.id)){
                    currRoom = room;
                    break;
                }
            }

            if(currRoom){
                if(!messages[currRoom]) messages[currRoom] = [];
                messages[currRoom].push({'sender' : sender , 'data' : data , 'socket-id-sender' : socket.id});

                connections[currRoom].forEach(id =>{
                    io.to(id).emit("chat-message", data , sender , socket.id);
                })
            }
        })

        socket.on("disconnect" , ()=>{
            let currRoom = undefined;

            for(let room in connections){
                if(connections[room].includes(socket.id)){
                    currRoom = room;
                    break;
                }
            }

            if(!currRoom) return;

            if(currRoom){
                connections[currRoom] = connections[currRoom].filter((id)=>{
                    return id !== socket.id;
                })
            }

            connections[currRoom].forEach(id =>{
                io.to(id).emit("user-left" , socket.id);
            }) 

            if(connections[currRoom].length === 0){
                delete connections[currRoom];
            }
        })


    })

    return io;
}