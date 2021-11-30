import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../Loader/Loader";
import {LockOpen} from "@material-ui/icons"
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearError, resetPassword} from "../../actions/userAction"
import { FORGOT_PASSWORD_RESET } from "../../constants/UserConstants";
import MetaData from "../layout/MetaData";


const ResetPassword = ({match,history}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
  
  
    const {error,message,loading,success} = useSelector(state => state.forgotPassword)
  
  
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("")  
  const token = match.params.token;
  
    
  
    const updateProfileSubmit = (e) => {
      e.preventDefault();
      
      const myForm = new FormData();
  
      myForm.set("password", newPassword);
      myForm.set("confirmPassword",confirmPassword)
      dispatch(resetPassword(token,myForm));
    };
  
  
    useEffect(() => {
     
      if(error){
        alert.error(error);
        dispatch(clearError())
      }
      if(success){
          alert.success("Password Reset Successfull")
          history.push("/login")
        dispatch({
            type:FORGOT_PASSWORD_RESET
        })
      }
      window.scrollTo(0, 0)

      
    },
    [dispatch,error,alert,message,success,history])
    return (
        <Fragment>
        {loading ? <Loader/>:<Fragment>
        <MetaData title="Update Profile" />
        <div className="updateProfileContainer">
          <div className="updateProfileBox">
            <h2 className="updateProfileHeading">Update Profile</h2>

            <form
              className="updateProfileForm"
              encType="multipart/form-data"
              onSubmit={updateProfileSubmit}
            >
           
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
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                  />
                </div>
            
              <input
                type="submit"
                value="Forgot Password"
                className="updateProfileBtn"
              />
            </form>
          </div>
        </div>
      </Fragment>}
    </Fragment>
    )
}

export default ResetPassword
