import { use, useState } from "react"
import {motion} from"framer-motion";
import { duration } from "@mui/material/styles";
import axios from "axios";
export default function Upload() {
    const [value, setvalue] = useState("");
    const [file,setfile]=useState(null);
    const handlesubmit=async()=>{
        try
        {
            const formdata=  new FormData();
            formdata.append("resume",file);
            formdata.append("description",value);
            const res= await axios.post("http://localhost:3000/api/upload",formdata,{
                withCredentials: true})
                const resumeinfo=res.data;
              console.log(resumeinfo);
           const skill_score= (resumeinfo.matched_skill.length||0)/(resumeinfo.totalrequired_skill.length||1)*40;
           const experience_ratio=resumeinfo.required_years>0?resumeinfo.experience_years/resumeinfo.required_years:1;
           const ratio=Math.min(experience_ratio,1);
           const exprience_score=ratio*30;
            const education_score=resumeinfo.education_relevent?15:5;
            const softskill_score= (resumeinfo.matched_softskill||0)/(resumeinfo.required_softskill||1)*15;
            const overall_score=skill_score+exprience_score+education_score;
            console.log(Math.round(overall_score));
        }
        catch(err)
        {
console.log(err);
        }
    }
    return (<>
        <motion.div 
        initial={{opacity:0, scale:0, y:0}}
        animate={{opacity:1, scale:1, y:10}}
        transition={{duration:0.5}}
        className="max-w-full p-10 h-full m-auto ">
            <h1 className="text-4xl font-sarif font-bold text-center">Check your resume score </h1>
            <div className="flex flex-col justify-center mt-25 items-center gap-10">
                <div className="flex gap-4">
                    <label htmlFor="resume" className="text-xl">Upload your resume here:</label>
                    <input type="file" id="resume" className="border rounded-sm " onChange={(e)=>{setfile(e.target.files[0])}}/>
                </div>
                <div className="flex flex-col gap-2">

                    <p className="text-xl "> Description:</p>
                    <textarea name="description" id="desc" className="p-3" rows={8} cols={80} value={value} onChange={(e) => { setvalue(e.target.value) }} placeholder=" write description"></textarea>
                </div>
                 <button className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 py-1 text-xl px-2 rounded-sm" onClick={handlesubmit}>Analyze</button>
            </div>
           
        </motion.div>

    </>)
}