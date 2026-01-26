import React from 'react'


export default function Dashboard(){
return (
<div className="p-6 ">
<h1 className="text-2xl font-bold mb-4">Welcome to Prephub</h1>
<p className="text-gray-600">Use the left menu to navigate: Chat, PYQ, Quiz.</p>


<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
<div className="p-4 border rounded">Quick links</div>
<div className="p-4 border rounded">Recent Activity</div>
<div className="p-4 border rounded">Profile</div>
</div>
</div>
)
}