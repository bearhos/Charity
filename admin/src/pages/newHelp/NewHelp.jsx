import "./help.css"
import { useState } from "react";
import { addDonor, addHelp} from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import FormInput from "../../FormValid"
import ReactNotification from 'react-notifications-component'


export default function NewHelp() {
    
    const dispatch = useDispatch();
    const history = useHistory();
    const [inputs, setInputs] = useState({});
    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
          });
      };
      const handleClick = (e) => {
        e.preventDefault();
        const help = { ...inputs };
        addHelp(help, dispatch);
        setTimeout(() => {
            history.push("/");
          }, 2000);
        
      }
      console.log(dispatch)

    return (
        <div className='helpContainer'>
             <ReactNotification/>
            <div className="wrapper">
    <h2 className="helpTitle">CONTACT US</h2>
    <form action="" method="POST">
      <div className="form-group">
        <label for="name">Full Name</label>
        <input onChange={handleChange} type="text" name="username" id="name" placeholder="First and Last" required minlength="3" maxlength="25" />
      </div>
      <div className="form-group">
        <label for="phone">Phone Number</label>
        <input onChange={handleChange} type="number" name="phone" id="number" placeholder="09066****" required />
      </div>
      <div className="form-group">
        <label for="phone">Address</label>
        <input onChange={handleChange} type="text" name="address" id="number" placeholder="Tphcm...." required />
      </div>
      <div className="form-group">
        <label for="email">Email</label>
        <input onChange={handleChange} type="email" name="email" id="email" placeholder="email@domain.tld" required />
      </div>
      <div className="form-group">
        <label for="amount">How many people in home</label>
        <input onChange={handleChange} type="number" name="amount" id="amount" placeholder="2" required />
      </div>
      <div className="form-group">
        <button onClick={handleClick} class="submit">Send</button>
      </div>
    </form>
  </div>
 
        </div>
    )
}
