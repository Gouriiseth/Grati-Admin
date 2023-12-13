import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import GratiLogo from "../../../Assets/images/icons/gratiFullLogoWhite.png";
import grid_view from "../../../Assets/images/icons/grid_view.png";
import user from "../../../Assets/images/icons/user.png";
import coin from "../../../Assets/images/icons/coin.png";
import star from "../../../Assets/images/icons/star.png";
import setting from "../../../Assets/images/icons/setting.png";
import support from "../../../Assets/images/icons/support.png";
import "../login/login.css";
import "./sidenav.css";
import SideNavItem from "./sidenavitem";

const Sidenav = () => {
 
  return (
    <>
      <div className="contain h-[100vh]">
        <div className="py-6 gap-12">
          <div className="">
            <img
              src={GratiLogo}
              alt="logo"
              className="flex justify-center items-center mx-auto w-[92px]" //h-[59.21px]
            />
          </div>
          <div className="navContent flex flex-col gap-3"> {/*h-[402.53px]*/}
            <div className="line">
              <hr
                style={{
                  borderTop: "1px dashed rgba(255, 255, 255, 0.5)",
                  margin: "24px 0px",
                }}
              />
            </div>
            <div className="flex flex-col gap-5 px-3"> {/* h-[378px]*/}
              <List className="text-white flex flex-col gap-5 w-60 h-auto" >
                <SideNavItem to="/dashboard" label="Dashboard" img={grid_view}/>
                <SideNavItem to="/dashboard/user_management" label="User Management" img={user} />
                <SideNavItem to="/dashboard/finance_management" label="Finance Management" img={coin} />
                <SideNavItem to="/dashboard/review_management" label="Review Management" img={star} />
                <SideNavItem to="/dashboard/grati-support" label="Grati Support" img={support} />
                <SideNavItem to="/dashboard/manage" label="Manage Admins User" img={setting} />
                
              </List>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidenav;
