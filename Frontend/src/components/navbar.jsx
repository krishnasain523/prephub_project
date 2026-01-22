import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Authcontext'


export default function Navbar() {
const { user, logout } = useContext(AuthContext)
const navigate = useNavigate()


return (
<nav className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
<div className="flex items-center gap-4">
<Link to="/" className="font-bold text-xl">Prephub</Link>
<Link to="/chat" className="text-sm text-gray-600">Chat</Link>
<Link to="/pyq" className="text-sm text-gray-600">PYQ</Link>
<Link to="/quiz" className="text-sm text-gray-600">Quiz</Link>

</div>
<div className='flex gap-10'>
    <button className='px-3 py-2 rounded-sm bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-[#ffffff]'><Link to="/register" className="text-sm ">Signup</Link></button>
     <button className='px-3 py-2 rounded-sm bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600  text-[#ffffff]'><Link to="/login" className="text-sm ">Login</Link></button>
</div>
<div>
{user ? (
<div className="flex items-center gap-3">
<button
onClick={() => { logout(); navigate('/login') }}
className="px-3 py-1 border rounded"
>Logout</button>
</div>
) : (
<div className="flex gap-2">
<Link to="/login" className="text-sm">Login</Link>
<Link to="/register" className="text-sm">Register</Link>
</div>
)}
</div>
</nav>
)
}