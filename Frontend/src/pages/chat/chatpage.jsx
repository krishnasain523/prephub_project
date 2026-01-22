import React, { useContext, useEffect, useState } from 'react'
import axios from '../../api/axios'
import ChatWindow from './chatwindow'
import ChatHistory from './chathistory'
import { mycontext } from '../../context/mycontext'
import{v4 as uuidv4} from "uuid";

export default function ChatPage(){

    const{setcurrthread,setnewchat,setpromt,setreply,setprevchats}=useContext(mycontext);

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

const newchat=()=>{
    setcurrthread(uuidv4());
    setpromt('');
    setreply('');
    setnewchat(true);
    setprevchats([])
    
}
return (
<div className="flex h-[calc(100vh-64px)]">
<div className="w-80 border-r p-3 flex flex-col">
<div className="flex items-center justify-between mb-3">
<h3 className="font-semibold">History</h3>
<button  className="text-sm px-2 py-1 border rounded" onClick={newchat}>New</button>
</div>
<div className="flex-1 overflow-auto">
<ChatHistory />
</div>
</div>
<div className="flex-1 p-4">
<ChatWindow />
</div>
</div>
)
}