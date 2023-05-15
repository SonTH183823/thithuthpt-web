import { takeLatest } from "redux-saga/effects";
import {
  handleLogin,
  handleRefreshToken,
  handleLoginWithPassword,
} from "./auth-handler";
import { authLogin, authRefreshToken, loginWithPassword } from "./auth-slice";
export default function* authSaga() {
  yield takeLatest(authLogin.type, handleLogin);
  yield takeLatest(loginWithPassword.type, handleLoginWithPassword);
  yield takeLatest(authRefreshToken.type, handleRefreshToken);
}
