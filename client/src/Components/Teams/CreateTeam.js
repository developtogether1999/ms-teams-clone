import React, { useState, useEffect } from "react";
import Axios from "axios";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Modal,ListGroup,OverlayTrigger,Popover,PopoverHeader,Dropdown,SplitButton,DropdownButton,ButtonGroup,Card,Row,  Col, Image} from 'react-bootstrap';
// import PopoverHeader from 'react-bootstrap/PopoverHeader'
import { withRouter } from "react-router";
import Navv from '../Navbar/Navbar'
import TeamInfo from './Teaminfo'


const CreateTeam= (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return ( 
        <>
                    <Navv />
                    

                    <h3 style={{marginBottom: '80px'}}> Join Or Create Team</h3>
                    <div class='container'>
                        <div class='row'>
                            <div class='col'>
                                    <Card style={{ width: '15rem',height: '281px'}}>
                                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                                    <Card.Body>
                                        <Card.Title style={{marginBottom: '30px'}}>Join a team with a code</Card.Title>
                                        <Form.Control type="text" placeholder="Enter code" style={{backgroundColor: '#F0F0F0'}} />
                                        <Button variant="primary" style={{marginTop: '30px',backgroundColor:'#6264a7'}}>Join Team</Button>
                                    </Card.Body>
                                    </Card>
                            </div>
                            <div class='col'>
                                    <Card style={{ width: '15rem',height: '281px' }}>
                                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                                    <Card.Body> 
                                        <Card.Title>Create a team</Card.Title>
                                        
                                        <Button onClick={handleShow} variant="primary" style={{marginTop: '119px' , backgroundColor:'#6264a7'}}>Create Team</Button>
                                    </Card.Body>
                                    </Card>
                                    
                            </div>
                        </div>
                        
                     </div>   
                     <Modal
                                        show={show}
                                        onHide={handleClose}
                                        backdrop="static"
                                        keyboard={false}
                                    >

                                        {/* <Modal.Body> */}
                                        <TeamInfo />

                                        <Button variant="secondary" style={{backgroundColor:'#6264a7'}} onClick={handleClose}>
                                            Close
                                        </Button>
                                    </Modal>
                    
        </>
     );
}

export default  withRouter(CreateTeam) 