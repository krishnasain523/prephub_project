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
const googlelogin=()=>{
    window.location.href="http://localhost:3000/auth/google";
}

    return (
      <div className="p-5 mt-30 w-[80%] m-auto flex justify-center ">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow">
                <div className='mb-5 flex flex-col justify-center items-center '><button onClick={googlelogin} className="bg-[#1f1f1f] p-2 rounded-xl text-white font-bold transition transform duration-300 hover:-translate-y-1 hover:cursor-pointer m-auto"><i class="fa-brands fa-google "></i>login with google</button> <p className='text-[#64748B]'>Or</p><p className='text-[#64748B]'> Continue with email</p></div>

                <h2 className="text-xl font-semibold mb-4">Login to Prephub</h2>
                {error && <div className="text-red-500 mb-2">{error}</div>}
                <label className="block text-black mb-2">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full text-black border border-black p-2 rounded mb-3" />
                <label className="block text-black  mb-2">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full text-black border border-black p-2 rounded mb-4" />
                <button className=" primary-btn m-auto">Login</button>
                   
            </form>
           
        </div>
    )
}