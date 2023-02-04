import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isLoggedIn: false,
    isAccountCreated: false,
  },
  error: "",
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    signUp: (state, action) => {
      // const { name, email, password, confirmPassword } = action.payload;
      let userData = localStorage.getItem("user");
      if (userData) {
        userData = JSON.parse(userData);
        state.error = "User already exists";
      } else {
        let userData = {
          ...action.payload,
          isLoggedIn: false,
          isAccountCreated: true,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        state.user = userData;
      }
    },
    logIn: (state, action) => {
      const { email, password } = action.payload;
      let userData = localStorage.getItem("user");
      if (userData) {
        userData = JSON.parse(userData);
        if (email !== userData.email) {
          state.error = "User not registered";
          return;
        }
        if (password !== userData.password) {
          state.error = "Invalid Password";
          return;
        }
        state.error = "";
        let userInfo = {
          ...userData,
          isLoggedIn: true,
          isAccountCreated: false,
        };
        localStorage.setItem("user", JSON.stringify(userInfo));
        state.user = userInfo;
      } else {
        state.error = "Please SignUp";
      }
    },
    getLoggedUser: (state) => {
      let getUser = localStorage.getItem("user");
      console.log(getUser);
      if (getUser) {
        getUser = JSON.parse(getUser);
        state.user = getUser;
      }
    },
    logout: (state, action) => {
      let userAccount = localStorage.getItem("user");
      if (userAccount) {
        userAccount = JSON.parse(userAccount);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...userAccount, isLoggedIn: false })
        );
        state.user = { ...userAccount, isLoggedIn: false };
        localStorage.removeItem("cart");
        action.payload.cb();
      }
    },
  },
});

export const { signUp, logIn, getLoggedUser, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
