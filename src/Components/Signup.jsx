import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUp } from "../features/Auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Signup = () => {
    const [signupData, setSignUpData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo.user.isAccountCreated) {
            navigate("/login", { replace: true });
        }
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signUp(signupData));
    };
    return (
        <div className="bg-[#f3f8ff] h-[100vh]">
            <Header />
            <div className="max-w-[450px] mx-auto min-h-[80vh]">
                <div className="flex justify-center flex-col h-full">
                    <h1 className="text-center text-slate-700 text-[48px]">
                        Create Account
                    </h1>
                    <p className="text-[24px] text-center text-gray-800 mb-8">
                        Signup Now!
                    </p>
                    <form
                        onSubmit={(e) => submitHandler(e)}
                        className="bg-[rgb(233,242,255)] p-8 rounded-xl border border-[rgba(66,134,244,0.37)]">
                        <p className="text-center text-[25px] font-semibold mb-8">
                            Shoppy Tube
                        </p>
                        <div className="mb-6">
                            <label
                                htmlFor="text"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Name
                            </label>
                            <input
                                type="text"
                                id="text"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                placeholder="name"
                                required=""
                                onChange={(e) => {
                                    setSignUpData({
                                        ...signupData,
                                        name: e.target.value,
                                    });
                                }}
                                value={signupData.name}
                            />
                        </div>
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
                                onChange={(e) => {
                                    setSignUpData({
                                        ...signupData,
                                        email: e.target.value,
                                    });
                                }}
                                value={signupData.email}
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required=""
                                onChange={(e) => {
                                    setSignUpData({
                                        ...signupData,
                                        password: e.target.value,
                                    });
                                }}
                                value={signupData.password}
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Confirm password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required=""
                                onChange={(e) => {
                                    setSignUpData({
                                        ...signupData,
                                        confirmPassword: e.target.value,
                                    });
                                }}
                                value={signupData.confirmPassword}
                            />
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-[#4285f4] hover:bg-blue-800 focus:outline-none font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Sign Up
                        </button>
                        <label
                            htmlFor="terms"
                            className="flex items-center justify-center gap-2 ml-2 text-sm mt-5 font-medium text-gray-900 dark:text-gray-300">
                            <p className="text-center">
                                Already Have an account?
                            </p>
                            <Link
                                to="/login"
                                className="text-[#4285f4] underline">
                                Login
                            </Link>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
