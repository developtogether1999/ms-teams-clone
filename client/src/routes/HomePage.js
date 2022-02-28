import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Row,  Col, Image} from 'react-bootstrap';

// import '../App.css';
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";

import ChatPage from "../Components/ChatPage/ChatPage";
import Sidebar from '../Components/Sidebar/Sidebar'
import Assignments from '../Components/Assignments/Assignments'
import Teams from '../Components/Teams/TeamList'
import CreateTeam from '../Components/Teams/CreateTeam'
import Navbar from '../Components/Navbar/Navbar'
import Room from "../Components/Room/Room";

import { SocketContext } from '../Contexts/socket'
import IncomingCall from "../Components/Room/IncomingCall";

const HomePage = (props) => {

    const socket = useContext(SocketContext);
    const history = useHistory();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    console.log(props);
    
    const handleLogOut = () =>{
        axios({
            method: "GET",
            withCredentials: true,
            url: "/logout",
        }).then((res) => {
            setUsername("")
            setPassword("")
            props.history.push(`/auth/login`);
        });
    }

    useEffect ( () => {

        axios({
            method: "GET",
            withCredentials: true,
            url: "/login",
        }).then((response) => {
            if (response.data.redirect != '/') {
                history.push(`/auth/login`);
            } else {
                setUsername(response.data.user.username)
                setPassword(response.data.user.password)

                socket.emit("USER_ONLINE", username);

            }
        });

    }, [username, password]);

    return ( 
        <>
            <BrowserRouter>
                <Navbar />
                <Sidebar />
                <div style={{marginTop: '57px'}}>
                
                <Switch>
                    <Route path='/chat'>
                        { (username!='' && password!='')
                            ? <ChatPage user={{username: username, password: password}} />
                            : null 
                        }
                    </Route>

                    <Route path='/room/:roomId' component={Room} />

                    <Route path='/assignments' component={Assignments} />
                    <Route path='/createteam' component={CreateTeam} />
                    <Route path='/' component={Teams} />
                    {/* <Route path='/' exact component={Teams} /> */}
                </Switch>

                <IncomingCall />

                </div>
            </BrowserRouter>
        </>
    );


}

export default HomePage;