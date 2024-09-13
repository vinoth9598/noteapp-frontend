
import React, { useEffect }  from 'react';
import RegisterForm from './component/RegisterForm';
import { useState } from 'react';
import LoginForm from './component/LoginForm';
import LoggedInPage from './component/LoggedInPage';
import "./component/style/app.css";
function App(){

  const [formUserDetails,setFormUserDetails] = useState({
   username:"",
   name:"",
   password:""
  })

  const [loginFormData,setLoginFormData] = useState({
    username:"",
    password:""
  });

  const [isRegistered,setIsRegistered] = useState(false);

  const [user,setUser] = useState(null);
  const [token,setToken] = useState(null);

  useEffect(()=>{
    const user = window.localStorage.getItem('user');
    const token = window.localStorage.getItem('token');

    if(user && token){
      setUser(JSON.parse(user));
      setToken(token);
    }
  },[]);

  return (
    <div className='container'>
      <div className='head'>
          <h1>Notes Applications</h1>
          {
            user ? (
              <LoggedInPage
                user={user}
                setUser = {setUser}
                token = {token}
                setToken = {setToken}
                isRegistered = {isRegistered}
                setIsRegistered = {setIsRegistered}
              />
            ):(
              isRegistered ? (
                <LoginForm
                  loginFormData={loginFormData}
                  setLoginFormData={setLoginFormData}
                  isRegistered={isRegistered}
                  setIsRegistered={setIsRegistered}
                  token={token}
                  setToken = {setToken}
                  user={user}
                  setUser = {setUser}
              />

              ) : (
                <RegisterForm
                formUserDetails={formUserDetails}
                setFormUserDetails={setFormUserDetails}
                isRegistered={isRegistered}
                setIsRegistered={setIsRegistered}
                />

              )
            )
          }
      </div>
    </div>
  )
}
export default App;