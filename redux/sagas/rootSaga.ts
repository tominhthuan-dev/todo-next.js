import { all } from "redux-saga/effects";

import todoSaga from "./todoSaga";
import authSaga from "./authSaga";

export default function* rootSaga() {

  yield all([
    todoSaga(),
    authSaga(),
  ]);

}