import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
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

const ManageEdit = ({isRole,setIsEdited,userId,isOpenModal,setIsOpenModal,setIsEdit,isEdit}) => {
  // const [switchData, setSwitchData] = useState('');
  const [errors, setErrors] = useState({
    userName: '',
  });
  const [formData, setformData] = useState({
    fullName: "",
    email: "",
    role:"",
    permissions: {},

  });

  console.log(isRole,"isroeee");
  const [dashboardPermissions, setDashboardPermission] = useState({
    limited:false,
    fullAccess:false
  });

  const [userPermissions, setUserPermission] = useState({
    limited: false,
    fullAccess: false
  });

  const [reviewPermissions, setReviewPermission] = useState({
    limited: false,
    fullAccess: false
  });

  const [supportPermissions, setSupportPermissions] = useState(false);
  const [subAdminPermissions, setSubAdminPermissions] = useState(false);
  const [financePermissions, setFinancePermissions] = useState(false);

  const [permissionObject, setPermissionObject] = useState({
    DASHBOARD: dashboardPermissions,
    USER_MANAGEMENT: userPermissions,
    REVIEW_AND_FEEDBACK: reviewPermissions,
    SUPPORT: supportPermissions,
    SUB_ADMIN_MANAGEMENT: subAdminPermissions,
    FINANCE: financePermissions
  })


  const handleDashboardToggle = (toggleType) =>{
    if(toggleType){
      setDashboardPermission({...dashboardPermissions, limited:!dashboardPermissions?.limited,
      fullAccess:false});
    }
    else{
      setDashboardPermission({...dashboardPermissions, fullAccess:!dashboardPermissions?.fullAccess,
        limited: false
})
    }
  }

  const handleUserToggle = (toggleType) => {
    if (toggleType) {
      setUserPermission({ ...userPermissions, limited: !userPermissions?.limited,
        fullAccess: false });
    } else {  
      setUserPermission({ ...userPermissions, fullAccess: !userPermissions?.fullAccess,
      limited:false })
    }
  }

  const handleReviewToggle = (toggleType) => {
    if (toggleType) {
      setReviewPermission({ ...reviewPermissions, limited: !reviewPermissions?.limited ,
        fullAccess: false
});
    } else {
      setReviewPermission({ ...reviewPermissions, fullAccess: !reviewPermissions?.fullAccess,
      limited:false
      })
    }
  }

  const handleSupportToggle = (toggleType) => {
    if (toggleType) {
      setSupportPermissions(!supportPermissions );
    }
  }

  const handleSubAdminToggle = (toggleType) => {
    if (toggleType) {
      setSubAdminPermissions( !subAdminPermissions );
    }
  }

  const handleFinanceToggle = (toggleType) => {
    if (toggleType) {
      setFinancePermissions( !financePermissions );
    }
  }

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
  
  // let rolee;
  const editformData = async () => {
    try {
      const response = await viewAdminDets(userId);
        console.log("response",response);
      setPermissionObject(response?.data?.data[0]?.permissions[0]);
      setformData(response?.data?.data[0]);
    //  rolee=formData.role
      // setSwitchData(formData?.permissions[0])
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(rolee,"heyyyyyyyyyyy");

  useEffect(()=>{
    setDashboardPermission({ limited: permissionObject?.DASHBOARD?.limited, fullAccess: permissionObject?.DASHBOARD?.fullAccess });
    setUserPermission({ limited: permissionObject?.USER_MANAGEMENT?.limited, fullAccess: permissionObject?.USER_MANAGEMENT?.fullAccess });
    setReviewPermission({ limited: permissionObject?.REVIEW_AND_FEEDBACK?.limited, fullAccess: permissionObject?.REVIEW_AND_FEEDBACK?.fullAccess });
    setSupportPermissions(permissionObject?.SUPPORT );
    setSubAdminPermissions(permissionObject?.SUB_ADMIN_MANAGEMENT);
    setFinancePermissions(permissionObject?.FINANCE );

    // console.log(userPermissions?.fullAccess)
  },[permissionObject])

  useEffect(() => {
    editformData(userId);
  }, [userId]);

 
  const handleSave = async () => {
    // alert(JSON.stringify(dashboardPermissions))
    try {
      const data = {
        permissionsObj:{
          DASHBOARD:{
            limited:dashboardPermissions?.limited, 
            fullAccess: dashboardPermissions?.fullAccess
          },
          USER_MANAGEMENT: {
            limited: userPermissions?.limited,
            fullAccess: userPermissions?.fullAccess
          },
          REVIEW_AND_FEEDBACK: {
            limited: reviewPermissions?.limited,
            fullAccess: reviewPermissions?.fullAccess
          },
          SUPPORT : supportPermissions,
          SUB_ADMIN_MANAGEMENT:subAdminPermissions,
          FINANCE : financePermissions
      },
         role: formData?.role,
         _id:userId
      }
      const res = await editAdminDets(data);
      if(res){
        if(res.status===200){
        setformData(res?.data?.data[0])
        if(isRole===1)
          toast.success("Admin Edited Successfully", {
            autoClose: 5000
          })
        if(isRole===2)
          toast.success("Sub Admin Edited Successfully", {
            autoClose: 5000
          })
      }
      }
    } catch (error) {

    }
    setIsOpenModal(!isOpenModal)
    setIsEdited(true)
    
  }

  const label = { inputProps: { 'aria-label': 'Switch demo' } };
 
  const handleClose = () => {
    setIsOpenModal(false)
    setIsEdit(false)
    setIsEdited(true)

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
              id="outlined-required"
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
              id="outlined-required"
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
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="role"
            value={formData?.role || 1}
             onChange={handleInputChange}

            className="w-[273px] h-18"
          >
            <MenuItem style={{'&:hover': {
                            backgroundColor: '#EEEEEE',
                        },}} value={1}>Admin</MenuItem>
          <MenuItem style={{'&:hover': {
                            backgroundColor: '#EEEEEE',
            },
            }} value={2} disabled={isRole === 1}>Sub-Admin</MenuItem>
          </Select>
        </div>

        <div className=" flex w-[570px] flex-col gap-[11px] h-[345px]">
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
                    <div><IOSSwitch checked={dashboardPermissions?.limited} onChange={()=>handleDashboardToggle(true)} {...label} /></div>
                  </div>
                  <div className="h-5 flex justify-between">
                    <li
                      className="w-[96px] h-5 text-[#888888] text-[14px] font-medium"
                      style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                    >
                      Full View
                    </li>
                    <div><IOSSwitch checked={dashboardPermissions?.fullAccess}
                      onChange={()=>handleDashboardToggle(false)} {...label} /></div>
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
                      View Access
                    </li>
                    <div><IOSSwitch checked={userPermissions?.limited}
                      onChange={()=>handleUserToggle(true)} {...label} /></div>
                  </div>
                  <div className="h-5 flex justify-between">
                    <li
                      className="w-[96px] h-5 text-[#888888] text-[14px] font-medium"
                      style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                    >
                      Full Access
                    </li>
                    <div><IOSSwitch checked={userPermissions?.fullAccess}
                      onChange={()=>handleUserToggle(false)} 
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
                    <div><IOSSwitch checked={reviewPermissions?.limited}
                      onChange={()=>handleReviewToggle(true)} 
                      {...label} /></div>
                  </div>
                  <div className="h-5 flex justify-between">
                    <li
                      className="w-[96px] h-5 text-[#888888] text-[14px] font-medium"
                      style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                    >
                      Full View
                    </li>
                    <div><IOSSwitch checked={reviewPermissions?.fullAccess}
                      onChange={()=>handleReviewToggle(false)} 
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
                <div><IOSSwitch checked={supportPermissions}
                  onChange={()=>handleSupportToggle(true)} 
                  {...label} /></div>
                </div>
                <div className="w-auto h-5 flex justify-between p-3">
                  <li
                    className="w-fit h-5 text-black text-[14px] font-medium"
                    style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                  >
                    Manage Sub-Admins
                  </li>
                <div><IOSSwitch checked={subAdminPermissions}
                  onChange={()=>handleSubAdminToggle(true)} 
                   {...label} /></div>
                </div>
                <div className="w-auto h-5 flex justify-between p-3">
                  <li
                    className="w-fit h-5 text-black text-[14px] font-medium"
                    style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }}
                  >
                    Finance Management
                  </li>
                <div><IOSSwitch checked={financePermissions}
                  onChange={()=>handleFinanceToggle(true)} 
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
