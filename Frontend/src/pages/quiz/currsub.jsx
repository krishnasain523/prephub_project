import { useContext, useEffect } from "react"
import { mycontext } from "../../context/mycontext"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
export default function Currsub()
{
  const navigate=useNavigate();
    const{setcurrsub,currsub,currsubid}=useContext(mycontext);
      const{id}=useParams();
      useEffect(()=>{
       const fetch = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/subjects/${id}`)
                setcurrsub(res.data);
            } catch (err) { console.error(err) }
        }
        fetch()
      },[id])
return(<>
    
   <div className="w-100 m-auto bg-white text-black mt-20 text-center text-xl font-sans ">
     {currsub?.topics?.map((top,index)=>{
        return <li className=" list-none hover:underline cursor-pointer " key={index}>{top}</li>
    })}
   </div>
    </>)
}