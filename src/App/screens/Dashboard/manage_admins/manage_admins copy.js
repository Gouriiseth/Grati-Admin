import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, InputLabel } from "@mui/material";
import { Link } from "react-router-dom";
import Download from "../../../../Assets/images/icons/download.png";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "../../../../Assets/images/icons/search.png";
import ArrowDown from "../../../../Assets/images/icons/down_arrow.png";
import Eye from "../../../../Assets/images/icons/eye.png";
import Block from "../../../../Assets/images/icons/block.png";
import Unblock from "../../../../Assets/images/icons/unblock_grey.png";
import Trash from "../../../../Assets/images/icons/trash.png";
import Edit from "../../../../Assets/images/icons/edit-2.png";
import GenericModal from "../../../GenericModal";
import ManageEdit from "./manageEditCopy";
import ManageAdd from "./manageAdd";
import ManageView from "./manageView";
import DeleteAdmin from "./deleteAdmin";
import AdminBlock from "./blockAdmin";
import { listAdminDets, searchAdmin } from "../../../API/manageAdminApi";
import Pagination from "@mui/material/Pagination";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import "./manage.css";

// import './dashboardHome.css';

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
  // justifyContent: 'center',
  zIndex: "1",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingLeft: "30px",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function ManageAdmins() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [userId, setUserId] = useState("");
  const [tableData, setTableData] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
   
  const [errors, setErrors] = useState({
    userName: "",
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handlePaginationLimitChange = (event) => {
    setLimit(event.target.value);
    // Add additional logic as needed, such as fetching data for the new page
  };
  const handleFilter = (event) => {
    setFilter(event.target.value);
    // Add additional logic as needed, such as fetching data for the new page
  };

//   const handlePageChange=(event,newPage)=>{
//     console.log("page change");
//     setPage(newPage)
//     //   setTableData.jump(page);
//   }
  console.log(page);

  const fetchUserData = async () => {
    try {
      const response = await listAdminDets(filter, page, limit);
      setTableData(response?.data?.data);
      const totalCount = response?.data?.data?.length || 0; // Get the length of the data array
console.log(totalCount,"");
      // Assuming a default page size of 10, change it based on your requirement
      const pageSize = limit || 10;
      const calculatedTotalPages = Math.ceil(totalCount / pageSize);
        if (calculatedTotalPages < page) {
            setPage(1);
        }
        else 
        setPage(calculatedTotalPages)
        // setPage(Math.ceil(totalCount / limit));
      let userid = tableData.map((item) => item._id);
      // setUserId(userid)
      console.log(calculatedTotalPages,"caaaaaaaaaaa");

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [filter,page, limit]);

  console.log(tableData);
  console.log(page, "tdfyguiohj");
  // console.log(userId);

  const handleButtonClick = (buttonIndex) => {
    if (selectedButton === buttonIndex) {
      setSelectedButton(null);
    } else {
      setSelectedButton(buttonIndex);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isBlock, setIsBlock] = useState(false);
  const [isDel, setIsDel] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isBlockModal, setIsBlockModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (value) => {
    // setSearchQuery(event.target.value);
    if (value !== "") {
      try {
        const response = await searchAdmin(value);
        console.log(response);
        setTableData(response?.data?.data);
        setSearchResults(response?.data?.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else if (value === "") {
      fetchUserData();
    }
  };
  console.log(searchResults);
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
    handleSearch(event.target.value);
  };

  let title = ["View Details", "Edit Details", "Add Admin Users"];

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsView(!isView);
    setIsEdit(!isEdit);
    setIsAdd(!isAdd);
    setIsDel(!isDel);
    setIsBlockModal(!isBlockModal);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsView(false);
    setIsEdit(false);
    setIsAdd(false);
    setIsDel(false);
    setIsBlockModal(false);
  };

  const handleView = async (id) => {
    setIsBlockModal(false);
    setIsView(!isView);
    handleOpenModal();
    setIsEdit(false);
    setIsAdd(false);
    setIsDel(false);
    setIsBlockModal(false);
    setUserId(id);
    console.log(isBlockModal);
  };
  console.log(userId, "idd");
  const handleEdit = (id) => {
    handleOpenModal();
    setIsView(false);
    setIsAdd(false);
    setIsDel(false);
    setIsBlockModal(false);
    setIsEdit(!isEdit);
    setUserId(id);
  };

  const handleAdd = () => {
    handleOpenModal();
    setIsEdit(false);
    setIsView(false);
    setIsDel(false);
    setIsBlockModal(false);
    setIsAdd(!isAdd);
  };

  const handleDelete = (id) => {
    handleOpenModal();
    setIsEdit(false);
    setIsView(false);
    setIsAdd(false);
    setIsBlockModal(false);
    setIsDel(!isDel);
    setUserId(id);
  };
  console.log(userId);

  const handleBlock = (id) => {
    handleOpenModal();
    setIsEdit(false);
    setIsView(false);
    setIsAdd(false);
    setIsDel(false);
    setIsBlockModal(!isBlockModal);
    setUserId(id);
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 1:
        return "Admin";
      case 2:
        return "Subadmin";
      default:
    }
  };

  useEffect(() => {
    if (isDeleted) {
      fetchUserData();
      setIsDeleted(false);
    }
    if(isBlocked){
        fetchUserData();
        setIsBlocked(false)
    }
  }, [isDeleted,isBlocked]);

  return (
    <Paper
      className=" h-auto max-h-[85vh] flex flex-col justify-between gap-6 p-6"
      style={{ borderRadius: "12px" }}
      component={Paper}
    >
      {/* <div className="h-[820px] w-[1552px] flex flex-col gap-5"> */}
      <div className="flex justify-between" style={{ alignItems: "baseline" }}>
        <p
          className="text-[18px] font-[700] text-black"
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          Manage Admin User
        </p>
        <div
          className="flex h-11 gap-3 font-[600] text-[14px]"
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          <Select
            labelId="pagination-limit-select-label"
            id="pagination-limit-select"
            // value={filter}
            value={filter || ""}
            // placeholder='All'
            displayEmpty
            onChange={handleFilter}
            className=" bg-[#EEEEEE] w-[145px] h-11 rounded-[6px] gap-1 py-2 px-[14px]"
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
              value={""}
            >
              All
            </MenuItem>
            <MenuItem
              style={{
                "&:hover": {
                  backgroundColor: "#EEEEEE",
                },
              }}
              value={1}
            >
              Admin
            </MenuItem>
            <MenuItem
              style={{
                "&:hover": {
                  backgroundColor: "#EEEEEE",
                },
              }}
              value={2}
            >
              Sub-Admin
            </MenuItem>
            {/* Add more options as needed */}
          </Select>

          <Search
            className="flex justify-between"
            style={{ margin: "initial" }}
          >
            <SearchIconWrapper>
              <img src={SearchIcon} alt="" className="w-[22px] h-[22px]" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search User"
              inputProps={{ "aria-label": "search" }}
              className="flex w-[272px] rounded-[6px] gap-1 border-[1px] p-[10px] bg-[#EEEEEE]"
              // onClick={handleSearch}
              value={searchQuery}
              onChange={handleChange}
              // onKeyPress={handleKeyPress}
            />
          </Search>

          <button
            type="button"
            className="flex flex-row justify-between items-center w-16 rounded-[6px] py-[10px] px-4 bg-[#524CBB]"
            onClick={handleAdd}
          >
            <p
              className="font-bold text-center text-white"
              style={{
                fontFamily: "Plus Jakarta Sans,sans-serif",
                lineHeight: "24px",
                fontWeight: "500",
                textSize: "16px",
                padding: "0",
              }}
            >
              Add
            </p>
          </button>
        </div>
      </div>

      <TableContainer className="w-auto overflow-auto">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className="w-[457.67px] h-11 p-3">
              <TableCell padding={"12px"} className="w-[233px] h-11 p-3">
                <p
                  className="text-[14px] font-[600] text-[#888888]"
                  style={{ fontFamily: "Plus Jakarta Sans" }}
                >
                  User Name{" "}
                </p>
              </TableCell>

              <TableCell padding={"12px"} className="w-[213.5px] h-11 p-3">
                <p
                  className="text-[14px] font-[600] text-[#888888]"
                  style={{ fontFamily: "Plus Jakarta Sans" }}
                  align="left"
                >
                  Email Address
                </p>
              </TableCell>

              <TableCell padding={"12px"} className="w-[213.5px] h-11 p-3">
                <p
                  className="text-[14px] font-[600] text-[#888888]"
                  style={{ fontFamily: "Plus Jakarta Sans" }}
                  align="left"
                >
                  User Role
                </p>
              </TableCell>

              <TableCell padding={"12px"} className="w-[179px] h-11 p-3">
                <p
                  className="text-[14px] font-[600] text-[#888888]"
                  style={{ fontFamily: "Plus Jakarta Sans" }}
                  align="left"
                >
                  Action
                </p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.map((row) => ( */}
            {tableData.map((row) => (
              <TableRow
                key={row._id}
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
                  <p>{row.fullName}</p>
                </TableCell>

                <TableCell
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  <p>{row.email}</p>
                </TableCell>

                <TableCell
                  align="left"
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  {" "}
                  {getRoleLabel(row.role)}
                </TableCell>

                <TableCell align="left">
                  <div className="flex justify-left gap-[10px]">
                    <div
                      className="w-[36.8px] h-[36.8px] bg-[#EEEEEE] rounded-[5.02px] p-[10.04px]"
                      onClick={() => handleView(row._id)}
                    >
                      <img src={Eye} alt="" className="w-5 h-5" />
                    </div>
                    <div
                      className="w-[36.8px] h-[36.8px] bg-[#EEEEEE] rounded-[5.02px] p-[10.04px]"
                      onClick={() =>
                        handleEdit(row._id, row.fullName, row.email, row.role)
                      }
                    >
                      <img src={Edit} alt="" className="w-5 h-5" />
                    </div>
                    <div
                      className="w-[36.8px] h-[36.8px] bg-[#EEEEEE] rounded-[5.02px] p-[10.04px]"
                      onClick={() => handleDelete(row._id)}
                    >
                      <img src={Trash} alt="" className="w-5 h-5" />
                    </div>
                    <div
                      className="w-[36.8px] h-[36.8px] bg-[#EEEEEE] rounded-[5.02px] p-[10.04px]"
                      onClick={() => handleBlock(row._id)}
                    >
                                {/* <img src={Block} alt="" className="w-5 h-5" /> */}
                                {isBlocked ? <img src={Unblock} alt="" className="w-5 h-5" /> : <img src={Block} alt="" className="w-5 h-5" />}
                    </div>
                  </div>
                  {row.action}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isEdit && (
        <GenericModal
          open={isModalOpen}
          handleClose={handleCloseModal}
          content={
            <ManageEdit
              userId={userId}
              setIsEdit={setIsEdit}
              isEdit={isEdit}
              setIsOpenModal={setIsModalOpen}
              isOpenModal={isModalOpen}
            />
            // <ManageEdit
            //   userId={userId}
            //   setIsEdit={setIsEdit}
            //   isEdit={isEdit}
            //   setIsOpenModal={setIsModalOpen}
            //   isOpenModal={isModalOpen}
            // />
          }
          isCross={true}
          title={title[1]}
          width="631px"
          height="758px"
        />
      )}

      {isAdd && (
        <GenericModal
          open={isModalOpen}
          handleClose={handleCloseModal}
          content={
            <ManageAdd
              setIsAdd={setIsAdd}
              isAdd={isAdd}
              setIsOpenModal={setIsModalOpen}
              isOpenModal={isModalOpen}
            />
          }
          isCross={true}
          title={title[2]}
          width="631px"
          height="758px"
        />
      )}

      {isView && (
        <GenericModal
          open={isModalOpen}
          handleClose={handleCloseModal}
          content={<ManageView userId={userId} />}
          isCross={true}
          title={title[0]}
          width="631px"
          height="360px"
        />
      )}

      {isDel && (
        <GenericModal
          open={isModalOpen}
          tableData={tableData}
          setTableData={setTableData}
          handleClose={handleCloseModal}
          content={
            <DeleteAdmin
              setIsDeleted={setIsDeleted}
              userId={userId}
              isDelete={isDel}
              setIsDelete={setIsDel}
              setIsOpenModal={setIsModalOpen}
              handleDelModal={handleCloseModal}
            />
          }
          isCross={true}
          width={"391px"}
          height={"328px"}
        />
      )}

      {isBlockModal && (
        <GenericModal
          open={isModalOpen}
          handleClose={handleCloseModal}
          content={
            <AdminBlock
            isBlocked={isBlocked}
            setIsBlocked={setIsBlocked}
              userId={userId}
              setIsBlockModal={setIsBlockModal}
              isBlockModal={isBlockModal}
              setIsOpenModal={setIsModalOpen}
            />
          }
          isCross={true}
          width={"391px"}
          height={"328px"}
        />
      )}

      {/* </div> */}
      <div className="flex justify-between">
        <Select
          labelId="pagination-limit-select-label"
          id="pagination-limit-select"
          value={limit}
          // placeholder='All'
          onChange={handlePaginationLimitChange}
          className="w-[66px] h-11 bg-[#EEEEEE] "
          style={{
            color: "#888888",
            fontSize: "14px",
            fontWeight: "500",
            
          }}
        >
          <MenuItem
            style={{
              "&:hover": {
                backgroundColor: "#EEEEEE",
              },
            }}
            value={10}
          >
            10
          </MenuItem>
          <MenuItem
            style={{
              "&:hover": {
                backgroundColor: "#EEEEEE",
              },
            }}
            value={20}
          >
            20
          </MenuItem>
          <MenuItem
            style={{
               
              "&:hover": {
                backgroundColor: "#EEEEEE",
              },
            }}
            value={30}
          >
            30
          </MenuItem>
          {/* Add more options as needed */}
        </Select>

        <Stack spacing={2}>
          {/* <Pagination count={3} shape="rounded" /> */}
                  {/* <Pagination
                      onChange={handlePageChange}
                      page={page}
                    //   count={Math.ceil(totalCount / limit)}
                    count={totalCount}
                      defaultPage={1}
                      siblingCount={3}
                      shape="rounded"
                  /> */}
                  <Pagination  count={3} defaultPage={1} siblingCount={3} shape="rounded" />
        </Stack>
      </div>
    </Paper>
  );
}
