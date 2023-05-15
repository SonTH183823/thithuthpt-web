import { authAPI } from "apis/auth";
import { userAPI } from "apis/user";
import { call, put } from "redux-saga/effects";
import { saveTokenToCookie } from "utils/auth";
import { authUpdateProfile } from "./auth-slice";

export function* handleLogin({ payload: { token, fcmToken } }) {
  try {
    const res = yield call(authAPI.login, { token, fcmToken });
    if (res.accessToken && res.refreshToken) {
      saveTokenToCookie({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        sessionId: res.sessionId,
      });
      try {
        const profile = yield call(userAPI.getProfile);
        yield put(authUpdateProfile(profile));
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export function* handleLoginWithPassword({ payload: { username, password } }) {
  try {
    const res = yield call(authAPI.loginWithPassword, { username, password });
    if (res.accessToken && res.refreshToken) {
      saveTokenToCookie({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        sessionId: res.sessionId,
      });
      try {
        const profile = yield call(userAPI.getProfile);
        yield put(authUpdateProfile(profile));
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export function* handleRefreshToken({ payload }) {
  const res = yield call(authAPI.refreshToken, { refreshToken: payload });
  if (res.accessToken && res.refreshToken) {
    saveTokenToCookie({
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
    });
    const profile = yield call(userAPI.getProfile);
    yield put(authUpdateProfile(profile));
  }
}
