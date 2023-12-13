import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import { Paper } from '@mui/material';
import cross_icon from '../../../../Assets/images/icons/cross_icon.png'
import lock from '../../../../Assets/images/icons/lock.png'
import "./profile_details.css"
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { resetPassword } from '../../../API/authApi';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

const Profile_details = () => {
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword:"",
        confirmPassword: "",
    });
// const currPass= sessionStorage.getItem("oldPassword")
    // const maskedPass = '*'.repeat(formData.password.length);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        // console.log(event.target);
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    let response;
    const handleLogin = async () => {
        console.log("inside");
        try {
            const data = {
                email: localStorage.getItem("email"),
                oldPassword: formData.oldPassword,
                password:formData.newPassword,
                confirmPassword: formData.confirmPassword,
            };
            console.log(data);
            if (data.oldPassword === '' && data.password === '' && data.confirmPassword === '') {
                toast.error("Password fields are required");
                return;
            }
            if (data.oldPassword === '') {
                toast.error("Current Password is required");
                return;}
            if (data.password === '') {
                toast.error("New Password is required");
                return;
            }
            if (data.confirmPassword === '') {
                toast.error("Confirm password is required");
                return;
            }

            // if (data.oldPassword!== sessionStorage.getItem("oldPassword")) {
            //     console.log(data.oldPassword, sessionStorage.getItem("oldPassword"))
            //     toast.error("Current password is wrong");
            //     return; 
            // }
            if (data.password.length<8) {
                toast.error("Password should be atleast than 8 characters ");
                return;} 
            if (data.password.length > 17) {
                toast.error("Password should not be more than 16 characters ");
                return; 
            }
            if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(data.password)) {
                toast.error("Password must contain at least one special character");
                return; 
            }
            if (!/[A-Z]/.test(data.password)) {
                toast.error("Password must contain at least one upperscase letter");
                return; 
            }
            if (!/[a-z]/.test(data.password)) {
                toast.error("Password must contain at least one lowercase letter");
                return; 
            }
            if (data.confirmPassword === data.oldPassword) {
                toast.error("New password should be different from the old password");
                return;
            }
            if (data.confirmPassword !== data.password) {
                toast.error("Passwords don't match");
                return;
            }
            response = await resetPassword(data)
            if (response) {
                if (response.status === 200) {
                    toast.success(response.data.message)
                    // sessionStorage.setItem("oldPassword",formData.confirmPassword)
                    // navigate("/");
                } else {
                    console.log(response);
                    if (formData.confirmPassword !== formData.password) {
                        toast.error(response.err.response.data.message)
                    }
                }
            } else {
                alert("Response is undefined.");
            }
        } 
        catch (error) {
            console.error("API request error:", error);
        }
    };
    const handleSubmit = (event) => {
        // event.preventDefault();
        handleLogin();
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];


        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }}
        console.log(image,"imageeee"); // if to be send in api for img url
    const [isExpanded, setIsExpanded] = useState(false);
    // const [file, setFile] = useState();
    // const handleChange=(e)=> {
    //     console.log(e.target.files);
    //     setFile(URL.createObjectURL(e.target.files[0]));
    // }
    return (
        <div sx={style} className='h-auto p-6 pr-12 flex flex-col gap-5 font-semibold'>
            {/* <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper sx={style} className='font-semibold w-1/3 h-auto p-6 flex flex-col gap-5'>
                    <div className=" flex flex-row justify-between items-center">
                        <p className="text-5">Profile Details</p>
                        <img src={cross_icon} alt="" className='cursor-pointer w-[14px] h-[14px]' onClick={handleClose}></img>
                    </div> */}
                    <div className="w-full h-[1px] bg-[#efefef]"></div>
            {/* <img src="" alt="" className="w-[135px] h-[135px] rounded-full bg-gray-400"/> */}
            <div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    id="imageInput"
                />
                <label htmlFor="imageInput">
                    <img
                        src={image || ''}
                        alt=""
                        className="w-[135px] h-[135px] rounded-full bg-gray-400"
                    />
                </label>
            </div>
                    <div className="w-full h-[1px] bg-[#efefef]"></div>
                    <div className="flex flex-col gap-8 w-3/4">
                        <div className="flex flex-row justify-between items-center">
                            <div className="">
                                <p className="text-4">Full Name</p>
                                <p className="text-[14px] text-grey-500 font-medium">{localStorage.getItem("fullName")}</p>
                            </div>
                            <div className="">
                                <p className="text-4">Email Address</p>
                                <p className="text-[14px] text-grey-500 font-medium">{localStorage.getItem("email")}</p>
                            </div>
                        </div>
                        {!isExpanded && (
                            <div className="flex flex-row justify-between items-center">
                                <div className="">
                                    <p className="text-4">Password</p>
                                    <p className="text-[14px] text-grey-500 font-medium">*****</p>
                                </div>
                                <button className="btn flex flex-row justify-center items-center gap-1" onClick={() => setIsExpanded(isExpanded => !isExpanded)}>
                                    <img src={lock} alt="" className="w-5 h-5" />
                                    <span className="text-[14px] font-medium">Update Password</span>
                                </button>
                            </div>
                        )}
                        {isExpanded && (
                            <>
                                <div className="flex flex-row justify-between items-center">
                                    <p className="text-4">Update Password</p>
                                    <button className="btn text-[14px] font-medium flex flex-row justify-center items-center gap-1" onClick={() => {setIsExpanded(isExpanded => !isExpanded);handleSubmit()}}>Save Password
                                    </button>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <div className="">
                                        <p className="">Current Password</p>
                                        <input
                                            type="password"
                                            id="currentPassword"
                                            name="oldPassword"
                                            className="border-[1px] border-[#C7C6C6] font-normal rounded-md p-[10px]"
                                            style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="">
                                        <p className="">New Password</p>
                                        <input
                                            type="password"
                                            id="newPassword"
                                            name="newPassword"
                                            className="border-[1px] border-[#C7C6C6] font-normal rounded-md p-[10px]"
                                            style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                                            placeholder="Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="">
                                        <p className="">Confirm New Password</p>
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            className="border-[1px] border-[#C7C6C6] font-normal rounded-md p-[10px]"
                                            style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                                            placeholder="Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                {/* </Paper>
            </Modal> */}
        </div>
    );
}

export default Profile_details
