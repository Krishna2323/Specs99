import {
  NEW_BANNER_FAIL,
  NEW_BANNER_RESET,
  NEW_BANNER_REQUEST,
  NEW_BANNER_SUCCESS,
  ALL_BANNER_FAIL,
  ALL_BANNER_REQUEST,
  ALL_BANNER_SUCCESS,
  CLEAR_ERRORS,
  DELETE_BANNER_REQUEST,
  DELETE_BANNER_FAIL,
  DELETE_BANNER_RESET,
  DELETE_BANNER_SUCCESS,
} from "../constants/Bannerconstants";

export const newBannerReducer = (state = { banner: {} }, action) => {
  switch (action.type) {
    case NEW_BANNER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_BANNER_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        banner: action.payload.banner,
      };
    case NEW_BANNER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_BANNER_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const bannersReducer = (state = { banners: [] }, action) => {
  switch (action.type) {
    case ALL_BANNER_REQUEST:
      return {
        loading: true,
        banners: [],
      };
    case ALL_BANNER_SUCCESS:
      return {
        loading: false,
        success:action.payload.success,
        banners: action.payload.banners,
      };
    case ALL_BANNER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};


export const bannerReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_BANNER_REQUEST:
  
      return {
        ...state,
        loading: true,
      };
    case DELETE_BANNER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
      };

 
    case DELETE_BANNER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_BANNER_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};