import React, { useState, useEffect } from "react";
import Axios from "axios";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Row,  Col, Image} from 'react-bootstrap';
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import '../App.css';

  



const HomePage = (props) => {
const history = useHistory();

const [blogs1, setBlogs1] = useState(null);
const [blogs2, setBlogs2] = useState(null);
const [flag1, setFlag1] = useState(true);
const [flag2, setFlag2] = useState(true);


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
          
            <Button id="hb1" onClick={() => history.push("/Assignments", { from: "HomePage" })}>Assignments</Button>
           
                  
      </>  
        
     );
}

export default HomePage;