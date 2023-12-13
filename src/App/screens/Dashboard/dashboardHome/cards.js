import React from "react";
import user from '../../../../Assets/images/icons/user.png'
import heart from '../../../../Assets/images/icons/heart.png'
import money_send from '../../../../Assets/images/icons/money_send.png'
import money_recieve from '../../../../Assets/images/icons/money_recieve.png'
import wallet from '../../../../Assets/images/icons/wallet.png'
import dollar_circle from '../../../../Assets/images/icons/dollar_circle.png'
import login from '../../../../Assets/images/icons/login.png'
import topology1 from '../../../../Assets/images/icons/topo1.png'
import ArrowRight from '../../../../Assets/images/icons/arrowRight.png'
import ArrowDown from '../../../../Assets/images/icons/down_arrow_white.png'
import { useNavigate } from "react-router-dom";

const Cards = (color) => {
    const { backgroundColor, darkColor, imgIndex, cardData} = color;
    const cardName = ["Total Registered users", "Total number of reviews / feedback", "Total number of Give Thanks Profiles", "Total Number of Get Thanks Profiles", "Total transactions made", 'Total Transaction Amount',"Total number of daily sign up,"]
    // const cardDets=[270,20,20,20,20,"$200","05"]
    const cardDets=[cardData]
    const iconArr = [user, heart, money_send, money_recieve, wallet, dollar_circle, login];
    const divStyle = {
        backgroundColor: backgroundColor,
    }
    const divStyleDark = {
        backgroundColor: darkColor
    }
    const navigate = useNavigate();
    const handleNavigation = (i) =>{
        console.log(i);
        switch(i){
            case 0: case 2: case 3: case 6: navigate("/dashboard/user_management"); break;
            case 1: navigate("/dashboard/review_management"); break;
            case 4: case 5: navigate("/dashboard/finance_management"); break;
            default: alert("some random issue on card click")
        }
    }

    return (
        <div className="w-[367px] h-[220px] rounded-r-xl rounded-t-xl rounded-l-xl flex-col justify-start items-start inline-flex bg-cover bg-center" style={divStyle}>
            <img src={topology1} alt="" className="relative" />
            <div className="relative -top-[215px] flex-col justify-start items-start gap-4 flex z-0 p-4">
                <div className="justify-start items-start inline-flex">
                    <div className="w-[52px] h-[52px] flex justify-center items-center rounded-full border border-white">
                        <img src={iconArr[imgIndex]} width={"28px"} height={"28px"} alt="" />
                    </div>
                    <div className="w-7 h-7 justify-center items-center flex">
                    </div>
                </div>
                
                <div className="relative flex flex-col">
                    <p className="text-white text-sm font-medium font-['Plus Jakarta Sans'] ">
                        {cardName[imgIndex]}
                    </p>
                    <p className="-mt-4 text-white text-[54px] font-extrabold font-['Plus Jakarta Sans']">
                        {/* {cardDets[imgIndex]} */}
                        {cardDets}
                    </p>
                </div>
                { imgIndex===1 &&
                    <div className="flex p-2 rounded-[6px] m-auto absolute top-5 left-[261px] w-[93px] h-9 gap-[26px] bg-[#5D1EE2]"> 
                        <div className='h-5 gap-[20px] flex m-auto justify-between' style={{ width: "inherit" }}>
                            <p className="w-1/2" style={{ fontFamily: "Inter", lineHeight: "20px", fontWeight: "500", textSize: "14px", padding: "0", color: "white" }}>Daily</p>
                            <div className="flex m-auto">
                            <img src={ArrowDown} alt="" className='w-[11.88px] h-[5.32px] ' />
                            </div>
                        </div>
                </div>}
                </div>

            <div className="w-[367px] relative -top-[211px] h-11 -mt-4 rounded-bl-xl rounded-br-xl" style={divStyleDark} onClick={()=> handleNavigation(imgIndex)}>
                <div className="flex flex-row p-3 items-center justify-between cursor-pointer">
                    <div className="text-white text-sm font-medium font-['Plus Jakarta Sans'] " >
                        View All
                    </div>
                    <div className="w-6 h-6 justify-center items-center flex">
                        <div className="w-6 h-6 relative">
                            <img src={ArrowRight} width={"24px"} height={"24px"} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;


