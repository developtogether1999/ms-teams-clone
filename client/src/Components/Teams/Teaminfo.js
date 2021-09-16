import React, { useState, useEffect } from "react";
import Axios from "axios";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {ListGroup,OverlayTrigger,Popover,PopoverHeader,Dropdown,SplitButton,DropdownButton,ButtonGroup,Card,Row,  Col, Image} from 'react-bootstrap';
// import PopoverHeader from 'react-bootstrap/PopoverHeader'
import { withRouter } from "react-router";
import Navv from '../Navbar/Navbar'



const TeamInfo= (props) => {

    const [registerTeamname, setRegisterTeamname] = useState("");
  	const [registerTeamcode, setRegisterTeamcode] = useState("");


   const create = () => { 
       console.log("REQUEST REC")
    Axios({
        method: "POST",
        data: {
        teamname: registerTeamname,
        teamcode: registerTeamcode
        },
        withCredentials: true,
        url: "/createteam",
      }).then(function (response) {
        // setAuthMsg(response.data.message);
        // setShowAuthMsg(true);
        if (response.data.redirect == '/createteam') {
            props.history.push(`/createteam`);
        } 
        else if(response.data.redirect == '/teams') {
            props.history.push(`/teams`);
        }
     });
   };

   
    return ( 
        <>
            {/* <div class='container'>
                        <div class='row'>
                            <div class='col'> */}
                            
                                    <Card style={{ width: '53rem',height: '545px',marginLeft:'-211px'}}>
                                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                                    <Card.Body>
                                        <h4 style={{marginBottom: '30px',textAlign: 'left'}}>Create your team</h4>
                                         <Card.Text style={{textAlign: 'left'}}>
                                         Collaborate closely with a group of people inside your organisation based on project, initiative, or common interest
                                        </Card.Text>
                                        <Card.Text style={{textAlign: 'left',fontSize:'16px'}}>
                                         Team name
                                        </Card.Text>   
                                        <Form.Control onChange={(e) => setRegisterTeamname(e.target.value)} type="text" placeholder="Enter name" style={{backgroundColor: '#F0F0F0',marginTop:'-14px'}} />
                                        <Card.Text style={{textAlign: 'left',fontSize:'16px',marginTop:'14px'}}>
                                         Team Code
                                        </Card.Text>   
                                        <Form.Control onChange={(e) => setRegisterTeamcode(e.target.value)}type="text" placeholder="Enter code" style={{backgroundColor: '#F0F0F0',marginTop:'-14px'}} />
                                        <Card.Text style={{textAlign: 'left',fontSize:'16px',marginTop:'14px'}}>
                                         Description
                                        </Card.Text>   
                                        <Form.Control  as="textarea" rows={3} type="text" placeholder="Describe your team" style={{backgroundColor: '#F0F0F0',marginTop:'-14px'}} />
                                        <Button  onClick={create} variant="primary" style={{marginTop: '30px',backgroundColor:'#6264a7'}}>Create Team</Button>
                                    </Card.Body>
                                    </Card>
                            {/* </div>
                            
                        </div> */}
            {/* </div>            */}

                    
        </>
     );
}

export default  withRouter(TeamInfo)