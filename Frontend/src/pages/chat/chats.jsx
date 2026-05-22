import './chats.css'

import { useContext, useEffect, useState } from "react"
import { mycontext } from "../../context/mycontext"
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";
export default function Chats() {
    const { prevchats, reply } = useContext(mycontext);
    const [latestreply, setlatestreply] = useState(null);
    useEffect(() => {
        if (!prevchats?.length) return;
        if (reply === null) {
            setlatestreply(null);
            return
        }
           console.log(prevchats)
        const content = reply.split(" ");
        let indx = 0;
        const intervel = setInterval(() => {
            setlatestreply(content.slice(0, indx + 1).join(" "))
            indx++;
            if (indx >= content.length) {
                clearInterval(intervel);
            }
        }, 40)
        return () => clearInterval(intervel);
    }, [prevchats])
    return (<>
        <div className='chats '>
            
                {
                   
                    prevchats?.slice(0, -1).map((chat, indx) => (
                        <div className="userdiv " key={indx}>
                            {chat.role === 'user' ? <div className='flex  justify-end px-20 mb-5'><p className="usermassege ">{chat.content}</p></div>
                                : (
                                   
                                        <div className='flex justify-center'>
                                            <div className="gptmessage">
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                rehypePlugins={[rehypeHighlight]}
                                            >
                                                {chat.content}
                                            </ReactMarkdown>
                                    
                                    </div>
                                        </div>
                                )}
                        </div>

                    ))
                }
                {
                    prevchats.length > 0 && (
                        <>
                            {latestreply === null ?
                                <div className='userdiv' key={"non-typing"}>
                                    <ReactMarkdown remarkPlugins={remarkGfm} rehypePlugins={rehypeHighlight}>{prevchats[prevchats.length - 1].content}</ReactMarkdown>
                                </div> :
                                <div className='gptdiv'>
                                    <div className='gptmessage'>
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            rehypePlugins={[rehypeHighlight]}
                                        >
                                            {latestreply}
                                        </ReactMarkdown>
                                    </div>
                                </div>}
                        </>
                    )}
           

        </div>
    </>)
}