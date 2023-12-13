import React,{useState} from 'react'
import Block from "../../../../Assets/images/icons/block_red.png"
import BlockSuccess from './blockSuccess';
import GenericModal from '../../../GenericModal';
import { blockAdmin } from '../../../API/authApi';
import API from '../../../API/urlConstants';
const UserBlock = ({setIsBlocked,setIsOpenModal,setIsBlockModal,isBlockModal}) => {
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
        setIsBlocked(true)
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsBlock(false)
        
    };
    console.log(isBlockModal);
    const handleClick = () => {
        handleOpenModal();
        // setIsBlockModal();
        // setIsDelete(false)

    }
    console.log(isBlockModal,"blockkkkk");
    // const handleClick = async () => {
    //     const data={
    //         isBlocked:!isBlock,
    //         userID: "65571d549a627ea3503736a3"
    //     }

    //     handleOpenModal();
    //     // setIsDelete(false)
    //     setIsBlock(!isBlock);
    //     const res= await blockAdmin(data);
    //     // localStorage.getItem(API.AUTH_TOKEN)
    //    // console.log(a,"ghhhh");
    //     if(res )
         
    //     console.log(res,"admin bloocking");
    // else
    // console.log(res,"erriiiii");
    // }


    const handleClose = () => {
        setIsOpenModal(false)
        setIsBlockModal(false)
    };
    return (
        <div sx={style} className='h-auto flex flex-col gap-5 font-semibold'>
            <div className="flex flex-col w-[343px] h-33 gap-6 m-auto ">
                <div className=" gap-5 m-auto w-[78px] h-[78px] rounded-full bg-[#FFF1F1]">
                    <img src={Block} alt="" className="m-auto relative top-[20px] w-[39.92px] h-[39.82px]" />
                </div>
                <p className='font-[Plus Jakarta Sans] font-bold text-5 text-center w-[343px] h-[30px]'>Are you sure you want to block?</p>
                <p className='font-[Plus Jakarta Sans] font-medium text-[#A1A0A3] text-5 text-center w-[343px] h-[30px]'>Are you certain you want to prevent access to the Application for this user by blocking them?</p>
            </div>
            {/* <div className="flex gap-4 w-[162px] h-11 bg-red-200 m-auto">
                <button className='w-[87px] bg-blue-200'> No, Cancel</button>
                <button className='w-[59px] bg-slate-700' onClick={handleClick}> Yes</button>
            </div> */}
            <div className="flex gap-4 w-[162px] h-11 mt-10 m-auto">
                <button className='w-[87px] bg-[#EEEEEE] rounded-[6px] ' onClick={handleClose} > Cancel</button>
                <button className='w-[59px] bg-[#524CBB] rounded-[6px] text-white' onClick={handleClick}> Yes</button>
            </div>
            {isBlock && <GenericModal open={isModalOpen} handleClose={handleCloseModal} content={<BlockSuccess />} isCross={true} width={"251px"} height={"154px"} />}
        </div>
    );
}

export default UserBlock