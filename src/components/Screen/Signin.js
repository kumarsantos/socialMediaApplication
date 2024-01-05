import React,{useState,useContext} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import {userContext} from '../../App'
import M from 'materialize-css'

const Signin = () => {
    
const {state,dispatch}= useContext(userContext)

    const history=useHistory()
     

    const [password,setpassword]=useState("")
    const [email,setemail]=useState("")
    
    const Signin=(e)=>{
            e.preventDefault()
            if(! /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
            {
                return
                M.toast({html: "Invalid Email format",classes:"#c62828 red darken-3"})
            }
            const newuser={email,password}
            fetch('/login',{
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
                        dispatch({type:"USER",payload:data.loggeduser})
                        M.toast({html:"Logged in Successful",classes:"#c62828 green darken-3"})
                        localStorage.setItem('jwt',data.token)
                        localStorage.setItem('user',JSON.stringify(data.loggeduser))
                        history.push('/')


                        
                        
                    }
                    
            })

        

    
    }

    return (
        <div className="mycard">
           <div className="card auth-card">
               <h2>Instagram</h2>
               <input type='text' placeholder="Email" value={email}  onChange={e=>setemail(e.target.value)}/>
               <input type='password' placeholder="Password" value={password} onChange={e=>setpassword(e.target.value)} />
               <button className="btn waves-effect waves-light #2196f3 blue" onClick={e=>Signin(e)}>
                   Login                    
                </button>
                <h6><NavLink to='/signup'>Dont have an Account</NavLink></h6>
       
            </div>
        </div>
    )
}

export default Signin
