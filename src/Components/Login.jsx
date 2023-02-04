import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";

import { logIn } from "../features/Auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo.user.isLoggedIn) {
      console.log(userInfo);
      navigate("/", { replace: true });
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(logIn(loginData));
  };
  return (
    <div className="bg-[#f3f8ff] h-[100vh]">
      <Header />
      <div className="max-w-[400px] mx-auto min-h-[80vh]">
        <div className="flex justify-center flex-col h-full">
          <h1 className="text-center text-slate-700 text-[50px]">
            Welcome Back!
          </h1>
          <p className="text-[24px] text-center text-gray-800 mb-8">Login</p>
          <form
            onSubmit={(e) => submitHandler(e)}
            className="bg-[rgba(233,242,255,0.58)] p-8 rounded-xl border border-[rgba(66,134,244,0.37)]">
            <p className="text-center text-[25px] font-semibold mb-8">
              Shoppy Tube
            </p>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="example@gmail.com"
                required=""
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your password
              </label>
              <input
                type="password"
                id="password"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required=""
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
            </div>

            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  defaultValue=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required=""
                />
              </div>
              <label
                htmlFor="terms"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                <p>Remember my password</p>
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-[#4285f4] hover:bg-blue-800 focus:outline-none font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Login
            </button>
            <label
              htmlFor="terms"
              className="flex items-center justify-center gap-2 ml-2 text-sm mt-5 font-medium text-gray-900 dark:text-gray-300">
              <p className="text-center">Don't Have an account?</p>
              <Link to="/signup" className="text-[#4285f4] underline">
                Signup
              </Link>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
