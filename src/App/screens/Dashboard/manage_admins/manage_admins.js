import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { Button, InputLabel } from "@mui/material";
// import { Link } from "react-router-dom";
// import Download from "../../../../Assets/images/icons/download.png";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "../../../../Assets/images/icons/search.png";
// import ArrowDown from "../../../../Assets/images/icons/down_arrow.png";
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
import AdminBlock from "./blockAdminCopy";
import { listAdminDets, searchAdmin } from "../../../API/manageAdminApi";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import "./manage.css";
import "./manageEdit.css";
// import { toast } from "react-toastify";

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

export default function ManageAdmins() {
    const [userId, setUserId] = useState("");
    const [isRole, setIsRole] = useState("");
    const [yes, setYes] = useState()
    const [tableData, setTableData] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);

    const [filter, setFilter] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    // let totalDataCount;

    const handlePaginationLimitChange = (event) => {
        setLimit(event?.target?.value);
    };
    const handleFilter = (event) => {
        setFilter(event?.target?.value);
    };

      const handlePageChange=(event, page)=>{
        console.log("page change", event);
        console.log("page change value", page);
        setPage(page);
      }

    const fetchUserData = async () => {
        try {
            console.log("filter", filter, "page", page, "limit", limit);
            const response = await listAdminDets(filter,(page), limit);
            setTableData(response?.data?.data?.users);
            console.log(response?.data?.data?.users);
            setTotalCount(response?.data?.data?.totalCount)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [filter, page, limit]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [isBlock, setIsBlock] = useState(false);
    const [isDel, setIsDel] = useState(false);
    const [isView, setIsView] = useState(false);
    // const [isBlock, setIsBlock] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchFilled, setIsSearchFilled] = useState(false);
    
    
    const handleSearch = async (value) => {
        // setSearchQuery(event.target.value);
        if (value !== "") {
            try {
                const response = await searchAdmin(value);
                const searchData = response?.data?.data;
                // console.log(response);
                // if (value !== response?.data?.data)
                // toast.error("no data ")
                setTableData(response?.data?.data);
                setSearchResults(response?.data?.data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        } else if (value === "") {
            fetchUserData();
        }
        
    };
    console.log(tableData);
    const handleChange = (event) => {
        event.target.value?setIsSearchFilled(true):setIsSearchFilled(false);
        setSearchQuery(event?.target?.value);
        handleSearch(event?.target?.value);
    };

    const handleSearchClear = (event) => {
        event.target.value ? setIsSearchFilled(true) : setIsSearchFilled(false);
        setSearchQuery("");
        handleSearch("");
    };

    let title = ["View Details", "Edit Details", "Add Admin Users"];

    const handleOpenModal = () => {
        setIsModalOpen(true);
        setIsView(!isView);
        setIsEdit(!isEdit);
        setIsAdd(!isAdd);
        setIsDel(!isDel);
        setIsBlock(!isBlock);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsView(false);
        setIsEdit(false);
        setIsAdd(false);
        setIsDel(false);
        setIsBlock(false);
    };

    const handleView = async (id) => {
        setIsBlock(false);
        setIsView(!isView);
        handleOpenModal();
        setIsEdit(false);
        setIsAdd(false);
        setIsDel(false);
        setIsBlock(false);
        setUserId(id);
        // console.log(isBlock);
    };
    // console.log(userId, "idd");
    const handleEdit = (id,role) => {
        handleOpenModal();
        setIsView(false);
        setIsAdd(false);
        setIsDel(false);
        setIsBlock(false);
        setIsEdit(!isEdit);
        setUserId(id);
        setIsRole(role)
    };

    const handleAdd = () => {
        handleOpenModal();
        setIsEdit(false);
        setIsView(false);
        setIsDel(false);
        setIsBlock(false);
        setIsAdd(!isAdd);
    };

    const handleDelete = (id,role) => {
        handleOpenModal();
        setIsEdit(false);
        setIsView(false);
        setIsAdd(false);
        setIsBlock(false);
        setIsDel(!isDel);
        setUserId(id);
        setIsRole(role)
    };
    // console.log(userId);

    const handleBlock = (id,role,yes) => {
        handleOpenModal();
        setIsBlock(!isBlock);
        setIsEdit(false);
        setIsView(false);
        setIsAdd(false);
        setIsDel(false);
        setUserId(id);
        setIsRole(role);
        setYes(yes)
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
        if (isBlocked) {
            fetchUserData();
            setIsBlocked(false)
        }
        if (isAdded) {
            fetchUserData();
            setIsAdded(false)
        }
        if (isEdited) {
            fetchUserData();
            setIsEdited(false)
        }
    }, [isDeleted, isBlocked,isAdded,isEdited]);

    const limitOptions= [10,25,50,75,100]

    return (
        <Paper
            className=" h-[100%] max-h-[85vh] flex flex-col justify-between gap-6 p-6"
            style={{ borderRadius: "12px", justifyContent:"flex-start" }}
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
                        {/* <div> */}
                        <StyledInputBase
                            placeholder="Search User"
                            inputProps={{ "aria-label": "search" }}
                            className="flex w-[272px] rounded-l-[6px] gap-1 border-[1px] p-[10px] bg-[#EEEEEE]"
                            // onClick={handleSearch}
                            value={searchQuery}
                            onChange={handleChange}
                        // onKeyPress={handleKeyPress}
                        >

                        </StyledInputBase>
                        {isSearchFilled &&
                        <button className="bg-[#EEEEEE] outline-none px-2 rounded-r-[6px]" onClick={handleSearchClear}>X</button>}
                        {/* </div> */}
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
{tableData.length===0? <p >No data found</p>
:            <TableContainer className="card w-auto overflow-auto">
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow className="w-[457.67px] h-11 p-3">
                            <TableCell className="w-[233px] h-11 p-3">
                                <p
                                    className="text-[14px] font-[600] text-[#888888]"
                                    style={{ fontFamily: "Plus Jakarta Sans" }}
                                >
                                    User Name{" "}
                                </p>
                            </TableCell>

                            <TableCell className="w-[213.5px] h-11 p-3">
                                <p
                                    className="text-[14px] font-[600] text-[#888888]"
                                    style={{ fontFamily: "Plus Jakarta Sans" }}
                                    align="left"
                                >
                                    Email Address
                                </p>
                            </TableCell>

                            <TableCell className="w-[213.5px] h-11 p-3">
                                <p
                                    className="text-[14px] font-[600] text-[#888888]"
                                    style={{ fontFamily: "Plus Jakarta Sans" }}
                                    align="left"
                                >
                                    User Role
                                </p>
                            </TableCell>

                            <TableCell className="w-[179px] h-11 p-3">
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
                                    <p>{row?.fullName}</p>
                                </TableCell>

                                <TableCell
                                    style={{
                                        fontFamily: "Plus Jakarta Sans",
                                        fontSize: "14px",
                                        fontWeight: "400",
                                    }}
                                >
                                    <p>{row?.email}</p>
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
                                    {getRoleLabel(row?.role)}
                                </TableCell>

                                <TableCell align="left">
                                    <div className="flex justify-left gap-[10px]">
                                        <div
                                            className="w-[36.8px] h-[36.8px] bg-[#EEEEEE] rounded-[5.02px] p-[10.04px]"
                                            onClick={() => handleView(row?._id)}
                                        >
                                            <img src={Eye} alt="" className="w-5 h-5" />
                                        </div>
                                        <div
                                            className="w-[36.8px] h-[36.8px] bg-[#EEEEEE] rounded-[5.02px] p-[10.04px]"
                                            onClick={() =>
                                                handleEdit(row?._id, row?.role)
                                            }
                                        >
                                            <img src={Edit} alt="" className="w-5 h-5" />
                                        </div>
                                        <div
                                            className="w-[36.8px] h-[36.8px] bg-[#EEEEEE] rounded-[5.02px] p-[10.04px]"
                                            onClick={() => handleDelete(row?._id,row?.role)}
                                        >
                                            <img src={Trash} alt="" className="w-5 h-5" />
                                        </div>
                                        <div
                                            className="w-[36.8px] h-[36.8px] bg-[#EEEEEE] rounded-[5.02px] p-[10.04px]"
                                            onClick={() => handleBlock(row?._id,row?.role,row?.isBlocked)}
                                        >
                                            {/* <img src={Block} alt="" className="w-5 h-5" /> */}
                                            {row?.isBlocked ? <img src={Unblock} alt="" className="w-5 h-5" /> : <img src={Block} alt="" className="w-5 h-5" />}
                                            {/* {isBlocked ? <img src={Unblock} alt="" className="w-5 h-5" /> : <img src={Block} alt="" className="w-5 h-5" />} */}
                                        </div>
                                    </div>
                                    {row?.action}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
            {isEdit && (
                <GenericModal
                    open={isModalOpen}
                    handleClose={handleCloseModal}
                    content={
                        <ManageEdit
                            setIsEdited={setIsEdited}
                            userId={userId}
                            setIsEdit={setIsEdit}
                            isEdit={isEdit}
                            setIsOpenModal={setIsModalOpen}
                            isOpenModal={isModalOpen}
                            isRole={isRole}
                        />
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
                        setIsAdded={setIsAdded}
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
                    height="fit-content"
                    // height="360px"
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
                            isRole={isRole}
                        />
                    }
                    isCross={true}
                    width={"391px"}
                    height={"328px"}
                />
            )}

            {isBlock && (
                <GenericModal
                    open={isModalOpen}
                    tableData={tableData}
                    setTableData={setTableData}
                    handleClose={handleCloseModal}
                    content={
                        <AdminBlock
                            isBlocked={isBlocked}
                            // setIsBlocking={setIsBlock}
                            setIsBlocked={setIsBlocked}
                            userId={userId} 
                            isRole={isRole}
                            yes={yes}
                            setIsBlocking={setIsBlock} //opens block modal
                            isBlocking={isBlock}
                            setIsOpenModal={setIsModalOpen} // opening success modal
                            tableData={tableData}
                            handleBlockModal={handleCloseModal}
                            
                        />
                    }
                    isCross={true}
                    width={"391px"}
                    height={"328px"}
                />
            )}

            {/* </div> */}
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
                    {limitOptions.map((options)=>(<MenuItem
                        style={{
                            "&:hover": {
                                backgroundColor: "#EEEEEE",
                            },
                        }}
                        value={options}
                    >
                        {options}
                    </MenuItem>))}
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
                    {/* <Pagination count={6} defaultPage={1} siblingCount={10} shape="rounded" onChange={handlePageChange}/> */}
                </Stack>
            </div>
        </Paper>
    );
}
