import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Row,  Col, Image} from 'react-bootstrap';
import ChatPage from "../Components/ChatPage/ChatPage";

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

    });

    return ( 
        <>

            <h1>Welcome To MS Teams</h1>
            <Col md={{ span: 3, offset: 3 }}>
				
                <Button onClick={handleLogOut}>
                    Log Out
                </Button>

            </Col>
            
            { (username!='' && password!='')
                ? <ChatPage user={{username: username, password: password}} />
                : null 
            }

        </>
     );
}

export default HomePage;