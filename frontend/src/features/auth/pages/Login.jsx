import React, { useState } from "react";
import "../style/login.scss"
import FormGroup from "../components/FormGroup";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
const {loading ,handleLogin} = useAuth();
const [email, setEmail] = useState("");
const [password,setPassword] = useState("");
const navigate = useNavigate();

async function handleSubmit(e){
  e.preventDefault();
  await handleLogin({email,password});
  navigate("/");


}
  return (
    <main className="login-page">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={(e)=>{handleSubmit(e)}}>
         <FormGroup label = "email" placeholder = "Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}></FormGroup>

          <FormGroup label = "password" placeholder = "Enter passwprd" value={password} onChange={(e)=>{
            setPassword(e.target.value)
          }}></FormGroup>

          <button type="submit" className="button">Login</button>
        </form>
        <p>Don't have an account ?<Link to="/register">Regiser</Link></p>
      </div>
      
    </main>
  );
};

export default Login;
