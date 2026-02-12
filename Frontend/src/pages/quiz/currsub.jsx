import { useContext, useEffect, useState } from "react"
import { mycontext } from "../../context/mycontext"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
export default function Currsub()
{
  const navigate=useNavigate();
    const{setcurrsub,currsub,currsubid,topic,settopic}=useContext(mycontext);
    
      const{id,catagory}=useParams();
      useEffect(()=>{
       const fetch = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/subjects/${id}`)
                setcurrsub(res.data);
            } catch (err) { console.error(err) }
        }
        fetch()
      },[id])

      const handletopic=(topicname)=>{
        settopic(toString(topicname));
        navigate(`/quiz/subject/${id}/${catagory}/${topicname}`)
      }
return(<>
    
   <motion.div
    initial={{opacity:0,scale:0.8, y:20}}
  animate={{opacity:1,scale:1, y:0}}
  transition={{duration:0.6}}
   className="w-100 m-auto bg-[#121212]  text-white mt-20 text-center rounded-2xl text-xl font-sans ">
     <h1 className=" w-1/2  m-auto rounded-3xl font-extrabold font-italic text-3xl bg-gradient-to-r from-green-400 to-green-500 mb-5">Select Topic</h1>
     {currsub?.topics?.map((top,index)=>{
        return <li className=" list-none hover:underline cursor-pointer " onClick={()=>handletopic(top)} key={index}>{top}</li>
    })}
   </motion.div>
    </>)
}