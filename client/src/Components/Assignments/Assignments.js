import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button'
import PendingBlogList from "./PendingBlogList";
import './Assignments.css';
import data from './data';
import CompletedBlogList from "./CompletedBloglist";
  



const Assignments = (props) => {


const [blogs1, setBlogs1] = useState(null);
const [blogs2, setBlogs2] = useState(null);
const [flag1, setFlag1] = useState(true);
const [flag2, setFlag2] = useState(true);

    return ( 
        <>
         
                <Button id="b1" onClick={()=>{
                    
                    if(flag1===true){
                       setBlogs1(data);
                       setFlag1(false);
                       setBlogs2(null);
                       setFlag2(true);

                    }
                    else{
                     setBlogs1(null);
                     setFlag1(true);
                    }
                
                
                }}>
                    Pending Assignments
                     {blogs1&&<PendingBlogList blogs={blogs1}  />}
                    
                </Button>
                <Button id="b2" onClick={()=>{
                    
                      if(flag2===true){
                           
                        setBlogs2(data);
                        setFlag2(false);
                        setBlogs1(null);
                        setFlag1(true);
                      
                    }
                    else{
                      setBlogs2(null);
                     setFlag2(true);
                    }
                }}>
                    Completed Assignments
                     {blogs2&&<CompletedBlogList blogs={blogs2} />}
                </Button>

      </>  
        
     );
}

export default Assignments;