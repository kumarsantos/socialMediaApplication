import React,{useState,useEffect,useContext} from "react";
import { userContext } from "../../App";

const Profile = () => {

  const {state,dispatch}=useContext(userContext)
  const sta= state && JSON.parse(state)


  const [newData,setNewData]=useState([])
  // console.log(newData)
  

  const [data,Setdata]=useState([])
  

 

  const Fetchalldata= ()=>{
    fetch('/myposts',{headers:{"Authorization":"Bearer "+localStorage.getItem('jwt')}})
    .then(res=>res.json())
    .then(data=>{

      Setdata(data.posts)    

      const existeduser=JSON.parse(localStorage.getItem('user'));
      const newData={existeduser,posts:data.posts}
      setNewData(newData)
    })    

  }
  
  useEffect( () => {
    Fetchalldata();
},[])

  return (
    <div style={{maxWidth:'1100px',margin:'0px auto'}} >
      <div

        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid gray",
          backgroundColor:"#ffd",
          padding:"20px"
        }}
      >
        <div>
          <img
            src="https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=736&q=80"
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
          />
        </div>
        <div>
          <h4>{ newData.existeduser && newData.existeduser.name}</h4>
          <h5>{newData.existeduser && newData.existeduser.email}</h5>
          <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                width: "110%",
            }}
          >
            <h6>{newData.posts && newData.posts.length} Posts</h6>
            <h6>{sta?sta.following.length:"Loading"} Followers</h6>  
            <h6>{sta?sta.followers.length:"Loading"} Followings</h6>
          </div>
        </div>
      </div>

      <div className="gallary">
      { data.map((post,i)=>{
                   return(
                   <div key={post._id} className='card profile_card'>
                        <h5 style={{margin:'8px',paddingTop:'5px',fontSize:'20px'}}>{post.postedBy.name}</h5>
                        <div className="profile_image">
                        <img alt="" src={post.photo} />
                        </div>
                        <div className='card-content afterimag'>
                            <i className='material-icons' style={{color:'red',margin:'-8px 0px'}} >favorite</i>
                            <h5 style={{margin:'5px',fontSize:'20px'}}>{post.title}</h5>
                            <p style={{fontSize:'15px',padding:'0px 10px'}}>{post.body}</p>
                            
                        </div>
                    </div>)})       
                
            }          
       </div>
    </div>
  );
};

export default Profile;
