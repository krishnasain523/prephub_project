import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { data, useParams } from "react-router-dom"
import { PulseLoader } from "react-spinners";
import { mycontext } from "../../context/mycontext";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeHiglight from "rehype-highlight"
import remarkGfm from "remark-gfm";
export default function QuizTake() {
    const { mcqs, setmcqs, setLoading, loading } = useContext(mycontext);
    const navigate = useNavigate();
    const { id, catagory, topicname, difficulty } = useParams();
    const [selected, setselected] = useState("");
    const [value, setvalue] = useState("");
    const [obtainmarks, setobtainmarks] = useState(1);
    const [index, setindex] = useState(0);
    const [latestquestion, setlatestquetion] = useState("");
    const called = useRef(false);
    const quizkey = `quiz_data_${id}_${catagory}_${topicname}_${difficulty}`
     const validatequiz = (data) => {
            for (let mcq of data.mcqs) {
                if (!mcq.id || !mcq.question || !mcq.options || !mcq.correctAnswer) {
                    return false;
                }

            }
            return true;
        }
    useEffect(() => {
        if (called.current) return;
        called.current = true;

        if (localStorage.getItem(quizkey)) {
            setmcqs(JSON.parse(localStorage.getItem(quizkey)))
            return
        }
       
        const fatchanswer = async () => {
            try {
                const body = { topic: topicname, catagory: catagory, difficultylevel: difficulty };
                const res = await axios.post(`http://localhost:3000/api/subjects/${id}/startquiz`, body, { withCredentials: true });
                const raw = res.data.answer;
                console.log(raw);
                let cleaned = raw.trim();

                if (cleaned.startsWith("```")) {
                    cleaned = cleaned.replace(/^```json\s*/, "");
                    cleaned = cleaned.replace(/^```\s*/, "");
                    cleaned = cleaned.replace(/```$/, "");
                }
              const parsed = JSON.parse(cleaned);

        if (validatequiz(parsed)) {
            setmcqs(parsed.mcqs);
            localStorage.setItem(quizkey, JSON.stringify(parsed.mcqs));
        } else {
            console.log("Validation failed");
        }



            } catch (error) {
                console.log(error);
            }finally
            {
                setLoading(false);
            }
        }
        fatchanswer();
    }, [id, catagory, topicname, difficulty])

    useEffect(() => {
        setselected("");
    }, [index])

    const handlesubmit = () => {
        if (value === mcqs[index].correctAnswer) {
            setobtainmarks((prev) => prev + 1);
            console.log("correct answer");
            console.log(obtainmarks);
            setvalue("");
        }
        else {
            console.log(value);
            console.log("incorrect answer");
        }
    }

    const submit = () => {
        let result;
        if (index >= 19) {
            result = Math.round((obtainmarks / 20) * 100);

        }

        navigate(`/quiz/subject/${id}/${catagory}/${topicname}/${difficulty}/${result}`);
       
    }
    // loading ? <></> :
    if (!mcqs.length) {
        return <div><PulseLoader color="#ff6a00" className="w-40 h-20  m-auto mt-80" /></div>
    }
    return (<>
        <div className='text-white w-[80%] min-h-[calc(100vh-150px)]  bg-white m-auto mt-10'>
            {/* question */}
            <div>
                <div className="bg-red-400 p-5">  <ReactMarkdown remarkPlugins={remarkGfm}>{mcqs[index].question}</ReactMarkdown></div>

            </div>
            {/* answer */}
            <div className="p-5">
                <ul className="bg-orange-500 ">
                    <li><label ><input type="radio" name="options" value="a" checked={selected === "a"} onChange={(e) => { setvalue(e.target.value); setselected(e.target.value) }} />{mcqs[index].options.a} <br /></label></li>
                    <li><label><input type="radio" name="options" value="b" checked={selected === "b"} onChange={(e) => { setvalue(e.target.value); setselected(e.target.value) }} />{mcqs[index].options.b} <br /></label></li>
                    <li><label ><input type="radio" name="options" value="c" checked={selected === "c"} onChange={(e) => { setvalue(e.target.value); setselected(e.target.value) }} />{mcqs[index].options.c} <br /></label></li>
                    <li><label ><input type="radio" name="options" value="d" checked={selected === "d"} onChange={(e) => { setvalue(e.target.value); setselected(e.target.value) }} />{mcqs[index].options.d} <br /></label></li>
                </ul>
            </div>
            {/* controls */}
            <div className="  flex justify-center gap-10 mt-90 ">
                {index > 0 ? <button onClick={() => { setindex(prev => prev - 1) }}><ArrowBackIosNewIcon className="text-black font-bold" /></button> : ""}
                {index < 19 ? <button onClick={() => { setindex(prev => prev + 1), handlesubmit() }}> <ArrowForwardIosIcon className="text-black font-bold" /></button> : ""}
            </div>
            <div className="flex justify-end ">
                {index >= 19 ? <button onClick={submit} className="m-10 p-3 border-2 rounded-xl bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 ">submit</button> : ""}

            </div>
        </div>

    </>)
}