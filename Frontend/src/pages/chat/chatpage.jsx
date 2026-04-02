import React, { useContext, useEffect, useState } from 'react'
import axios from '../../api/axios'
import ChatWindow from './chatwindow'
import ChatHistory from './chathistory'
import { mycontext } from '../../context/mycontext'
import { v4 as uuidv4 } from "uuid";
import   "./chats.css"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
export default function ChatPage() {

    const { setcurrthread, setnewchat, setpromt, setreply, setprevchats } = useContext(mycontext);

    // const fetchChats = async ()=>{
    // try{
    // setLoading(true)
    // const res = await axios.get('/api/chat')
    // setChats(res.data.chat || [])
    // }catch(err){
    // console.error(err)
    // }finally{setLoading(false)}
    // }


    // // useEffect(()=>{ fetchChats() }, [])


    // const handleNewChat = () => {
    // // start a new blank chat locally (will create on send)
    // setActiveChat({ id: 'new', question: 'New Chat', messages: [] })
    // }


    // const handleDelete = async (id) =>{
    // try{
    // await axios.delete(`/chat/${id}`)
    // fetchChats()
    // if(activeChat && activeChat._id === id) setActiveChat(null)
    // }catch(err){ console.error(err) }
    // }

    const newchat = () => {
        setcurrthread(uuidv4());
        setpromt('');
        setreply('');
        setnewchat(true);
        setprevchats([])

    }
    const [open,setopen]=useState(false);
    return (
        <div className="flex h-[calc(100vh-64px)]">
            <div className={` w-70  p-3 fixed md:sticky bg-[#ECFDF5] h-full tranform transition-transform duration-300 ${open?"tranlate-x-20":"-translate-x-full"} md:translate-x-0 left-4 flex flex-col`}>
                <button className=' relative left-35 top-20  block md:hidden' onClick={(e)=>{setopen(!open)}}>{open?<ArrowBackIosNewIcon  />:<ArrowForwardIosIcon />}</button>
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-xl">History</h3>
                    <button className="text-sm primary-btn" onClick={newchat}>New</button>
                </div>
                <div className="flex-1  overflow-auto">
                    <ChatHistory />
                </div>
            </div>
            <div className="flex-1 p-4">
                <ChatWindow />
            </div>
        </div>
    )
}