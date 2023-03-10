import React, { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { BsCartCheckFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineStorefront } from "react-icons/md";
import { getAllCartItems } from "../features/Cart/CartSlice";
import { useSelector, useDispatch } from "react-redux";
import { getLoggedUser, logout } from "../features/Auth/AuthSlice";
import { FaPowerOff } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userInfo = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getAllCartItems());
    dispatch(getLoggedUser());
  }, []);

  return (
    <nav className="bg-[#0e6ba8] border-gray-200 px-2 sm:px-4 py-2.5  dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="https://flowbite.com/" className="flex items-center">
          {/* <img
                        src={ShoppyTubeLogo}
                        className="mr-3 h-10"
                        alt="Flowbite Logo"
                    /> */}
          <span>
            <MdOutlineStorefront className="text-[40px] mr-2 text-[#303030]" />
          </span>
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Shoppy Tube
          </span>
        </a>
        <div className="flex md:order-2 items-center">
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
          <NavLink
            style={({ isActive }) => {
              return {
                color: isActive ? "black" : "black",
                fontWeight: isActive ? "bold" : "normal",
              };
            }}
            to="/wishlist"
            className="block py-2 pl-3    text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
            <div className="relative  ">
              <AiOutlineHeart className="text-2xl mr-[50px] " />
              <span className="absolute text-[12px] bg-white rounded-full flex justify-center items-center "></span>
            </div>
          </NavLink>

          <NavLink
            style={({ isActive }) => {
              return {
                color: isActive ? "black" : "black",
                fontWeight: isActive ? "bold" : "normal",
              };
            }}
            to="/cart"
            className="block py-2 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
            <div className="relative">
              <BsCartCheckFill className="text-2xl mr-[50px] " />
              {cartItems?.length >= 1 && (
                <span className="absolute text-[12px] bg-white rounded-full flex justify-center items-center h-[20px] w-[20px] -top-[15px] left-2">
                  {cartItems?.length}
                </span>
              )}
            </div>
          </NavLink>

          <div className="relative hidden md:block">
            <div
              className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer "
              onClick={() => {
                navigate("/product/search", {
                  state: { type: "search", query: searchQuery },
                });
              }}>
              <svg
                className="w-5 h-5 text-gray-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>

            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {userInfo.user.isLoggedIn ? (
            <div className="ml-4 ">
              <p className="w-[50px] h-[50px] rounded-xl flex justify-center items-center">
                {userInfo?.user.name.toUpperCase()}
              </p>
            </div>
          ) : (
            <div>
              <button
                className="text-white bg-[#4285f4] hover:bg-blue-800 focus:outline-none font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => navigate("/login")}>
                Login
              </button>
            </div>
          )}
          {userInfo.user.isLoggedIn && (
            <FaPowerOff
              className="text-2xl  ml-[20px]"
              onClick={() => {
                dispatch(
                  logout({
                    cb: () => {
                      navigate("/login");
                    },
                  })
                );
              }}></FaPowerOff>
          )}
          <button
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-search"
            aria-expanded="false">
            <span className="sr-only">Open menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-search">
          <div className="relative mt-3 md:hidden ">
            <div
              className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer  "
              onClick={() => {
                navigate("/product/search", {
                  state: { type: "search", query: searchQuery },
                });
              }}>
              <svg
                className="w-5 h-5 text-gray-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full  p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>

          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                style={({ isActive }) => {
                  return {
                    color: isActive ? "blue" : "black",
                    fontWeight: isActive ? "bold" : "normal",
                  };
                }}
                to="/"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                aria-current="page">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive }) => {
                  return {
                    color: isActive ? "blue" : "black",
                    fontWeight: isActive ? "bold" : "normal",
                  };
                }}
                to="/women"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Women
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive }) => {
                  return {
                    color: isActive ? "blue" : "black",
                    fontWeight: isActive ? "bold" : "normal",
                  };
                }}
                to="/homedecor"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Home Decor
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
