import { register, login, getMe, logout, registerArtist } from "../services/auth.api";

import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

   async function handleRegister({ username, email, password }) {
    setLoading(true);
    const data = await register(username,email,password);
    setUser(data.user);
    setLoading(false);
  }

   async function handleRegisterArtist({ username, email, password }) {
    setLoading(true);
    const data = await registerArtist(username,email,password);
    setUser(data.user);
    setLoading(false);
  }


   async function handleLogin({ username, email, password }) {
    setLoading(true);
    const data = await login(username,email,password);
    setUser(data.user);
    setLoading(false);
  }


   async function handleGetMe(){
    setLoading(true);
    const data  = await getMe();
    setUser(data.user);
    setLoading(false);
  }


   async function handlelogout(){
    setLoading(true);
    try {
      await logout();
    } catch (e) {
      console.error("Logout error:", e);
    }
    setUser(null);
    setLoading(false);
  }

  useEffect(()=>{
    handleGetMe();
  },[]);

  return{
    user,loading,handleRegister,handleRegisterArtist,handleLogin,handleGetMe,handlelogout
  }
};
