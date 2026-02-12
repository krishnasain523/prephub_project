import { useContext, useState } from "react";
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { mycontext } from "../../context/mycontext";
import { motion } from "framer-motion";
export default function Genratequiz()
{  const{setLoading}=useContext(mycontext);
    const {topicname,catagory}=useParams();
    const [level ,setlevel]=useState('');
    const options=["easy","medium","hard"];
    const navigate=useNavigate();
    const {id}=useParams();
    const handlegenration=()=>{
     
 navigate(`/quiz/subject/${id}/${catagory}/${topicname}/${level}`)
  setLoading(true);
    }
    return(
        <>
        
       <motion.div 
         initial={{opacity:0,scale:0.8, y:20}}
  animate={{opacity:1,scale:1, y:0}}
  transition={{duration:0.6}}
       className="bg-[#121212] rounded-xl text-gray-200 w-100 m-auto mt-50 text-white p-5 text-center ">
        <h1 className="text-3xl  font-sans font-bold mb-10">Select Difficulty level</h1>
     <div className="text-center text-xl">
           {options.map((opt)=>{
         return <label key={opt} ><input type="radio" name="Difficulty" value={opt} checked={level===opt} onChange={(e)=>setlevel(e.target.value)} />{opt} <br /></label>
        })}
     </div>
        <button className="p-3 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white mt-10 border-2 rounded-xl hover:rounded-sm" onClick={handlegenration}>Genrate quiz</button>
       </motion.div>
        </>
    )
}