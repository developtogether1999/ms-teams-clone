import Button from "@material-ui/core/Button"
import React, { useContext, useEffect, useRef, useState } from "react"
import Peer from 'simple-peer'
import axios from 'axios'
import { FiMic } from 'react-icons/fi'
import { FiMicOff } from 'react-icons/fi'
import { FiVideo } from 'react-icons/fi'
import { FiVideoOff } from 'react-icons/fi'
import { MdScreenShare } from 'react-icons/md'
import { MdStopScreenShare } from 'react-icons/md'

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
    const [shareScreen, setShareScreen] = useState(false);
	
    const myVideo = useRef();
    const peersRef = useRef([]);

    let peerKey = {}

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
                // await getVideoAudioStream()
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
                            item.peer.signal(payload.signal);
                        })

                        socket.on('user left', (payload) => {
                            setPeers(peers.filter(peer => peer.peerId !== payload.peerId))
                        })

                    })
            }
        })
        .catch((err) => {
            console.log('err', err)
        })

    }, [])

    const getVideoAudioStream = (video=true, audio=true) => {
        // let quality = settings?.params?.quality;
        // if (quality) quality = parseInt(quality);
        let quality = 12;
        const myNavigator = navigator.mediaDevices.getUserMedia || 
                            navigator.mediaDevices.webkitGetUserMedia || 
                            navigator.mediaDevices.mozGetUserMedia || 
                            navigator.mediaDevices.msGetUserMedia;
        return myNavigator({
            video: video ? {
                frameRate: quality ? quality : 12,
                noiseSuppression: true,
                width: {min: 640, ideal: 1280, max: 1920},
                height: {min: 480, ideal: 720, max: 1080}
            } : false,
            audio: audio,
        });
    }

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
        peer.signal(incomingSignal);

        return peer;
    }

	const leaveCall = () => {
        console.log('leaving call', currentUser, socket.id);
        socket.emit("endCall");
        myVideo.current.srcObject.getTracks().forEach(function(track) { track.stop(); })
        history.goBack();
	}

    const muteUnmute = (type='toggle') => {
        let myVideoStream = myVideo.current.srcObject;
        const enabled = myVideoStream.getAudioTracks()[0].enabled;
        if ((type === 'toggle' || type === 'mute') && enabled) {
            myVideoStream.getAudioTracks()[0].enabled = false;
            setAudioButton(false);
        } else if((type === 'toggle' || type === 'unmute') && !enabled) {
            myVideoStream.getAudioTracks()[0].enabled = true;
            setAudioButton(true);
        }
        myVideo.current.srcObject = myVideoStream;
    }

    const playStop = (type='toggle') => {
        let myVideoStream = myVideo.current.srcObject;
        const enabled = myVideoStream.getVideoTracks()[0].enabled;
        console.log(type, enabled);
        if ((type === 'toggle' || type === 'stop') && enabled) {
            console.log('video off');
            myVideoStream.getVideoTracks()[0].enabled = false;
            setVideoButton(false);
        } else if((type === 'toggle' || type === 'play') && !enabled) {
            console.log('video on');
            myVideoStream.getVideoTracks()[0].enabled = true;
            setVideoButton(true);
        }
        myVideo.current.srcObject = myVideoStream;
    }

    const reInitializeStream = (video, audio, type='userMedia') => {
        const media = type === 'userMedia' ? getVideoAudioStream(video, audio) : navigator.mediaDevices.getDisplayMedia();
        return new Promise((resolve) => {
            media.then((stream) => {
                if (type === 'displayMedia') {
                    playStop('stop')
                    muteUnmute('mute')
                }
                // createVideo({ id: myID, stream });
                // replaceStream(stream);
                myVideo.current.srcObject = stream
                resolve(true);
            });
        });
    }

    // const toggleVideoTrack = (status) => {
    //     if (myVideo?.current && !status.video) {
    //         myVideo.current.srcObject?.getVideoTracks().forEach((track) => {
    //             if (track.kind === 'video') {
    //                 !status.video && track.stop();
    //             }
    //         });
    //     }
    //     else if (myVideo) {
    //         reInitializeStream(status.video, status.audio);
    //     }
    // }

    const toggleScreenShare = async () => {
        if(!shareScreen) {
            await reInitializeStream(false, false, 'displayMedia')
            .then(() => {
                setShareScreen(!shareScreen)
            });
        } else {
            reInitializeStream(false, false, 'userMedia')
            .then(() => {
                setShareScreen(!shareScreen)
            });
        }
    }
    
    // const replaceStream = (mediaStream) => {
    //     Object.values(peers).map((peer) => {
    //         peer.peerConnection?.getSenders().map((sender) => {
    //             if(sender.track.kind == "audio") {
    //                 if(mediaStream.getAudioTracks().length > 0){
    //                     sender.replaceTrack(mediaStream.getAudioTracks()[0]);
    //                 }
    //             }
    //             if(sender.track.kind == "video") {
    //                 if(mediaStream.getVideoTracks().length > 0){
    //                     sender.replaceTrack(mediaStream.getVideoTracks()[0]);
    //                 }
    //             }
    //         });
    //     })
    // }

	return (
		<>
            <div className="container">
                <div className="video-container" >
                    <div className="video">
                        {<video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
                    </div>
                    {peers.map((peer, index) => {
                        peerKey[peer.peerId] = index;
                        return (
                            <Video key={index} peer={peer} />
                        );
                    })}
                    <div>
                        {audioButton
                            ? <Button onClick={() => muteUnmute('toggle')}><FiMic /></Button>
                            : <Button onClick={() => muteUnmute('toggle')}><FiMicOff /></Button>
                        }
                        {videoButton
                            ? <Button onClick={() => playStop('toggle')}> <FiVideo /> </Button>
                            : <Button onClick={() => playStop('toggle')}> <FiVideoOff /> </Button>
                        }
                        {/* <Button onClick={toggleScreenShare} >
                        {(!shareScreen) ? <MdScreenShare /> : <MdStopScreenShare /> }
                        </Button> */}
                    </div>
                    <Button variant="contained" color="secondary" onClick={leaveCall}>
                        End Call
                    </Button>
                </div>
            </div>
		</>
	)
}

export default Room