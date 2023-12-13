import React from 'react'
import Success from "../../../../Assets/images/icons/tick-circle.png"

const UnBlockSuccess = () => {
    const style = {
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        width: "343px",
    };
    return (
        <div sx={style} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1 rounded-[12px]">
            <img src={Success} alt="" className="m-auto w-[41px] h-[41px]" />
            <p className='font-[Plus Jakarta Sans] font-medium text-4 text-center'>User Unblocked Successfully</p>
        </div>
    );
}

export default UnBlockSuccess