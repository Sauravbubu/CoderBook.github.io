import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';

const PrivateRoute = ({children}) => {
    const {user}=useContext(AuthContext);
    
if(!user){
    alert("Login to access")
    return <Navigate to="/"/>
}
  return (
    <div>{children}</div>
  )
}

export default PrivateRoute