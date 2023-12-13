import React, { useState,useEffect } from 'react'
import Modal from '@mui/material/Modal';
// import { listUserData} from '../../../API/userManagementApi';

const style = {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    width: "343px",
};

const UserView
 = ({userId}) => {
    // const [open, setOpen] = React.useState(true);
    // const handleClose = () => setOpen(false);

    // const [userData, setUserData] = useState();
    //     const fetchUserData = async () => {
    //         try {
    //             const response = await listUserData(userId);
    //             console.log(response, "responseeee");
    //             setUserData(response?.data?.data[0]);
                
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     useEffect(() => {
    //         fetchUserData();
    //     }, [userId]);

    return (
        <div sx={style} className='h-48 w-[545px] flex flex-col gap-6 font-semibold'>
            <div className="flex h-1/3  gap-9 w-full">
                <div className="flex flex-col w-[260.5px] h-12  gap-1">
                    <p className=" w-fit h-6 text-black text-4 font-semibold" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>User Name</p>
                    <p className=" w-[80px] h-5 text-[#888888] text-[14px] font-medium" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Emma Smith</p>
                    </div>
                <div className="flex flex-col w-[260.5px] h-12  gap-1">
                    <p className=" w-fit h-6 text-black text-4 font-semibold" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Date of registration </p>
                    <p className=" w-[86px] h-5 text-[#888888] text-[14px] font-medium" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>17 Oct, 2020</p>
                </div>
            </div>

            <div className="flex h-1/3  gap-9 w-full">
                <div className="flex flex-col w-[260.5px] h-12  gap-1">
                    <p className=" w-fit h-6 text-black text-4 font-semibold" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Email Address</p>
                    <p className=" w-fit h-5 text-[#888888] text-[14px] font-medium" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Dulcegeidt@Gmail.com</p>
                </div>
                <div className="flex flex-col w-[260.5px] h-12  gap-1">
                    <p className=" w-fit h-6 text-black text-4 font-semibold" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Contact Number</p>
                    <p className=" w-fit h-5 text-[#888888] text-[14px] font-medium" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>(303) 555-0105</p>
                </div>
            </div>

            <div className="flex h-1/3  gap-9 w-full">
                <div className="flex flex-col w-[260.5px] h-12  gap-1">
                    <p className=" w-fit h-6 text-black text-4 font-semibold" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Total Reviews Given</p>
                    <p className=" w-[80px] h-5 text-[#888888] text-[14px] font-medium" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>50</p>
                </div>
                <div className="flex flex-col w-[260.5px] h-12  gap-1">
                    <p className=" w-fit h-6 text-black text-4 font-semibold" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Total  tips given</p>
                    <p className=" w-[86px] h-5 text-[#888888] text-[14px] font-medium" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>$2000.00</p>
                </div>
            </div>
        </div>
    );
}

export default UserView

