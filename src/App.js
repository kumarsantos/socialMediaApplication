
import {useEffect,createContext, useReducer,useContext} from 'react'
import {Route,useHistory, Switch} from 'react-router-dom'
import './App.css';
import Home from './components/Screen/Home';
import Navbar from './components/Navbar';
import Signin from './components/Screen/Signin';
import Signup from './components/Screen/Signup';
import Profile from './components/Screen/Profile';
import Createpost from './components/Screen/Createpost';
import { initialState, reducer } from './reducers/userReducer';
import UserProfile from './components/Screen/UserProfile';
import Subscribeuserpost from './components/Screen/Subscribeuserpost'




export const userContext=createContext();

// const Routing=()=>{//this component we created because we have not wrapped app 
//   //component with BrowserRouter but we want to access history hook because without BrowserRouter we can not access useHistory() hook

 

// return(




   
// )}

function App() {
  
  const [state, dispatch] = useReducer(reducer, initialState)

  const history=useHistory()
 
 

  useEffect(() => {
    const user=localStorage.getItem('user');
    if(user)    {
//       console.log(user)
//       history.push("/")
      dispatch({type:"USER",payload:user})
    }
    else{
      history.push('/login')
    }
    
  })
    

  return (
          <userContext.Provider value={{state, dispatch}}>
         
              <Navbar />
              <Switch>

              <Route exact path='/' >
                      <Home />
              </Route>
              <Route exact path='/mysubpost' >
                      <Subscribeuserpost />
              </Route>
              <Route  exact path='/createpost' >
                      <Createpost />
              </Route>
              <Route exact  path='/login' >
                      <Signin />
              </Route>
              <Route exact path='/signup' >
                      <Signup />
              </Route>
              <Route  exact path='/profile'>
                      <Profile />
              </Route>
              <Route   path='/profile/:userid' >
                      <UserProfile />
              </Route>

              </Switch>
             
          </userContext.Provider>
  );
}

export default App;
