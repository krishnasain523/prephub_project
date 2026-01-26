import axios from "axios";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom"



export default function QuizTake() {

    const {id, catagory, topicname, difficulty } = useParams();
    const called=useRef(false);
    useEffect(() => {
          if (called.current) return;
              called.current = true;
        const quizkey=`quiz_${id}_${catagory}_${topicname}_${difficulty}`
        if(localStorage.getItem(quizkey))
        {
            console.log("quiz already genrated");
            return;
        }
        localStorage.setItem(quizkey,"true");
        const fatchanswer = async () => {
            try {
                const body = { topic: topicname, catagory: catagory, difficultylevel: difficulty };
                const res = await axios.post(`http://localhost:3000/api/subjects/${id}/startquiz`, body,{withCredentials:true});
                   console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fatchanswer();
    },  [id, catagory, topicname, difficulty])
    return (<>

        <div className='text-white w-[80%] min-h-[calc(100vh-150px)]  bg-white m-auto mt-10'>
            {/* question */}
            <div>

            </div>
            {/* answer */}
            <div></div>
            {/* controls */}
            <div></div>
        </div>
    </>)
}