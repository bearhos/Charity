import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import { store } from 'react-notifications-component';
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";
import {
  getDonorFailure,
  getDonorStart,
  getDonorSuccess,
  deleteDonorFailure,
  deleteDonorStart,
  deleteDonorSuccess,
  updateDonorFailure,
  updateDonorStart,
  updateDonorSuccess,
  addDonorFailure,
  addDonorStart,
  addDonorSuccess,
} from "./donorRedux";
import {
  getHelpFailure,
  getHelpStart,
  getHelpSuccess,
  deleteHelpFailure,
  deleteHelpStart,
  deleteHelpSuccess,
  updateHelpFailure,
  updateHelpStart,
  updateHelpSuccess,
  addHelpFailure,
  addHelpStart,
  addHelpSuccess,
} from "./helpRedux";
import { useHistory } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    store.addNotification({
      title: "Success",
      message: "Login success",
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
    

    
  } catch (err) {
    dispatch(loginFailure());
    
    
  }
};
//product
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products/");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`,product);
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};
//donor
export const getDonors = async (dispatch) => {
  dispatch(getDonorStart());
  try {
    const res = await publicRequest.get("/donors/?new=true");
    dispatch(getDonorSuccess(res.data));
  } catch (err) {
    dispatch(getDonorFailure());
  }
};
export const getDonor = async (id,dispatch) => {
  dispatch(getDonorStart());
  try {
    const res = await publicRequest.get(`/donors/${id}`);
    dispatch(getDonorSuccess(res.data));
  } catch (err) {
    dispatch(getDonorFailure());
  }
};

export const deleteDonor = async (id, dispatch) => {
  dispatch(deleteDonorStart());
  try {
    const res = await userRequest.delete(`/donors/${id}`);
    dispatch(deleteDonorSuccess(id));
    store.addNotification({
  
      title: "Success",
      message: "Delete success",
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
    const history = useHistory();
    history.push("/");
  } catch (err) {
    dispatch(deleteDonorFailure());
  }
};

export const updateDonor = async (id, donor, dispatch) => {
  dispatch(updateDonorStart());
  try {
    const res = await userRequest.put(`/donors/${id}`,donor);
    dispatch(updateDonorSuccess({ id, donor }));
    alert("Done")
  } catch (err) {
    dispatch(updateDonorFailure());
  }
};
export const addDonor = async (donor, dispatch) => {
  dispatch(addDonorStart());
  try {
    const res = await userRequest.post(`/donors`, donor);
    dispatch(addDonorSuccess(res.data));
    store.addNotification({
  
      title: "Success",
      message: "Create success",
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
   

  } catch (err) {
    dispatch(addDonorFailure());
    store.addNotification({
  
      title: "Error",
      message: `${err}`,
      type: "danger",
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
};
//Helps

export const getHelps = async (dispatch) => {
  dispatch(getHelpStart());
  try {
    const res = await publicRequest.get("/helps/?new=true");
    dispatch(getHelpSuccess(res.data));
  } catch (err) {
    dispatch(getHelpFailure());
  }
};
export const getHelp = async (id,dispatch) => {
  dispatch(getHelpStart());
  try {
    const res = await publicRequest.get(`/helps/${id}`);
    dispatch(getHelpSuccess(res.data));
  } catch (err) {
    dispatch(getHelpFailure());
  }
};

export const deleteHelp = async (id, dispatch) => {
  dispatch(deleteHelpStart());
  try {
    const res = await userRequest.delete(`/helps/${id}`);
    dispatch(deleteHelpSuccess(id));
    store.addNotification({
  
      title: "Success",
      message: "Delete success",
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
    const history = useHistory();
    history.push("/");
  } catch (err) {
    dispatch(deleteHelpFailure());
  }
};

export const updateHelp = async (id, help, dispatch) => {
  dispatch(updateHelpStart());
  try {
    const res = await userRequest.put(`/helps/${id}`,help);
    dispatch(updateHelpSuccess({ id, help }));
    alert("Done")
  } catch (err) {
    dispatch(updateHelpFailure());
  }
};
export const addHelp = async (help, dispatch) => {
  dispatch(addHelpStart());
  try {
    const res = await userRequest.post(`/helps`, help);
    dispatch(addHelpSuccess(res.data));
    store.addNotification({
  
      title: "Success",
      message: "Send success",
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
    const history = useHistory();
    history.push("/");
    

  } catch (err) {
    dispatch(addHelpFailure());
    
  }
};

