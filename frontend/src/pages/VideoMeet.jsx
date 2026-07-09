import React from "react";
import "../styles/VideoComponent.css";
import {useState , useRef , useEffect} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import io, { connect } from "socket.io-client";



const server = import.meta.env.VITE_SERVER;

// stun server used to get the public ip address of an user which later we will use to connect
const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}


const VideoMeet = ()=>{

    var socketRef = useRef();
    let socketIdRef = useRef();

    let localVideoref = useRef();

    let [videoAvailable, setVideoAvailable] = useState(true);

    let [audioAvailable, setAudioAvailable] = useState(true);

    let [video, setVideo] = useState([]);

    let [audio, setAudio] = useState();

    let [screen, setScreen] = useState();

    let [showModal, setModal] = useState(true);

    let [screenAvailable, setScreenAvailable] = useState();

    let [messages, setMessages] = useState([])

    let [message, setMessage] = useState("");

    let [newMessages, setNewMessages] = useState(3);

    let [askForUsername, setAskForUsername] = useState(true);

    let [username, setUsername] = useState("");

    const videoRef = useRef([])

    let [videos, setVideos] = useState([])

    // step :-1 this runs first whenever user connects 
    // first we will take permission
    // whatever permission user gives we will setAudio/Video/ScreenShare of those usestate
    useEffect(()=>{
        getPermission();
    }, [])

    // permission function
    const getPermission = async ()=>{

        // i need seperate try catch block because whenever is promise denied it sends directly to catch block and 
        // i am not able to reach rest of the code

        // video
        try{
            const videoPermission = await navigator.mediaDevices.getUserMedia({video : true})
            if(videoPermission){
                console.log("acess granted");
                setVideoAvailable(true)
            }
        }catch(e){
            setVideoAvailable(false)
        }
        // audio
        try{
            const audioPermission = await navigator.mediaDevices.getUserMedia({audio : true})
            if(audioPermission){
                console.log("acess granted");
                setAudioAvailable(true)
            }
        }catch(e){
            setAudioAvailable(false)
        }
        // scren share
        try{
            const screenPermission = await navigator.mediaDevices.getDisplayMedia();
            if(screenPermission){
                console.log("acess granted");
                setScreenAvailable(true)
            }
        }catch(e){
            setScreenAvailable(false)
        }

        // actual media stram now
        try{
            if(videoAvailable || audioAvailable){
                const dataStream = await navigator.mediaDevices.getUserMedia({audio : audioAvailable , video : videoAvailable});

                if(dataStream){
                    window.localStream = dataStream;
                    if(localVideoref.current){
                        localVideoref.current.srcObject = dataStream;
                    }
                }
            }
        }catch(e){
            console.log("couldnt connect audio or video");
        }

    }

// one doubt i have here
    useEffect(()=>{
        if(video !== undefined && audio !== undefined){
            getUserMedia();
        }
    }, [video , audio])


    let getUserMediaSuccess = ()=>{

    }


    let getUserMedia = () =>{
        if(video || audio){
            navigator.mediaDevices.getUserMedia({video : video , audio : audio})
            .then(getUserMediaSuccess)
            .then((stream) =>{})
            .catch(e=> console.log(e));
        }else{
            try{
                // if audio or video is not available we will clear it
                let tracks = localVideoref.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }catch(e){
                console.log(e);
            }
            
        }
    }




    let gotMessageFromServer = (fromId , message)=>{

    }

    let addMessage = ()=>{

    }
    
    // again
    const connectToSocketServer = async ()=>{
        socketRef.current = await io.connect(server , {secure : false});// this gives us socket object in current which also has socket.id
        //emit(), on() basicaaly it stablish connection between browser and the backend server
       

        socketRef.current.on('signal', gotMessageFromServer);
        

        // we are never emitting connect from server than how am i using on in it??
        // becasue connect is default handler provided by socket.io client
        socketRef.current.on('connect' ,()=>{

            socketIdRef.current = socketRef.current.id;

            socketRef.current.on("join-call" , window.location.href);

            socketRef.current.on("chat-message" , addMessage);

            socketRef.current.on('user-left', (id) => {
                setVideos((videos) => videos.filter((video) => video.socketId !== id))
            })

            socketRef.current.on("user-joined" , (id , clients) =>{
                clients.forEach((socketListId) =>{
                    
                    connections[socketListId] = new RTCPeerConnection(peerConfigConnections)
                     // Wait for their ice candidate       
                    connections[socketListId].onicecandidate = function (event) {
                        if (event.candidate != null) {
                            socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }))
                        }
                    }
                    
                    connections[socketListId].onaddstream = (event)=>{
                         let videoExists = videoRef.current.find(video => video.socketId === socketListId);

                        if (videoExists) {
                            console.log("FOUND EXISTING");

                            // Update the stream of the existing video
                            setVideos(videos => {
                                const updatedVideos = videos.map(video =>
                                    video.socketId === socketListId ? { ...video, stream: event.stream } : video
                                );
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            });
                        } else {
                            // Create a new video
                            console.log("CREATING NEW");
                            let newVideo = {
                                socketId: socketListId,
                                stream: event.stream,
                                autoplay: true,
                                playsinline: true
                            };

                            setVideos(videos => {
                                const updatedVideos = [...videos, newVideo];
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            });
                        }
                    }

                    // Add the local video stream
                    if (window.localStream !== undefined && window.localStream !== null) {
                        connections[socketListId].addStream(window.localStream)
                    } else {
                        let blackSilence = (...args) => new MediaStream([black(...args), silence()])
                        window.localStream = blackSilence()
                        connections[socketListId].addStream(window.localStream)
                    }

                })


                if (id === socketIdRef.current) {
                    for (let id2 in connections) {
                        if (id2 === socketIdRef.current) continue

                        try {
                            connections[id2].addStream(window.localStream)
                        } catch (e) { }

                        connections[id2].createOffer().then((description) => {
                            connections[id2].setLocalDescription(description)
                                .then(() => {
                                    socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }))
                                })
                                .catch(e => console.log(e))
                        })
                    }
                }
            })


        })



    }

    // 
    let getMedia = ()=>{
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();
    }

    
    const connect = ()=>{
        setAskForUsername(false);
        getMedia();
    }

    return (
        <div>
            {askForUsername === true ?
                <div>
                    <h1>enter the room</h1>
                    <TextField id="filled-basic" label="username" variant="filled" value={username} onChange={e =>setUsername(e.target.value)} />
                    <Button variant="contained" onClick={connect} >Connect</Button>

                    <div>
                        <video ref = {localVideoref} autoPlay muted></video>
                    </div>


                </div>
                :
                <div>

                </div>
            }
        </div>
    )
}

export default VideoMeet;