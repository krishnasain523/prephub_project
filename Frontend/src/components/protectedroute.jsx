import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/Authcontext'
import { ScaleLoader } from "react-spinners";

export default function ProtectedRoute() {
const { user, loading } = useContext(AuthContext)
  if (loading) {
    return <ScaleLoader/>; 
  }
if (!user) return <Navigate to="/login" replace />
return <Outlet/>;
}