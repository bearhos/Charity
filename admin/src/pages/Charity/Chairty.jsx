import { Link, useLocation } from "react-router-dom";
import "./charity.css";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import app from "../../firebase";
import { updateProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { store } from 'react-notifications-component';
import FormInput from "../../FormValid"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function Charity() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [url, setUrl] = useState("");
  const [pStats, setPStats] = useState([]);
  const dispatch = useDispatch();
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
  const product = useSelector((state) =>
  state.product.products.find((product) => product._id === productId)
);


const handleCat = (e) => {
  setCat(e.target.value.split(","));
};
  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        if (progress ===100){
          
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
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrl(url)
          const product = { ...values, img: url};
          updateProduct(productId,product, dispatch);
          test()
        });
      }
    );
  };



const test = (e)=>{ 
  store.addNotification({
  
  title: "Success",
  message: "Update done",
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


 

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a,b)=>{
            return a._id - b._id
        })
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);
  return (
    <div className="product">
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
          {inputs2.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.value]}
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
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={url|| "http://via.placeholder.com/300"} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
            </div>
            
            <button onClick={handleClick} className="productButton">Update</button>
           
            
          </div>
        </form>
      </div>
    </div>
  );
}
