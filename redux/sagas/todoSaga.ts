import { call, put, takeLatest} from "redux-saga/effects";
import {
  FETCH_TODOS_REQUEST,
  fetchTodosSuccess,
  fetchTodosFailure,
  ADD_TODO_REQUEST,
  addTodoSuccess,
  addTodoFailure,
  DELETE_TODO_REQUEST,
  deleteTodoSuccess,
  deleteTodoFailure
} from "../actions/todoActions";

import {UPDATE_TODO_REQUEST,updateTodoSuccess,updateTodoFailure} from "../actions/todoActions";
import {TOGGLE_TODO_REQUEST, toggleTodoSuccess, toggleTodoFailure} from "../actions/todoActions";
import { createTodo, getTodos, deleteTodo as deleteTodoApi, updateTodo as updateTodoApi, toggleTodo as toggleTodoApi } from "@/services/todo.service";

function* fetchTodosSaga() {
  try {
    console.log("Saga: bắt đầu lấy Todo");
    const todos = yield call(getTodos);
    console.log("Saga nhận được:",todos);
    yield put(fetchTodosSuccess(todos));
  } catch (error: any) {
    console.error(
      "Saga error:",
      error
    );
    yield put(
        fetchTodosFailure(
            error instanceof Error
                ? error.message
                : "Failed to fetch todos"
        )
    );
  }
}

function* addTodoSaga(action: any): any {
  try {
    console.log("Saga: bắt đầu thêm Todo với tiêu đề:", action.payload);
    const title = action.payload;
    const newTodo = yield call(createTodo, title);
    yield put(addTodoSuccess(newTodo));
  } catch (error) {
    console.error("ADD SAGA ERROR:", error);
    yield put(addTodoFailure(error instanceof Error? error.message: "Không thể thêm Todo"));
  }
}

function* deleteTodoSaga(action: any): any {
  try {
    const id = action.payload;
    console.log("Delete Todo ID:", id);
    yield call(deleteTodoApi, id);
    yield put(deleteTodoSuccess(id));

  } catch (error) {
    console.error("Delete Todo Error:",error);

    yield put(deleteTodoFailure(error instanceof Error? error.message: "Không thể xóa Todo"));
  }
}

function* updateTodoSaga(action: any): any {
  try {
    const {id,title} = action.payload;
    console.log( "Update Todo:", id, title );
    const updatedTodo = yield call( updateTodoApi, id, title);

    console.log("Updated Todo:", updatedTodo);
    yield put( updateTodoSuccess( updatedTodo ));

  } catch (error) {
    console.error( "Update Todo Error:", error );
    yield put(updateTodoFailure( error instanceof Error ? error.message : "Không thể sửa Todo"));
  }
}

function* toggleTodoSaga(action: any): any {
  try {
    const id = action.payload;
    console.log("Toggle Todo ID:", id);
    const updatedTodo = yield call(toggleTodoApi, id);
    console.log("Toggled Todo:", updatedTodo);
    yield put(toggleTodoSuccess(updatedTodo));
  } catch (error) {
    console.error("Toggle Todo Error:", error);
    yield put(toggleTodoFailure(error instanceof Error ? error.message : "Không thể thay đổi trạng thái Todo"));
  } 
}

export default function* todoSaga() {
  yield takeLatest(FETCH_TODOS_REQUEST, fetchTodosSaga);
  yield takeLatest(ADD_TODO_REQUEST,addTodoSaga);
  yield takeLatest(DELETE_TODO_REQUEST, deleteTodoSaga);
  yield takeLatest(UPDATE_TODO_REQUEST, updateTodoSaga);
  yield takeLatest(TOGGLE_TODO_REQUEST, toggleTodoSaga);
}