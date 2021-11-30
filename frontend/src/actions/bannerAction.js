import axios from "axios";
import {NEW_BANNER_REQUEST,NEW_BANNER_FAIL,NEW_BANNER_SUCCESS,CLEAR_ERRORS, ALL_BANNER_REQUEST, ALL_BANNER_SUCCESS, ALL_BANNER_FAIL, DELETE_BANNER_REQUEST, DELETE_BANNER_SUCCESS, DELETE_BANNER_FAIL} from "./../constants/Bannerconstants"


export const createBanner = (bannerData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_BANNER_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(
        `/api/vi/admin/banner/new`,
        bannerData,
        config
      );
  
      dispatch({
        type: NEW_BANNER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_BANNER_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  export const getBanners = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_BANNER_REQUEST });

   
  
      const { data } = await axios.get(`/api/vi/banners`);
      dispatch({
        type: ALL_BANNER_SUCCESS,
        payload: data,
      });
    } catch (error) {
     
      dispatch({
        type: ALL_BANNER_FAIL,
        payload: error.stack,
      });
    }
  };

  export const deleteBanner = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_BANNER_REQUEST });
  
      const { data } = await axios.delete(`/api/vi/admin/banner/${id}`);
  
      dispatch({
        type: DELETE_BANNER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_BANNER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  

  // Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };