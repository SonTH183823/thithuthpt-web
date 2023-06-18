import { put } from "redux-saga/effects";
import { updateFavoriteExams } from "./exam-slice";

export function* handleFavoriteExams({ payload }) {
  yield put(updateFavoriteExams(payload.favoritePosts));
}
