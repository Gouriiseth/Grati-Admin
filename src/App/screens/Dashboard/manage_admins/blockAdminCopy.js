import React, { useState } from 'react'
import Block from "../../../../Assets/images/icons/block_red.png"
import Unblock from "../../../../Assets/images/icons/unblock.png"
// import BlockSuccess from './blockSuccess';
import GenericModal from '../../../GenericModal';
import { blockAdmin } from '../../../API/manageAdminApi';
import API from '../../../API/urlConstants';
import BlockAdminSuccess from './blockSuccess';
import { toast } from "react-toastify";

const AdminBlock = ({yes,isRole,isBlocked, setIsBlocked, userId, setIsBlocking,isBlocking,setIsOpenModal}) => {
        const style = {
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            width: "343px",
        };

    const [isBlock, setIsBlock] = useState(false); //success modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    
console.log(isBlocked,"isblockeddd");

    const handleOpenModal = () => {
        setIsModalOpen(true);
        setIsBlocking(true); 
        setIsBlocked(true)
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        // setIsBlockModal(false);
    };


    const handleClick = async () => {
        // setIsYes(!isYes)
        setIsBlock((block) => !block);
        // setIsBlocked((block) => !block);
        // alert(isBlock);
        const data = {
            isBlocked: !yes, // Toggle the blocked state
            userId: userId,
        };

        try {
            const res = await blockAdmin(data);
            if(res){
            if (res.status === 200) {
                setIsBlock(!isBlock);
                handleOpenModal();
            }}
        } catch (error) {
            console.error("Error during API call:", error);
        }
        setIsBlocking(!isBlocking);
        if(isRole===1 && !yes)
        toast.success("Admin Blocked Successfully",{
    autoClose:5000})
    if(isRole===2 && !yes)
    toast.success("Sub Admin Blocked Successfully",{
    autoClose:5000})
        if(isRole===1 && yes)
        toast.success("Admin unblocked Successfully",{
    autoClose:5000})
    if(isRole===2 && yes)
    toast.success("Sub Admin unblocked Successfully",{
    autoClose:5000})
        // setIsBlock(true)
    };
    // console.log(isRole, block);
    console.log(yes);

    const handleClose = () => {
        setIsOpenModal(false);
        setIsBlocking(false);
    };

        return (
            <div sx={style} className='h-auto flex flex-col gap-5 font-semibold'>
                <div className="flex flex-col w-[343px] h-33 gap-6 m-auto ">
                    

                     { !isBlocked && !yes?
                     <div className=" gap-5 m-auto w-[78px] h-[78px] rounded-full bg-[#FFF1F1]"> <img src={Block} alt="" className="m-auto relative top-[20px] w-[39.92px] h-[39.82px]" />
                     </div>
                     :
                        <div className=" gap-5 m-auto w-[78px] h-[78px] rounded-full bg-[#E1FFD7]"><img src={Unblock} alt="" className="m-auto relative top-[20px] w-[39.92px] h-[39.82px]" /> </div>}
                        <div>
                    <p className='font-[Plus Jakarta Sans] font-bold text-5 text-center w-[343px] h-[30px]'>Are you sure you want to  {        !isBlocked && !yes ?"block": "unblock"} </p>
                        

                    {!isBlocked && !yes ? <p className='font-[Plus Jakarta Sans] font-medium text-[#A1A0A3] text-5 text-center w-[343px] h-[30px]'>Are you certain you want to prevent access to the Application for this {isRole === 1 ? "Admin" : "Sub Admin"} by blocking them?</p> : <p className='font-[Plus Jakarta Sans] font-medium text-[#A1A0A3] text-5 text-center w-[343px] h-[30px]'>Are you certain you want to provide access to the Application for this {isRole === 1 ? "Admin" : "Sub Admin"} by unblocking them?</p>}
                </div>
                </div>
                <div className="flex gap-4 w-[162px] h-11 mt-12 m-auto">
                    <button className='w-[87px] bg-[#EEEEEE] rounded-[6px] ' onClick={handleClose} > Cancel</button>
                    <button className='w-[59px] bg-[#524CBB] rounded-[6px] text-white' onClick={()=>handleClick()}> Yes</button>
                </div>
                {/* {isBlock && <GenericModal open={isModalOpen} handleClose={handleCloseModal} content={<BlockAdminSuccess isRole={isRole}/>} isCross={true} width={"251px"} height={"154px"} />} */}
            </div>
        );
};

export default AdminBlock;
