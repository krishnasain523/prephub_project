import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { mycontext } from '../../context/mycontext';
export default function ChatHistory() {
    const { prevchats, setprevchats, setreply, setnewchat, setcurrthread } = useContext(mycontext);
    const [threads, setthreads] = useState([]);
    useEffect(() => {
        const fatchchats = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/chat");
                setthreads(res.data.chat);
            } catch (error) {
                console.log(error);
            }
        }
        fatchchats();
    }, [prevchats])

    const changethread = (threadid) => {
        setcurrthread(threadid);
        setreply(null)
        setnewchat(false)
        const fatchchatmassege = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/chat/${threadid}`, { withCredentials: true });
                setprevchats(res.data.massege)
            } catch (error) {
                console.log(error);
            }
        }
        fatchchatmassege();
    }
 const handledelete=(threadid)=>{
   const deletechat=async()=>
   {
     try {
        const res=await axios.delete(`http://localhost:3000/api/chat/${threadid}`,{withCredentials:true})
         console.log(res)
    } catch (error) {
      console.log(error)  
    }
   }
   deletechat();
 }
    return (
        <>
            <div className='p-2 mt-50'>
                <p>your chats</p>
                {threads.map((chat, index) => (
                    <ol>
                        <li key={index} onClick={() => changethread(chat.threadid)} className=' group mt-3 flex justify-between items-center hover:bg-blue-600'>{chat.question} 
                        <button onClick={(e)=> { e.stopPropagation();
                            handledelete(chat.threadid)}} className="opacity-0 group-hover:opacity-100 ">
                            <i className="fa-solid fa-delete-left"></i>
                        </button>
                        </li>
                    </ol>
                ))}
            </div>
        </>
    )
}