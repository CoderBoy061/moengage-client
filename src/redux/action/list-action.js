import axios from "axios";
import {
  ADD_LIST,
  ADD_LIST_FAILURE,
  ADD_LIST_SUCCESS,
  DELETE_LIST,
  DELETE_LIST_FAILURE,
  DELETE_LIST_SUCCESS,
  FETCH_ALL_LISTS,
  FETCH_ALL_LISTS_FAILURE,
  FETCH_ALL_LISTS_SUCCESS,
  UPDATE_LIST,
  UPDATE_LIST_FAILURE,
  UPDATE_LIST_SUCCESS,
} from "../constant";
import {
  addListUrl,
  getAllListUrl,
  removeListUrl,
  updateListUrl,
} from "../api";

export const addList =
  ({ codeName, codeImage }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ADD_LIST,
      });

      const { data } = await axios.post(
        addListUrl,
        {
          codeName,
          codeImage,
        },
        {
          credentials: "include",
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success === true) {
        dispatch({
          type: ADD_LIST_SUCCESS,
          payload: data.message,
        });
      } else {
        dispatch({
          type: ADD_LIST_FAILURE,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: ADD_LIST_FAILURE,
        payload: error.response && error.response.data.message,
      });
    }
  };

export const fetchAllLists = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_ALL_LISTS,
    });

    const { data } = await axios.get(getAllListUrl, {
      credentials: "include",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (data.success === true) {
      dispatch({
        type: FETCH_ALL_LISTS_SUCCESS,
        payload: data?.lists,
      });
    } else {
      dispatch({
        type: FETCH_ALL_LISTS_FAILURE,
        payload: data?.message,
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_ALL_LISTS_FAILURE,
      payload: error.response && error.response.data.message,
    });
  }
};

export const updateList = (id, codeName) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_LIST,
    });

    const { data } = await axios.patch(
      `${updateListUrl}/${id}`,
      {
        codeName,
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
      dispatch(fetchAllLists());

      dispatch({
        type: UPDATE_LIST_SUCCESS,
        payload: data.message,
      });
    } else {
      dispatch({
        type: UPDATE_LIST_FAILURE,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_LIST_FAILURE,
      payload: error.response && error.response.data.message,
    });
  }
};

export const deleteList = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_LIST,
    });

    const { data } = await axios.delete(`${removeListUrl}/${id}`, {
      withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (data.success === true) {
      dispatch(fetchAllLists());

      dispatch({
        type: DELETE_LIST_SUCCESS,
        payload: data.message,
      });
    } else {
      dispatch({
        type: DELETE_LIST_FAILURE,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: DELETE_LIST_FAILURE,
      payload: error.response && error.response.data.message,
    });
  }
};
