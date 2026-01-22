import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from '../../api/axios'


export default function QuizTopics(){
const { subjectId } = useParams()
const [topics, setTopics] = useState([])
useEffect(()=>{
const fetch = async ()=>{
try{
const res = await axios.get(`/quiz/subjects/${subjectId}/topics`)
setTopics(res.data.topics || [])
}catch(err){ console.error(err) }
}
fetch()
}, [subjectId])


return (
<div className="p-6">
<h2 className="text-xl font-semibold mb-4">Topics</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
{topics.map(t=> (
<Link to={`/quiz/${subjectId}/take/${t.id}`} key={t.id} className="p-3 border rounded hover:shadow">
<div className="font-medium">{t.title}</div>
<div className="text-sm text-gray-500">{t.qcount} Questions • {t.time} mins</div>
</Link>
))}
</div>
</div>
)
}