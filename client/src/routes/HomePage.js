import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Row,  Col, Image} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ChatPage from "../Components/ChatPage/ChatPage";
import Sidebar from '../Components/Sidebar/Sidebar'
import Assignments from '../Components/Assignments/Assignments'
import Teams from '../Components/Teams/Teams'

const HomePage = (props) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
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
                props.history.push(`/auth/login`);
            } else {
                console.log('response', response.data.user)
                setUsername(response.data.user.username)
                setPassword(response.data.user.password)
            }
        });

    }, [username, password]);

    return ( 
        <>
            <Router>
                <Sidebar />
                <div style={{marginTop: '57px'}}>
                <Switch>
                    
                    <Route path='/chat'>
                        { (username!='' && password!='')
                            ? <ChatPage user={{username: username, password: password}} />
                            : null 
                        }
                    </Route>

                    <Route path='/assignments' component={Assignments} />
                    <Route path='/' component={Teams} />
                    {/* <Route path='/' exact component={Teams} /> */}
                </Switch>
                </div>
                <Col md={{ span: 3, offset: 3 }}>
                    <Button onClick={handleLogOut}>
                        Log Out
                    </Button>
                </Col>
            </Router>
        </>
     );
}

export default HomePage;