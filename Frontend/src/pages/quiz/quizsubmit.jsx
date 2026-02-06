import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
export default function  Quizsubmit()
{
 const navigate=useNavigate();
   const{result,id,topicname,catagory,difficulty}=useParams();
    return(
        <>
      <div className="max-w-80 min-h-60 m-auto text-white mt-50 bg-green-500 bg-opacity-10  rounded-sm">
          
           <div className=" text-xl font-bold font-sans p-15">
             Your Score={result}%
           </div>
           <div className="flex justify-center gap-20 items-center h-20">
           <button onClick={()=>{navigate(`/quiz/subject/${id}/${catagory}/${topicname}/${difficulty}`)}} className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 p-3  rounded-xl">retake</button>
            <button onClick={()=>{ window.location.href = "/quiz";}} className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 p-3  rounded-xl ">done</button> 
           </div>
        </div>  
        </>
    )
}