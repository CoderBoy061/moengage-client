
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteList,
  fetchAllLists,
  updateList,
} from "../redux/action/list-action";
import { useNavigate, Link } from "react-router-dom";
import { CLEAR_ERROR } from "../redux/constant";

const ListPage = () => {
  const dispatch = useDispatch();
  const { loading, message, error, list } = useSelector((state) => state.list);
  const navigate = useNavigate();
  const [editCardId, setEditCardId] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    if (message) {
      alert(message);
      dispatch({ type: CLEAR_ERROR });
    }

    if (error) {
      alert(error);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [message, error, dispatch]);

  useEffect(() => {
    dispatch(fetchAllLists());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-300">
        <h1 className="text-fuchsia-600">Loading......</h1>
      </div>
    );
  }

  // ====================converting the date into the readable format=========================
  const convertedDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
  };

  // ====================extracting the status code from the image link=========================
  const extractStatusCode = (imageLink) => {
    const match = imageLink.match(/\/(\d+)\.jpg/);
    const number = match ? match[1] : null;
    return number;
  };

  // ====================handling the edit toggle=========================
  const handleEditToggle = (id, currentName) => {
    if (editCardId === id) {
      setEditCardId(null);
    } else {
      setEditCardId(id);
      setName(currentName);
    }
  };

  // ====================updating the card=========================
  const updateCardHandler = (id) => {
    if (name === "") {
      alert("Please enter the name");
      return;
    }
    dispatch(updateList(id, name));
    setEditCardId(null);
  };

  return (
    <div>
      <button
        onClick={() => navigate("/")}
        className="inline-block mt-4 ml-4 rounded border border-indigo-600 bg-indigo-600 px-8 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
      >
        Back to Home Page
      </button>
      <h1 className="font-bold text-xl text-red-400 text-center pt-5">
        List Page
      </h1>

      {list && list.length > 0 ? (
        <div className="grid items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {list.map((item) => (
            <div
              key={item?._id}
              className="overflow-hidden rounded-lg shadow-lg transition hover:shadow-xl cursor-pointer"
            >
              <Link to={`/list/${extractStatusCode(item?.codeImage)}`}>
                <img
                  title="Click to view details"
                  alt=""
                  src={item?.codeImage}
                  className="w-full h-48 sm:h-56 object-cover"
                />
              </Link>
              <div className="px-4 py-2">
                <div className="font-bold text-lg mb-2">ID: {item?._id}</div>
                <div className="font-bold text-lg mb-2">
                  {editCardId === item?._id ? (
                    <label
                      htmlFor="UserEmail"
                      className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                    >
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      />
                    </label>
                  ) : (
                    <p className="text-sm">{item?.codeName}</p>
                  )}
                </div>
                <div className="text-sm mb-2">
                  Date of Creating: {convertedDate(item?.createdAt)}
                </div>
              </div>
              <div className="flex justify-center items-center gap-3 p-4">
                <button
                  onClick={() => dispatch(deleteList(item?._id))}
                  className="inline-block rounded border border-red-600 bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-500"
                >
                  Remove
                </button>
                <button
                  onClick={() =>
                    editCardId === item?._id
                      ? updateCardHandler(item?._id)
                      : handleEditToggle(item?._id, item?.codeName)
                  }
                  className="inline-block rounded border border-indigo-600 bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                >
                  {editCardId === item?._id ? "Save" : "Edit"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-2xl mt-11">No List Found</p>
      )}
    </div>
  );
};

export default ListPage;

