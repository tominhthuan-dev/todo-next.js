import {Todo} from "../types/todotypes";

export const FETCH_TODOS_REQUEST ="FETCH_TODOS_REQUEST";
export const FETCH_TODOS_SUCCESS ="FETCH_TODOS_SUCCESS";
export const FETCH_TODOS_FAILURE ="FETCH_TODOS_FAILURE";

export const ADD_TODO_REQUEST = "ADD_TODO_REQUEST";
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
export const ADD_TODO_FAILURE = "ADD_TODO_FAILURE";

export const DELETE_TODO_REQUEST ="DELETE_TODO_REQUEST";
export const DELETE_TODO_SUCCESS ="DELETE_TODO_SUCCESS";
export const DELETE_TODO_FAILURE ="DELETE_TODO_FAILURE";

export const UPDATE_TODO_REQUEST ="UPDATE_TODO_REQUEST";
export const UPDATE_TODO_SUCCESS ="UPDATE_TODO_SUCCESS";
export const UPDATE_TODO_FAILURE ="UPDATE_TODO_FAILURE";

export const TOGGLE_TODO_REQUEST = "TOGGLE_TODO_REQUEST";
export const TOGGLE_TODO_SUCCESS = "TOGGLE_TODO_SUCCESS";
export const TOGGLE_TODO_FAILURE = "TOGGLE_TODO_FAILURE";

export function fetchTodosRequest() {
  return {
    type: FETCH_TODOS_REQUEST,
  };
}

export function fetchTodosSuccess(todos: any[]) {
  return {
    type: FETCH_TODOS_SUCCESS,
    payload: todos,
  };
}

export function fetchTodosFailure(error: string) {
  return {
    type: FETCH_TODOS_FAILURE,
    payload: error,
  };
}

export function addTodoRequest(title: string) {
    return {
        type: ADD_TODO_REQUEST,
        payload: title,
    };
}

export function addTodoSuccess(todo: Todo) {
    return {
        type: ADD_TODO_SUCCESS,
        payload: todo,
    };
}

export function addTodoFailure(error: string) {
    return {
        type: ADD_TODO_FAILURE,
        payload: error,
    };
}

export function deleteTodoRequest(id: number) {
    return {
        type: DELETE_TODO_REQUEST,
        payload: id,
    };
}

export function deleteTodoSuccess(id: number) {
    return {
        type: DELETE_TODO_SUCCESS,
        payload: id,
    };
}

export function deleteTodoFailure(error: string) {
    return {
        type: DELETE_TODO_FAILURE,
        payload: error,
    };
}

export function updateTodoRequest(
    id: number,
    title: string
) {
    return {
        type: UPDATE_TODO_REQUEST,
        payload: {
            id,
            title,
        },
    };
}

export function updateTodoSuccess(
    todo: Todo
) {
    return {
        type: UPDATE_TODO_SUCCESS,
        payload: todo,
    };
}

export function updateTodoFailure(
    error: string
) {
    return {
        type: UPDATE_TODO_FAILURE,
        payload: error,
    };
}

export function toggleTodoRequest(id: number) {
    return {
        type: TOGGLE_TODO_REQUEST,
        payload: id,
    };
}

export function toggleTodoSuccess(todo: Todo) {
    return {
        type: TOGGLE_TODO_SUCCESS,
        payload: todo,
    };
}

export function toggleTodoFailure(error: string) {
    return {
        type: TOGGLE_TODO_FAILURE,
        payload: error,
    };
}


