import "./newUser.css";
import { useState } from "react";
import { addDonor} from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import FormInput from "../../FormValid"



export default function NewUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputs, setInputs] = useState({});
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
        "Phone number is not valid",
      label: "Phone number",
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
  const handleClick = (e) => {
    e.preventDefault();
    const donor = { ...values};
    addDonor(donor, dispatch);
    setTimeout(() => {
      history.push("/donors");
    }, 2000);
          
      
      }
console.log(values)

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
      {inputs2.map((input) => (
          <FormInput
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
        <button className="newUserButton" onClick={handleClick}>Create</button>
      </form>
    </div>
  );
}
