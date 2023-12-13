// import React, {useState} from 'react';
// import PropTypes from 'prop-types';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableFooter from '@mui/material/TableFooter';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import IconButton from '@mui/material/IconButton';
// // import FirstPageIcon from '@mui/icons-material/FirstPage';
// import FirstPageIcon from '../../../../Assets/images/icons/coin.png';
// // import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
// // import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// // import LastPageIcon from '@mui/icons-material/LastPage';
// import KeyboardArrowLeft from '../../../../Assets/images/icons/coin.png';
// import KeyboardArrowRight from '../../../../Assets/images/icons/coin.png';
// import LastPageIcon from '../../../../Assets/images/icons/coin.png';

// // function TablePaginationActions(props) {
// //     const theme = useTheme();
// //     const { count, page, rowsPerPage, onPageChange } = props;

// //     const handleFirstPageButtonClick = (event) => {
// //         onPageChange(event, 0);
// //     };

// //     const handleBackButtonClick = (event) => {
// //         onPageChange(event, page - 1);
// //     };

// //     const handleNextButtonClick = (event) => {
// //         onPageChange(event, page + 1);
// //     };

// //     const handleLastPageButtonClick = (event) => {
// //         onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
// //     };

// //     return (
// //         <Box sx={{ flexShrink: 0, ml: 2.5 }}>
// //             <IconButton
// //                 onClick={handleFirstPageButtonClick}
// //                 disabled={page === 0}
// //                 aria-label="first page"
// //             >
// //                 {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
// //             </IconButton>
// //             <IconButton
// //                 onClick={handleBackButtonClick}
// //                 disabled={page === 0}
// //                 aria-label="previous page"
// //             >
// //                 {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
// //             </IconButton>
// //             <IconButton
// //                 onClick={handleNextButtonClick}
// //                 disabled={page >= Math.ceil(count / rowsPerPage) - 1}
// //                 aria-label="next page"
// //             >
// //                 {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
// //             </IconButton>
// //             <IconButton
// //                 onClick={handleLastPageButtonClick}
// //                 disabled={page >= Math.ceil(count / rowsPerPage) - 1}
// //                 aria-label="last page"
// //             >
// //                 {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
// //             </IconButton>
// //         </Box>
// //     );
// // }

// // TablePaginationActions.propTypes = {
// //     count: PropTypes.number.isRequired,
// //     onPageChange: PropTypes.func.isRequired,
// //     page: PropTypes.number.isRequired,
// //     rowsPerPage: PropTypes.number.isRequired,
// // };

// function createData(name, calories, fat) {
//     return { name, calories, fat };
// }

// const rows = [
//     createData('Cupcake', 305, 3.7),
//     createData('Donut', 452, 25.0),
//     createData('Eclair', 262, 16.0),
//     createData('Frozen yoghurt', 159, 6.0),
//     createData('Gingerbread', 356, 16.0),
//     createData('Honeycomb', 408, 3.2),
//     createData('Ice cream sandwich', 237, 9.0),
//     createData('Jelly Bean', 375, 0.0),
//     createData('KitKat', 518, 26.0),
//     createData('Lollipop', 392, 0.2),
//     createData('Marshmallow', 318, 0),
//     createData('Nougat', 360, 19.0),
//     createData('Oreo', 437, 18.0),
// ].sort((a, b) => (a.calories < b.calories ? -1 : 1));

// // const FinanceNew = () => {
//     export default function FinanceNew(){
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);

//     // Avoid a layout jump when reaching the last page with empty rows.
//     const emptyRows =
//         page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     return (
//         <TableContainer component={Paper} className='p-4 flex flex-col items-start'>
//             <p className="font-bold text-[14px]">Finance Management</p>
//             <div className="flex flex-row font-semibold">
//                 <p className="bg-red-200 px-4 py-[10px] rounded-l-md">Daily Report</p>
//                 <p className="bg-red-300 px-4 py-[10px]" >Monthly Report</p>
//                 <p className="bg-red-400 px-4 py-[10px]">Weekly Report</p>
//                 <p className="bg-red-500 px-4 py-[10px]">Yearly Report</p>
//                 <p className="bg-red-600 rounded-r-md px-4 py-[10px]">Custom Report</p>
//             </div>
//             <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
//                 <TableBody>
//                     {(rowsPerPage > 0
//                         ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                         : rows
//                     ).map((row) => (
//                         <TableRow key={row.name}>
//                             <TableCell component="th" scope="row">
//                                 {row.name}
//                             </TableCell>
//                             <TableCell style={{ width: 160 }} align="right">
//                                 {row.calories}
//                             </TableCell>
//                             <TableCell style={{ width: 160 }} align="right">
//                                 {row.fat}
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                     {emptyRows > 0 && (
//                         <TableRow style={{ height: 53 * emptyRows }}>
//                             <TableCell colSpan={6} />
//                         </TableRow>
//                     )}
//                 </TableBody>
//                 <TableFooter>
//                     <TableRow>
//                         <TablePagination
//                             rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
//                             colSpan={3}
//                             count={rows.length}
//                             rowsPerPage={rowsPerPage}
//                             page={page}
//                             SelectProps={{
//                                 inputProps: {
//                                     'aria-label': 'rows per page',
//                                 },
//                                 native: true,
//                             }}
//                             onPageChange={handleChangePage}
//                             onRowsPerPageChange={handleChangeRowsPerPage}
//                             // ActionsComponent={TablePaginationActions}
//                         />
//                     </TableRow>
//                 </TableFooter>
//             </Table>
//         </TableContainer>
//     );
// }


import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Download from "../../../../Assets/images/icons/download.png";
import ArrowDown from '../../../../Assets/images/icons/down_arrow.png';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '../../../../Assets/images/icons/search.png';
// import "./finance.css"

const columns = [
    { id: 'name', label: 'User Name', minWidth: 228.83 },
    { id: 'code', label: 'Date of registration', minWidth: 228.83 },
    {
        id: 'population',
        label: 'Email Address',
        minWidth: 228.83,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Contact Number',
        minWidth: 228.83,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Profile Type',
        minWidth: 228.83,
        align: 'left',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'density',
        label: 'Location',
        minWidth: 228.83,
        align: 'left',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'density',
        label: 'Mode',
        minWidth: 228.82,
        align: 'left',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'density',
        label: 'Action',
        minWidth: 179,
        align: 'left',
        format: (value) => value.toFixed(2),
    },
];

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
];

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
            width: '20ch',
        },
    },
}));

export default function FinanceNew() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    
    const pad = {
        backgroundColor:"blue",
        padding: "16px !important"
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }} className='p-6 flex flex-col gap-6'>
            {/* <div className="flex flex-row">
                <p className="font-bold text-[14px]">Finance Management</p>

            </div> */}
            <div className="tableNav h-auto flex justify-between" style={{ alignItems: "baseline" }}>
                <div className="flex flex-col content1 h-full w-auto">
                    <p className="text-[18px] font-[700] text-black" style={{ fontFamily: "Plus Jakarta Sans" }}>Finance Management</p>
                </div>
                <div className="flex gap-3 mt-[10px] w-[615px] h-[44px] font-[600] text-[14px]" style={{ fontFamily: "Plus Jakarta Sans" }}>
                    <Search>
                        <SearchIconWrapper>
                            <img src={SearchIcon} alt="" className='w-[22px] h-[22px]' />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search User"
                            inputProps={{ 'aria-label': 'search' }}
                            className='flex w-[272px] h-11 rounded-[6px] gap-1 border-[1px] p-[10px] bg-[#EEEEEE]'
                        />
                    </Search>

                    <div className='flex justify-between w-[145px] h-11 rounded-[6px] gap-1 py-2 px-[14px] bg-[#EEEEEE] font-bold '>
                        <div className='w-[77px] h-5 flex m-auto'>
                            <p style={{ fontFamily: "Inter", lineHeight: "20px", fontWeight: "500", textSize: "14px", padding: "0", color: "#888888" }}>All Type</p>
                        </div>
                        <div className='w-4 h-4 flex m-auto'>
                            <img src={ArrowDown} alt="" />
                        </div>
                    </div>

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
            {/* <div className="flex flex-row font-semibold">
                <p className="bg-red-200 px-4 py-[10px] rounded-l-md">Daily Report</p>
                <p className="bg-red-300 px-4 py-[10px]" >Monthly Report</p>
                <p className="bg-red-400 px-4 py-[10px]">Weekly Report</p>
                <p className="bg-red-500 px-4 py-[10px]">Yearly Report</p>
                <p className="bg-red-600 rounded-r-md px-4 py-[10px]">Custom Report</p>
            </div> */}
            <div className="switcher flex gap-1 justify-evenly bg-[#D9D9D9] rounded-[6px] w-[757px] h-11">
                <button type='button' className='bg-[#F8F8F8] w-[151.4px] h-11 rounded-tl-[6px] rounded-bl-[6px] py-[10px] px-4'>Daily Report</button>
                <button type='button' className='bg-[#F8F8F8] w-[151.4px] h-11 rounded-tr-[1px] px-4'>Daily Report</button>
                <button type='button' className='bg-[#F8F8F8] w-[151.4px] h-11 rounded-tr-[1px] py-[10px] px-4'>Monthly Report</button>
                <button type='button' className='bg-[#F8F8F8] w-[151.4px] h-11 rounded-tr-[1px] py-[10px] px-4'>Yearly Report</button>
                <button type='button' className='bg-[#F8F8F8] w-[151.4px] h-11 rounded-tr-[6px] rounded-br-[6px] py-[10px] px-4'>Custom Range</button>
            </div>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell
                                    key={index}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, color:"grey", padding:"12px" }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}