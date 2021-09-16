import React, { useState, useEffect } from "react";
import Axios from "axios";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Row,  Col, Image} from 'react-bootstrap';




const HomePage = (props) => {
    console.log(props);
    const handleLogOut = () =>{
        Axios({
            method: "GET",
            withCredentials: true,
            url: "/logout",
        }).then((res) => {
            props.history.push(`/auth/login`);
        });
    }

    return ( 
        <>
            <h1>Welcome To MS Teams</h1>
            <Col md={{ span: 3, offset: 3 }}>
					
                <Button onClick={handleLogOut}>
                    Log Out
                </Button>

            </Col>
        </>
     );
}

export default HomePage;