import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {},
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogin: (state) => {
      return {
        ...state,
      };
    },
    loginWithPassword: (state) => {
      return {
        ...state,
      };
    },
    authRefreshToken: (state) => ({
      ...state,
    }),
    authUpdateProfile: (state, action) => {
      return {
        ...state,
        profile: { ...action.payload },
      };
    },
  },
});

export const {
  authLogin,
  authUpdateProfile,
  authRefreshToken,
  loginWithPassword,
} = authSlice.actions;
export default authSlice.reducer;
