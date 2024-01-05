import React from 'react'

const Post = () => {
    return (
        <div className='card home-card'>
                <h4>Ramesh</h4>
                <div className="card-image">
                <img alt="" src='https://images.unsplash.com/photo-1493863641943-9b68992a8d07?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=739&q=80' />
                </div>
                <div className='card-content'>
                    <i className='material-icons' style={{color:'red'}} >favorite</i>
                    <h4>Title</h4>
                    <p>This is the amazing post</p>
                    <input type="text" placeholder='add comment' />
                </div>

            </div>
    )
}

export default Post
