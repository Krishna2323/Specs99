import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createBanner } from "../../actions/bannerAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DescriptionIcon from "@material-ui/icons/Description";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import {FormatSize} from "@material-ui/icons";
import SideBar from "./Sidebar";
import { NEW_BANNER_RESET } from "../../constants/Bannerconstants";

const NewBanner = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newBanner);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [displayType, setDisplayType] = useState("")





  const display =[
    "Featured",
    "New Arrival",
    "Most Selling",
    "99",
    "Trending",
    "Top Brands",
    "Banner"
  ]

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Banner Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_BANNER_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("displayType", displayType);






    images.forEach((image) => {
      myForm.append("image", image);
    });
    dispatch(createBanner(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Banner" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Banner</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Banner Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>


            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Banner Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

        

          
        

            <div>
              <FormatSize />
              <select onChange={(e) => setDisplayType(e.target.value)}>
                <option value="">Choose Display Type</option>
                {display.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create Banner
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewBanner;
