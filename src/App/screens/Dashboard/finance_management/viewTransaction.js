import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
// import { Paper } from '@mui/material';
// import cross_icon from '../../../../Assets/images/icons/cross_icon.png'
// import Block from '../../../Assets/images/icons/block_red.png'
// import "./logout.css"
const style = {
    position: 'absolute',
    // top: '50%',
    // left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    width: "343px",
    // bgcolor:"background.red"
};

const ViewTransaction
    = () => {
        // const [open, setOpen] = React.useState(true);
        // const handleClose = () => setOpen(false);
        return (
            <div sx={style} className='h-[456px] w-[566px] flex flex-col gap-6 font-semibold'>
                <div className="flex w-[545px] gap-9 h-12">
                    <div className="flex flex-col w-[260.5px] h-12  gap-1">
                        <p className=" w-fit h-6 text-black text-4 font-semibold" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Transaction ID</p>
                        <p className=" w-[80px] h-5 text-[#888888] text-[14px] font-medium" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>#112212</p>
                    </div>
                    <div className="flex flex-col w-[260.5px] h-12  gap-1">
                        <p className=" w-fit h-6 text-black text-4 font-semibold" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Transaction Date</p>
                        <p className=" w-[86px] h-5 text-[#888888] text-[14px] font-medium" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>17 Oct, 2020</p>
                    </div>
                </div>

                <div className="flex w-[545px] gap-9 h-12">
                    <div className="flex flex-col w-[260.5px] h-12  gap-1">
                        <p className=" w-fit h-6 text-black text-4 font-semibold" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Mode of Transaction</p>
                        <p className=" w-fit h-5 text-[#888888] text-[14px] font-medium" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Wallet</p>
                    </div>
                    <div className="flex flex-col w-[260.5px] h-12  gap-1">
                        <p className=" w-fit h-6 text-black text-4 font-semibold" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Payee’s Name</p>
                        <p className=" w-fit h-5 text-[#888888] text-[14px] font-medium" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Jawwad Hossain</p>
                    </div>
                </div>

                <div className="flex w-[545px] gap-9 h-12">
                    <div className="flex flex-col w-[260.5px] h-12  gap-1">
                        <p className=" w-fit h-6 text-black text-4 font-semibold" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Get Thanks's Name</p>
                        <p className=" w-fit h-5 text-[#888888] text-[14px] font-medium" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Pete Turner (Individual)</p>
                    </div>
                    <div className="flex flex-col w-[260.5px] h-12  gap-1">
                        <p className=" w-fit h-6 text-black text-4 font-semibold" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Total tips given</p>
                        <p className=" w-[86px] h-5 text-[#888888] text-[14px] font-medium" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>$25</p>
                    </div>
                </div>
                    <p className="w-fit h-6 text-[#000000] text-[16px] font-semibold" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Transaction Details</p>

                <div className="flex h-6 w-[542px] gap-9 justify-between">
                    <p className="w-fit h-6 text-[#000000] text-4 font-semibold" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Amount Sent</p>
                    <p className="w-7 h-5 text-[#888888] text-[14px] font-medium" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>$20</p>
                </div>
                
                <div className="flex h-6 w-[542px]   gap-9 justify-between">
                    <p className="w-fit h-6 text-[#888888] text-4 font-semibold" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Other Fees</p>
                    <p className="w-7 h-5 text-[#888888] text-[14px] font-medium" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>+$3</p>
                </div>

                <div className="flex h-6 w-[542px]   gap-9 justify-between">
                    <p className="w-fit h-6 text-[#888888] text-4 font-semibold" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Grati Fees</p>
                    <p className="w-7 h-5 text-[#888888] text-[14px] font-medium" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>+$2</p>
                </div>

                <div className="flex h-12 w-[566px] p-3 gap-9 bg-[#EEEEEE]">
                    <div className="flex justify-between w-[542px] h-6">
                    <p className="w-fit h-6 text-[#888888] text-4 font-semibold" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Total Amount</p>
                    <p className="w-7 h-5 text-[#888888] text-[14px] font-medium" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>$25</p>
                </div>
                </div>
            </div>
        );
    }

export default ViewTransaction

