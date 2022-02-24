import {call, put, takeEvery} from "redux-saga/effects";
import {setAppError, setAppStatus} from "../Reducers/AppReducer";
import {STATUS_TYPE} from "../../ui/Enums/StatusType";
import {authAPI, paymentAPI, PaymentResponseType, ResponseType} from "../../dal/api";
import {setIsLogged} from "../Reducers/authReducer";
import {handleServerNetworkErrorSaga} from "../../ui/Utils/ErrorUtils";
import {setPayments} from "../Reducers/paymentReducer";

export function* fetchPaymentsWorkerSaga(action: ReturnType<typeof fetchPayments>) {
    yield put(setAppError(null))
    yield put(setAppStatus(STATUS_TYPE.LOADING))
    try {
        const data:PaymentResponseType[] = yield call(paymentAPI.getPayments)
        if(data.length!==0){
            yield put(setPayments(data))
        }else{
            yield handleServerNetworkErrorSaga('No payments')
        }
    } catch (error) {
        if (error instanceof Error) {
            yield handleServerNetworkErrorSaga(error.message)
        }
    }
}
export const fetchPayments = () => ({type: 'PAYMENT/FETCH_TASKS'} as const)

export function* paymentWatcherSaga(){
    yield takeEvery('PAYMENT/FETCH_TASKS',fetchPaymentsWorkerSaga)

}