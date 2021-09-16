import React, { useState, useEffect } from "react";
import Axios from "axios";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Card,Row,  Col, Image} from 'react-bootstrap';




const TeamCard = (props) => {
    console.log('TeamCard',props.teamname)
    // const handleLogOut = () =>{
    //     Axios({
    //         method: "GET",
    //         withCredentials: true,
    //         url: "/logout",
    //     }).then((res) => {
    //         props.history.push(`/auth/login`);
    //     });
    // }

    return ( 
        <>
            {/* <div><h1>HI</h1></div> */}
            <Button variant="outline-primary" style={{padding:'0rem'}}>
            <Card style={{ width: '13rem' , height: '10rem'}}>
             <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{props.teamname}</Card.Title>
                {/* <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text> */}
               
            </Card.Body>
            </Card>
            </ Button>
        </>
     );
}

export default TeamCard;