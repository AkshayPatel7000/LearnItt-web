import React from 'react'
import { useNavigate } from 'react-router-dom'

const UploadPhoto = () => {
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem('auth')
    navigate('/')
  }
  return (
    <div>
      first page
      <button onClick={logOut} >LOGOUT</button>
    </div>
  )
}

export default UploadPhoto
