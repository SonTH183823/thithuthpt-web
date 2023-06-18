import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/auth-slice";
import postSlice from "./post/post-slice";
import examSlice from  "./exam/exam-slice";

export const reducer = combineReducers({
  auth: authSlice,
  post: postSlice,
  exam: examSlice
});
