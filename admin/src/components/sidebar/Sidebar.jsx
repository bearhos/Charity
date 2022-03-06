import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  Person,
  Help,
  Mail,
} from "@material-ui/icons";
import {SidebarData} from "./SidabarData"
import { Link } from "react-router-dom";
import { useState, useCallback } from "react";

export default function Sidebar() {
  const [active, setActive] = useState(null);
  const [dataTabs, setDataTabs] = useState([
    {
      id: 1,
      tabTitle: "Home",
      tabClass: "sidebarListItem",
      icon: <LineStyle className="sidebarIcon"/>,
      tabClicked: false,
      path: "/dashboard"
    },
    {
      id: 2,
      tabTitle: "Donors",
      tabClass: "sidebarListItem",
      icon: <Person className="sidebarIcon"/>,
      tabClicked: false,
      path: "/donors"

    },
    {
      id: 3,
      tabTitle: "Charity",
      tabClass: "sidebarListItem",
      icon: <Report className="sidebarIcon"/>,
      tabClicked: false,
      path: "/charities"
    },
    {
      id: 4,
      tabTitle: "Help List",
      tabClass: "sidebarListItem",
      icon: <Mail className="sidebarIcon"/>,
      tabClicked: false,
      path: "/helps"
    },
  ]);
  const NavLink = ({ id, tabTitle,icon,path, isActive, onClick }) => {
    return (
      <Link to= {path}  className="link">
      <li
        onClick={() => navigate(id)}
        className={isActive ? "sidebarListItem active" : "sidebarListItem"}
      >
        {icon}{tabTitle}
      </li>
      </Link>
    );
    
  };
  const navigate = (id) => {
    setActive(id);
  };
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          
          {dataTabs.map((item) => (
        <ul className="sidebarList" key={item.id}>
          
          <NavLink 
           {...item}  isActive={active === item.id} onClick={navigate} /> 
        </ul>
      ))}  
          
        
        </div>
        <div class="sidebarBottom">
          <Link to="/">
              <button class="sidebarButton" >Go To Home Page</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
