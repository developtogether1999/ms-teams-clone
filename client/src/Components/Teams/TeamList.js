import React, { useState, useEffect } from "react";
import Axios from "axios";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Row,  Col, Image} from 'react-bootstrap';
import TeamCard from './TeamCard'
import Navbar from '../Navbar/Navbar.js'
// import './Teams.css';
const teams = ['Team1', 'Team2', 'Team3','Team4','Team5','Teams6']

const TeamList = (props) => {
     console.log(props);
     const handleClick = () =>{
          console.log('HIIII  ') 
          props.history.push(`/createteam`);
  }
    return ( 
        <>
            {/* <Navbar /> */}
            <h3 style={{marginTop:'67px',marginLeft:'80px'}}>Welcome to your Teams</h3>
            <div class='container'>
              <Button onClick={handleClick} style={{marginLeft:'889px',marginTop: '-90px',backgroundColor:'#FFFFFF',color:'#252423'}}>Join Or Create Team</Button>
              <div class='row'>
            { teams && teams.map(team => {
        // console.log(question)
        if(team) {
          return (
            <div class='col' style={{ marginTop: '1rem'}}>
                          
                         <TeamCard teamname={team} />
                         
                  </div>                        

          )
        } else { 
          return null
        }
        
      })}
        </div>
              </div>
        </>
     );
}

export default TeamList;