import {
    FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE, 
    ADD_TODO_SUCCESS, ADD_TODO_FAILURE, ADD_TODO_REQUEST,
    DELETE_TODO_REQUEST, DELETE_TODO_SUCCESS, DELETE_TODO_FAILURE,
    UPDATE_TODO_SUCCESS,
    UPDATE_TODO_REQUEST,
} from '../actions/todoActions';
import { TOGGLE_TODO_SUCCESS, TOGGLE_TODO_REQUEST, TOGGLE_TODO_FAILURE } from '../actions/todoActions';
import {TodoState} from '../types/todotypes';
import {Todo} from '@/types/todo';

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: null,
}

export default function todoReducer(state = initialState, action: any): TodoState {
    switch (action.type) {
        case FETCH_TODOS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_TODOS_SUCCESS:
            return {
                ...state,
                todos: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_TODOS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADD_TODO_SUCCESS:
            return {
                ...state,
                todos: [action.payload, ...state.todos],
                loading: false,
                error: null,
            };
        case ADD_TODO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADD_TODO_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case DELETE_TODO_SUCCESS:
            return {
                ...state,
                todos: state.todos.filter((todo: Todo) => todo.id !== action.payload),
                loading: false,
                error: null,    
            };
        case UPDATE_TODO_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case UPDATE_TODO_SUCCESS:
            return {
                ...state,
                todos: state.todos.map((todo: Todo) =>
                    todo.id === action.payload.id
                        ? action.payload
                        : todo
                ),
                loading: false,
                error: null,
            };
        case TOGGLE_TODO_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case TOGGLE_TODO_SUCCESS:
            return {
                ...state,
                todos: state.todos.map((todo: Todo) =>
                    todo.id === action.payload.id
                        ? action.payload
                        : todo
                ),
                loading: false,
                error: null,
            };
        
        default:
            return state;
    }
}