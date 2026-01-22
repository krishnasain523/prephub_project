import React from 'react'
import { Link } from 'react-router-dom'


export default function Sidebar() {
return (
<aside className="w-64 border-r p-4 hidden md:block">
<nav className="flex flex-col gap-2">
<Link to="/dashboard" className="py-2 px-3 rounded hover:bg-gray-100">Dashboard</Link>
<Link to="/chat" className="py-2 px-3 rounded hover:bg-gray-100">Chat</Link>
<Link to="/pyq" className="py-2 px-3 rounded hover:bg-gray-100">PYQ</Link>
<Link to="/quiz" className="py-2 px-3 rounded hover:bg-gray-100">Quiz</Link>
</nav>
</aside>
)
}