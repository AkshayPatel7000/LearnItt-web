import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const PrivatePage = ({setAuth,auth}) => {
    const navigate= useNavigate()
    if (!auth) return <Navigate to ='/' replace/>
  return (
    <div>
      hello weloco
      <button onClick={()=>{setAuth(false);localStorage.clear();navigate("/")}}>Logout</button>
    </div>
  )
}

export default PrivatePage
