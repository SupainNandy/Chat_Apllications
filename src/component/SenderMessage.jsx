import React from "react";
import senderdp from "../assets/dp.jpg";
const SenderMessage = ({ className }) => {
    return(
        <div className={className || "w-fit max-w-[500px] px-[20px] py-[5px] bg-[rgb(23,151,194)] text-white text-[19px] rounded-lg ml-auto"}>
            <img src={senderdp} alt="dp" className="w-[150px] rounded-lg" />
           <h1>hi</h1>
        </div>
    )   
}

export default SenderMessage