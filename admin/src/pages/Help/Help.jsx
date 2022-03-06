import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    Person,
    PhoneAndroid,
    PresentToAllOutlined,
    Publish,
  } from "@material-ui/icons";
  import { Link, Redirect } from "react-router-dom";
  import { useLocation } from "react-router-dom";
  import { useSelector } from "react-redux";
  import { useEffect, useMemo, useState } from "react";
  import { userRequest } from "../../requestMethods";
  import app from "../../firebase";
  import { updateDonor } from "../../redux/apiCalls";
  import { useDispatch } from "react-redux";
  import { useHistory } from "react-router-dom";
  import FormInput from "../../FormValid"
  export default function Help() {
    const location = useLocation();
    const helpId = location.pathname.split("/")[2];
    const [inputs, setInputs] = useState({});
    const [helps, setHelps] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
   
   
  const help = useSelector((state) =>
  state.help.helps.find((help) => help._id === helpId)
  );
  useEffect(() => {
    const getHelp = async () => {
      try {
        const res = await userRequest.get(`helps/find/${helpId}`);
        setHelps(res.data);
      } catch {}
    };
    getHelp();
  },[] );
  

    return (
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Person Infomation</h1>
         
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowBottom">
              <span className="userShowTitle">Infomation</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">Name : <span className="userShowInfoItem"> {help.username}</span></span>
              </div>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">Phone Number : <span className="userShowInfoItem"> {help.phone}</span></span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">Mail : <span className="userShowInfoItem"> {help.email}</span></span>
              </div>
              <div className="userShowInfo">
                <PresentToAllOutlined className="userShowIcon" />
                <span className="userShowInfoTitle">Present need : <span className="userShowInfoItem"> {help.amount}</span></span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">Address : <span className="userShowInfoItem"> {help.address}</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  