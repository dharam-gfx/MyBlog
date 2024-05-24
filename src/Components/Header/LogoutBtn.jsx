import React from 'react'
import { logout } from '../../features/AuthSlice'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/Auth'
import { toast } from 'react-toastify'

const LogoutBtn = () => {
const dispatch = useDispatch()
  const logoutHandler =()=>{
    authService.logout().then((info)=>{
      dispatch(logout());
      toast.success( "Logout Successful." );
    })
  }

  return (
    <button onClick={logoutHandler} type="button" className="text-white transition-colors bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Logout</button>

  )
}

export default LogoutBtn