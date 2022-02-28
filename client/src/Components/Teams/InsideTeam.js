import React, { useState, useEffect } from "react";
import Axios from "axios";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import { Button } from 'react-router';
import {Modal,Card,ListGroup,Row,  Col, Image} from 'react-bootstrap';
import TeamCard from './TeamCard'
import Navbar from '../Navbar/Navbar.js'
// import './hover.css';
import { useParams } from 'react-router-dom';
import ChannelInfo from './CreateChannel'


const InsideTeam = (props) => {
    // console.log('PARAMS',props.location.pathname.name)
    
    const params1=useParams();
    const [owner,setOwner]=useState("");
    const [teams,setTeams]=useState();
    const [loading,setLoading]=useState(true);
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect ( () => {
        console.log('INSIDE TEAM USE EFFECT',props.user)
        Axios({
            method: "GET",
            withCredentials: true,
            params:{
                paramid:params1.id
            },
            url: "/teamdetails",
        }).then((response) => {
            if (response.data.redirect == '/') {
                props.history.push(`/auth/login`);
            } else {
                setTeams(response.data.team)
                setLoading(false)
                console.log('Teams user are in', response.data.teams)
            }
        });
  
      }, []);
    let isOwner;
    if(loading)
    return "Loading"
    if(teams.owner==props.user.username)
    isOwner = true;

    return ( 
        <>
            {/* <Navbar /> */} 
            <div class='row' style={{marginLeft:'37px'}}> 
               <div class='col'>
            <Card style={{ width: '28rem',height: '37rem' ,backgroundColor:'#F0F0F0' }}>
            <h4>{teams.name}</h4>
            <div style={{ marginTop: '311px'}}>
            <div class='row'>
            <Card.Header>Channels</Card.Header>
            {isOwner?<Button onClick={handleShow}>Add</Button>:null}
            </div>
            {/* <ListGroup variant="flush"> */}
               { teams && teams.channels.map(team => {
        // console.log(question)
                if(team) {
                return (
                    <Button class='hov'  style={{width:'100%',border: 'none',background:  '#ffffff',color:'black'}}>{team}</Button>     
 
                )
                }else { 
                return null
                }
                
            })}
            {/* </ListGroup> */}
            </div>
            </Card>
            
            </div>
            </div>
            <Modal
                                        show={show}
                                        onHide={handleClose}
                                        backdrop="static"
                                        keyboard={false}
                                    >

                                        {/* <Modal.Body> */}
                                        <ChannelInfo user={{username: props.user.username, password: props.user.password,team:teams,teamid:params1.id}} />

                                        <Button variant="secondary" style={{backgroundColor:'#6264a7'}} onClick={handleClose}>
                                            Close
                                        </Button>
                                    </Modal>
        </>
     );
}

export default InsideTeam;