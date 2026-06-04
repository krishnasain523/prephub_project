import { useEffect, useState } from "react";
import Coursecard from "./coursecard";
import "./Hero.css"
import axios from "axios";


export default function Hero() {


const[courses,setcourses]=useState([])


    useEffect(()=>{
   const fetch=async()=>
   {
     try {
         const result=await axios.get("https://prephub-project-2.onrender.com/api/course");
         console.log(result.data.data);
         setcourses(result.data.data)
     } catch (error) {
        console.log(error)
     }

   }
   fetch()
    },[])
    return (<>
        <div className="banner">
            <div className="slider z-5" style={{ "--quantity": 5 }}>
               {courses.map((cor,indx)=>{
                return  <div className="items" style={{ "--position": indx }}>
                    <Coursecard course={cor} />
                </div>
               })}
            </div>
            <div className="content z-1 absolute top-[320px] left-[22%]">
                    <h1 className="text-8xl font-bold text-black [-webkit-text-stroke:3px_black] text-transparent">Learn. Build. Grow.</h1>
            </div>
        </div>
    </>)
}