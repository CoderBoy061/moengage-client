import { createReducer } from "@reduxjs/toolkit";
import {
  ADD_LIST,
  ADD_LIST_FAILURE,
  ADD_LIST_SUCCESS,
  CLEAR_ERROR,
  FETCH_ALL_LISTS,
  FETCH_ALL_LISTS_SUCCESS,
  FETCH_ALL_LISTS_FAILURE,
  UPDATE_LIST,
  UPDATE_LIST_SUCCESS,
  UPDATE_LIST_FAILURE,
  DELETE_LIST,
  DELETE_LIST_SUCCESS,
  DELETE_LIST_FAILURE
} from "../constant";

const initialState = {
  loading: false,
  error: null,
  list: [],
  message: null,
};

export const listReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ADD_LIST, (state) => {
      state.loading = true;
    })
    .addCase(ADD_LIST_SUCCESS, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(ADD_LIST_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(CLEAR_ERROR, (state) => {
      state.error = null;
      state.message = null;
    });

  builder.addCase(FETCH_ALL_LISTS, (state) => {
    state.loading = true;
  });

  builder.addCase(FETCH_ALL_LISTS_SUCCESS, (state, action) => {
    state.loading = false;
    state.list = action.payload;
  });

  builder.addCase(FETCH_ALL_LISTS_FAILURE, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  builder.addCase(UPDATE_LIST, (state) => {
    state.loading = true;
  });

  builder.addCase(UPDATE_LIST_SUCCESS, (state, action) => {
    state.loading = false;
    state.message = action.payload;
  });

  builder.addCase(UPDATE_LIST_FAILURE, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  builder.addCase(DELETE_LIST, (state) => {
    state.loading = true;
  });

  builder.addCase(DELETE_LIST_SUCCESS, (state, action) => {
    state.loading = false;
    state.message = action.payload;
  });
  builder.addCase(DELETE_LIST_FAILURE, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
});
