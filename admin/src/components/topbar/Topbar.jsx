import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { logOut } from "../../redux/apiCalls";


export default function Topbar() {
  const user = useSelector((state) => state.user.currentUser.username );

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Charity Fund Management</span>
        </div>
        <div className="topRight">
          <div className="textRight">
            Hello <span>{user}</span>
          </div>
          </div>
        </div>
      </div>
  
  );
}
