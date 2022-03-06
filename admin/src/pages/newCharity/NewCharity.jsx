import { useState } from "react";
import "./newCharity.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { store } from 'react-notifications-component';
import { useHistory } from "react-router-dom";
import FormInput from "../../FormValid"


export default function NewCharity() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const [values, setValues] = useState({
    fullname: "",
    address: "",
    present: "",
    status: "Done"
  });

  const inputs2 = [
    {
      id: 1,
      name: "fullname",
      type: "text",
      placeholder: "Full Name",
      errorMessage:
      "Full name may have 3 to 24 character and doesn't have number",
      label: "Name",
      pattern: "^[A-Za-z \ A-Za-z ]{3,24}$",
      required: true,
    },
    {
      id: 2,
      name: "address",
      type: "text",
      placeholder: "Address",
      label: "Address",
      errorMessage:
      "Address must be type",
      pattern: "^[A-Za-z0-9/ \ A-Za-z0-9/ ]{3,24}$",
      required: true,
    },
    {
      id: 3,
      name: "present",
      type: "number",
      placeholder: "Total Present",
      errorMessage: "Present must be lager than 1",
      label: "Total Present",
      pattern: " ^[1-9][0-9]*$",
      required: true,
    },
  ];


  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setTimeout(() => {
      history.push("/charities");
    }, 2000);
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        if (progress ===100){
          store.addNotification({
  
            title: "Success",
            message: "Create done",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 2000,
              onScreen: true
            }
          });
        }
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...values, img: downloadURL};
          addProduct(product, dispatch);
        });
      }
    );
  };
  console.log(values)

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        {inputs2.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={handleChange}
          />
        ))}
        <div className="addProductItem">
          <label>Status</label>
          <select name="status" onChange={handleChange}>
            <option value="Done">Done</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}
