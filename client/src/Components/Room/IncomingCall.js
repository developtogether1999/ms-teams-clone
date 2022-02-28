import Button from "@material-ui/core/Button"
import React, { useContext, useEffect, useState } from "react"

import { SocketContext } from "../../Contexts/socket"

import { useHistory } from "react-router-dom"

import "./Room.css"

const IncomingCall = (props) => {

    const history = useHistory();

    const socket = useContext(SocketContext);

    const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [ name, setName ] = useState("")
    const [ roomId, setRoomId ] = useState("")

    useEffect(() => {
        socket.on("receivingCall", (data) => {
            console.log('receiving call', data.name, data.from)
			setReceivingCall(true)
			setCaller(data.from)
			setName(data.name)
			setCallerSignal(data.signal)
            setRoomId(data.roomId)
		})
    }, [])

    const handleCallAccepted = async () => {
        setReceivingCall(false)
        history.push({
            pathname: `/room/${roomId}`,
            state: {
                callerSignal: callerSignal,
                caller: caller
            }
        });
    }

    const handleCallRejected = () => {
        socket.emit("rejectCall", { to: caller })
        setReceivingCall(false);
    }

    if(!receivingCall || caller == "" || name == "" || roomId == "") { 
        // console.log('receivingCall', receivingCall);
        // console.log('caller', caller);
        // console.log('name', name);
        // console.log('roomId', roomId);
        return (
            <div>
                No calls
            </div>
        );
    }

	return (
		<>
			<div className="caller">
                <h1 >{name} is calling...</h1>
                <Button variant="contained" color="primary" onClick={handleCallAccepted}>
                    Answer
                </Button>
                <Button variant="contained" color="secondary" onClick={handleCallRejected}>
                    Reject
                </Button>
            </div>
		</>
	)
}

export default IncomingCall