import "./userList.css";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,}
from "@material-ui/data-grid"
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDonor, getDonors } from "../../redux/apiCalls";
import { store } from 'react-notifications-component';
import {format} from "timeago.js"
import NumberFormat from "react-number-format";
export default function UserList() {
  const dispatch = useDispatch();
  const donors = useSelector((state) => state.donor.donors);
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  useEffect(() => {
    getDonors(dispatch);
  }, [dispatch]);
  function CustomToolbar() {
    return (
      <GridToolbarContainer className="exportTable" >
        <GridToolbarExport   />
      </GridToolbarContainer>
    );
  }
  const handleDelete = (id) => {
    deleteDonor(id, dispatch);
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "User",
      fontWeight: 400,
      
      width: 200,
      // renderCell: (params) => {
      //   return (
      //     <div className="userListUser">
      //       <span className="userListTitle">{params.row.username}</span>
      //     </div>
      //   );
      // },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      align: 'center',
      renderCell: (params)=>{
          return(
            <Button type={params.row.status} />
          )
      }
    },
    {
      field: "amount",
      headerName: "Donate Money",
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <div>
            <NumberFormat value={params.row.amount} displayType={'text'} thousandSeparator={true} suffix={'$'} />
            </div>
            
          </>
        )
      },
      align: 'center',

    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/donor/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
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
     <div className="userList">
      <div className="button">

    <Link to="/newuser">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
    
    
      <DataGrid
        rows={donors}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        id={Math.random()}
        checkboxSelection
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
    </>
  );
}
