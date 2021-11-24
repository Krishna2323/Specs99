import React, { Fragment, useState } from "react";
import "./UserOptions.css"

import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { DashboardOutlined, Person, ExitToApp, ListAlt,ShoppingCart } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/userAction";


const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);

  const history =useHistory();
const dispatch = useDispatch()
const alert =useAlert();

  const options = [
    { icon: <ShoppingCart            style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
    />, name: `Cart(${cartItems.length})`, funcs: Cart },

    { icon: <Person/> ,name: "Profile", funcs: account },
    { icon: <ListAlt />, name: "Orders", funcs: orders },
    { icon: <ExitToApp />, name: "Logout", funcs: LogoutUser },

  ];

  if (user.role === "admin") {
    options.unshift({ icon: <DashboardOutlined />, name: "Dashboard", funcs: dashboard });
  }

  function account(){
      history.push("/account")
  }
  function Cart(){
    history.push("/cart")
}
  function orders(){
    history.push("/orders")
}
function dashboard(){
    history.push("/admin/dashboard")
}
function LogoutUser(){
    dispatch(logout())
    alert.success("Logout Successful")
}

  return (
    <Fragment>
     <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        direction="down"
        className="speedDial"
        open={open}
        style={{ zIndex: "11" }}

        icon={

          <img
            className="speedDialIcon"
            src={ user.avatar.url}
            alt="Profile"
          />
     
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.funcs}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
       
          ></SpeedDialAction>
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
