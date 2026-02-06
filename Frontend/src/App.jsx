import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthProvider from './context/Authcontext'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import ProtectedRoute from './components/protectedroute'


import Login from './pages/auth/login'
import Register from './pages/auth/register'
import Dashboard from './pages/dashboard'
import ChatPage from './pages/chat/chatpage'
import PYQ from './pages/pyq'
import QuizSubjects from './pages/quiz/quizsubjects'
import QuizTopics from './pages/quiz/quiztopics'
import QuizTake from './pages/quiz/quiztake'
import QuizResult from './pages/quiz/quizresult'
import Chat from './context/myprovider'
import Quizpage from './pages/quiz/quizpage'
import Currsub from './pages/quiz/currsub'
import Genratequiz from './pages/quiz/genratequiz'
import Quizsubmit from './pages/quiz/quizsubmit'


export default function App(){
return (
<BrowserRouter>
<AuthProvider>
<div className="min-h-screen flex flex-col">
<Navbar />
<div className="flex flex-1">
<Sidebar />
<div className="flex-1">
<Routes>
<Route path="/" element={<Dashboard />}/>
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/chat" element={<ChatPage/>} />
<Route path="/pyq" element={<PYQ />} />
<Route path="/quiz" element={<QuizSubjects/>} />
<Route path='/quiz/subject/:id/:catagory' element={<Currsub/>}/>
<Route path='/quiz/subject/:id/:catagory/:topicname' element={<Genratequiz/>}/>
<Route path='/quiz/subject/:id/:catagory/:topicname/:difficulty' element={<QuizTake/>}/>
<Route path='/quiz/subject/:id/:catagory/:topicname/:difficulty/:result' element={<Quizsubmit/>}/>
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
</Routes>
</div>
</div>
</div>
</AuthProvider>
</BrowserRouter>
)
}