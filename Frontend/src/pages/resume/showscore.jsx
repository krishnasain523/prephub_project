import { useEffect, useState } from "react";
import Progressbar from "./progressbar";
import axios from "axios";

export default function Showscore() {
  const [resumescore, setresumescore] = useState({ overall_score:0, skill_score:0, exprience_score:0, education_score:0,});
  useEffect(() => {
    const fatch = async () => {
      try {
        const res = await axios.get("https://prephub-project-2.onrender.com/api/upload/resume");
        console.log(res.data);
        setresumescore(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fatch();
  }, [])
  return (<>
   {
    resumescore? <div className=" w-[90%] m-auto ">
      <div className=" flex justify-center mt-10">
        <Progressbar score={resumescore?.overall_score} value={resumescore?.overall_score} pathColor={"#22C55E"} text={"Overall Score"}></Progressbar></div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center items-center gap-10 mt-8">
        <Progressbar score={resumescore?.education_score} value={resumescore?.education_score} pathColor={"#F107A3"} text={"Education Score"} ></Progressbar>
        <Progressbar score={resumescore?.skill_score} value={resumescore?.skill_score} pathColor={"#7B2ff2"} text={"Skill matched"}></Progressbar>
        <Progressbar score={resumescore?.exprience_score} value={resumescore?.exprience_score} pathColor={"#FF7A18"} text={"Experince relevence"}></Progressbar>
      </div>
      {/* weakness */}
      <div className=" flex flex-wrap gap-10 mt-8">
        <div className="max-w-400 sugestions p-10 ">
          <h1 className="text-center mb-4 font-bold text-xl">Weakness</h1>
          <p>{resumescore.weakness}</p>
        </div>
        {/* improvement */}
        <div className="w-[90%] m-auto sugestions p-10 ">
          <h1 className="text-center mb-4 font-bold text-xl">Improvement Sugestions</h1>
          <ui>{resumescore?.improvement_sugestions?.map((sug) => {
            return <li>{sug}</li>
          })}</ui>
        </div>
      </div>
      {/* missing skill */}
      <div className="  flex flex-wrap gap-10 mt-8  items-center justify-center ">
        {resumescore?.missing_skill?.length > 0 && (<div className="w-50 sugestions p-5 text-center">
          <h1 className="text-xl  font-bold">Missing Skill</h1>
          <ui>
            {resumescore?.missing_skill?.map((mis)=>{
              return <li>{mis}</li>
            })}
          </ui>
        </div>)}
        {/* missing softskill */}
        {resumescore?.missing_softskill?.length > 0 && (<div className="w-50 sugestions p-5 text-center">
          <h1 className="text-xl  font-bold">Missing Softskill</h1>
          <ui>
           {resumescore?.missing_softskill?.map((mis)=>{
              return <li>{mis}</li>
            })}
          </ui>
        </div>)}
      </div>
    </div>:<div>loading....</div>
   }

  </>)
}