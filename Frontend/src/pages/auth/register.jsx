import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/Authcontext'

export default function Register(){
const [username, setUsername] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [flash,setflash]=useState('');
const [error, setError] = useState(null)
const { register } = useContext(AuthContext)
const navigate = useNavigate()


const handleSubmit = async (e) =>{
e.preventDefault()
try{
 let res= await register({ username, email, password })
console.log(res);
navigate('/dashboard')
}catch(err){
setError(err.response?.data?.message || 'Register failed')
}
}


return (
<div className="min-h-screen flex items-center justify-center bg-gray-50">
<form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow">
<h2 className="text-xl font-semibold mb-4">Create an account</h2>
{error && <div className="text-red-500 mb-2">{error}</div>}
<label className="block text-black mb-2">Name</label>
<input value={username} onChange={e=>setUsername(e.target.value)} className="w-full border border-black text-black p-2 rounded mb-3" />
<label className="block text-black mb-2">Email</label>
<input value={email} onChange={e=>setEmail(e.target.value)} className="w-full border border-black text-black p-2 rounded mb-3" />
<label className="block text-black mb-2">Password</label>
<input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border border-black text-black p-2 rounded mb-4" />
<button className="w-full bg-blue-600 text-white py-2 rounded">Register</button>
</form>
</div>
)
}