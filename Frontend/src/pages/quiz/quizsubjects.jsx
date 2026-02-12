import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Currsub from './currsub';
import { mycontext } from '../../context/mycontext';
import {useNavigate} from 'react-router-dom';
import{motion} from 'framer-motion';
export default function QuizSubjects(){
const navigate=useNavigate();
   const{setSubjects,subjects,currsubid,setcurrsubid}=useContext(mycontext);

    useEffect(() => {
        // fetch subjects from backend - adjust endpoint as needed
        const fetch = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/subjects')
                setSubjects(res.data)
                console.log(res.data)
            } catch (err) { console.error(err) }
        }
        fetch()
    }, [])
const handlesubject=async(id,catagory)=>{
    try {
        setcurrsubid(id);
        navigate(`/quiz/subject/${id}/${catagory}`);
    } catch (error) {
        console.log(error);
    }
}
if(!subjects)
{
    return <div className='text-red'>loading....</div>
}
  return (
<>

  <motion.div
  initial={{opacity:0,scale:0.8, y:20}}
  animate={{opacity:1,scale:1, y:0}}
  transition={{duration:0.6}}
  className='grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3   p-10'>
    {
    subjects.map((sub)=>{
        return <div onClick={()=>handlesubject(sub._id,sub.code)} className='h-50 w-80 bg-white text-black p-5 border-2 rounded-xl mb-3  '>
            {/* title */}
            <div className='text-xl font-bold '>{sub.name}</div>
            {/* topics */}
            <div className=' h-30 overflow-hidden hover:overflow-auto'>
                <ul className='pl-2'>
                    {sub.topics.map((top)=>{
                      return <li>{top}</li>
                    })}
                </ul>
            </div>
        </div>
    })
  }
  </motion.div>
</>
)
}