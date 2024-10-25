import React, { useCallback, useEffect } from "react";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import ListPage from "./pages/ListPage";
import NotFound from "./pages/NotFound.jsx";
import { Routes, Route } from "react-router-dom";
import ListDetails from "./pages/ListDetails.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./redux/action/user-action.js";
import PrivateRoute from "./PrivateRoute.jsx";

const App = () => {
  const dispatch = useDispatch();

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const fetchData = useCallback(() => {
    dispatch(fetchUser());
    if (!isAuthenticated) {
      return;
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    fetchData();
  }, [fetchData, dispatch]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-600">
        <h1 className="text-fuchsia-600">Loading......</h1>
      </div>
    );
  }
  return (
    <Routes>
      <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/list/:id" element={<ListDetails />} />
      </Route>
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
