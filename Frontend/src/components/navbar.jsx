import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Authcontext'


export default function Navbar() {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()


    return (
        <nav className="sticky top-0 w-full flex justify-between items-center px-4 md:px-[8%] py-5 z-50 bg-[#ECFDF5] ">
            <Link to="/" className="font-bold text-xl logo">Prephub</Link>
            <div className="flex items-center gap-4 nav-links">

                <Link to="/chat" className="text-sm text-gray-600 hidden sm:block">Ai Mentor</Link>
                <Link to="/resume" className="text-sm text-gray-600 hidden sm:block">Analyze Resume</Link>
                <Link to="/quiz" className="text-sm text-gray-600 hidden sm:block">Quiz</Link>

            </div>

            <div>
                {user ? (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => { logout(); navigate('/login') }}
                            className="px-3 py-1 border rounded primary-btn"
                        >Logout</button>
                    </div>
                ) : (
                    <div className='flex gap-5 md:gap-10'>
                        <button className='px-3 py-2 rounded-sm primary-btn text-[#ffffff]'><Link to="/register" className="text-sm ">Signup</Link></button>
                        <button className='px-3 py-2 rounded-sm primary-btn  text-[#ffffff]'><Link to="/login" className="text-sm ">Login</Link></button>
                    </div>
                )}
            </div>
        </nav>
    )
}