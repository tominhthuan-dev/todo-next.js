export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT = "LOGOUT";

export const loginRequest = (username: string,password: string) => ({
    type: LOGIN_REQUEST,
    payload: {
        username,
        password,
    },
});

export const loginSuccess = (data: any) => {
    return {
        type: LOGIN_SUCCESS,
        payload: data,
    };
};

export const loginFailure = (error: string) => {
    return {
        type: LOGIN_FAILURE,
        payload: error,
    };
};

export const logout = () => {
    return {
        type: LOGOUT,
    };
};