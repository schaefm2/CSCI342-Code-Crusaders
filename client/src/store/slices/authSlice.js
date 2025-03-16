import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  // define the initial state of the slice in a separate variable called "initialUserState", which is an object with empty values forÂ firstName, lastName, email, designation, phoneNumber, and avatar, all initially set to empty strings.
  firstName: "",
  lastName: "",
  email: "",
  profession: "",
  phoneNumber: "",
  trips: [],
  token: ""
};

// initial auth state
const initialState = {
  user: initialUserState,
  loaded: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // login action
    // The login action will update the user state with the payload and set loaded to true, indicating that user data has been loaded or the user has successfully logged in.
    login: (state, action) => {
      //state.user = action.payload;
      state.loaded = true;
      state.user = { ...state.user, ...action.payload };
    },
    // logout action
    // The logout action resets the user state to initialUserState and sets loaded to false, reflecting that the user has logged out and no user data should be considered loaded.
    logout: (state) => {
      state.user = initialUserState;
      state.loaded = false;
    },
    // loader action
    loader: (state, action) => {
      state.loaded = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, loader } = authSlice.actions;

export default authSlice.reducer;
