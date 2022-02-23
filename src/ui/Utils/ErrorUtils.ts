import {setAppError, setAppStatus} from "../../bll/Reducers/AppReducer";
import {put} from "redux-saga/effects";
import {STATUS_TYPE} from "../Enums/StatusType";

// export function* handleServerAppErrorSaga <D>(data: ResponseType<D>) {
//     if (data.messages.length) {
//         yield put(setAppError(data.messages[0]))
//     } else {
//         yield put(setAppError('Some error occurred'))
//     }
//     yield  put(setAppStatus(STATUS_TYPE.FAILED))
// }

export function* handleServerNetworkErrorSaga  (error: string )  {
    yield put(setAppError(error ? error: 'Some error occurred'))
    yield  put(setAppStatus(STATUS_TYPE.FAILED))
}