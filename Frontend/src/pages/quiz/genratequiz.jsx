import { useState } from "react";
import { useParams } from "react-router-dom"

export default function Genratequiz()
{
    const {topicname}=useParams();
    const [level ,setlevel]=useState('');
    const options=["easy","medium","hard"];
    return(
        <>
        
       <div className="bg-[#121212] border border-black rounded-sm text-gray-200 w-100 m-auto mt-50 text-white p-5 text-center ">
        <h1 className="text-3xl font-sans font-bold mb-10">Select Difficulty level</h1>
     <div className="text-center text-xl">
           {options.map((opt)=>{
         return <label key={opt} ><input type="radio" name="Difficulty" value={opt} checked={level===opt} onChange={(e)=>setlevel(e.target.value)} />{opt} <br /></label>
        })}
     </div>
        <button className="p-3 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white mt-10 border-2 rounded-xl hover:rounded-sm">Genrate quiz</button>
       </div>
        </>
    )
}