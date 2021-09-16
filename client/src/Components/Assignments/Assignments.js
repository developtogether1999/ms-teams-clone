import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button'
import PendingBlogList from "./PendingBlogList";
import './Assignments.css';
import data from './data';
import CompletedBlogList from "./CompletedBloglist";
import 'react-toastify/dist/ReactToastify.css';


const Assignments = (props) => {
 
const [current, setCurrent] = useState("pending");
const [blogs, setBlogs] = useState(data.filter(blog =>  blog.isSubmitted===false ));
useEffect(() => {
    if(current==="pending"){
        setBlogs(data.filter(blog =>  blog.isSubmitted===false ))
    } else {
        setBlogs(data.filter(blog =>  blog.isSubmitted===true ))
    }
},[current])

    return ( 
        <>
         
                <Button id="b1" onClick={()=>setCurrent("pending")}>
                    Pending
                    {current==="pending" && blogs && <PendingBlogList blogs={blogs}  />}
                    
                </Button>
                 <Button id="b2" onClick={()=>setCurrent("completed")}>
                    Completed
                    {current==="completed" && blogs && <CompletedBlogList blogs={blogs}  />} 
                </Button>

      </>  
        
     );
}

export default Assignments;