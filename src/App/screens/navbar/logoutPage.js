import React, { useState } from 'react'
import Block from '../../../Assets/images/icons/block_red.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../redux/reducers/auth';

const LogoutPage = ({setIsModalOpen}) => {
    const style = {
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        width:"343px",
    };

    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const [isModalOpen, setIsModalOpen] = useState(false);


    const handleClose = () => {
        setIsModalOpen(false)
    };

    const handleClick=()=>{
        localStorage.clear();
        sessionStorage.clear();
        dispatch(authActions.logout());
        if(localStorage.getItem("token")==null)
            navigate("/");
    }
    return (
        <div sx={style} className='h-auto flex flex-col gap-5 font-semibold'>
            <div className="flex flex-col w-[343px] h-33 gap-6 m-auto ">
            <div className=" gap-5 m-auto w-[78px] h-[78px] rounded-full bg-[#FFF1F1]">
            <img src={Block} alt="" className="m-auto relative top-[20px] w-[39.92px] h-[39.82px]" />
            </div>
                <p className='font-[Plus Jakarta Sans] font-bold text-5 text-center w-[343px] h-[30px]'>Are you sure you want to logout?</p>
            </div>
            <div className="flex gap-4 w-[162px] h-11  m-auto">
                <button className='w-[87px] bg-[#EEEEEE] rounded-[6px] ' onClick={handleClose}> Cancel</button>
                <button className='w-[59px] bg-[#524CBB] rounded-[6px] text-white' onClick={handleClick}> Yes</button>
            </div>
        </div>
    );
}

export default LogoutPage
