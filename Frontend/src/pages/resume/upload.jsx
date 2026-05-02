import { use, useContext, useState } from "react"
import { motion } from "framer-motion";
import { duration } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { mycontext } from "../../context/mycontext";

export default function Upload() {
    const [value, setvalue] = useState("");
    const [file, setfile] = useState(null);
    const { loading, setLoading } = useContext(mycontext)
    const navigate = useNavigate();
    const handlesubmit = async () => {
        try {
            const formdata = new FormData();
            formdata.append("resume", file);
            formdata.append("description", value);
            setLoading(false);
            const res = await axios.post("https://prephub-project-2.onrender.com/api/upload", formdata, {
                withCredentials: true
            })
            setLoading(true);
            navigate("/resume/score");
        }
        catch (err) {
            console.log(err);
        }
    }
    return (<>
        {loading ? <motion.div
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 10 }}
            transition={{ duration: 0.5 }}
            className="flex-1 min-h-screen p-5 z-0 mt-10">
            <h1 className="text-4xl font-sarif font-bold text-center green-text" >Check your resume score </h1>
            <div className="flex flex-col justify-center mt-25 items-center gap-2 md:gap-10">
                <div className="flex gap-4 p-5 md:p-1">
                    <label htmlFor="resume" className="text-xl">Upload your resume here:</label>
                    <input type="file" id="resume" className="border rounded-sm max-w-[180px]" onChange={(e) => { setfile(e.target.files[0]) }} />
                </div>
                <div className="flex flex-col gap-2 mt-5">

                    <p className="text-xl "> Description:</p>
                    <textarea name="description" id="desc" className="p-3  max-w-2xl" rows={5} value={value} onChange={(e) => { setvalue(e.target.value) }} placeholder=" write description"></textarea>
                </div>
                <button className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 py-1 text-xl px-2 rounded-sm primary-btn" onClick={handlesubmit}>Analyze</button>
            </div>

        </motion.div> : <div>loading...</div>}

    </>)
}