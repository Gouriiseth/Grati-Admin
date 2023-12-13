import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Download from "../../../../Assets/images/icons/download.png";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '../../../../Assets/images/icons/search.png';
import ArrowDown from '../../../../Assets/images/icons/down_arrow.png';
import Eye from '../../../../Assets/images/icons/eye.png';
import Block from '../../../../Assets/images/icons/block.png';
import Trash from '../../../../Assets/images/icons/trash.png';
import "./finance.css"
import Card from "@mui/material/Card";
import ButtonGroup from '@mui/material/ButtonGroup';
import GenericModal from '../../../GenericModal';
import ViewTransaction from './viewTransaction';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// import './dashboardHome.css';


function createData(transaction_id, dateRange,mode, payee_name, getThanks_name, amt, status, action) {
  return { transaction_id,dateRange, mode, payee_name, getThanks_name, amt, status, action };
}


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
    // marginLeft: theme.spacing(3),
    width: 'auto',
    margin: 0
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  // justifyContent: 'center',
  zIndex: "1"
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingLeft: "30px",
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'fit-content',
    },
  },
}));


const rows = [
  createData('#112212','June 21, 2023 -June 28, 2023','Bank Transfer', 'Jawwad Hossain ', 'Pete Turner (Individual)', '$20', 'Completed'),
  createData('#112212','June 21, 2023 -June 28, 2023','Bank Transfer', 'Jawwad Hossain ', 'Pete Turner (Individual)', '$20', 'Completed'),
  createData('#112212','June 21, 2023 -June 28, 2023','Bank Transfer', 'Jawwad Hossain ', 'Pete Turner (Individual)', '$20', 'Completed'),
  createData('#112212','June 21, 2023 -June 28, 2023','Bank Transfer', 'Jawwad Hossain ', 'Pete Turner (Individual)', '$20', 'Completed'),
  createData('#112212','June 21, 2023 -June 28, 2023','Bank Transfer', 'Jawwad Hossain ', 'Pete Turner (Individual)', '$20', 'Completed'),
  createData('#112212','June 21, 2023 -June 28, 2023','Bank Transfer', 'Jawwad Hossain ', 'Pete Turner (Individual)', '$20', 'Completed'),
  createData('#112212','June 21, 2023 -June 28, 2023','Bank Transfer', 'Jawwad Hossain ', 'Pete Turner (Individual)', '$20', 'Completed'),
  createData('#112212','June 21, 2023 -June 28, 2023','Bank Transfer', 'Jawwad Hossain ', 'Pete Turner (Individual)', '$20', 'Completed'),
  createData('#112212','June 21, 2023 -June 28, 2023','Bank Transfer', 'Jawwad Hossain ', 'Pete Turner (Individual)', '$20', 'Completed'),
  createData('#112212','June 21, 2023 -June 28, 2023','Bank Transfer', 'Jawwad Hossain ', 'Pete Turner (Individual)', '$20', 'Completed'),
];

export default function FinanceManagement() {

  const [selectedButton, setSelectedButton] = useState(1);
  // const [isRevenue, setIsRevenue] = useState(1);

  const handleButtonClick = (buttonIndex) => {
    if (selectedButton === buttonIndex) {
      setSelectedButton(null);
    } else {
      setSelectedButton(buttonIndex);
    }
  };

  const colorChange = {
    backgroundColor: selectedButton === 3 ? "#524CBB" : "white",
    color: "white",
  }
  const [view, setView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let title = ["View Transaction"]

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setView(!view)
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setView(!view)
  };

  const handleClick = () => {
    // handlePopOver();
    handleOpenModal();
    setView(!view);
  };
  return (

    < Paper className='pb-0 h-auto max-h-[85vh] p-6 flex flex-col gap-6' style={{ borderRadius: "12px" }} component={Paper} >
        <div div className=" h-auto flex justify-between" style={{ alignItems: "baseline" }}>
          <div className="flex flex-col content1 h-full w-auto">
            <p className="text-[18px] font-[700] text-black" style={{ fontFamily: "Plus Jakarta Sans" }}>Finance Management</p>
          </div>
          <div className="flex gap-3 mt-[10px] w-[615px] h-[44px] font-[600] text-[14px]" style={{ fontFamily: "Plus Jakarta Sans" }}>
            <Search>
              <SearchIconWrapper>
                <img src={SearchIcon} alt="" className='w-[22px] h-[22px]' />
              </SearchIconWrapper>
              <StyledInputBase
              placeholder="Search by Transaction ID"
                inputProps={{ 'aria-label': 'search' }}
                className='flex w-[272px] h-11 rounded-[6px] gap-1 border-[1px] p-[10px] bg-[#EEEEEE]'
              />
            </Search>

            {/* <div className='flex justify-between w-[145px] h-11 rounded-[6px] gap-1 py-2 px-[14px] bg-[#EEEEEE] font-bold '> */}
            {/* <div className='flex justify-between w-max h-max rounded-[6px] gap-1 py-2 px-[14px] bg-[#EEEEEE] font-bold '> */}
              {/* <div className='w-[77px] h-5 flex m-auto'>
                <p style={{ fontFamily: "Inter", lineHeight: "20px", fontWeight: "500", textSize: "14px", padding: "0", color: "#888888" }}>All Type</p>
              </div>
              <div className='w-4 h-4 flex m-auto'>
                <img src={ArrowDown} alt="" />
              </div> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* <DemoContainer style={{backgroundColor:"pink"}} components={['DatePicker']}> */}
                <DatePicker/>
              {/* </DemoContainer> */}
            </LocalizationProvider>
            {/* </div> */}

            <button type='button' className='flex gap-1 h-11 rounded-[6px] py-[10px] px-4 bg-[#524CBB]'>
              <div className='flex gap-2 '>
                <div className="font-bold w-[116px] text-white" style={{ fontFamily: "Plus Jakarta Sans,sans-serif", lineHeight: "24px", fontWeight: "500", textSize: "16px", padding: "0" }}>Download CSV
                </div>
                <img src={Download} alt="" className="flex justify-center items-center m-auto w-[18.32px] h-[18.32px]  " />
              </div>
            </button>

            {/* <div className='flex w-[272px] h-11 rounded-[6px] gap-1 border-[1px] p-[10px] bg-[#EEEEEE]'>search</div> */}
          </div>
        </div>

        < div className="switcher flex justify-evenly bg-[#D9D9D9] rounded-[6px] w-[757px] h-11" >
          <button type='button' className={`bg-red-500 ${selectedButton === 1 ? "bg-pink-200" : ""}  w-[151.4px] h-11 rounded-tl-[6px] rounded-bl-[6px] py-[10px] px-4`}
            style={{
              backgroundColor: selectedButton === 1 ? "#524CBB" : "#F8F8F8",
              color: selectedButton === 1 ? "white" : "black"
            }} onClick={() => handleButtonClick(1)}>Daily Report</button>
          <button type='button' style={{
            backgroundColor: selectedButton === 2 ? "#524CBB" : "#F8F8F8",
            color: selectedButton === 2 ? "white" : "black"
          }} onClick={() => handleButtonClick(2)} className=' w-[151.4px] h-11 border-l-[1px]  px-4'>Weekly Report</button>
          <button type='button' style={{
            backgroundColor: selectedButton === 3 ? "#524CBB" : "#F8F8F8",
            color: selectedButton === 3 ? "white" : "black"
          }} onClick={() => handleButtonClick(3)} className='w-[151.4px] h-11 border-l-[1px] border-r-[1px] py-[10px] px-4'>Monthly Report</button>
          <button type='button' style={{
            backgroundColor: selectedButton === 4 ? "#524CBB" : "#F8F8F8",
            color: selectedButton === 4 ? "white" : "black"
          }} onClick={() => handleButtonClick(4)} className='w-[151.4px] h-11 border-r-[1px] py-[10px] px-4'>Yearly Report</button>
          <button type='button' style={{
            backgroundColor: selectedButton === 5 ? "#524CBB" : "#F8F8F8",
            color: selectedButton === 5 ? "white" : "black"
          }} onClick={() => handleButtonClick(5)} className='w-[151.4px] h-11 rounded-tr-[6px] rounded-br-[6px] py-[10px] px-4'>Custom Range</button>
        </div >
        {/* <TableContainer>
          <Table aria-label="sticky table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding={'12px'} className='w-[194px] h-11'><p className='text-[14px] font-[600] text-[#888888]' style={{ fontFamily: "Plus Jakarta Sans" }}>Transaction ID</p></TableCell>

                <TableCell padding={'12px'} className='w-[194px] h-11'><p className='text-[14px] font-[600] text-[#888888]' style={{ fontFamily: "Plus Jakarta Sans" }} align="left">Mode of transaction </p></TableCell>

                <TableCell padding={'12px'} className='w-[194px] h-11'><p className='text-[14px] font-[600] text-[#888888]' style={{ fontFamily: "Plus Jakarta Sans" }} align="left">Payee's Name </p></TableCell>

                <TableCell padding={'12px'} className='w-[194px] h-11'><p className='text-[14px] font-[600] text-[#888888]' style={{ fontFamily: "Plus Jakarta Sans" }} align="left">Get Thanks's Name</p></TableCell>

                <TableCell padding={'12px'} className='w-[194px] h-11'><p className='text-[14px] font-[600] text-[#888888]' style={{ fontFamily: "Plus Jakarta Sans" }} align="left" >Amount</p></TableCell>

                <TableCell padding={'12px'} className='w-[194px] h-11'><p className='text-[14px] font-[600] text-[#888888]' style={{ fontFamily: "Plus Jakarta Sans" }} align="left">Status</p></TableCell>

                <TableCell padding={'12px'} className='w-[194px] h-11'><p className='text-[14px] font-[600] text-[#888888]' style={{ fontFamily: "Plus Jakarta Sans" }} align="left">Action</p></TableCell>


              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.transaction_id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  className='w-[194px] h-13'>
                  <TableCell className="min-w-[228.83px]" component="th" scope="row">
                    {row.transaction_id}
                  </TableCell>
                  < TableCell style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px", fontWeight: "400", minWidth: "228.83px" }} ><p>{row.mode}</p></TableCell>
                  <TableCell align="left" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px", fontWeight: "400", minWidth: "228.83px" }}>{row.payee_name}</TableCell>
                  <TableCell align="left" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px", fontWeight: "400", minWidth: "228.83px" }} >{row.getThanks_name}</TableCell>
                  <TableCell align="left" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px", fontWeight: "400", minWidth: "228.83px" }} >{row.amt}</TableCell>
                  <TableCell align="left" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px", fontWeight: "400", minWidth: "228.83px" }} >{row.status}</TableCell>
                  <TableCell align="left" style={{ minWidth: "228.83px" }}>
                    <div className='flex justify-between'>
                      <div className='w-[36.8px] h-[36.8px] bg-[#EEEEEE] rounded-[5.02px] p-[10.04px]'>
                        <img src={Eye} alt="" className='w-5 h-5' />
                      </div>
                    </div>
                    {row.action}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </TableContainer> */}
      <TableContainer className='pb-0 h-370 flex flex-col gap-6' style={{ borderRadius: "12px" }}>
        <Table aria-label="simple table h-[304px]">
          <TableHead>
            <TableRow>
              <TableCell padding={'12px'} className='w-[194px] h-11'><p className='text-[14px] font-[600] text-[#888888]' style={{ fontFamily: "Plus Jakarta Sans" }}>Transaction ID</p></TableCell>

{          selectedButton===5?     <TableCell padding={'12px'} className='w-[194px] h-11'><p className='text-[14px] font-[600] text-[#888888]' style={{ fontFamily: "Plus Jakarta Sans" }} align="left">Date Range</p></TableCell>
: ""}              
              <TableCell padding={'12px'} className='w-[194px] h-11'><p className='text-[14px] font-[600] text-[#888888]' style={{ fontFamily: "Plus Jakarta Sans" }} align="left">Mode of transaction </p></TableCell>

              <TableCell padding={'12px'} className='w-[194px] h-11'><p className='text-[14px] font-[600] text-[#888888]' style={{ fontFamily: "Plus Jakarta Sans" }} align="left">Payee's Name </p></TableCell>

              <TableCell padding={'12px'} className='w-[194px] h-11'><p className='text-[14px] font-[600] text-[#888888]' style={{ fontFamily: "Plus Jakarta Sans" }} align="left">Get Thanks's Name</p></TableCell>

              <TableCell padding={'12px'} className='w-[194px] h-11'><p className='text-[14px] font-[600] text-[#888888]' style={{ fontFamily: "Plus Jakarta Sans" }} align="left" >Amount</p></TableCell>

              <TableCell padding={'12px'} className='w-[194px] h-11'><p className='text-[14px] font-[600] text-[#888888]' style={{ fontFamily: "Plus Jakarta Sans" }} align="left">Status</p></TableCell>

              <TableCell padding={'12px'} className='w-[194px] h-11'><p className='text-[14px] font-[600] text-[#888888]' style={{ fontFamily: "Plus Jakarta Sans" }} align="left">Action</p></TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.dateTime}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.dateTime}
                </TableCell>
                <TableCell align="left" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px", fontWeight: "400", }} ><p>{row.giveThanks}</p></TableCell>
                <TableCell align="left" style={{ fontFamily: "Plus Jakarta Sans" }}>{row.getThanks}</TableCell>
                <TableCell align="left" style={{ fontFamily: "Plus Jakarta Sans" }} >{row.emoticons}</TableCell>
                <TableCell align="left" style={{ maxWidth: '171px', textAlign: 'justify', fontFamily: "Plus Jakarta Sans" }}
                ><p style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", width: "100%" }} >{row.comments}</p></TableCell>
                <TableCell align="left">{row.amt}</TableCell>
              </TableRow>
            ))}
          </TableBody> */}
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className=''>
                <TableCell className="" component="th" scope="row">
                  {row.transaction_id}
                </TableCell>
{  selectedButton===5?              < TableCell style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px", fontWeight: "400", minWidth: "228.83px" }} ><p>{row.dateRange}</p></TableCell>
:""}                < TableCell style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px", fontWeight: "400", minWidth: "228.83px" }} ><p>{row.mode}</p></TableCell>
                <TableCell align="left" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px", fontWeight: "400"}}>{row.payee_name}</TableCell>
                <TableCell align="left" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px", fontWeight: "400"}} >{row.getThanks_name}</TableCell>
                <TableCell align="left" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px", fontWeight: "400"}} >{row.amt}</TableCell>
                <TableCell align="left" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px", fontWeight: "400"}} >{row.status}</TableCell>
                <TableCell align="left">
                  <div className='flex justify-between'>
                    <div className='w-[36.8px] h-[36.8px] bg-[#EEEEEE] rounded-[5.02px] p-[10.04px]' onClick={handleClick}>
                      <img src={Eye} alt="" className='w-5 h-5' />
                    </div>
                  </div>
                  {row.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {view && <GenericModal open={isModalOpen} title={title[0]} handleClose={handleCloseModal} content={<ViewTransaction />} isCross={true} width={"631px"} height={"574px"} />}
      </Paper >
  );
}