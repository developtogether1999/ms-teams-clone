import React, { useState, useEffect } from "react";
import Axios from "axios";
import {Navbar,Container,Button,Form,FormControl,Row,  Col, Image, Nav, NavItem, NavDropdown} from 'react-bootstrap';
// import TeamCard from './TeamCard'
import './Navbar.css';
import  Infobutton from '../Teams/infobutton'
// const teams = ['Team1', 'Team2', 'Team3','Team4','Team5']

const Navv = (props) => {
    
    
    return ( 
        <>
            <Navbar expand="lg" style={{ backgroundColor: '#464775', height: '55px'}}>
  <Navbar.Brand href="#" style={{ color: 'white',marginLeft:'10px'}}>Microsoft Teams</Navbar.Brand>
  <Navbar.Toggle aria-controls="navbarScroll" />
  <Navbar.Collapse id="navbarScroll">
    <Nav
      className="mr-auto my-2 my-lg-0"
      style={{ maxHeight: '100px' }}
      navbarScroll
    >
    </Nav>
    <Form className="d-flex">
      <FormControl style={{ marginRight: '455px' , width: '546px', height: '29px', backgroundColor: '#DADAE3'}}
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
    </Form>
    <Infobutton />
  </Navbar.Collapse>
</Navbar>
        </>
     );
}

export default Navv;