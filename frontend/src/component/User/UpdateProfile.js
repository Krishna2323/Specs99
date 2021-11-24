import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../Loader/Loader";
import {useHistory} from "react-router-dom"
import {MailOutline, Person} from "@material-ui/icons"
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearError,updateProfile, loadUser} from "../../actions/userAction"
import logo from "../Images/logo.png"
import { UPDATE_PROFILE_RESET } from "../../constants/UserConstants";
import MetaData from "../layout/MetaData";



const UpdateProfile = () => {

    const dispatch = useDispatch();
  const alert = useAlert();


  const {user} = useSelector(state => state.user)
  const {error,isUpdated,loading} = useSelector(state => state.profile)

  const history = useHistory();

const [name, setName] = useState("")
const [email, setEmail] = useState("")


  const [avatar, setAvatar] = useState(logo);
  const [avatarPreview, setAvatarPreview] = useState(logo);

  

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);


    dispatch(updateProfile(myForm))
  };

  const updateProfileDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } 
  };

  useEffect(() => {
      if(user){
          setName(user.name);
          setEmail(user.email);
          setAvatarPreview(user.avatar.url)
      }
    if(error){
      alert.error(error);
      dispatch(clearError())
    }
    if(isUpdated){
        alert.success("Profile Updated Successfully")
        dispatch(loadUser())
      history.push("/account")
      dispatch({
          type:UPDATE_PROFILE_RESET
      })
    }

    
  },
  [dispatch,error,alert,isUpdated,history,user])


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
              <div className="updateProfileName">
                <Person />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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

              <div id="updateProfileImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={updateProfileDataChange}
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

export default UpdateProfile
