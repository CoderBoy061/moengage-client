import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addList } from "../redux/action/list-action";
import { CLEAR_ERROR } from "../redux/constant";

const ListDetails = () => {
  const { id } = useParams();
  const [dataLoading, setDataLoading] = useState(true);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const { loading, message, error } = useSelector((state) => state.list);
  const dispatch = useDispatch();

  // ========================================shwoing the errors and messages using alert=========================================
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

  // ====================fetching the every single data from the api for showing details dynamically ===========================
  // `/api/${id}.json` for loacl environment 
  useEffect(() => {
    axios
      .get(`https://http.dog/${id}.json`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data);
        setDataLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setDataLoading(false);
      });
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {dataLoading ? (
        <div className="h-screen w-screen flex items-center justify-center bg-slate-300">
          <h1 className="text-fuchsia-600">Loading......</h1>
        </div>
      ) : (
        <>
          <article className="overflow-hidden rounded-lg shadow-lg w-full max-w-sm transition hover:shadow-xl mt-10">
            <img
              alt=""
              src={`https://http.dog/${id}.jpg`}
              className="h-64 w-full object-cover"
            />

            <div className="bg-white p-4 sm:p-6">
              <time
                datetime="2022-10-10"
                className="block text-xl text-gray-500"
              >
                Status Code : {data?.status_code}
              </time>

              <h3 className="mt-0.5 text-lg text-gray-900">
                Title : {data?.title}
              </h3>
            </div>
          </article>

          <div className="mt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              disabled={loading}
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-8 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
              onClick={() => navigate("/")}
            >
              Back
            </button>

            <button
              disabled={loading}
              onClick={() => {
                if (data) {
                  dispatch(
                    addList({
                      codeName: data.title,
                      codeImage: data.image?.jpg,
                    })
                  );
                }
              }}
              className={`inline-block rounded border border-indigo-600 px-8 py-2 text-sm font-medium 
                ${
                  loading
                    ? "bg-gray-400"
                    : "text-indigo-600 hover:bg-indigo-600 hover:text-white"
                }
                focus:outline-none focus:ring active:bg-indigo-500`}
            >
              {loading ? "Adding..." : "Add to My List"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ListDetails;
