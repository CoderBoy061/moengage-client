import { createReducer } from "@reduxjs/toolkit";
import {
  CLEAR_ERROR,
  EMAIL_SIGN_IN,
  EMAIL_SIGN_IN_FAILURE,
  EMAIL_SIGN_IN_SUCCESS,
  GET_USER,
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
  EMAIL_REGISTER,
  EMAIL_REGISTER_FAILURE,
  EMAIL_REGISTER_SUCCESS,
  LOGOUT_SUCCESS
} from "../constant";
const initialState = {
  loading: false,
  message: null,
  error: null,
  isAuthenticated: false,
  user: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(EMAIL_SIGN_IN, (state) => {
      state.loading = true;
    })
    .addCase(EMAIL_SIGN_IN_SUCCESS, (state, action) => {
      console.log(action.payload);

      state.loading = false;
      state.isAuthenticated = true;
      state.message = action.payload;
    })
    .addCase(EMAIL_SIGN_IN_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  builder.addCase(GET_USER, (state) => {
    state.loading = true;
  });
  builder.addCase(GET_USER_SUCCESS, (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload;
  });
  builder.addCase(GET_USER_FAILURE, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  builder.addCase(CLEAR_ERROR, (state) => {
    state.error = null;
    state.message = null;
  });
  builder.addCase(EMAIL_REGISTER, (state) => {
    state.loading = true;
  });
  builder.addCase(EMAIL_REGISTER_SUCCESS, (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.message = action.payload;
  });
  builder.addCase(EMAIL_REGISTER_FAILURE, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  builder.addCase(LOGOUT_SUCCESS, (state) => {
    state.isAuthenticated = false;
    state.user = null;
  });
});
