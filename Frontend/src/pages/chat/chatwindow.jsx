import React, { useContext, useEffect, useState } from 'react'
import axios from '../../api/axios'
import { mycontext } from '..//../context/mycontext'
import Chats from './chats';
import{ScaleLoader} from "react-spinners";

export default function ChatWindow(){
const [messages, setMessages] = useState('')
// const [input, setInput] = useState('')
const [loading, setLoading] = useState(false)
const {promt,reply,setpromt,setreply,setnewchat,newchat,setprevchats,currthread,setcurrthread}=useContext(mycontext);

const send=async()=>{
   try
   { setLoading(true);
    setnewchat(false);
     const res=await axios.post('/api/chat',{question:promt,threadid:currthread})
     setreply(res.data.answer);
    //  setprevchats(prevchats=>([...prevchats,{role:"user",content:promt},{role:"gpt",content:reply}]))
    //  setMessages(res.data.massege);
    setLoading(false);
   }
   catch(err)
   {
    console.log(err)
   }
}
useEffect(()=>{
 if(promt&&reply)
 {
   setprevchats(prevchats=>([...prevchats,{role:"user",content:promt},{role:"gpt",content:reply}]))
 }
 setpromt("");
},[reply])

return (
<div className="flex flex-col h-full">
 <div className="text-gray-500">Select or create a chat to start.</div>
<div className="flex-1 flex flex-col gap-3 overflow-auto mb-3">  
</div>
 {newchat&& <><div className='h-10 font-sans font-bold mb-40 m-auto text-2xl'><h1>Start a new chat </h1></div></>}

<Chats/>
 {loading&&<ScaleLoader className=' m-auto mb-10'/>}
<div className="flex gap-2">
<input value={promt} onChange={e=>setpromt(e.target.value)} className="flex-1 border p-2 rounded" placeholder="Ask anything..." />
<button onClick={send} className="px-3 py-2 bg-blue-600 text-white rounded">Send</button>
</div>
</div>
)
}