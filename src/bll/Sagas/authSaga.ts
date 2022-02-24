import {authAPI, ResponseType} from "../../dal/api";
import {call, put, takeEvery} from "redux-saga/effects";
import {setAppError, setAppStatus} from "../Reducers/AppReducer";
import {STATUS_TYPE} from "../../ui/Enums/StatusType";
import {handleServerNetworkErrorSaga} from "../../ui/Utils/ErrorUtils";
import {setIsLogged, setIsRegister} from "../Reducers/authReducer";


export function* loginWorkerSaga(action: ReturnType<typeof loginSaga>) {
    yield put(setAppError(null))
    yield put(setAppStatus(STATUS_TYPE.LOADING))
    try {
        const res:ResponseType[] = yield call(authAPI.login, action.email, action.password)
        if(res.length!==0){
            yield put(setIsLogged(true))
        }else{
            yield handleServerNetworkErrorSaga('No such user.Please complete the registration')
        }
    } catch (error) {
        if (error instanceof Error) {
            yield handleServerNetworkErrorSaga(error.message)
        }
    }
}
export const loginSaga = (email: string, password: string) => ({type: 'LOGIN', email, password} as const)


export function* registerWorkerSaga(action: ReturnType<typeof registerSaga>) {
    yield put(setAppError(null))
    yield put(setAppStatus(STATUS_TYPE.LOADING))
    try {
        yield call(authAPI.register, action.email, action.password)
        yield put(setIsRegister(true))
        yield put(setAppStatus(STATUS_TYPE.SUCCEEDED))
    } catch (error) {
        if (error instanceof Error) {
            yield handleServerNetworkErrorSaga(error.message)
        }
    }
}
export const registerSaga = (email: string, password: string) => ({type: 'REGISTER', email, password} as const)


export function* authWatcherSaga() {
    yield takeEvery('LOGIN', loginWorkerSaga)
    yield takeEvery('REGISTER', registerWorkerSaga)
}