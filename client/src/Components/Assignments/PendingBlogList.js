import React, { useState } from "react";


const PendingBlogList = ({blogs}) => {
 
  
    
 
    return ( 
                   
	
        <div className="blog-list">
          {blogs.map(blog => (
              <div className="blog-preview" key={blog.id} >
              { <h2>{ blog.title }</h2> }
              { <h2>{ blog.time }</h2> }
              { <p>Written by { blog.author }</p> }
              </div>
            ))}   
        </div>  
                 
     
     );
}
 
export default PendingBlogList;