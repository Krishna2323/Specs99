import React, { Fragment, useState, useEffect } from "react";
import "./LoginSignUp.css";
import "./UpdatePassword.css";


import Loader from "../Loader/Loader";
import {useHistory} from "react-router-dom"
import {LockOpen} from "@material-ui/icons"
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {clearError, updatePassword, loadUser} from "../../actions/userAction"

import MetaData from "../layout/MetaData";
import { UPDATE_PASSWORD_RESET } from "../../constants/UserConstants";


const UpdatePassword = () => {


    const dispatch = useDispatch();
    const alert = useAlert();
  
  
    const {error,isUpdated,loading} = useSelector(state => state.profile)
  
    const history = useHistory();
  
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setcConfirmPassword] = useState('')

  
  

  
    
  
    const updatePasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("oldPassword", oldPassword);
      myForm.set("newPassword",newPassword);
      myForm.set("confirmPassword",confirmPassword)
   
  
  
      dispatch(updatePassword(myForm))
    };

  
    useEffect(() => {
     
      if(error){
        alert.error(error);
        dispatch(clearError())
      }
      if(isUpdated){
          alert.success("Password Updated Successfully")
          dispatch(loadUser())
        history.push("/account")
        dispatch({
            type:UPDATE_PASSWORD_RESET
        })
      }
  
      
    },
    [dispatch,error,alert,isUpdated,history])

    return (
        <Fragment>
        {loading ? <Loader/>:<Fragment>
        <MetaData title="Update Profile" />
        <div className="updatePasswordContainer">
          <div className="updatePasswordBox">
            <h2 className="updatePasswordHeading">Update Profile</h2>

            <form
              className="updatePasswordForm"
              encType="multipart/form-data"
              onSubmit={updatePasswordSubmit}
            >
              <div className="signUpPassword">
                  <LockOpen />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    name="password"
                    value={oldPassword}
                    onChange={(e)=>setOldPassword(e.target.value)}
                  />
                </div> 
                <div className="signUpPassword">
                  <LockOpen />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    name="password"
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}
                  />
                </div> 
                <div className="signUpPassword">
                  <LockOpen />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    name="password"
                    value={confirmPassword}
                    onChange={(e)=>setcConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                type="submit"
                value="Update"
                className="updateProfileBtn"
              />
            </form>
          </div>
        </div>
      </Fragment>}
    </Fragment>
    )
}

export default UpdatePassword
