import React from 'react'
import Trash from "../../../../Assets/images/icons/trash.png"
const DeleteQuery = () => {
    const style = {
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        width: "343px",
    };
    return (
        <div sx={style} className='h-auto flex flex-col gap-5 font-semibold'>
            <div className="flex flex-col w-[343px] h-33 gap-6 m-auto ">
                <div className=" gap-5 m-auto w-[78px] h-[78px] rounded-full bg-[#D33939]">
                    <img src={Trash} alt="" className="m-auto relative top-[20px] w-[39.92px] h-[39.82px]" />
                </div>
                <p className='font-[Plus Jakarta Sans] font-bold text-5 text-center w-[343px] h-[30px]'>Are you sure you want to close this Query?</p>
                <p className='font-[Plus Jakarta Sans] font-medium text-[#A1A0A3] text-5 text-center w-[343px] h-[30px]'>Make sure this inquiry is answered before you decide to close it.</p>
            </div>
            <div className="flex gap-4 w-[162px] h-11 bg-red-200 m-auto">
                <button className='w-[87px] bg-blue-200'> No, Cancel</button>
                <button className='w-[59px] bg-slate-700'> Yes</button>
            </div>
        </div>
    );
}

export default DeleteQuery