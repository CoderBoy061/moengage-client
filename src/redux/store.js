import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./reducer/user-reducer";
import {listReducer} from "./reducer/list-reducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    list: listReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    devTools: import.meta.env.VITE_REACT_APP_NODE_ENV === "development",
});
