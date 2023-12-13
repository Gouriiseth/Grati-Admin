import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import "./manageEdit.css";
import { createSubAdmin } from "../../../API/manageAdminApi";
import API from "../../../API/urlConstants";
import { useDispatch, useSelector } from "react-redux";
import { subAdminActions, subAdmin } from "../../../redux/reducers/subAdmin";
import "./manage.css";
import { isPlainObject } from "@reduxjs/toolkit";
import { styled } from '@mui/material/styles';
 import { toast } from "react-toastify";


const style = {
  position: "absolute",
  // top: '50%',
  // left: '50%',
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: "343px",
  // bgcolor:"background.red"
};

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 26,
    height: 16,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 1,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 12,
        height: 12,
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));
const ManageAdd = ({ setIsAdded,setIsOpenModal, isOpenModal, setIsAdd, isAdd }) => {
  const dispatch = useDispatch();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const { subAdmin } = useSelector((state) => state.subAdmin);
  const [checked, setChecked] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    role: "",
    password: "",
      permissions: { DASHBOARD: {limited:false, fullAccess:false}, USER_MANAGEMENT: {limited:false,fullAccess:false}, REVIEW_AND_FEEDBACK: {limited:false,fullAccess:false}, FINANCE: false, SUPPORT: false, SUB_ADMIN_MANAGEMENT :false},
  });

  

  const [errors, setErrors] = useState({
    userName: "",
  });
  const [isLimitedView, setIsLimitedView] = useState(false);
  const [isFullView, setIsFullView] = useState(false);
  const [isUserFull, setIsUserFull] = useState(false);
  const [isUserView, setIsUserView] = useState(false);
  const [isLimitRev, setIsLimitRev] = useState(false);
  const [isFullRev, setIsFullRev] = useState(false);
  const [isSupport, setIsSupport] = useState(false);
  const [isSubAdmin, setIsSubAdmin] = useState(false);
  const [isFinance, setIsFinance] = useState(false);



  const handleLimitedViewChange = () => {
    setIsLimitedView((prev) => !prev);
      setFormData((prevData) => ({
          ...prevData,
          permissions: { 
              ...prevData?.permissions,
            DASHBOARD:{
              limited: !prevData?.permissions?.limited,
              fullAccess:false
          }},
      }));
    setIsFullView(false); // Turn off Full View when Limited View is turned on
  };

  const handleFullViewChange = () => {
    setIsFullView((prev) => !prev);
      setFormData((prevData) => ({
          ...prevData,
          permissions: {
              ...prevData?.permissions,
              DASHBOARD: {
                limited:false,
                  fullAccess: !prevData?.permissions?.fullAccess,
              }
          },
      }));
    setIsLimitedView(false); // Turn off Limited View when Full View is turned on
  };
  const handleViewAccessChange = () => {
    setIsUserView((prev) => !prev);
      setFormData((prevData) => ({
          ...prevData,
          permissions: {
              ...prevData?.permissions,
              USER_MANAGEMENT: {
                  limited: !prevData?.permissions?.limited,
                fullAccess:false
              }
          },
      }));
    setIsUserFull(false); // Turn off Limited View when Full View is turned on
  };
  const handleFullAccessChange = () => {
    setIsUserFull((prev) => !prev);
      setFormData((prevData) => ({
          ...prevData,
          permissions: {
              ...prevData?.permissions,
              USER_MANAGEMENT: {
                  fullAccess: !prevData?.permissions?.fullAccess, 
                  limited:false
              }
          },
      }));
    setIsUserView(false); // Turn off Limited View when Full View is turned on
  };
  const handleFullRevChange = () => {
    setIsFullRev((prev) => !prev);
      setFormData((prevData) => ({
          ...prevData,
          permissions: {
              ...prevData?.permissions,
              REVIEW_AND_FEEDBACK: {
                  fullAccess: !prevData?.permissions?.fullAccess,
                  limited:false
              }
          },
      }));
    setIsLimitRev(false); // Turn off Limited View when Full View is turned on
  };
  const handleLimitRevChange = () => {
    setIsLimitRev((prev) => !prev);
      setFormData((prevData) => ({
          ...prevData,
          permissions: {
              ...prevData?.permissions,
              REVIEW_AND_FEEDBACK: {
                  limited: !prevData?.permissions?.limited, 
                  fullAccess:false

              }
          },
      }));
    setIsFullRev(false); // Turn off Limited View when Full View is turned on
  };
  const handleSupport = () => {
    setIsSupport((prev) => !prev);
      setFormData((prevData) => ({
          ...prevData,
          permissions: {
              
                  ...prevData?.permissions,
                  SUPPORT: !prevData?.permissions?.SUPPORT, // Toggle the limitedView property
          },
      }));
    // setIsSupport(false); // Turn off Limited View when Full View is turned on
  };
  const handleSubAdmin= () => {
    setIsSubAdmin((prev) => !prev);
      setFormData((prevData) => ({
          ...prevData,
          permissions: {
              
                  ...prevData.permissions,
                  SUB_ADMIN_MANAGEMENT: !prevData?.permissions?.SUB_ADMIN_MANAGEMENT, // Toggle the limitedView property
          },
      }));
    // setIsSupport(false); // Turn off Limited View when Full View is turned on
  };
  const handleFinance= () => {
    setIsFinance((prev) => !prev);
      setFormData((prevData) => ({
          ...prevData,
          permissions: {
              
                  ...prevData.permissions,
                  FINANCE: !prevData?.permissions?.FINANCE, // Toggle the limitedView property
          },
      }));
    // setIsSupport(false); // Turn off Limited View when Full View is turned on
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // const label = { inputProps: { "aria-label": "Switch demo" } };

  const handleClose = () => {
    setIsOpenModal(false);
      // setIsAdded(true)

    setIsAdd(false);
  };


  const handleSave = async () => {
    try {
      const data = {
        fullName: formData?.userName,
        email: formData?.email,
        role: formData?.role,
        password: formData?.password,
        permissionsObj: formData?.permissions,
      };
      // console.log(roleValue);
      if (
          !formData?.userName &&
          formData?.email &&
        formData?.role &&
        formData?.password &&
        formData?.permissions
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          userName: "Username is required",
        //   userName: res.data.data.error
        }));
        return;
      }
     
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
          if (!emailPattern.test(formData?.email) &&
              formData?.userName &&
              formData?.role &&
              formData?.password &&
              formData?.permissions) {
        setErrors((prevErrors) => ({
          ...prevErrors,
        //   userName: "Username is required",
          email: "Invalid email format"
        }));
        return;
      }


      if (
        !formData?.email &&
        formData?.userName &&
        formData?.role &&
        formData?.password &&
        formData?.permissions
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email is required",
        }));
        return;
      }
        if (
            !formData?.password &&
            formData?.email &&
            formData?.role &&
            formData?.userName && formData?.permissions
        ) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: "Password is required",
            }));
            return;
        } 
        else {
            if (formData?.password && formData?.email &&
                formData?.role &&
                formData?.userName && formData?.permissions && !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(formData?.password)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Please include atleast one special character",
        }));
        return;
      }
            if (formData?.password && formData?.email &&
                formData?.role &&
                formData?.userName && formData?.permissions &&!/[A-Z]/.test(formData?.password)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: "Please include atleast one uppercase character",
            }));            return; // Exit the function
        }
            if (formData?.password && formData?.email &&
                formData?.role &&
                formData?.userName && formData?.permissions &&formData?.password.length < 8) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: "Password must be atleast 8 characters long",
            })); return; // Exit the function
        }
            if (formData?.password && formData?.email &&
                formData?.role &&
                formData?.userName && formData?.permissions &&formData?.password.length > 17) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: "Password can not be more than 16 characters",
            })); return; // Exit the function
        }
            if (formData?.password && formData?.email &&
                formData?.role &&
                formData?.userName && formData?.permissions &&!/[a-z]/.test(formData?.password)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: "Please include atleast one lowercase character",
            }));            return; // Exit the function
        }
    }
      if (
        !formData?.role &&
        formData?.userName &&
        formData?.email &&
        formData?.password && formData?.permissions[0]
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          role: "Role is required",
        }));
        return;
      }
    //   if (
    //     !formData?.permissions &&
    //     formData.userName &&
    //     formData.email &&
    //     formData.password && formData.role
    //   ) 
    //   {
    //     // setErrors((prevErrors) => ({
    //     //   ...prevErrors,
    //     //   role: "Role is required",
    //     // }));
    //       toast.error("Permissions is required")
    //     return;
    //   }
      
    //   if (
    //     !formData.permissions &&
    //     formData.email &&
    //     formData.role &&
    //     formData.userName && formData.password
    //   ) {
        //     setErrors((prevErrors) => ({
            //       ...prevErrors,
    //       password: "permussuosn is required",
    //     }));
    //     return;
    //   } 
      else {if(formData?.userName==='' || formData?.password==='' || formData?.email==='' || formData?.role==='' || formData?.permissions==='') {
        toast.error("All fields are required", {
          autoClose: 5000
        })
        return;
    }
          //  if (!formData?.permissions[0] &&
          //     formData?.userName &&
          //     formData?.email &&
          //     formData?.password && formData?.role){
          //     toast.error("Permissions are required")
          //     return;
          //     }
}
    const res = await createSubAdmin(data);
    if (res) {
      if (res?.status === 200) {   
        console.log(res, "ressssssssssss");
        if(formData?.role===1)
          toast?.success("Admin Created  successfully")
      if(formData?.role===2)
          toast?.success("Sub Admin Created  successfully")
      setIsOpenModal(!isOpenModal);
        //dispatch(subAdminActions.subAdmin(res.data.data))
        // dispatch(subAdminActions.subAdmin(res.data.data.email))
        // // dispatch(subAdminActions.subAdmin(res.data.data.role))
        // dispatch(subAdminActions.subAdmin(res.data.data.password))
      }
    }
         if (res?.status === 400) { // Email not found
          console.log(res?.err.response?.data?.message,"errrrrrrrrrrrrr");
           toast.error(res?.err.response?.data?.message, {
             autoClose: 5000
           })
          // setErrors((prevErrors) => ({
          //     ...prevErrors,
          //     email: res.err.response.data.message,
          //   }));       
           }  
    } catch (error) { console.error("API request error:", error); }
    setIsAdded(true)
    // setIsOpenModal(!isOpenModal);
  };
  return (
    <div>
      <div
        sx={style}
        className="card h-[570px] w-[570px] flex flex-col gap-6 font-semibold"
      >
        <div className=" flex w-[570px] h-auto gap-6">
          <div className="flex flex-col w-[273px] h-18  gap-[6px]">
            <p
              className=" w-fit h-6 text-black text-4 font-semibold"
              style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
            >
              User Name
            </p>
            <TextField
              // required
              // id="outlined-required"
              // label="Required"
              defaultValue=""
              placeholder="Enter Name"
              name="userName"
              value={formData?.userName}
              onChange={handleInputChange}
              error={Boolean(errors?.userName)}
              helperText={errors?.userName}
              className="w-[273px] h-11"
            />
          </div>
          <div className="flex flex-col w-[260.5px] h-18  gap-1">
            <p
              className=" w-fit h-6 text-black text-4 font-semibold"
              style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
            >
              Email Address
            </p>
            <TextField
              // required
              // id="outlined-required"
              // label="Required"
              placeholder="Enter Email Address "
              name="email"
              type="email"
              value={formData?.email}
              onChange={handleInputChange}
              className="w-[273px] h-11"
              error={Boolean(errors?.email)}
              helperText={errors?.email}
            />
          </div>
        </div>
        <div className=" flex w-[570px] h-auto gap-6 mt-2">
          <div className="flex flex-col w-[570x] h-18 gap-1">
            <p
              className=" w-fit h-6 text-black text-4 font-semibold"
              style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
            >
              Admin Role
            </p>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData?.role}
              name="role"
              displayEmpty
              placeholder="Select Role"
              onChange={handleInputChange}
              error={Boolean(errors?.role)}
              helperText={errors?.role}
              className="w-[273px] h-18"
            >
                          
              <MenuItem style={{'&:hover': {
                            backgroundColor: '#EEEEEE',
                        },}} value={1}>Admin</MenuItem>
              <MenuItem style={{'&:hover': {
                            backgroundColor: '#EEEEEE',
                        },}} value={2}>Sub-Admin</MenuItem>
            </Select>
          </div>
          <div className="flex flex-col w-[260.5px] h-18  gap-1">
            <p
              className=" w-fit h-6 text-black text-4 font-semibold"
              style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
            >
              Password
            </p>
            <TextField
              // required
            //   id="outlined-required"
              // label="Required"
              placeholder="Create Password"
              type="password"
              name="password"
              value={formData?.password}
              onChange={handleInputChange}
              error={Boolean(errors?.password)}
              helperText={errors?.password}
              autoComplete="new-password"
              className="w-[273px] h-11"
            />
          </div>
        </div>
        <div className=" flex w-[570px] flex-col gap-[11px] h-[345px]">
          {/* <div className="flex w-[570px] flex-col gap-[11px] max-h-[345px]" style={{ overflowY: "scroll", msScrollbarTrackColor:"transparent"}}> */}
          <p
            className="w-full h-6 font-semibold text-[18px]"
            style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
          >
            Range of Access
          </p>
          <div className="w-[570px] h-auto gap-4 pl-3">
            <ul className=" flex flex-col gap-4 list-disc pl-4">
              <div className="flex flex-col w-auto h-[120px] p-3 gap-3">
                <div className="w-auto h-5 flex justify-between">
                  <li
                    className="w-[96px] h-5 text-black text-[14px] font-medium"
                    style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                  >
                    Dashboard
                  </li>
                  {/* <div> <Switch checked={isDash}
                                        onChange={handleSwitchChange} {...label} /></div> */}
                </div>
                <hr className="w-[546px] h-1 bg-[#D9D9D9] self-end" />
                <ul className="flex flex-col gap-4 list-disc pl-4">
                  <div className="h-5 flex justify-between">
                    <li
                      className="w-[96px] h-5 text-[#888888] text-[14px] font-medium"
                      style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                    >
                      Limited View
                    </li>
                    <div>
                      {" "}
                      <IOSSwitch
                        checked={isLimitedView}
                        onChange={handleLimitedViewChange}
                      />
                    </div>
                  </div>
                  <div className="h-5 flex justify-between">
                    <li
                      className="w-[96px] h-5 text-[#888888] text-[14px] font-medium"
                      style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                    >
                      Full View
                    </li>
                    <div>
                      {" "}
                      <IOSSwitch
                        checked={isFullView}
                        onChange={handleFullViewChange}
                      />
                    </div>
                  </div>
                </ul>
              </div>
              <div className="flex flex-col w-auto h-[120px] p-3 gap-3">
                <div className="w-auto h-5 flex justify-between">
                  <li
                    className="w-fit h-5 text-black text-[14px] font-medium"
                    style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                  >
                    User Management
                  </li>
                </div>
                <hr className="w-[546px] h-1 bg-[#D9D9D9] self-end" />
                <ul className="flex flex-col gap-4 list-disc pl-4">
                  <div className="h-5 flex justify-between">
                    <li
                      className="w-[96px] h-5 text-[#888888] text-[14px] font-medium"
                      style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                    >
                      Full Access
                    </li>
                    <div>
                                          <IOSSwitch
                                              checked={isUserFull}
                                              onChange={handleFullAccessChange}
                                          />
                    </div>
                  </div>
                  <div className="h-5 flex justify-between">
                    <li
                      className="w-[96px] h-5 text-[#888888] text-[14px] font-medium"
                      style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                    >
                      View Access
                    </li>
                    <div>
                                          <IOSSwitch
                                              checked={isUserView}
                                              onChange={handleViewAccessChange}
                                          />
                    </div>
                  </div>
                </ul>
              </div>
              <div className="flex flex-col w-auto h-[120px] p-3 gap-3">
                <div className="w-auto h-5 flex justify-between">
                  <li
                    className="w-fit h-5 text-black text-[14px] font-medium"
                    style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                  >
                    Review Management
                  </li>
                  <div>
                                      
                  </div>
                </div>
                <hr className="w-[546px] h-1 bg-[#D9D9D9] self-end" />
                <ul className="flex flex-col gap-4 list-disc pl-4">
                  <div className="h-5 flex justify-between">
                    <li
                      className="w-[96px] h-5 text-[#888888] text-[14px] font-medium"
                      style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                    >
                      Limited View
                    </li>
                    <div>
                                          <IOSSwitch
                                              checked={isLimitRev}
                                              onChange={handleLimitRevChange}
                                          />
                    </div>
                  </div>
                  <div className="h-5 flex justify-between">
                    <li
                      className="w-[96px] h-5 text-[#888888] text-[14px] font-medium"
                      style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                    >
                      Full View
                    </li>
                    <div>
                                          <IOSSwitch
                                              checked={isFullRev}
                                              onChange={handleFullRevChange}
                                          />
                    </div>
                  </div>
                </ul>
              </div>
              <div className="w-auto h-5 flex justify-between p-3">
                <li
                  className="w-fit h-5 text-black text-[14px] font-medium"
                  style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                >
                  Grati Support
                </li>
                <div>
                                  <IOSSwitch
                                      checked={isSupport}
                                      onChange={handleSupport}
                                  />
                </div>
              </div>
              <div className="w-auto h-5 flex justify-between p-3">
                <li
                  className="w-fit h-5 text-black text-[14px] font-medium"
                  style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                >
                  Manage Sub-Admins
                </li>
                <div>
                                  <IOSSwitch
                                      checked={isSubAdmin}
                                      onChange={handleSubAdmin}
                                  />
                </div>
              </div>
              <div className="w-auto h-5 flex justify-between p-3">
                <li
                  className="w-fit h-5 text-black text-[14px] font-medium"
                  style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                >
                  Finance Management
                </li>
                <div>
                                  <IOSSwitch
                                      checked={isFinance}
                                      onChange={handleFinance}
                                  />
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-[232px] h-[45px] flex gap-[12px] mt-[35px] m-auto">
        <button
          className="w-[110px] rounded-[6px] py-[10px] px-4 bg-[#EEEEEE] text-[#888888] text-4 font-bold"
          style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
          onClick={handleClose}
        >
          Cancel
        </button>
        <button
          className="w-[110px] rounded-[6px] py-[10px] px-4 bg-[#524CBB] text-white text-4 font-bold"
          style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ManageAdd;
