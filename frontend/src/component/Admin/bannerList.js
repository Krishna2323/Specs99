import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteBanner,
  getBanners
  
} from "../../actions/bannerAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_BANNER_RESET } from "../../constants/Bannerconstants";

const BannerList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, banners} = useSelector((state) => state.banners);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.banner
  );
  const deleteProductHandler = (id) => {
    dispatch(deleteBanner(id));
  };


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Banner Deleted Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: DELETE_BANNER_RESET });
    }
    dispatch(getBanners());
  }, [dispatch, alert, error, history, deleteError,isDeleted

]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
        field: "displayType",
        headerName: "Display Type",
        type: "string",
        minWidth: 150,
        flex: 0.3,
      },
  


    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/banner/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  banners &&
    banners.forEach((item) => {
      rows.push({
        id: item._id,
       displayType:item.displayType,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL BANNERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL BANNERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={20}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default BannerList;
