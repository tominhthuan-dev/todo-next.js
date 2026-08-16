import {applyMiddleware,  createStore, combineReducers} from "redux";
import createSagaMiddleware from "redux-saga";
import todoReducer from "./reducers/todoReducer";
import rootSaga from "./sagas/rootSaga";
import authReducer from "./reducers/authReducer";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    todo: todoReducer,
    auth: authReducer,
  }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;