import axios from "axios";
import {
  EMAIL_REGISTER,
  EMAIL_REGISTER_FAILURE,
  EMAIL_REGISTER_SUCCESS,
  EMAIL_SIGN_IN,
  EMAIL_SIGN_IN_FAILURE,
  EMAIL_SIGN_IN_SUCCESS,
  GET_USER,
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
  LOGOUT,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
} from "../constant";
import { getUserUrl, loginUrl, logoutUrl, registerUrl } from "../api";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: EMAIL_SIGN_IN,
    });

    const { data } = await axios.post(
      loginUrl,

      {
        email,
        password,
      },
      {
        withCredentials: true,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);

    if (data.success === true) {
      dispatch({
        type: EMAIL_SIGN_IN_SUCCESS,
        payload: data.message,
      });
    } else {
      dispatch({
        type: EMAIL_SIGN_IN_FAILURE,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: EMAIL_SIGN_IN_FAILURE,
      payload: error.response && error.response.data.message,
    });
  }
};

export const fetchUser = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER,
    });
    const { data } = await axios.get(getUserUrl, {
      credentials: "include",
      withCredentials: true,
    });
    console.log("printignf data", data);

    if (data.success === true) {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: data.user,
      });
    } else {
      dispatch({
        type: GET_USER_FAILURE,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_USER_FAILURE,
      payload: error.response && error.response.data.message,
    });
  }
};

export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: EMAIL_REGISTER,
    });
    const { data } = await axios.post(
      registerUrl,
      {
        name,
        email,
        password,
      },
      {
        withCredentials: true,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (data.success === true) {
      dispatch({
        type: EMAIL_REGISTER_SUCCESS,
        payload: data.message,
      });
    } else {
      dispatch({
        type: EMAIL_REGISTER_FAILURE,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: EMAIL_REGISTER_FAILURE,
      payload: error.response && error.response.data.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT,
    });
    const { data } = await axios.post(logoutUrl, {}, {
      credentials: "include",
      withCredentials: true,
    });
    console.log("printing data from logout", data);
    
    if (data.success === true) {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: data.message,
      });
    } else {
      dispatch({
        type: LOGOUT_FAILURE,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: LOGOUT_FAILURE,
      payload: error.response && error.response.data.message,
    });
  }
};
