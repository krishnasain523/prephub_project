import { useEffect } from "react";
import { useState } from "react"

const Onlinestatus=()=>
{
    const[Status,setstatus]=useState(true);

    useEffect(()=>{
        window.addEventListener("offline",()=>{
            setstatus(false)
       })
       window.addEventListener("online",()=>{
            setstatus(true)
       })
    
    },[])

    return Status




}
export default Onlinestatus