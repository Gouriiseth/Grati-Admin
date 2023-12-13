import { ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './sidenav.css'
const SideNavItem = ({to, label, img}) => {

    const location = useLocation();
    const isActive = location.pathname === to;

  return (
      <Link to={to} >
          <ListItem
            //   className="flex w-[142px] h-[22px] gap-[4px]"
              className={`flex gap-[4px] flex-row justify-center items-center listItem ${isActive ? 'activeHover' : ''}`}
          >
              <img
                  src={img}
                  alt="icon"
                  className="w-[22px] h-[22px]"
                //   className={`hover:bg-gray-200 ${isActive ? 'bg-gray-200' : ''}`}
              />
              <ListItemText
                  sx={{
                      fontFamily: "Plus Jakarta Sans",
                      lineHeight: "20px",
                      fontSize: "14px",
                      fontWeight: "500",
                      width: "75px",
                      height: "22px",
                  }}
                  primary={label}
              />
          </ListItem>
      </Link>  )
}

export default SideNavItem