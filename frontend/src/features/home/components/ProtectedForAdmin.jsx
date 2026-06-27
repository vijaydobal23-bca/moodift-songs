import React from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedForAdmin = ({children}) => {

    const {user} = useAuth();

    if(!user){
        return <Navigate to="/login" />
    }

    if(user?.role === "admin" || user?.role === "artist"){
        return children;
    }
    return (
        <div style={{ color: "white", padding: "20px", textAlign: "center" }}>
            <h1>Access Denied</h1>
            <p>You must be registered as an artist to upload songs.</p>
        </div>
    )
}

export default ProtectedForAdmin;