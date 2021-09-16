import React, { useState, useEffect } from "react";
import Axios from "axios";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {ListGroup,OverlayTrigger,Popover,PopoverHeader,Dropdown,SplitButton,DropdownButton,ButtonGroup,Card,Row,  Col, Image} from 'react-bootstrap';
// import PopoverHeader from 'react-bootstrap/PopoverHeader'
import { withRouter } from "react-router";

const Info= (props) => {

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
            {/* <div><h1>HI</h1></div> */}
            <Card style={{ width: '18rem' }}>
            <ListGroup variant="flush">
                <ListGroup.Item>Pradyumn Bhatter</ListGroup.Item>
                <ListGroup.Item>pb@mnnit.ac.in</ListGroup.Item>
                <ListGroup.Item>Manage Account</ListGroup.Item>

                <ListGroup.Item>
                    <Button onClick={handleLogOut}>
                        Log Out
                    </Button>
                </ListGroup.Item>
            </ListGroup>
            </Card>
       

                    
        </>
     );
}

export default  withRouter(Info);