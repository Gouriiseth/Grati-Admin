import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './dashboardHome.css';
import ReviewManagement from '../review_management/review';
import { listRevData } from "../../../API/reviewManagementApi";
import Moment from "react-moment";

const Tablee = () => {
  
    const tableHeading=["Date and Time","Name of Give Thanks","Name of  Get Thanks","Emoticons","Comments","Transaction Amount"]
    const[ tableData,setTableData]= useState([])
  const fetchUserData = async () => {
    try {
      const response = await listRevData(5,1);
      console.log(response?.data?.data);
      setTableData(response?.data?.data?.reviewManagementData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [5,1]);
    return (
        <TableContainer className='h-full p-5 flex flex-col gap-6' style={{borderRadius:"12px"}} component={Paper}>
            <div className=" w-full h-full flex justify-between">
                <div className="flex flex-col content1 h-full w-auto">
                    <p className="text-[18px] font-[700] text-black" style={{fontFamily:"Plus Jakarta Sans"}}>Recent reviews / feedback posted</p>
                    <p className="text-[12px] font-[400] text-[#888888]" style={{ fontFamily: "Plus Jakarta Sans" }}>List of recent reviews/feedback posted</p>
                </div>
                <Link to='/dashboard/review_management'>
                <div className="content2 mt-[10px] w-[55px] h-[18px] text-[#524CBB] font-[600] text-[14px]" style={{ fontFamily: "Plus Jakarta Sans" }}>
                    <button className='w-[55px] underline' >View All
                    </button>
                    </div>
                </Link>
            </div>
            <Table aria-label="simple table h-[304px]">
                <TableHead>
                    <TableRow>
                        {tableHeading.map((heading)=>(<TableCell line-height={"20px"} style={{ width: '253.2px' }}><p className='text-[14px] font-[600] text-[#888888]' style={{ fontFamily: "Plus Jakarta Sans" }}>{heading}</p></TableCell>
                        ))}
 </TableRow>
                </TableHead>
                <TableBody>
                    {/* {rows.map((row) => ( */}
                    {tableData.map((row) => (
                        <TableRow
                            key={row?._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Moment format="DD MMM YYYY HH:mm A" withTitle>
                    {row?.createdAt}
                  </Moment>
                            </TableCell>

                            <TableCell align="left" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px", fontWeight: "400", }} ><p>{row?.giveThanksDetails?.userName}</p></TableCell>

                            <TableCell align="left" style={{ fontFamily: "Plus Jakarta Sans" }}>{row?.getThanksDetails?.userName}</TableCell>

                            <TableCell align="left" style={{ fontFamily: "Plus Jakarta Sans" }} >
                                {row?.icon===undefined && '-'}
                            {row?.icon === 'RECOGNITION' && '🤝RECOGNITION'}
                  {row?.icon === 'CELEBRATION' && '🎊CELEBRATION'}
                  {row?.icon === 'GRATITUDE' && '🙌GRATITUDE'}
                  {row?.icon === 'APPRECIATION' && '👍APPRECIATION'}
                  </TableCell>

                            <TableCell align="left" style={{ maxWidth: '171px', textAlign: 'justify', fontFamily: "Plus Jakarta Sans" }}
                            ><p style={{overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis", width:"100%"}} >{row?.sayThanks!==''? row?.sayThanks:'-'}
                            </p></TableCell>

                            <TableCell align="left">{row?.tipAmount!==undefined ? `$${row?.tipAmount}`: '-'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default Tablee;