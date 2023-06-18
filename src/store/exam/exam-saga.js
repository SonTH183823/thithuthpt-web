import { takeLatest } from "redux-saga/effects";
import { handleFavoriteExams } from "./exam-handler";
import { setFavoriteExams } from "./exam-slice";

export default function* examSaga() {
  yield takeLatest(setFavoriteExams.type, handleFavoriteExams);
}
