import React, { useState } from 'react'
import Trash from "../../../../Assets/images/icons/trash_white.png";
import { delAdmin } from '../../../API/manageAdminApi';
import GenericModal from '../../../GenericModal';
import DeleteAdminSuccess from './deleteSuccess';
import { toast } from "react-toastify";


const DeleteAdmin = ({isRole, setIsDeleted,tableData,setTableData,userId,setIsDelete, isDelete, setIsOpenModal, handleDelModal, }) => {
    const style = {
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        width: "343px",
    };

    const [isDel, setIsDel] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClose = () => {
        setIsOpenModal(false)
        // setIsDel(false)
        setIsDelete(false)
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
        setIsDeleted(true);
        // setIsDel(false)
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);

    };

    const handleClick = async() => {
        try {
            const res= await delAdmin({_id: userId})
            if(userId)
            console.log(res,"yesssdel");
            handleOpenModal();
            // onButtonClick(false);
            setIsDel(!isDel);
            setIsDelete(!isDel)
        //     if(isRole===1)
        //     toast.success("Admin deleted successfully")
        // else
            toast.success("Deleted successfully", {
                autoClose: 5000
            })

            // removeFromTable()
            
        } catch (error) {
            
        }
        setIsDelete(!isDelete)
    }
    return (
        <div sx={style} className='h-auto flex flex-col gap-5 font-semibold'>
            <div className="flex flex-col w-[343px] h-33 gap-6 m-auto ">
                <div className=" gap-5 m-auto w-[78px] h-[78px] rounded-full bg-[#D33939]">
                    <img src={Trash} alt="" className="m-auto relative top-[20px] w-[39.92px] h-[39.82px]" />
                </div>
                <div>
                    <p className='font-[Plus Jakarta Sans] font-bold text-5 text-center w-fit h-auto'>Are you sure you want to delete this {isRole === 1 ? "Admin" : "Sub Admin"} ?</p>
                <p className='font-[Plus Jakarta Sans] font-medium text-[#A1A0A3] text-5 text-center w-[343px] h-[30px]'>After this {isRole===1?"Admin":"Sub Admin"} is deleted, they won't be able to use the application. Are you sure you want to delete them?</p>
            </div>
            </div>
            <div className="flex gap-4 w-[162px] h-11 mt-12 m-auto">
                <button className='w-[116px] bg-[#EEEEEE] rounded-[6px] ' onClick={handleClose}> No,Cancel</button>
                <button className='w-[59px] bg-[#524CBB] rounded-[6px] text-white' onClick={handleClick}> Yes</button>
            </div>
            {/* {isDel && <GenericModal open={isModalOpen} handleClose={handleCloseModal} content={<DeleteAdminSuccess isRole={isRole}/>} isCross={true} width={"251px"} height={"154px"} />} */}
        </div>
    );
}

export default DeleteAdmin