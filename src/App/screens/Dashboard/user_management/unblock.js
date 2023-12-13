import React, { useState } from 'react'
import Unblock from "../../../../Assets/images/icons/unblock.png"
import UnBlockSuccess from './unBlockSuccess';
import GenericModal from '../../../GenericModal';
const UserUnblock = ({setIsOpenModal}) => {
    const style = {
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        width: "343px",
    };
    const [isBlock, setIsBlock] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);

    };
    const handleClick = () => {
        handleOpenModal();
        // setIsDelete(false)
        setIsBlock(!isBlock);
    }
    const handleClose = () => {
        setIsOpenModal(false)
    };
    return (
        <div sx={style} className='h-auto flex flex-col gap-5 font-semibold'>
            <div className="flex flex-col w-[343px] h-33 gap-6 m-auto ">
                <div className=" gap-5 m-auto w-[78px] h-[78px] rounded-full bg-[#E1FFD7]">
                    <img src={Unblock} alt="" className="m-auto relative top-[20px] w-[39.92px] h-[39.82px]" />
                </div>
                <p className='font-[Plus Jakarta Sans] font-bold text-5 text-center w-[343px] h-[30px]'>Are you sure you want to Unblock?</p>
                <p className='font-[Plus Jakarta Sans] font-medium text-[#A1A0A3] text-5 text-center w-[343px] h-[30px]'>Are you certain you want to unblock this user?</p>
            </div>
            <div className="flex gap-4 w-[162px] h-11 bg-red-200 m-auto">
                <button className='w-[87px] bg-blue-200' onClick={handleClose}> No, Cancel</button>
                <button className='w-[59px] bg-slate-700' onClick={handleClick}> Yes</button>
            </div>

            {isBlock && <GenericModal open={isModalOpen} handleClose={handleCloseModal} content={<UnBlockSuccess />} isCross={true} width={"251px"} height={"154px"} />}

        </div>
    );
}

export default UserUnblock