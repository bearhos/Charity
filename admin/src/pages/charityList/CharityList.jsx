import "./charityList.css";
import { DataGrid,GridToolbarContainer,
  GridToolbarExport } from "@material-ui/data-grid";
import { DeleteOutline,Image } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import { store } from 'react-notifications-component';
import {format} from "timeago.js"
import Example from "../../notification";

export default function CharityList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  function CustomToolbar() {
    return (
      <GridToolbarContainer className="exportTable" >
        <GridToolbarExport   />
      </GridToolbarContainer>
    );
  }

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
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
    
  };
  const handleImage = (url) =>{
    window.open(url)
  }
  

  

  const columns = [
    { field: "_id", headerName: "ID", width: 80 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        
        return (
          <>
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.fullname}
          </div>
          </>
        );
      },
    },
    { field: "status", headerName: "Activity Status", width: 200,align: 'center',
    renderCell: (params)=>{
        return(
          <Button type={params.row.status} />
        )
    }},
    {
      field: "present",
      headerName: "Charity Present",
      align: 'center',
      width: 200,
    },
    {
      field: "address",
      headerName: "Adress",
      align: 'left',
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/charity/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
            <Image
              className="productListImage"
              onClick={() => handleImage(params.row.img)}
              
            />
          </>
        );
      },
    },
    {
      field: "Date",
      headerName: "Date",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <div>
              <span>{format(params.row.createdAt)}</span>
            </div>
            
          </>
        );
      },
    },
  ];

  return (
    <>
    
    <div className="productList">
      <div className="button">

    <Link to="/newcharity">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
       

      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        id={Math.random()}
        checkboxSelection
        className="tableProduct"
        components={{
          Toolbar: CustomToolbar,
        }}
        

      />
      
      
    </div>
    
    </>
  );
}
