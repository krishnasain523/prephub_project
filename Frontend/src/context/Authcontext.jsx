import React, { createContext, useState, useEffect } from 'react'
import axios from '../api/axios'
import { saveToken, clearToken, getToken } from '../utils/token'


export const AuthContext = createContext()


export default function AuthProvider({ children }) {
const [user, setUser] = useState(null)
const [loading, setLoading] = useState(true)


useEffect(() => {
const checkauth=async()=>
{
    try
{
    const res= await axios.get("/auth/me",{withCredentials:true});
    setUser(res.data.user);
}
catch(err)
{
setUser(null);
}
finally
{
    setLoading(false);
}
}
checkauth();
}, [])


const login = async (email, password) => {
const res = await axios.post('/auth/login', { email, password }, { withCredentials: true } )
  const resp = await axios.get("/auth/me", { withCredentials: true });
  setUser(resp.data.user);
return res
}


const register = async (payload) => {
const res = await axios.post('/auth/register', payload)
return res
}


const logout = () => {
clearToken()
setUser(null)
}


return (
<AuthContext.Provider value={{ user, loading, login, register, logout }}>
{children}
</AuthContext.Provider>
)
}
