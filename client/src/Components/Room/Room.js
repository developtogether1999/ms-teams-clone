import Button from "@material-ui/core/Button"
import React, { useContext, useEffect, useRef, useState } from "react"
import Peer from 'simple-peer'
import axios from 'axios'
import { FiMic } from 'react-icons/fi'
import { FiMicOff } from 'react-icons/fi'
import { FiVideo } from 'react-icons/fi'
import { FiVideoOff } from 'react-icons/fi'

import { SocketContext } from "../../Contexts/socket"

import { useHistory, useLocation } from "react-router-dom"

import "./Room.css"

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <video playsInline autoPlay ref={ref} style={{ width: "300px" }} />
    );
}

const Room = (props) => {

    const location = useLocation();
    const history = useHistory();

    const initialCall  = (location.state && location.state.callInitially)? location.state.callInitially : [];

    const roomId = props.match.params.roomId

    const socket = useContext(SocketContext);

	const [ currentUser, setCurrentUser ] = useState("")
    const [ peers, setPeers ] = useState([]);
    const [ audioButton, setAudioButton ] = useState(true);
    const [ videoButton, setVideoButton ] = useState(true);
	
    const myVideo = useRef();
    const peersRef = useRef([]);

	useEffect(() => {

        axios({
            method: "GET",
            withCredentials: true,
            url: "/login",
        })
        .then(async (response) => {
            if (response.data.redirect === '/login') {
                window.location = "/auth/login"
            } else {
                setCurrentUser(response.data.user.username);

                await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                    .then((stream) => {

                        myVideo.current.srcObject = stream
                        
                        socket.emit('join-room', { roomId: roomId, userId: socket.id });
                        
                        if(initialCall.length > 0) {
                            callUsers(initialCall);
                        }

                        if(props.answerCall && props.answerCall != '') {
                            answerCall();
                        }
        
                        socket.on('all users', (users) => {
                            const peers = [];
                            users.forEach(userId => {
                                const peer = createPeer(userId, socket.id, stream);
                                peersRef.current.push({
                                    peerId: userId,
                                    peer,
                                })
                                peers.push(peer)
                            });
                            setPeers(peers);
                        })

                        socket.on('user joined', (payload) => {
                            const peer = addPeer(payload.signal, payload.callerId, stream)
                            peersRef.current.push({
                                peerId: payload.callerId,
                                peer,
                            })
                            setPeers(users => [...users, peer])
                        })

                        socket.on("receiving returned signal", payload => {
                            const item = peersRef.current.find(p => p.peerId === payload.id);
                            console.log('receiving returned signal', payload.signal);
                            item.peer.signal(payload.signal);
                        })

                    })
            }
        })
        .catch((err) => {
            console.log('err', err)
        })

    }, [])

    const callUsers = (usersToCall) => {
        
        usersToCall.forEach(userToCall => {
            socket.emit("callUser", {
                userToCall: userToCall,
                from: socket.id,
                name: currentUser,
                roomId: roomId
            })
        });

	}

    const answerCall = () =>  {
        
	}

    const createPeer = (userToSignal, callerId, stream) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });
        ////new user signals to user already in room
        peer.on("signal", signal => {
            socket.emit("sending signal", { userToSignal, callerId, signal })
        })

        return peer;
    }

    const addPeer = (incomingSignal, callerId, stream) => {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        })
        ////user already in room signals back to new user who has joined the meeting
        peer.on("signal", (signal) => {
            socket.emit("returning signal", { signal, callerId });
        })
        ////user already in room accepts incoming signal from new user
        console.log('incoming signal', incomingSignal);
        peer.signal(incomingSignal);

        return peer;
    }

	const leaveCall = () => {
        console.log('leaving call', currentUser, socket.id);
        // stream.getTracks().forEach(function(track) { track.stop(); })
        // history.goBack();
	}

    const muteUnmute = () => {
        let myVideoStream = myVideo.current.srcObject;
        const enabled = myVideoStream.getAudioTracks()[0].enabled;
        if (enabled) {
          myVideoStream.getAudioTracks()[0].enabled = false;
          setAudioButton(false);
        } else {
          myVideoStream.getAudioTracks()[0].enabled = true;
          setAudioButton(true);
        }
        myVideo.current.srcObject = myVideoStream;
    }

    const playStop = () => {
        console.log('playStop')
        let myVideoStream = myVideo.current.srcObject;
        const enabled = myVideoStream.getVideoTracks()[0].enabled;
        if (enabled) {
            myVideoStream.getVideoTracks()[0].enabled = false;
            setVideoButton(false);
        } else {
            myVideoStream.getVideoTracks()[0].enabled = true;
            setVideoButton(true);
        }
        myVideo.current.srcObject = myVideoStream;
    }

	return (
		<>
            <div className="container">
                <div className="video-container" >
                    <div className="video">
                        {<video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
                    </div>
                    {peers.map((peer, index) => {
                        return (
                            <Video key={index} peer={peer} />
                        );
                    })}
                    {audioButton
                        ? <Button onClick={muteUnmute}><FiMic /></Button>
                        : <Button onClick={muteUnmute}><FiMicOff /></Button>
                    }
                    {videoButton
                        ? <Button onClick={playStop}> <FiVideo /> </Button>
                        : <Button onClick={playStop}> <FiVideoOff /> </Button>
                    }
                    <Button variant="contained" color="secondary" onClick={leaveCall}>
                        End Call
                    </Button>
                </div>
            </div>
		</>
	)
}

export default Room