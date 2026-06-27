import React,{useState} from "react";
import "../style/register.scss";

import FormGroup from "../components/FormGroup";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Register = () => {

 const {loading , handleRegister} = useAuth();
 const navigate = useNavigate();




const [username, setUsername] = useState("");
const[email ,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleSubmit = async(e)=>{
  e.preventDefault();
  await handleRegister({username , email , password});
  navigate("/");
}

  return (

    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={(e)=>{
          handleSubmit(e)
        }}>
          <FormGroup label = "Username" placeholder = "Enter email" value={username} onChange={(e)=>setUsername(e.target.value)}></FormGroup>

          <FormGroup label="Email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}></FormGroup>
          <FormGroup
            label="Password"
            placeholder="Enter your Password"
            value={password} onChange={(e)=>setPassword(e.target.value)}
          ></FormGroup>
          <button className="button">Register</button>
        </form>
        <p>
          Already have an account ?<Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
