import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  Person,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, Redirect } from "react-router-dom";
import "./user.css";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import app from "../../firebase";
import { updateDonor } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import FormInput from "../../FormValid"
export default function User() {
  const location = useLocation();
  const donorId = location.pathname.split("/")[2];
  const [inputs, setInputs] = useState({});
  const [donors, setDonors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [values, setValues] = useState({
    username: "",
    email: "",
    address: "",
    phone: "",
    amount: "",
    gender: "Male"
  });
  const inputs2 = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Donor Name",
      errorMessage:
        "Full name may have 3 to 24 character and doesn't have number",
      label: "Donor Name",
      pattern: "^[A-Za-z \ A-Za-z ]{3,24}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "address",
      type: "text",
      placeholder: "Address",
      label: "Address",
    },
    {
      id: 4,
      name: "phone",
      type: "phone",
      placeholder: "Phone number",
      errorMessage:
        "Phone number may have 9 to 11 number",
      label: "Phone number",
      pattern: "{9-11}",
      required: true,
    },
    {
      id: 5,
      name: "amount",
      type: "number",
      placeholder: "Total Money",
      errorMessage: "Money must be lager than 1",
      label: "Total Money",
      pattern: " ^[1-9][0-9]*$",
      required: true,
    },
  ];
 
  

  

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
const donor = useSelector((state) =>
state.donor.donors.find((donor) => donor._id === donorId)
);
useEffect(() => {
  const getDonor = async () => {
    try {
      const res = await userRequest.get(`donors/find/${donorId}`);
      setDonors(res.data);
    } catch {}
  };
  getDonor();
},[] );

const handleClick = (e) => {
  e.preventDefault();
  const donor = {...values}
  updateDonor(donorId,donor, dispatch);
  setTimeout(() => {
    history.push("/donors");
  }, 2000);
  

 
};

  
  
  
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit Donor</h1>
       
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowBottom">
            <span className="userShowTitle">Donor Infomation</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{donors.username}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{donors.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{donors.email}</span>
            </div>
            <div className="userShowInfo">
              <Person className="userShowIcon" />
              <span className="userShowInfoTitle">{donors.gender}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{donors.address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
            {inputs2.map((input) => (
          <FormInput
            className="inputUploadUser"
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={handleChange}
          />
        ))}
       <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input name="gender" type="radio" name="gender" id="male" value="Male" onChange={handleChange} />
            <label for="male">Male</label>
            <input name="gender"  type="radio" name="gender" id="female" value="Female" onChange={handleChange}/>
            <label for="female">Female</label>
            <input name="gender"  type="radio" name="gender" id="other" value="Other" onChange={handleChange}/>
            <label for="other">Other</label>
          </div>
          </div>
            </div>
            <div className="userUpdateRight">
             
              <button className="userUpdateButton" onClick={handleClick} >Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
