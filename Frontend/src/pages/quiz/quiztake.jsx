import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../../api/axios'


export default function QuizTake() {
    const { subjectId, topicId } = useParams()
    const [questions, setQuestions] = useState([])
    const [current, setCurrent] = useState(0)
    const [answers, setAnswers] = useState({})
    const [timeLeft, setTimeLeft] = useState(0)
    const timerRef = useRef(null)
    const navigate = useNavigate()


    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`/quiz/${subjectId}/topics/${topicId}/start`)
                setQuestions(res.data.questions || [])
                setTimeLeft((res.data.time || 10) * 60)
            } catch (err) { console.error(err) }
        }
        fetch()
        return () => clearInterval(timerRef.current)
    }, [subjectId, topicId])


    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    clearInterval(timerRef.current)
                    handleSubmit()
                    return 0
                }
                return t - 1
            })
        }, 1000)
        return () => clearInterval(timerRef.current)
    }, [questions])


    const handleSelect = (qid, choice) => {
        setAnswers(a => ({ ...a, [qid]: choice }))
    }


    const handleSubmit = async () => {
        try {
            const res = await axios.post(`/quiz/${subjectId}/topics/${topicId}/submit`, { answers })
            navigate(`/quiz/result`, { state: { result: res.data } })
        } catch (err) { console.error(err); navigate('/quiz') }
    }


    if (questions.length === 0) return <div className="p-6">Loading...</div>


    const q = questions[current]
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <div>Question {current + 1} / {questions.length}</div>
                <div>Time left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</div>
            </div>
            <div className="border p-4 rounded"></div>
        </div>
    )}