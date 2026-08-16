import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILURE} from "../actions/authActions";
import {LOGOUT} from "../actions/authActions";
import {AuthState,initialAuthState} from "../types/authTypes";

export default function authReducer(
    state: AuthState = initialAuthState,
    action: any
): AuthState {

    switch (action.type) {

        case LOGIN_REQUEST:

            return {
                ...state,
                loading: true,
                error: null,
            };

        case LOGIN_SUCCESS:

            return {
                ...state,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                loading: false,
                error: null,
            };

        case LOGIN_FAILURE:

            return {
                ...state,
                user: null,
                accessToken: null,
                refreshToken: null,
                loading: false,
                error: action.payload,
            };
        case LOGOUT:
            return initialAuthState;
        default:
            return state;
    }
}