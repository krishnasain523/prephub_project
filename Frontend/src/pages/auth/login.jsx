import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/Authcontext'


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(email, password)
            navigate('/dashboard')
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed')
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Login to Prephub</h2>
                {error && <div className="text-red-500 mb-2">{error}</div>}
                <label className="block text-black mb-2">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full text-black border border-black p-2 rounded mb-3" />
                <label className="block text-black  mb-2">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full text-black border border-black p-2 rounded mb-4" />
                <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
            </form>
        </div>
    )
}