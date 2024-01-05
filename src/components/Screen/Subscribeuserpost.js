import React, { useEffect, useState, useContext } from "react";
import { userContext } from "../../App";
import "../../App.css";

import M from 'materialize-css'
import {useHistory} from 'react-router-dom'

const Home = () => {
  const { state, dispatch } = useContext(userContext);
const state1=JSON.parse(state)

  const [data, SetData] = useState([]);
  


  const history=useHistory()

  
  useEffect(() => {
    fetch("http://localhost:5000/getsubpost", {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
    })
      .then((res) => res.json())
      .then((data) => {
        SetData(data.posts);
        // dispatch({type:"ALLPOSTS",payload:data.posts})
      });
    
  }, []);

  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)

        const newData = data.map((item, i) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        SetData(newData);
      })
      .catch((err) => console.log(err));
  };
  const UnlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(data)
        const newData = data.map((item, i) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        SetData(newData);
      })
      .catch((err) => console.log(err));
  };

  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item, i) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });

        SetData(newData);
      })
      .catch((err) => console.log(err));
  };

  const deletePost = (postId) => {
    fetch(`/deletepost/${postId}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
          const newData=data.filter(item=>{
              return item._id!==result._id
            })
            SetData(newData)
       
        M.toast({html: "Successfully Deleted",classes:"#c62828 green darken-3"})
      });
  };

  const profileviewer=(id)=>{
    history.push(`profile/${id}`)
}

  return (
    <div className="home">
      {data && data.map((post, i) => {
        // console.log(post)
        return (
          <div key={post._id} className="card home-card" >
            <h5
              style={{
                margin: "8px",
                paddingTop: "5px",
                fontSize: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span onClick={e=>profileviewer(post.postedBy._id)} style ={{cursor:"pointer"}}>{post.postedBy.name}</span>
              
              { state1 && post.postedBy._id===state1._id && (
                <span>
                  <i
                    className="material-icons"
                    style={{
                      margin: "-8px 10px",
                      cursor: "pointer",
                      color: "red",
                      marginTop: "5px",
                    }}
                    onClick={(e) => deletePost(post._id)}
                  >
                    delete
                  </i>
                </span>
              )}
            </h5>
            <div className="card-image" >
              <img alt="" src={post && post.photo} />
            </div>
            <div className="card-content afterimag">
              <i
                className="material-icons"
                style={{ color: "red", margin: "-8px 0px" }}
              >
                favorite
              </i>

              {post.likes.includes(state && JSON.parse(state)._id) ? (
                <i
                  className="material-icons"
                  style={{ margin: "-8px 10px", cursor: "pointer" }}
                  onClick={(e) => UnlikePost(post._id)}
                >
                  thumb_down
                </i>
              ) : (
                <i
                  className="material-icons"
                  style={{ margin: "-8px 10px", cursor: "pointer" }}
                  onClick={(e) => likePost(post._id)}
                >
                  thumb_up
                </i>
              )}

              <h6 style={{ margin: "5px", fontSize: "14px" }}>
                {post.likes.length} Likes
              </h6>
              <h5 style={{ margin: "5px", fontSize: "20px" }}>{post.title}</h5>
              <p style={{ fontSize: "15px", padding: "0px 10px" }}>
                {post && post.body}
              </p>
              {post && post.comments.map((comment, i) => {
                return (
                  <h6 key={comment._id} style={{flexWrap:'wrap',wordWrap:'break-word'}}>
                    <span style={{ fontWeight: "700",marginRight:"10px" }}>
                      {comment.postedBy.name}
                    </span>
                    {comment.text}
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(e.target[0].value, post._id);
                  setTimeout(() => {
                    e.target[0].value=''
                    
                  }, 1000);
                }}
              >
                <input type="text" placeholder="add comment" />
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
