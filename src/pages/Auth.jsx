import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../redux/action/user-action";
import { CLEAR_ERROR } from "../redux/constant";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate  = useNavigate();
  const { message, error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  // =====================================resgiter handler to register a new user into the database===============================
  const registerHandler = () => {
    if (!name || !email || !password) {
      alert("Please fill all the fields");
      return;
    }
    dispatch(registerUser(name, email, password));

  };
  // =================================login handler to login the user into the application====================================
  const loginHandler = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (message) {
      alert(message);
      dispatch({
        type: CLEAR_ERROR,
      });
    }
    if (error) {
      alert(error);
      dispatch({
        type: CLEAR_ERROR,
      });
    }
  }, [message, error]);

  if (loading) {
    return (
      <div className="h-screen w-screen  flex items-center justify-center bg-slate-600">
        <h1 className="text-fuchsia-600">Loading......</h1>
      </div>
    );
  }

  // if the user already loggedin and still tries to access the auth page then the user will be redirect to the home page
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="data:image/png;base64,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"
          className="mx-auto h-20 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {isRegistered ? "Create a new account" : "Sign in to your account"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm shadow-md p-6 h-fit rounded-sm">
        <form className="space-y-6">
          {/* id isRegistered is true only then show the name field  */}
          {isRegistered && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              onClick={isRegistered ? registerHandler : loginHandler}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isRegistered ? "Sign up" : "Sign in"}
            </button>
          </div>
        </form>

        <p className="flex items-center justify-center cursor-pointer mt-10 text-center text-sm text-gray-500">
          {isRegistered ? "Already have an account?" : "Don't have an account?"}
          <p
            onClick={() => setIsRegistered(!isRegistered)}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            {isRegistered ? "Login" : "Create one"}
          </p>
        </p>
      </div>
    </div>
  );
};

export default Auth;
