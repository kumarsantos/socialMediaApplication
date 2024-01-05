import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../../App";
import '../../App.css'

import { useParams } from "react-router-dom";

 const UserProfile = () => {
  const { state, dispatch } = useContext(userContext);
  

  const [data, setdata] = useState([]);
  const [follow, setfollow] = useState(null);
 
  



  const { userid } = useParams();
  
  

  const FetchAllPost=()=>{

    fetch(`/user/${userid}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)
        setdata(result);

        
      });    
      
    }


    
    useEffect(() => {
      FetchAllPost();   
    },[]);
    



  const followUser=()=>{
    fetch('/follow',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        followId:userid
      })
    }).then(res=>res.json())
    .then(data=>{
     
      dispatch({type:"UPDATE",payload:{followers:data.followers,following:data.following}})
      localStorage.setItem("user",JSON.stringify(data))

      setdata(prevState=>{
        return {
          ...prevState,
          user:{
            ...prevState.user,
            followers:[...prevState.user.followers,data._id]
          }
        }
      })
      setfollow(false)
      
    })
  }


  const Unfollow=()=>{
    fetch('/unfollow',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        unfollowId:userid
      })
    }).then(res=>res.json())
    .then(data=>{
           
      dispatch({type:"UPDATE",payload:{followers:data.followers,following:data.following}})
      localStorage.setItem("user",JSON.stringify(data))

      setdata(prevState=>{
        let newfollowers=[...prevState.user.followers]
        newfollowers.splice(data._id,1)
        return {
          ...prevState,
          user:{
            ...prevState.user,
            followers:[...newfollowers] 
          }
        }
      })
      setfollow(true)
    })
  }

  return(
        <div style={{ maxWidth: "1100px", margin: "0px auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "18px 0px",
              borderBottom: "1px solid gray",
              backgroundColor: "#ffd",
              padding: "20px",
            }}
          >
            <div>
              <img
                src="https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=736&q=80"
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "80px",
                }}
              />
            </div>
            <div>
              <h4>{data.user ? (data.user.name):"Loading..."}</h4>
              <h5>{data.user ? (data.user.email):"Loading..."}</h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  //   margin: "18px 0px",
                  width: "110%",
                }}
              >
                <h6>{data.posts ? ( data.posts.length):"0"} posts</h6>
                <h6>{data.user ? ( data.user.followers.length):"0"} followers</h6>
                <h6>{data.user ? ( data.user.following.length):"0"} following</h6>
                {/* <h6>0 followers</h6> */}
                {/* <h6>0 following</h6> */}

               {follow
                ?
                  <><button className="btn waves-effect waves-light #2196f3 blue followbtn" onClick={e=>followUser()}>follow</button></>
                :
                <><button className="btn waves-effect waves-light #2196f3 blue  followbtn" onClick={e=>Unfollow()}>Unfollow</button></>
                }
              </div>
            </div>
          </div>

          <div className="gallary">
            {data.posts && data.posts.map((post, i) => {
              return (
                <div key={post._id} className="card profile_card">
                  <h5
                    style={{
                      margin: "8px",
                      paddingTop: "5px",
                      fontSize: "20px",
                    }}
                  >
                    {post.postedBy.name}
                  </h5>
                  <div className="profile_image">
                    <img alt="" src={post.photo} />
                  </div>
                  <div className="card-content afterimag">
                    <i
                      className="material-icons"
                      style={{ color: "red", margin: "-8px 0px" }}
                    >
                      favorite
                    </i>
                    <h5 style={{ margin: "5px", fontSize: "20px" }}>
                      {post.title}
                    </h5>
                    <p style={{ fontSize: "15px", padding: "0px 10px" }}>
                      {post.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    )

          

}

export default UserProfile;

