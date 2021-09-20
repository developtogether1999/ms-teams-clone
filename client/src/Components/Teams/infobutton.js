import React, { useState, useEffect } from "react";
import Axios from "axios";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Info from './Info'
import {OverlayTrigger,Popover,PopoverHeader,Dropdown,SplitButton,DropdownButton,ButtonGroup,Card,Row,  Col, Image} from 'react-bootstrap';
// import PopoverHeader from 'react-bootstrap/PopoverHeader'


const InfoButton= (props) => {
    // console.log('TeamCard',props.teamname)
    // const handleLogOut = () =>{
    //     Axios({
    //         method: "GET",
    //         withCredentials: true,
    //         url: "/logout",
    //     }).then((res) => {
    //         props.history.push(`/auth/login`);
    //     });
    // }
    
	
	// const handleShowComponent = () =>{
	// 	setShowComponent(!showComponent);
	// }
    return ( 
        <>
            {/* <div><h1>HI</h1></div> */}
            {['bottom'].map((placement) => (
            <OverlayTrigger
              trigger="click"
              key={placement}
              placement={placement}
              overlay={
                <Popover id={`popover-positioned-${placement}`}>
                  {/* <Popover.Header as="h3">{`Popover ${placement}`}</Popover.Header> */}
                  <div>
                    <Info />
                  </div>
                </Popover>
              }
            >
              <Button variant="secondary" style={{width: '3rem',backgroundColor: '#C7D4E7',borderRadius: '5rem',color: '#667B9B'}}>
                  PB
              </Button>
            </OverlayTrigger>
          ))}
       

                    
        </>
     );
}

export default InfoButton;