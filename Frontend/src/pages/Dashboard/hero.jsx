import Coursecard from "./coursecard";
import "./Hero.css"
export default function Hero() {
    return (<>
        <div className="banner">
            <div className="slider z-5" style={{ "--quantity": 5 }}>
                <div className="items" style={{ "--position": 1 }}>
                    <Coursecard/>
                </div>

                <div className="items" style={{ "--position": 2 }}>
                    <Coursecard/>
                </div>

                <div className="items" style={{ "--position": 3 }}>
                   <Coursecard/>
                </div>

                <div className="items" style={{ "--position": 4 }}>
                    <Coursecard/>
                </div>
                  <div className="items" style={{ "--position": 5 }}>
                   <Coursecard/>
                </div>
                  
            </div>
            <div className="content z-1 absolute top-[320px] left-[22%]">
                    <h1 className="text-8xl font-bold text-black [-webkit-text-stroke:3px_black] text-transparent">Learn. Build. Grow.</h1>
            </div>
        </div>
    </>)
}