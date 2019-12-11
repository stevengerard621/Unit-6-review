import React from 'react';

//functional component//
function PostDisplay(props)  {
  
        return(
        <div onDoubleClick={() => props.deletePost(props.post.post_id)}>
            <img src={props.post.image_url} alt='user post' style={{width: '500px'}}/>
        </div>
        )
    }

export default PostDisplay;