import ChatPage from "../pages/chat/chatpage";

import { mycontext } from "./mycontext";
import { useState } from "react";
import{v4 as uuidv4} from "uuid";
export default function Myprovider({children})
{
    const[promt,setpromt]=useState('');
    const[reply,setreply]=useState('');
    const[newchat,setnewchat]=useState(false);
    const [prevchats,setprevchats]=useState([]);
    const[currthread,setcurrthread]=useState(uuidv4());
           const [subjects, setSubjects] = useState([])
        const [currsub, setcurrsub] = useState({});
          const [currsubid, setcurrsubid] = useState('');
          const [topic,settopic]=useState('');
           const [mcqs, setmcqs] = useState([]);
           const[loading,setLoading]=useState(true);
    const providervalues={newchat,setnewchat,promt,reply,setpromt,setreply,prevchats,setprevchats,currthread,setcurrthread,subjects,setSubjects,currsub,setcurrsub,setcurrsubid,currsubid,topic,settopic,mcqs, setmcqs,loading,setLoading};
    return (
        <>
      <mycontext.Provider value={providervalues}>
         {children}
      </mycontext.Provider>
         </>
    )
}