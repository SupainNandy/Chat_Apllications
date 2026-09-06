import React from "react";

const ReciverMessage = ({ className }) => {
    return(
        <div className={className || "w-fit max-w-[500px] px-[20px] py-[10px] bg-white text-slate-700 rounded-2xl text-[19px] rounded-tl-none mr-auto shadow-md"}>
           <img src="../src/assets/dp.jpg" alt="" className="w-[150px] rounded-lg" />
            <h1>hi</h1>
        </div>
    )
}

export default ReciverMessage;