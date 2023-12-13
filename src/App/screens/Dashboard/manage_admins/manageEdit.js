import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
// import { Paper } from '@mui/material';
// import cross_icon from '../../../../Assets/images/icons/cross_icon.png'
// import Block from '../../../Assets/images/icons/block_red.png'
// import "./logout.css"
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import "./manageEdit.css";
import { editAdminDets, viewAdminDets } from "../../../API/manageAdminApi";
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
    margin:1,
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

const ManageEdit = ({userId,isOpenModal,setIsOpenModal,setIsEdit,isEdit}) => {
  console.log(userId, "userID")
  const [switchData, setSwitchData] = useState('');
  const [errors, setErrors] = useState({
    userName: '',
  });
  const [formData, setformData] = useState({
    fullName: "",
    email: "",
    role:"",
    permissions: {},

  });

  // const [isLimitedView, setIsLimitedView] = useState(formData.permissions.DASHBOARD?.limited);
  const [isLimitedView, setIsLimitedView] = useState(false);
  const [isFullView, setIsFullView] = useState(false);
  const [isUserFull, setIsUserFull] = useState(false);
  const [isUserView, setIsUserView] = useState(false);
  const [isLimitRev, setIsLimitRev] = useState(false);
  const [isFullRev, setIsFullRev] = useState(false);
  const [isSupport, setIsSupport] = useState(false);
  const [isSubAdmin, setIsSubAdmin] = useState(false);
  const [isFinance, setIsFinance] = useState(false);
  const [isFormData, setIsFormData] = useState({
    isLimitedView:false,
    isFullView:false,
    isLimitRev:false,
    isFullRev:false,
    isUserView:false,
    isUserFull:false,
    isSupport:false,
    isSubAdmin:false,
    isFinance:false
  });

  // const handleDashbord=()=>{
  //   setIsLimitedView(formData.permissions.DASHBOARD?.limited)
  // }

  const handleLimitedViewChange = () => {
    setIsLimitedView((prev) => !prev);
    // alert(isLimitedView);
    // console.log(isLimitedView);
    setformData((prevData) => ({
      ...prevData,
      ...prevData.permissions,
      permissions: {
        DASHBOARD: {
          limited: !prevData.permissions.limited,
          fullAccess: false
        }
      },
    }
    ));
    setIsFullView(false); // Turn off Full View when Limited View is turned on
  };
  // alert(isLimitedView);
  console.log(formData.permissions);

  const handleFullViewChange = () => {
    // setIsLimitedView(!isLimitedView)
    setIsFullView((prev) => !prev);
    setformData((prevData) => ({
      ...prevData,
      permissions: {
        ...prevData.permissions.DASHBOARD,
        DASHBOARD: {
          limited: false,
          fullAccess: !prevData.permissions.fullAccess,
        }
      },
    }));
    setIsLimitedView(false); // Turn off Limited View when Full View is turned on
  };
  const handleViewAccessChange = () => {
    setIsUserView((prev) => !prev);
    setformData((prevData) => ({
      ...prevData,
      ...prevData.permissions,
      permissions: {
        USER_MANAGEMENT: {
          limited: !prevData.permissions.limited,
          fullAccess: false
        }
      },
    }));
    setIsUserFull(false); // Turn off Limited View when Full View is turned on
  };
  const handleFullAccessChange = () => {
    setIsUserFull((prev) => !prev);
    setformData((prevData) => ({
      ...prevData,
      ...prevData.permissions,
      permissions: {
        USER_MANAGEMENT: {
          fullAccess: !prevData.permissions.fullAccess,
          limited: false
        }
      },
    }));
    setIsUserView(false); // Turn off Limited View when Full View is turned on
  };
  const handleFullRevChange = () => {
    setIsFullRev((prev) => !prev);
    setformData((prevData) => ({
      ...prevData,
      ...prevData.permissions,
      permissions: {
        REVIEW_AND_FEEDBACK: {
          fullAccess: false,
          limited: !prevData.permissions.limited
        }
      },
    }));
    setIsLimitRev(false); // Turn off Limited View when Full View is turned on
  };
  const handleLimitRevChange = () => {
    setIsLimitRev((prev) => !prev);
    setformData((prevData) => ({
      ...prevData,
      ...prevData.permissions,
      permissions: {
        REVIEW_AND_FEEDBACK: {
          limited: !prevData.permissions.limited,
          fullAccess: !prevData.permissions.fullAccess

        }
      },
    }));
    setIsFullRev(false); // Turn off Limited View when Full View is turned on
  };
  const handleSupport = () => {
    setIsSupport((prev) => !prev);
    setformData((prevData) => ({
      ...prevData,
      permissions: {
        ...prevData.permissions.SUPPORT,
        SUPPORT: !prevData.permissions.SUPPORT, // Toggle the limitedView property
      },
    }));
    // setIsSupport(false); // Turn off Limited View when Full View is turned on
  };
  const handleSubAdmin = () => {
    setIsSubAdmin((prev) => !prev);
    setformData((prevData) => ({
      ...prevData,
      ...prevData.permissions,
      permissions: {

        SUB_ADMIN_MANAGEMENT: !prevData.permissions.SUB_ADMIN_MANAGEMENT, // Toggle the limitedView property
      },
    }));
    // setIsSupport(false); // Turn off Limited View when Full View is turned on
  };
  const handleFinance = () => {
    setIsFinance((prev) => !prev);
    setformData((prevData) => ({
      ...prevData,
      ...prevData.permissions,
      permissions: {

        FINANCE: !prevData.permissions.FINANCE, // Toggle the limitedView property
      },
    }));
    // setIsSupport(false); // Turn off Limited View when Full View is turned on
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setformData((prevformData) => ({
      ...prevformData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
    
  };  
  const handleSwitchChange = () => {
    setIsLimitedView((prev) => !prev); // Toggle the switch state
    // setIsUserManage((prev) => !prev); // Toggle the switch state

    setformData((prevData) => ({
      ...prevData,
      permissions: {
        ...prevData.permissions,
        limitedView: !prevData.permissions.limitedView, // Toggle the limitedView property
        userManage: !prevData.permissions.userManage, // Toggle the limitedView property
      },
    }));
  };
  // const editformData = async () => {
  //   try {
  //     const response = await editAdminDets();
  //     console.log(response);
  //     setformData(response?.data?.data[0])
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   editformData();
  // }, []);
  const editformData = async () => {
    try {
      const response = await viewAdminDets(userId);
      console.log(response, "responseeee");
      setformData(response?.data?.data[0]);
      // setformData(userId);
      // console.log(userId);
      setSwitchData(formData?.permissions[0])
      // setformData(switchData)
      // console.log(response?.data?.data[0].permissions[0][0], "formData?.permissions[0][0]")
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    editformData(userId);
  }, [userId]);

  useEffect(()=>{
    if(formData.permissions[0]){
      setIsLimitedView(formData.permissions[0].DASHBOARD?.limited);
      setIsFullView(formData.permissions[0].DASHBOARD?.fullAccess);
      setIsLimitRev(formData.permissions[0].REVIEW_AND_FEEDBACK?.limited);
      setIsFullRev(formData.permissions[0].REVIEW_AND_FEEDBACK?.fullAccess);
      setIsUserView(formData.permissions[0].USER_MANAGEMENT?.limited);
      setIsUserFull(formData.permissions[0].USER_MANAGEMENT?.fullAccess);
      setIsSupport(formData.permissions[0].SUPPORT);
      setIsSubAdmin(formData.permissions[0].SUB_ADMIN_MANAGEMENT);
      setIsFinance(formData.permissions[0].FINANCE);
    }
  }, [formData])

  useEffect(() => {
    setIsFormData({
      isLimitedView: false,
      isFullView: false,
      isLimitRev: false,
      isFullRev: false,
      isUserView: false,
      isUserFull: false,
      isSupport: false,
      isSubAdmin: false,
      isFinance: false
    })
  }, [isLimitedView,isFullView,isUserFull,isUserView,isFullRev,isLimitRev,isSubAdmin,isSupport,isFinance]);
 
  console.log(formData.permissions[0]);
 
  const handleSave = async () => {
    try {
      const data = {
        permissionsObj:formData.permissions,
         role: formData?.role,
         _id:userId
      }
      console.log(data.permissionsObj,"permisssssssssssssssssss");
      const res = await editAdminDets(data);
      console.log(res);
      if(res){
        setformData(res?.data?.data[0])
        // toast.success("Edited Sccessfully")
      }
      console.log(res,"heyyy");
      console.log(formData?.permissions);
      // if (res) {
      //   if (res.status === 200) {
      //     console.log(res, "ressssssssssss");

      //   }
      // }

    } catch (error) {

    }
    setIsOpenModal(!isOpenModal)
  }


  console.log(formData?.role,"formData");

  const label = { inputProps: { 'aria-label': 'Switch demo' } };
 
  const handleClose = () => {
    setIsOpenModal(false)
    setIsEdit(false)
    // console.log("cfhjbn");
  };
  console.log(isEdit,"hheee");

  // const [open, setOpen] = React.useState(true);
  // const handleClose = () => setOpen(false);
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
              id="outlined-required"
              // label="Required"
              defaultValue=""
              name="fullName"
              value={formData?.fullName}
              onChange={handleInputChange}
              disabled
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
              id="outlined-required"
              // label="Required"
              placeholder="hello@gmail.com"
              name="email"
              value={formData?.email}
              onChange={handleInputChange}
              disabled
              className="w-[273px] h-11"
            />
          </div>
        </div>
        <div className="flex flex-col w-[570x] h-18 gap-1">
          <p
            className=" w-fit h-6 text-black text-4 font-semibold"
            style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
          >
            Admin Role
          </p>
          {/* <TextField
                            // required
                            id="outlined-required"
                            // label="Required"
                            // name='Sub-Admin'
                            className='w-[273px] h-11'
                        /> */}
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            // label="Age"
            name="role"
            value={formData?.role || 1}
            // onChange={handleChange}
             onChange={handleInputChange}

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
                  <div></div>
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
                    {/* <div><Switch checked={formData?.permissions[0]?.DASHBOARD?.limited} */}
                    <div><IOSSwitch checked={isLimitedView} onChange={handleLimitedViewChange} {...label} /></div>
                  </div>
                  <div className="h-5 flex justify-between">
                    <li
                      className="w-[96px] h-5 text-[#888888] text-[14px] font-medium"
                      style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                    >
                      Full View
                    </li>
                    <div><IOSSwitch checked={isFullView}
                      onChange={handleFullViewChange} {...label} /></div>
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
                    <div><IOSSwitch checked={isUserFull}
                      onChange={handleFullAccessChange} {...label} /></div>
                  </div>
                  <div className="h-5 flex justify-between">
                    <li
                      className="w-[96px] h-5 text-[#888888] text-[14px] font-medium"
                      style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                    >
                      View Access
                    </li>
                    <div><IOSSwitch checked={isUserView}
                      onChange={handleViewAccessChange} 
                      {...label} /></div>
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
                    <div><IOSSwitch checked={isLimitRev}
                      onChange={handleLimitRevChange} 
                      {...label} /></div>
                  </div>
                  <div className="h-5 flex justify-between">
                    <li
                      className="w-[96px] h-5 text-[#888888] text-[14px] font-medium"
                      style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                    >
                      Full View
                    </li>
                    <div><IOSSwitch checked={isFullRev}
                      onChange={handleFullRevChange} 
                      {...label} /></div>
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
                <div><IOSSwitch checked={isSupport}
                  onChange={handleSupport} 
                  {...label} /></div>
                </div>
                <div className="w-auto h-5 flex justify-between p-3">
                  <li
                    className="w-fit h-5 text-black text-[14px] font-medium"
                    style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                  >
                    Manage Sub-Admins
                  </li>
                <div><IOSSwitch checked={isSubAdmin}
                  onChange={handleSubAdmin} 
                   {...label} /></div>
                </div>
                <div className="w-auto h-5 flex justify-between p-3">
                  <li
                    className="w-fit h-5 text-black text-[14px] font-medium"
                    style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                  >
                    Finance Management
                  </li>
                <div><IOSSwitch checked={isFinance}
                  onChange={handleFinance} 
                   {...label} /></div>
              </div>
              {/* <li className='w-fit h-5 text-[#888888] text-[14px] font-medium' style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>User Management</li>
                            <li className='w-fit h-5 text-[#888888] text-[14px] font-medium' style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}>Review Management</li> */}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-[232px] h-[45px] flex gap-[12px] mt-[35px] m-auto">
              <button className="w-[110px] rounded-[6px] py-[10px] px-4 bg-[#EEEEEE] text-[#888888] text-4 font-bold"
                  style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }} onClick={handleClose}>Cancel</button>
              <button className="w-[110px] rounded-[6px] py-[10px] px-4 bg-[#524CBB] text-white text-4 font-bold"
                  style={{ fontFamily: "Plus Jakarta Sans,sans-serif"}}  onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default ManageEdit;
