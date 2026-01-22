import React, { useEffect, useState } from 'react'
import axios from '../api/axios'


export default function PYQ(){
const [items, setItems] = useState([])
const [loading, setLoading] = useState(false)


const fetch = async ()=>{
setLoading(true)
try{
const res = await axios.get('/pyq/chat')
setItems(res.data.chat || [])
}catch(err){ console.error(err) }
setLoading(false)
}


useEffect(()=>{ fetch() }, [])


return (
<div className="p-6">
<h2 className="text-xl font-semibold mb-4">Previous Year Questions</h2>
{loading && <div>Loading...</div>}
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
{items.map(it=> (
<div key={it._id} className="p-3 border rounded">
<div className="font-medium">{it.question}</div>
<div className="text-sm mt-2">{it.answer?.slice(0,200)}...</div>
</div>
))}
</div>
</div>
)
}