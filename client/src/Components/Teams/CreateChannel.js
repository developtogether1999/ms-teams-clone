import React, { useState, useEffect } from "react";
import Axios from "axios";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {ListGroup,OverlayTrigger,Popover,PopoverHeader,Dropdown,SplitButton,DropdownButton,ButtonGroup,Card,Row,  Col, Image} from 'react-bootstrap';
// import PopoverHeader from 'react-bootstrap/PopoverHeader'
import { withRouter } from "react-router";
import Navv from '../Navbar/Navbar'



const ChannelInfo= (props) => {
    const [registerTeamchannel, setRegisterTeamchannel] = useState("");
  	
      const [username, setUsername] = useState("")

    //   useEffect ( () => {

    //     Axios({
    //         method: "GET",
    //         withCredentials: true,
    //         url: "/login",
    //     }).then((response) => {
    //         if (response.data.redirect != '/') {
    //             props.history.push(`/auth/login`);
    //         } else {
    //             setUsername(response.data.user.username)
    //         }
    //     });

    // }, []);




   const create = () => { 
       console.log("REQUEST REC FOR CHANNEL",props.user.teamid)
    Axios({
        method: "POST",
        data: {
        owner: true,
        user: props.user.username,
        teamid:props.user.teamid,
        channelname: registerTeamchannel,
        },
        withCredentials: true,
        url: "/createchannel",
      }).then(function (response) {
        // setAuthMsg(response.data.message);
        // setShowAuthMsg(true);
        if (response.data.redirect == '/') {
            props.history.push(`/`);
        } 
        else  {
            props.history.push(`/teams`);
        }
     });
   };

   
    return ( 
        <>
            {/* <div class='container'>
                        <div class='row'>
                            <div class='col'> */}
                            
                                    <Card style={{ width: '53rem',height: '261px',marginLeft:'-211px'}}>
                                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                                    <Card.Body>
                                        <h4 style={{marginBottom: '30px',textAlign: 'left'}}>Create a channel</h4>
                                        <Card.Text style={{textAlign: 'left',fontSize:'16px'}}>
                                         Team name
                                        </Card.Text>   
                                        <Form.Control onChange={(e) => setRegisterTeamchannel(e.target.value)} type="text" placeholder="Enter name" style={{backgroundColor: '#F0F0F0',marginTop:'-14px'}} />
                                        <Button  onClick={create} variant="primary" style={{marginTop: '30px',backgroundColor:'#6264a7'}}>Create Channel</Button>
                                    </Card.Body>
                                    </Card>
                            {/* </div>
                             
                        </div> */}
            {/* </div>            */}

                    
        </>
     );
}

export default  withRouter(ChannelInfo)