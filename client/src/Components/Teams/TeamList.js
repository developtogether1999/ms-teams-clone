import React, { useState, useEffect } from "react";
import Axios from "axios";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Row,  Col, Image} from 'react-bootstrap';
import TeamCard from './TeamCard'
import Navbar from '../Navbar/Navbar.js'
import './Teams.css';
// const teams = ['Team1', 'Team2', 'Team3','Team4','Team5','Teams6']

const TeamList = (props) => {
  const [teams,setTeams]=useState([]);
  const [username,setUsername]=useState("");
  const [listLoading,setlistLoading]=useState(true);
  useEffect ( () => {

    Axios({
        method: "GET",
        withCredentials: true,
        url: "/login",
    }).then((response) => {
        if (response.data.redirect != '/') { 
            props.history.push(`/auth/login`);
        } else {
           setUsername(response.data.user.username);
            console.log('Team user', response.data.user)
        }
    });

}, []);


    useEffect ( () => {

      Axios({
          method: "GET",
          withCredentials: true,
          url: "/getteams",
      }).then((response) => {
          if (response.data.redirect == '/') {
              props.history.push(`/auth/login`);
          } else {
            setTeams( response.data.teams)
            setlistLoading(false)
              console.log('Teams user are in', response.data.teams)
          }
      });

    }, []);

     const handleClick = () => {
          console.log('HIIII  ') 
          props.history.push(`/createteam`);
  }

  
    return ( 
        <>
            {/* <Navbar /> */}
            <h3 style={{marginTop:'67px',marginLeft:'80px'}}>Welcome to your Teams</h3>
            <div class='container'>
              <Button className="mycard" onClick={handleClick} style={{marginLeft:'889px',marginTop: '-90px',backgroundColor:'#FFFFFF',color:'#252423'}}>Join Or Create Team</Button>
              <div class='row'>
            { teams && teams.map(team => {
        // console.log(question)
        if(team && !listLoading) {
          return (
            <div class='col' style={{ marginTop: '1rem'}}>
                          
                         <TeamCard className="mycard" teamname={team.name} teamid={team._id} />
                         
                  </div>                        

          )
        }else if(listLoading){
          return "Loading";
        }else { 
          return null
        }
        
      })}
        </div>
              </div>
        </>
     );
}

export default TeamList;