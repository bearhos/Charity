import "./helpList.css";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,}
from "@material-ui/data-grid"
import { DeleteOutline, Visibility } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteHelp, getHelps } from "../../redux/apiCalls";
import { store } from 'react-notifications-component';
import {format} from "timeago.js"
import NumberFormat from "react-number-format";
export default function HelpList() {
  const dispatch = useDispatch();
  const helps = useSelector((state) => state.help.helps);
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  useEffect(() => {
    getHelps(dispatch);
  }, [dispatch]);
  function CustomToolbar() {
    return (
      <GridToolbarContainer className="exportTable" >
        <GridToolbarExport   />
      </GridToolbarContainer>
    );
  }
  const handleDelete = (id) => {
    deleteHelp(id, dispatch);
  };
  
  const columns = [
    {
      field: "username",
      headerName: "Name",
      fontWeight: 300,
      
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
    { field: "phone", headerName: "Phone", width: 120 },
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
      headerName: "Present",
      width: 160,
      align: 'center',

    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/help/" + params.row._id}>
              <button className="helpDisplay"> <Visibility/></button>
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
        rows={helps}
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
