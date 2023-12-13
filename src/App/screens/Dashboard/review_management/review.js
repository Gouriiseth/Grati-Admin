import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {Button,Pagination,MenuItem,Select, Stack } from '@mui/material';
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "../../../../Assets/images/icons/search.png";
import ArrowDown from "../../../../Assets/images/icons/down_arrow.png";
import Eye from "../../../../Assets/images/icons/eye.png";
import User from "../../../../Assets/images/icons/user.png";
import GenericModal from "../../../GenericModal";
import ViewReview from "./viewReview";
import { listRevData } from "../../../API/reviewManagementApi";
import Moment from "react-moment";
// import './dashboardHome.css';
import '../manage_admins/manageEdit.css'

  const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    // marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  zIndex: "1",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "30px",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function ReviewManagement() {
  const [selectedButton, setSelectedButton] = useState(1);
  const [tableData, setTableData] = useState([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const handlePaginationLimitChange = (event) => {
    setLimit(event?.target?.value);
  };

  const handlePageChange = (event, page) => {
    console.log("page change", event);
    console.log("page change value", page);
    setPage(page);
  }

  const fetchUserData = async () => {
    try {
      const response = await listRevData(limit,(page));
      console.log(response?.data?.data);
      setTableData(response?.data?.data?.reviewManagementData);
      // console.log(response?.data?.data?.users);
      setTotalCount(response?.data?.data?.reviewManagementDataCount)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [limit,page]);

  const handleButtonClick = (buttonIndex) => {
    if (selectedButton === buttonIndex) {
      setSelectedButton(null);
    } else {
      setSelectedButton(buttonIndex);
    }
  };

  const [isView, setIsView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsView(!isView);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsView(!isView);
  };

  const handleClick = () => {
    // handlePopOver();
    handleOpenModal();
    setIsView(!isView);
    // setIsLogoutOpen(false)
    // console.log(e, "eeeeee")
  };
  const title = ["Review Details"];
  const limitOptions=[10,25,50,75,100];

  return (
    // <div className="p-8">

    <Paper
      className="pb-0 h-[100%] max-h-[85vh] p-6 flex flex-col justify-between gap-6  "
      style={{ borderRadius: "12px" }}
      component={Paper}
    >
      {/* <div className="flex flex-col gap-5"> */}
      <div
        className="flex flex-row justify-between"
        style={{ alignItems: "baseline" }}
      >
        <p
          className="text-[18px] font-[700] text-black"
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          Review and Feedback Management
        </p>
        <div
          className="flex gap-3 h-11 font-[600] text-[14px]"
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          <div className="flex flex-row justify-around w-[145px] rounded-[6px] gap-1 py-2 px-[14px] bg-[#EEEEEE]">
            <div
              className="h-5 flex m-auto justify-between"
              style={{ width: "inherit" }}
            >
              <p
                style={{
                  fontFamily: "Inter",
                  lineHeight: "20px",
                  fontWeight: "500",
                  textSize: "14px",
                  padding: "0",
                  color: "#888888",
                }}
              >
                Last Month
              </p>
              <img src={ArrowDown} alt="" className="w-4 h-4 flex" />
            </div>
          </div>
          <Search className="flex justify-between">
            <SearchIconWrapper>
              <img src={SearchIcon} alt="" className="w-[22px] h-[22px]" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search User"
              inputProps={{ "aria-label": "search" }}
              className="flex w-[272px] rounded-[6px] gap-1 border-[1px] p-[10px] bg-[#EEEEEE]"
            />
          </Search>
        </div>
      </div>
      <div className="switcher flex justify-evenly bg-[#D9D9D9] rounded-[6px] w-[325px] h-11">
        <button
          type="button"
          className={`bg-red-500 rounded-l-[6px] ${
            selectedButton === 1 ? "bg-pink-200" : ""
          }  w-[163.5px] h-11 py-[10px] px-4`}
          style={{
            backgroundColor: selectedButton === 1 ? "#524CBB" : "#F8F8F8",
            color: selectedButton === 1 ? "white" : "black",
          }}
          onClick={() => handleButtonClick(1)}
        >
          Active Review
        </button>
        <button
          type="button"
          style={{
            backgroundColor: selectedButton === 2 ? "#524CBB" : "#F8F8F8",
            color: selectedButton === 2 ? "white" : "black",
          }}
          onClick={() => handleButtonClick(2)}
          className="rounded-r-[6px] w-[163.5px] h-11 border-l-[1px]  px-4"
        >
          Deleted Review
        </button>
      </div>

      {/* aria-label="simple table h-[772px]" */}
      <TableContainer className="card w-auto overflow-auto">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className="w-[233px] h-11 p-3">
              <TableCell padding={"12px"} className="w-[233px] h-11 p-3">
                <p
                  className="text-[14px] font-[600] text-[#888888]"
                  style={{ fontFamily: "Plus Jakarta Sans" }}
                >
                  Date and time{" "}
                </p>
              </TableCell>

              <TableCell padding={"12px"} className="w-[213.5px] h-11 p-3">
                <p
                  className="text-[14px] font-[600] text-[#888888]"
                  style={{ fontFamily: "Plus Jakarta Sans" }}
                  align="left"
                >
                  Name of Give Thanks
                </p>
              </TableCell>

              <TableCell padding={"12px"} className="w-[213.5px] h-11 p-3">
                <p
                  className="text-[14px] font-[600] text-[#888888]"
                  style={{ fontFamily: "Plus Jakarta Sans" }}
                  align="left"
                >
                  Name of Get Thanks
                </p>
              </TableCell>

              <TableCell padding={"12px"} className="w-[213.5px] h-11 p-3">
                <p
                  className="text-[14px] font-[600] text-[#888888]"
                  style={{ fontFamily: "Plus Jakarta Sans" }}
                  align="left"
                >
                  Emoticons
                </p>
              </TableCell>

              <TableCell padding={"12px"} className="w-[26px] h-11 p-3">
                <p
                  className="text-[14px] font-[600] text-[#888888]"
                  style={{ fontFamily: "Plus Jakarta Sans" }}
                  align="left"
                >
                  Comments
                </p>
              </TableCell>

              <TableCell padding={"12px"} className="w-[213.5px] h-11 p-3">
                <p
                  className="text-[14px] font-[600] text-[#888888]"
                  style={{ fontFamily: "Plus Jakarta Sans" }}
                  align="left"
                >
                  Attachments
                </p>
              </TableCell>

             { selectedButton===1? <TableCell padding={"12px"} className="w-[179px] h-11 p-3">
                <p
                  className="text-[14px] font-[600] text-[#888888]"
                  style={{ fontFamily: "Plus Jakarta Sans" }}
                  align="left"
                >
                  Action
                </p>
              </TableCell> : ""}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.map((row) => ( */}
            {tableData.map((row) => (
              <TableRow
                key={row?._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className="w-[179px] h-13"
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  <Moment format="DD MMM YYYY HH:mm A" withTitle>
                    {row?.createdAt}
                  </Moment>
                </TableCell>

                <TableCell
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  <p>{row?.giveThanksDetails?.userName}</p>
                </TableCell>

                <TableCell
                  align="left"
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  {row?.getThanksDetails?.userName}
                </TableCell>
                {/* <TableCell
                  align="left"
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                   {row?.icon === 'appreciation' && '😊'}
  {row?.icon === 'handshake' && '🤝'}
                </TableCell> */}
                <TableCell
                  align="left"
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  {/* {row?.icon && '🙌Appreciation' } */}
                  {row?.icon === 'RECOGNITION' && '🤝RECOGNITION'}
                  {row?.icon === 'CELEBRATION' && '🎊CELEBRATION'}
                  {row?.icon === 'GRATITUDE' && '🙌GRATITUDE'}
                  {row?.icon === 'APPRECIATION' && '👍APPRECIATION'}
                </TableCell>

                <TableCell
                  align="left"
                  style={{
                    textAlign: "justify",
                    fontFamily: "Plus Jakarta Sans",
                  }}
                >
                  <p
                    style={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      maxWidth: "194px",
                      textOverflow: "ellipsis",
                      width: "92%",
                    }}
                  >
                    {row?.sayThanks}
                  </p>
                </TableCell>

                <TableCell
                  align="left"
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  <div className="w-[46px] h-[38px] rounded-md bg-gray-300">
                    <img
                      src={User}
                      alt=""
                      className="w-[46px] h-[38px] m-auto"
                    />
                  </div>
                  {row.attachments}
                </TableCell>

                {selectedButton===1? <TableCell align="left" style={{ minWidth: "194px" }}>
                  <div className="flex justify-between">
                    <div
                      className="w-[36.8px] h-[36.8px] bg-[#EEEEEE] rounded-[5.02px] p-[10.04px]"
                      onClick={handleClick}
                    >
                      <img src={Eye} alt="" className="w-5 h-5" />
                    </div>
                  </div>
                  {row.action}
                </TableCell> : ""}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* </div> */}
      {isView && (
        <GenericModal
          open={isModalOpen}
          handleClose={handleCloseModal}
          content={
            <ViewReview
              setIsModal={setIsModalOpen}
              setIsOpenModal={setIsModalOpen}
              isView={isView}
              setIsView={setIsView}
            />
          }
          isCross={true}
          title={title[0]}
          width="631px"
          height="604px"
        />
        
      )}

      <div className="flex justify-between mt-auto mb-2">
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
          {limitOptions.map((options)=>(<MenuItem
            style={{
              "&:hover": {
                backgroundColor: "#EEEEEE",
              },
            }}
            value={options}
          >
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
    // </div>
  );
}
