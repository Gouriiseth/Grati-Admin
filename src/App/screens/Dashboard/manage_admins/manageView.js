import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal';
import API from '../../../API/urlConstants';
import { viewAdminDets } from '../../../API/manageAdminApi';
import "./manageEdit.css";
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

const ManageView
    = ({userId}) => {
        const [userData, setUserData] = useState();
        const fetchUserData = async () => {
            try {
                const response = await viewAdminDets(userId);
                console.log(response, "responseeee");
                setUserData(response?.data?.data[0]);
                
            } catch (error) {
                console.error(error);
            }
        };

        useEffect(() => {
            fetchUserData();
        }, [userId]);
        const getRoleLabel = (role) => {
            switch (role) {
                case 1:
                    return 'Admin';
                case 2:
                    return 'Sub-Admin';
                default:
                    return 'Unknown Role';
            }
        };
        console.log(userData);
        return (
            <div sx={style} className='h-fit w-[545px] flex flex-col gap-6 font-semibold'>
            {/* <div sx={style} className='h-[27/1px] w-[545px] flex flex-col gap-6 font-semibold'> */}
                <div className="card flex w-[545px] gap-9 h-12">
                    <div className="flex flex-col w-[260.5px] h-12  gap-1">
                        <p className=" w-fit h-6 text-black text-4 font-semibold" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>User Name</p>
                        <p className=" w-109px] h-5 text-[#888888] text-[14px] font-medium" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>{userData?.fullName}</p>
                    </div>
                    <div className="flex flex-col w-[260.5px] h-12  gap-1">
                        <p className=" w-fit h-6 text-black text-4 font-semibold" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Email Address</p>
                        <p className=" w-[86px] h-5 text-[#888888] text-[14px] font-medium" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>{userData?.email}</p>
                    </div>
                </div>

                <div className="flex w-[260.5px] gap-1 h-12">
                    <div className="flex flex-col w-[260.5px] h-12  gap-1">
                        <p className=" w-fit h-6 text-black text-4 font-semibold" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Role</p>
                        <p className=" w-fit h-5 text-[#888888] text-[14px] font-medium" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>{getRoleLabel(userData?.role)}</p>
                    </div>
                </div>

                <div className="flex w-max gap-6 h-fit">
                {/* <div className="flex w-max gap-6 h-[127px]"> */}
                    {/* <div className="flex flex-col w-[260.5px] h-[127px] gap-[11px]"> */}
                    <div className="flex flex-col w-[260.5px] h-fit gap-[11px]">
                        <p className=" w-fit h-6 text-black text-4 font-semibold" style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Range of Access</p>
                        {/* <div className="w-max card h-[92px] pr-3" > */}
                        <div className="w-max card h-fit max-h-[91px] pr-3" >
                            <ul className="flex flex-col gap-4 list-disc pl-6">
                                    {userData?.permissions[0]?.DASHBOARD?.limited &&
                            <li className='w-max h-5 text-[#888888] text-[14px] font-medium' style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Dashboard (Limited Access)</li>
                                    }
                                    {userData?.permissions[0]?.DASHBOARD?.fullAccess &&
                            <li className='w-max h-5 text-[#888888] text-[14px] font-medium' style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Dashboard (Full Access)</li>
                                    }
                                    {userData?.permissions[0]?.USER_MANAGEMENT?.limited &&
                            <li className='w-max h-5 text-[#888888] text-[14px] font-medium' style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>User Management (Limited Access)</li>
                                    }
                                    {userData?.permissions[0]?.USER_MANAGEMENT?.fullAccess &&
                            <li className='w-max h-5 text-[#888888] text-[14px] font-medium' style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>User Management (Full Access)</li>
                                    }
                                    {userData?.permissions[0]?.REVIEW_AND_FEEDBACK?.limited &&
                            <li className='w-max h-5 text-[#888888] text-[14px] font-medium' style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Review Management (Limited Access)</li>
                                    }
                                    {userData?.permissions[0]?.REVIEW_AND_FEEDBACK?.fullAccess &&
                            <li className='w-max h-5 text-[#888888] text-[14px] font-medium' style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Review Management (Full Access)</li>
                                    }
                                    {userData?.permissions[0]?.SUPPORT &&
                            <li className='w-max h-5 text-[#888888] text-[14px] font-medium' style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Grati Support</li>
                                    }
                                {userData?.permissions[0]?.SUB_ADMIN_MANAGEMENT &&
                            <li className='w-max h-5 text-[#888888] text-[14px] font-medium' style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Sub Admin</li>
                                    }
                                    {userData?.permissions[0]?.FINANCE &&
                            <li className='w-max h-5 text-[#888888] text-[14px] font-medium' style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Finance Management</li>
                                    }
                       </ul>
                    </div>
                    </div>
                </div>
                    
            </div>
        );
    }

export default ManageView

