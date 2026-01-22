import React from 'react'
import { useLocation, Link } from 'react-router-dom'


export default function QuizResult(){
const { state } = useLocation()
const res = state?.result
if(!res) return <div className="p-6">No result found</div>
return (
<div className="p-6">
<h2 className="text-xl font-semibold">Quiz Result</h2>
<div className="mt-4 p-4 border rounded">
<div>Score: <strong>{res.score}</strong></div>
<div>Correct: {res.correct}</div>
<div>Wrong: {res.wrong}</div>
<div className="mt-3"><Link to="/quiz" className="text-blue-600">Back to quizzes</Link></div>
</div>
</div>
)
}