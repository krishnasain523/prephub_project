import './chats.css'

import { useContext, useEffect, useState } from "react"
import { mycontext } from "../../context/mycontext"
import ReactMarkdown from "react-markdown";
import rehypeHiglight from "rehype-highlight"
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
            <div className='chatwrapper'>
                {
                    prevchats?.slice(0, -1).map((chat, indx) => (
                        <div className="userdiv " key={indx}>
                            {chat.role === 'user' ? <p className="usermassege">{chat.content}</p>
                                : (
                                    <div className="gptdiv" key={indx}>
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
                                    <ReactMarkdown remarkPlugins={remarkGfm} rehypePlugins={rehypeHiglight}>{prevchats[prevchats.length - 1].content}</ReactMarkdown>
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

        </div>
    </>)
}