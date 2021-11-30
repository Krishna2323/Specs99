import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../Loader/Loader";
import {MailOutline} from "@material-ui/icons"
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearError,forgotPassword} from "../../actions/userAction"
import { FORGOT_PASSWORD_RESET } from "../../constants/UserConstants";
import MetaData from "../layout/MetaData";

const ForgotPassword = () => {
    const dispatch = useDispatch();
  const alert = useAlert();


  const {error,message,loading} = useSelector(state => state.forgotPassword)


const [email, setEmail] = useState("")



  

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    
    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };


  useEffect(() => {
   
    if(error){
      alert.error(error);
      dispatch(clearError())
    }
    if(message){
        alert.success(message)
      dispatch({
          type:FORGOT_PASSWORD_RESET
      })
    }
    window.scrollTo(0, 0)

    
  },
  [dispatch,error,alert,message,])
    
        return ( <Fragment>
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
               
                  <div className="updateProfileEmail">
                    <MailOutline />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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

export default ForgotPassword
