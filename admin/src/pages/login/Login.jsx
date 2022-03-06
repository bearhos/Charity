import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";
import { useSelector } from "react-redux";
import { store } from 'react-notifications-component';
import { useHistory } from "react-router-dom";
import ReactNotification from 'react-notifications-component'
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const admin = useSelector((state) => state.user.currentUser.isAdmin )

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
    if (admin){
      setTimeout(() => {
        history.push('/dashboard')
      }, 2000);
    }
    else{
      setTimeout(() => {
        history.push('/')
      }, 2000);
    }

    
  };
  

  return (
    <>
    <div className="loginContainer">
    <ReactNotification/>
      <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>
    <form className="formLogin">
        <h3>Login Here</h3>

        <label for="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" onChange={(e) => setUsername(e.target.value)}/>

        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password"  onChange={(e) => setPassword(e.target.value)}/>

        <button onClick={handleClick}  className="buttonLogin">Log In</button>
        
    </form>
    </div>
    </>
  );
};

export default Login;
