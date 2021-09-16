import React, { useState } from "react";


const CompletedBlogList = ({blogs}) => {
 
  
    
 
    return ( 
                   
	
        <div className="blog-list">
       
          {blogs.map(blog => (
              
              <div className="blog-preview" key={blog.id} >
                
               { blog.time<='12:00' && <h2>{  blog.title }</h2> }
               { blog.time<='12:00' && <h2>{ blog.time }</h2> }
                { blog.time<='12:00' && <p>Written by { blog.author }</p> }
              </div>
            ))}   
        </div>  
                 
     
     );
}
 
export default CompletedBlogList;