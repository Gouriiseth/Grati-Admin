import React, { useState } from 'react'
import Block from "../../../../Assets/images/icons/block_red.png"
// import BlockSuccess from './blockSuccess';
import GenericModal from '../../../GenericModal';
import { blockAdmin } from '../../../API/manageAdminApi';
import API from '../../../API/urlConstants';
import BlockAdminSuccess from './blockSuccess';

const AdminBlock = ({yes,isRole, tableData,isBlocked, setIsBlocked, userId, setIsBlocking,setIsOpenModal, setIsBlockModal, isBlockModal }) => {
        const style = {
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            width: "343px",
        };

    console.log("isBlocked => ",isBlocked);

    const [isBlock, setIsBlock] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [block,setBlock]=useState(isBlocked)
    
console.log(isBlocked,"isblockeddd");

    const handleOpenModal = () => {
        setIsModalOpen(true);
        setIsBlocking(true); 
        setIsBlocked(true)
        console.log(block,"before blocking");
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleClick = async () => {
        console.log("block => ", block);
        setBlock(!block)
        setIsBlocked(!block);
        
        // setBlock((block) => !block);
        // const data = {
        //     isBlocked: !block, 
        //     userId: userId,
        // };
        // alert(JSON.stringify(data))

        // try {
        //     const res = await blockAdmin(data);
        //     if(res){
        //     if (res.status === 200) {
        //         setBlock(!block); 
        //         setIsBlock(!isBlock);
        //         setIsBlocking(!isBlock);
        //         handleOpenModal();
        //     }}
        // } catch (error) {
        //     console.error("Error during API call:", error);
        // }
    };
    console.log(isRole, block);
    console.log("seIsBlocked insider => ", isBlocked);

    const handleClose = () => {
        setIsOpenModal(false);
        setIsBlocking(false);
    };

        return (
            <div sx={style} className='h-auto flex flex-col gap-5 font-semibold'>
                <div className="flex flex-col w-[343px] h-33 gap-6 m-auto ">
                    <div className=" gap-5 m-auto w-[78px] h-[78px] rounded-full bg-[#FFF1F1]">
                        <img src={Block} alt="" className="m-auto relative top-[20px] w-[39.92px] h-[39.82px]" />
                    </div>
    {        !isBlocked?        <p className='font-[Plus Jakarta Sans] font-bold text-5 text-center w-[343px] h-[30px]'>Are you sure you want to block?</p>
                        : <p className='font-[Plus Jakarta Sans] font-bold text-5 text-center w-[343px] h-[30px]'>Are you sure you want to unblock?</p>

    }                <p className='font-[Plus Jakarta Sans] font-medium text-[#A1A0A3] text-5 text-center w-[343px] h-[30px]'>Are you certain you want to prevent access to the Application for this {isRole===1 ?"Admin" : "Sub Admin"} by blocking them?</p>
                </div>
                <div className="flex gap-4 w-[162px] h-11 mt-10 m-auto">
                    <button className='w-[87px] bg-[#EEEEEE] rounded-[6px] ' onClick={handleClose} > Cancel</button>
                    <button className='w-[59px] bg-[#524CBB] rounded-[6px] text-white' onClick={()=> {handleClick(setBlock((block) => !block)); console.log("blocked hai ki ni => ",block);}}> Yes</button>
                </div>
                {isBlock && <GenericModal open={isModalOpen} handleClose={handleCloseModal} content={<BlockAdminSuccess isRole={isRole}/>} isCross={true} width={"251px"} height={"154px"} />}
            </div>
        );
};

export default AdminBlock;
