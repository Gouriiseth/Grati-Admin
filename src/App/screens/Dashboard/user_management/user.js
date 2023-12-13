import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, MenuItem, Pagination, Select, Stack } from '@mui/material';
import Download from "../../../../Assets/images/icons/download.png";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '../../../../Assets/images/icons/search.png';
import ArrowDown from '../../../../Assets/images/icons/down_arrow.png';
import Eye from '../../../../Assets/images/icons/eye.png';
import Block from '../../../../Assets/images/icons/block.png';
import Unblock from '../../../../Assets/images/icons/unblock_grey.png';
import Trash from '../../../../Assets/images/icons/trash.png';
import GenericModal from '../../../GenericModal';
import UserView from './userView';
import Delete from './delete';
import UserBlock from './block';
import UserUnBlock from './unBlockSuccess';
import '../manage_admins/manageEdit.css'
// import API from "../../API/urlConstants";
import { blockAdmin } from "../../../API/authApi";
import { listUserData, dailyUserData } from '../../../API/userManagementApi';
import Moment from 'react-moment';
import Geocode from 'react-geocode';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  zIndex: "1"
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "30px",
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function UserManagement() {
  const [userId, setUserId] = useState("");
  const [userView, setUserView] = useState(false);
  const [isBlock, setIsBlock] = useState(false);
  const [isDel, setIsDel] = useState(false);
  const [isBlockModal, setIsBlockModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);

  let title = ["View Standard Details"]
  const tableHeading=["User Name","Date of registration","Email Address","Contact Number","Profile Type","Location","Mode","Action"]

  // const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [signUpFilter, setSignUpFilter] = useState(0);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);



  const handlePaginationLimitChange = (event) => {
    setLimit(event?.target?.value);
  };
  // const handleFilter = (event) => {
  //   setFilter(event?.target?.value);
  // };

  const handlePageChange = (event, page) => {
    console.log("page change", event);
    console.log("page change value", page);
    setPage(page);
  }

  const fetchUserData = async () => {
    try {
      const response = await listUserData(limit,(page));
      console.log(response?.data?.data);
      setTableData(response?.data?.data?.userManagementData);
      console.log(response?.data?.data?.userManagementData?.userManagementDataCount);
      setTotalCount(response?.data?.data?.userManagementDataCount)
      setSignUpFilter(0)
      setLatitude(0)
      setLongitude(0)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [limit,page]);

  console.log(latitude,longitude);
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setUserView(!userView);
    setIsBlockModal(!isBlockModal)
    setIsDel(!isDel)
  };
  console.log(isBlock); 

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUserView(false)
    setIsBlockModal(false)
    setIsDel(false)
  };

  const handleUserView = (id) => {
    handleOpenModal();
    setIsDel(false)
    setIsBlockModal(false)
    setUserId(id);
    console.log(userView,"rtyicj",isModalOpen)
  };
  
  const handleDelete=()=>{
    handleOpenModal();
    setIsDel(!isDel)
    setUserView(false)
    setIsBlockModal(false)
  }
  console.log("yhujkl",isDel);
  
  const handleBlock= ()=>{
    handleOpenModal()
    setIsBlockModal(!isBlockModal)
    setIsDel(false)
    setUserView(false)
  }

  const handleButtonClick = (newState) => {
    setIsDel(newState);
  };
  // const handleBlock= async ()=>{
  //   try 
  //   {handleOpenModal()
  //   setIsBlockModal(!isBlockModal)
  //   setIsDel(false)
  //   setUserView(false)
  //   const response = await blockAdmin(  )
  //   console.log("api called", response);
  // }
  //   catch (error) {
  //     console.error("API request error:", error);
  //   }
  // }

const handleClick=async()=>{
 const res= await dailyUserData(limit,(page))
 if (res){
  setTableData(res?.data?.data?.dailySignUpData)
  setTotalCount(res?.data?.data?.dailySignUpDataCount)
  setSignUpFilter(1)
 console.log(res)}
}

const handleLoc = async (coordinates) => {
  try {
    // const lat = coordinates[0];
    // const long = coordinates[1];
    // Geocode.setApiKey("AIzaSyA9VZeBppqdju0W4MeWXpwg6ZHx4mc1n_g");
    // const apiKey="AIzaSyAXAbpwwnRbXhBVbHowcQ-7TlREp0xq2pk";
    const lat= 72.01;
    const long =90.00;
    const apiKey="AIzaSyBDbyk5J6qSoY2ToI37WePpq2N26ZTbVPw"; //project key 
    const response = await Geocode.fromLatLng(`${lat}`, `${long}`);
    // const response =  fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${apiKey}`);

    if (response.status===200) {
      console.log(response,"hiiiiiiiiiiii")
      const address = response.results[0].formatted_address;
      // const data =  response.json();
      // Access the relevant information from the response data
      // if (response.display_name) {
      //   const address = response.display_name;
      //   console.log('Address:', address);
      //   console.log('Region:', response.address?.region);
      //   return address;
      // } else {
      //   console.error('No results found for reverse geocoding.');
      //   return 'Address not available';
      // }
    } 
    // else {
    //   console.error('Error in reverse geocoding. HTTP status:', response.status);
    //   return 'Address not available';
    // }
  } catch (error) {
    return 'Address not available';
  }
}; 

const limitOptions=[10,25,50,75,100]
  return (
    <Paper className=' h-[100%] max-h-[87vh] pb-6 p-6 flex flex-col gap-6' style={{ borderRadius: "12px" }} component={Paper}>

      <div className="flex justify-between" style={{ alignItems: "center", alignContent: "center" }}>

        <p className="text-[18px] font-[700] text-black" style={{ fontFamily: "Plus Jakarta Sans" }}>User Management</p>

        <div className="flex gap-3 h-11 font-[600] text-[14px]" style={{ fontFamily: "Plus Jakarta Sans" }}>
          <button type='button' className='flex flex-row justify-between items-center w-[174px] gap-1 rounded-[6px] py-[10px] px-4 bg-[#524CBB]'>
            <p className="font-bold text-white" style={{ fontFamily: "Plus Jakarta Sans,sans-serif", lineHeight: "24px", fontWeight: "500", textSize: "16px", padding: "0" }}>Download CSV</p>
            <img src={Download} alt="" className="flex justify-center items-center m-auto w-[18.32px] h-[18.32px]  " />
          </button>
          <div className='flex flex-row justify-between items-center w-[145px] rounded-[6px] gap-1 py-2 px-[14px] bg-[#EEEEEE]'>
            <p className='' style={{ fontFamily: "Inter", lineHeight: "20px", fontWeight: "500", textSize: "14px", padding: "0", color: "#888888" }}>All Type</p>
            <img src={ArrowDown} alt="" className='w-4 h-4' />
          </div>

           <Select
                        labelId="pagination-limit-select-label"
                        id="pagination-limit-select"
                        // value={}
                        value={signUpFilter || 0}
                        // placeholder='All'
                        displayEmpty
                        // onChange={handleFilter}
                        className='flex justify-between items-center w-[145px] rounded-[6px] gap-1 py-2 px-[14px] bg-[#EEEEEE]'
                        style={{
                            fontFamily: "Inter",
                            lineHeight: "20px",
                            fontWeight: "500",
                            textSize: "14px",
                            padding: "0",
                            color: "#888888",
                        }}
                    >
                        <MenuItem
                            style={{
                                "&:hover": {
                                    backgroundColor: "#EEEEEE",
                                },
                            }}
                            value={0}
                            onClick={fetchUserData}
                        >
                            All
                        </MenuItem>
                        <MenuItem
                            style={{
                                "&:hover": {
                                    backgroundColor: "#EEEEEE",
                                },
                            }}
                            onClick={()=>{handleClick();setSignUpFilter(0)}}
                            value={1}
                            
                        >
                           Daily SignUp 
                        </MenuItem>
                        </Select>
          {/* </div> */}
          <Search className="flex flex-row justify-between">
            <SearchIconWrapper>
              <img src={SearchIcon} alt="" className='w-[22px] h-[22px]' />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search User"
              inputProps={{ 'aria-label': 'search' }}
              className='flex w-[272px] rounded-[6px] gap-1 border-[1px] p-[10px] bg-[#EEEEEE]'
            />
          </Search>
        </div>
      </div>
      {/* aria-label="simple table h-[772px]" */}
      <TableContainer className='card w-auto overflow-auto'>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            .<TableRow className='w-[194px] h-11 p-3'>

              {tableHeading.map((heading)=>(<TableCell className='w-max h-11 p-3'><p className='w-max text-[14px] font-[600] text-[#888888]' style={{ fontFamily: "Plus Jakarta Sans" }}>{heading}</p></TableCell>))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.map((row) => ( */}
            {tableData?.map((row) => (
              <TableRow
              onLoad={()=>handleLoc(row?.userLocation?.coordinates[0],row?.userLocation?.coordinates[1])}
                key={row?._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className='w-[194px] h-13'>

                <TableCell component="th" scope="row" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px", fontWeight: "400"}} ><p>{row?.userName}</p></TableCell>

                <TableCell
                  style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px", fontWeight: "400" }}
                >
                  <Moment format="DD MMM, YYYY" withTitle>
                    {row?.createdAt}
                  </Moment>
                </TableCell>

                <TableCell align="left" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px", fontWeight: "400", maxWidth:"260px",overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", }}>{row?.email}</TableCell>

                <TableCell align="left" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px", fontWeight: "400" }} >{row?.mobileNumber }</TableCell>

                <TableCell align="left" style={{ fontFamily: "Plus Jakarta Sans",  fontSize: "14px", fontWeight: "400" }} >{row?.preference}</TableCell>

                <TableCell align="left" style={{ fontFamily: "Plus Jakarta Sans",  fontSize: "14px", fontWeight: "400",maxWidth: "169px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", width: "92%" }} >Location</TableCell>
                {/* <TableCell align="left" style={{ fontFamily: "Plus Jakarta Sans",  fontSize: "14px", fontWeight: "400",maxWidth: "169px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", width: "92%" }} >{handleLocation(row.userLocation.coordinates)}</TableCell> */}

                <TableCell align="left" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px", fontWeight: "400", }} >{row?.loginType}</TableCell>

                <TableCell align="left" style={{ }}>
                  <div className='flex justify-between'>
                    <div className='w-[36.8px] h-[36.8px] bg-[#EEEEEE] rounded-[5.02px] p-[10.04px]' 
                    onClick={()=>handleUserView(row?._id)}
                    >
                      <img src={Eye} alt="" className='w-5 h-5' />
                    </div>
                    <div className='w-[36.8px] h-[36.8px] bg-[#EEEEEE] rounded-[5.02px] p-[10.04px]' onClick={handleBlock}>
                      <img src={Block} alt="" className='w-5 h-5' />
                      {/* {!isBlock ? <img src={Block} alt="" className='w-5 h-5' /> : <img src={Unblock} alt="" className='w-5 h-5' />} */}
                    </div>
                    <div className='w-[36.8px] h-[36.8px] bg-[#EEEEEE] rounded-[5.02px] p-[10.04px]' onClick={handleDelete}>
                      <img src={Trash} alt="" className='w-5 h-5' />
                    </div>
                  </div>
                  {row.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {userView && 
      <GenericModal 
      open={isModalOpen} 
      title={title[0]} 
      handleClose={handleCloseModal} 
      content={<UserView />}
      isCross={true}
      width={"631px"} 
      height={"310px"} />
      }

      {isDel && <GenericModal open={isModalOpen} handleClose={handleCloseModal} content={<Delete onButtonClick={handleButtonClick} isDelete={isDel} setIsDelete={setIsDel} setIsOpenModal={setIsModalOpen} handleDelModal={handleCloseModal} />} isCross={true} width={"391px"} height={"328px"} />}

      {isBlockModal && 
      // ( !isBlock ?
      // <GenericModal open={isModalOpen} handleClose={handleCloseModal} content={<UserBlock setIsOpenModal={setIsModalOpen}/>} isCross={true} width={"391px"} height={"328px"} /> :
      // <GenericModal open={isModalOpen} handleClose={handleCloseModal} content={<UserUnBlock setIsOpenModal={setIsModalOpen}/>} isCross={true} width={"391px"} height={"328px"} />)
        <GenericModal open={isModalOpen} handleClose={handleCloseModal} content={<UserBlock setIsBlockModal={setIsBlockModal} isBlockModal={isBlockModal} setIsOpenModal={setIsModalOpen} />} isCross={true} width={"391px"} height={"328px"} />
    } 

      <div className="flex justify-between mt-auto">
        <Select
          labelId="pagination-limit-select-label"
          // id="pagination-limit-select"
          value={limit}
          // placeholder='All'
          onChange={handlePaginationLimitChange}
          className="w-[66px] h-11 bg-[#EEEEEE] "
          style={{
            color: "#888888",
            fontSize: "14px",
            fontWeight: "500",
            width: "fit-content"
          }}
        >
{limitOptions.map((options)=>(
<MenuItem style={{
              "&:hover": {
                backgroundColor: "#EEEEEE",
              },
            }}
             value={options}>
{options}
</MenuItem>
))}
       </Select>
       <Stack spacing={2} >
          <Pagination
            count={Math.ceil(totalCount / limit)}
            defaultPage={1}
            siblingCount={3}
            shape="rounded"
            page={page}
            onChange={handlePageChange}
          />
        </Stack>
      </div>
    </Paper>
  );
}