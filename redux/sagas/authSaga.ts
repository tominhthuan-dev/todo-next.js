import {
    call,
    put,
    takeLatest,
} from "redux-saga/effects";

import {
    LOGIN_REQUEST,
    loginSuccess,
    loginFailure,
} from "../actions/authActions";

import {loginApi} from "@/services/auth.service";

function* loginSaga(action: any): any {
    try {
        const { username,password} = action.payload;
        const data =yield call(loginApi,username,password);

        localStorage.setItem( "accessToken", data.accessToken);
        localStorage.setItem("refreshToken",data.refreshToken);
        localStorage.setItem("user",JSON.stringify(data.user));

        yield put(loginSuccess(data));
    } catch (error: any) {
        yield put(loginFailure(error.message ||"Đăng nhập thất bại"));
    }
}


export default function* authSaga() {

    yield takeLatest(
        LOGIN_REQUEST,
        loginSaga
    );
}