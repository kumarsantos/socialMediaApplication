import React,{useContext,useEffect} from 'react'
import '../App.css'
import {NavLink,useHistory} from 'react-router-dom'
import {userContext} from '../App'

const Navbar = () => {

const [token,SetToken]=React.useState('')

  const history=useHistory()
  const {state,dispatch}= useContext(userContext)

  let avail_token=localStorage.getItem('jwt')
  
  useEffect(() => {
    
    if(!avail_token){
      dispatch({tye:"CLEAR"})
      history.push('/login')
    }   
      SetToken(avail_token)    

  }, [avail_token])

  const Logout=()=>{
    dispatch({type:"CLEAR"});
    localStorage.clear();    
  }  
    
    return (<nav className="#" >
    <div className="nav-wrapper white navbar">
      <NavLink to={token?'/':"/login"} className="brand-logo">Instagram</NavLink>
      <ul id="nav-mobile" className="right mr-20 hide-on-med-and-down">
        {!token ? <>
                  <li><NavLink activeClassName="active" to="/signup">Signup</NavLink></li>
                  <li><NavLink activeClassName="active" to="/login">Login</NavLink></li>
                  </>:<>
              <li><NavLink activeClassName="active" to="/createpost">CreatePost</NavLink></li>
              <li><NavLink activeClassName="active" to="/profile">Profile</NavLink></li>
              <li><NavLink activeClassName="active" to="/mysubpost">My-Followings</NavLink></li>
              <li><button className="btn waves-effect waves-light #2196f3 red"  onClick={e=>Logout(e)} >Logout</button></li>
          </>}
      </ul>
    </div>
  </nav>
        
        
    )
}

export default Navbar
