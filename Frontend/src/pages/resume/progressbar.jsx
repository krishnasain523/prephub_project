import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
export default function Progressbar({value,score,pathColor,text})
{
      const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setProgress(score);
    }, 500);
  }, [score]);
    return(<>
     <div className="w-45">
            <h1 className="text-center text-xl mb-4 font-bold">{text}</h1>
             <CircularProgressbar
        value={progress}
        text={`${progress}% `}
        styles={buildStyles({
          pathColor:pathColor,
          textColor: "#0F172A",
          trailColor: "#E5E7EB",
           pathTransitionDuration: 2,
        })}
      />
        </div>
    
    </>)
}