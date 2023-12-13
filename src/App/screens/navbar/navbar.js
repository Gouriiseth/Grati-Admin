import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
// import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// grati-admin\src\Assets\images\icons\notification.png
import Notification from "../../../Assets/images/icons/notification.png";
import Badge from "@mui/material/Badge";
import ArrowDown from "../../../Assets/images/icons/arrow-down.png";
// import AdbIcon from '@mui/icons-material/Adb';
import "./navbar.css";
import ProfilePopUp from "./profilePopUp";
import User from "../../../Assets/images/icons/user.png";
import Popover from "@mui/material/Popover";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);

  // const handleClick = () => {
  //   setProfilePopupOpen(!isProfilePopupOpen);
  // };

  // const handleClose = () => {
  //   setProfilePopupOpen(false);
  // };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const fullNamee=localStorage.getItem("fullName")
  const email=localStorage.getItem("email")
  // console.log(fullName);
  return (
    <div className="w-full z-10 right-0 h-16 px-6 py-3 bg-white shadow justify-end items-start gap-3 inline-flex">
      <div className="justify-center items-center gap-5 flex">
        <div className="w-8 h-8 justify-center items-center flex">
          {/* <div className="w-8 h-8 relative">
            <img src={Notification} alt="" />
          </div> */}
          <div className="w-8 h-8 relative">
            <Badge
              badgeContent={4}
              color="primary"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              // className="mr-1 mt-[6px]"
            >
              {/* <MailIcon color="action" /> */}
              <img src={Notification} alt="" />
            </Badge>
          </div>
        </div>
        <div
          className="justify-center items-center gap-3 flex cursor-pointer"
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
        >
          <div className="bg-gray-300 w-10 -10 rounded-full">
            <img className="w-15 h-15 rounded-full" src={User} alt="" />
          </div>
          <div className="flex-col justify-start items-start inline-flex">
            <div className="text-black text-base font-semibold font-['Plus Jakarta Sans']">
            {/* {fullName !== undefined ? fullName : 'ADMIN NAME'} */}
            {fullNamee}
            </div>
            <div className="text-zinc-500 text-sm font-normal font-['Plus Jakarta Sans']">
              {email}
            </div>
          </div>
          <div className="w-6 h-6 justify-center items-center flex">
            {/* <button className="w-6 h-6 relative" onClick={handleClick}> */}
            <button className="w-6 h-6 relative">
              <img src={ArrowDown} alt="arrow icon" />
            </button>
          </div>
        </div>
      </div>
      {/* {isProfilePopupOpen && <ProfilePopUp onClose={handleClose} />} */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        className="mt-3"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <ProfilePopUp
          setProfilePopupOpen={setProfilePopupOpen}
          handleClosee={handleClose}
        />
        {/* <Typography sx={{ p: 2 }}></Typography> */}
      </Popover>
    </div>
  );
};
export default Navbar;
