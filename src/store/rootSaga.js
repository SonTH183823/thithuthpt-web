import {all} from "redux-saga/effects";
import authSaga from "./auth/auth-saga";
import postSaga from "./post/post-saga";
import examSaga from "./exam/exam-saga";

export default function* rootSaga() {
  yield all([authSaga(), postSaga(), examSaga()]);
}
