import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { data, useParams } from "react-router-dom"



export default function QuizTake() {

    const { id, catagory, topicname,difficulty } = useParams();
    const [mcqs, setmcqs] = useState([]);
    const called = useRef(false);
   const quizkey=`quiz_data_${id}_${catagory}_${topicname}_${difficulty}`
    useEffect(() => {
        if (called.current) return;
        called.current = true;
         
         if(localStorage.getItem(quizkey))
         {
            setmcqs(JSON.parse(localStorage.getItem(quizkey)))
            return
         }
        const fatchanswer = async () => {
            try {
                const body = { topic: topicname, catagory: catagory, difficultylevel: difficulty };
                const res = await axios.post(`http://localhost:3000/api/subjects/${id}/startquiz`, body, { withCredentials: true });
                const raw = res.data.answer;

                const cleanJson = raw.replace(/```json/g, "").replace(/```/g, "").trim();

                const parsed = JSON.parse(cleanJson);
                setmcqs(parsed.mcqs);
                  localStorage.setItem(quizkey, JSON.stringify(parsed.mcqs));
                console.log(parsed.mcqs);
            } catch (error) {
                console.log(error);
            }
        }
        fatchanswer();
    }, [id, catagory, topicname, difficulty])
    return (<>

        <div className='text-white w-[80%] min-h-[calc(100vh-150px)]  bg-white m-auto mt-10'>
            {/* question */}
            <div>
                {mcqs.map((mcq, index) => {
                    return <div className="bg-red-400" key={index}>{mcq.question}</div>
                })}
            </div>
            {/* answer */}
            <div></div>
            {/* controls */}
            <div></div>
        </div>
    </>)
}