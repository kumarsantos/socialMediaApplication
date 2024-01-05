import React,{useState} from 'react'
import { NavLink ,useHistory} from 'react-router-dom'

import M from 'materialize-css'


const Signup = () => {

const history=useHistory()

const [name,setname]=useState("")
const [password,setpassword]=useState("")
const [email,setemail]=useState("")

const PostData=(e)=>{
    e.preventDefault()
    if(! /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
    {
        M.toast({html: "Invalid Email format",classes:"#c62828 red darken-3"})
        return
    }
const newuser={name,email,password}
    fetch('/signup',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(newuser)
      
    })
    .then(res=>res.json())
    .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html: data.message,classes:"#c62828 green darken-3"})
                history.push('./login')
            }
    })
    .catch(err=>{console.log(err)})

}



    return (
        <div className="mycard">
           <div className="card auth-card">
               <h2>Instagram</h2>
               <input type='text' placeholder="Username" value={name} onChange={e=>setname(e.target.value)}/>
               <input type='email' placeholder="Email" value={email} onChange={e=>setemail(e.target.value)} />
               <input type='password' placeholder="Password" value={password} onChange={e=>setpassword(e.target.value)}/>
               <button className="btn waves-effect waves-light #2196f3 blue" onClick={e=>PostData(e)}>
                   Signup                    
                </button>
                <h6><NavLink to='/login'>Already have an Account</NavLink></h6>
       
            </div>
        </div>
    )
}

export default Signup
