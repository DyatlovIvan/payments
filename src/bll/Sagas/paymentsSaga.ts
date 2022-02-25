import {call, put, takeEvery} from "redux-saga/effects";
import {setAppError, setAppStatus} from "../Reducers/AppReducer";
import {STATUS_TYPE} from "../../ui/Enums/StatusType";
import {paymentAPI, PaymentResponseType} from "../../dal/api";
import {handleServerNetworkErrorSaga} from "../../ui/Utils/ErrorUtils";
import {deletePayment, setPayments, updatePayment} from "../Reducers/paymentReducer";

export function* fetchPaymentsWorkerSaga() {
    yield put(setAppError(null))
    yield put(setAppStatus(STATUS_TYPE.LOADING))
    try {
        const data: PaymentResponseType[] = yield call(paymentAPI.getPayments)
        if (data.length !== 0) {
            yield put(setPayments(data))
            yield put(setAppStatus(STATUS_TYPE.SUCCEEDED))
        } else {
            yield handleServerNetworkErrorSaga('No payments')
        }
    } catch (error) {
        if (error instanceof Error) {
            yield handleServerNetworkErrorSaga(error.message)
        }
    }
}

export const fetchPaymentsRequest = () => ({type: 'PAYMENT/FETCH_PAYMENTS'} as const)

export function* removePaymentWorkerSaga(action: ReturnType<typeof removePaymentRequest>) {
    yield put(setAppError(null))
    yield put(setAppStatus(STATUS_TYPE.LOADING))
    try {
        yield call(paymentAPI.removePayment, action.id)
        yield put(deletePayment(action.id))
        yield put(setAppStatus(STATUS_TYPE.SUCCEEDED))
    } catch (error) {
        if (error instanceof Error) {
            yield handleServerNetworkErrorSaga(error.message)
        }
    }
}
export const removePaymentRequest = (id: string) => ({type: 'PAYMENT/REMOVE_PAYMENT', id} as const)

export function* updatePaymentWorkerSaga(action: ReturnType<typeof updatePayment>) {
    yield put(setAppError(null))
    yield put(setAppStatus(STATUS_TYPE.LOADING))
    try {
        const data: PaymentResponseType = yield call(paymentAPI.updatePayment, action.payment)
        yield (updatePayment(data))
        yield put(setAppStatus(STATUS_TYPE.SUCCEEDED))
    } catch (error) {
        if (error instanceof Error) {
            yield handleServerNetworkErrorSaga(error.message)
        }
    }
}
export const updatePaymentRequest = (payment: PaymentResponseType) => ({type: 'PAYMENT/UPDATE_PAYMENT', payment} as const)

export function* paymentWatcherSaga() {
    yield takeEvery("PAYMENT/FETCH_PAYMENTS", fetchPaymentsWorkerSaga)
    yield takeEvery("PAYMENT/REMOVE_PAYMENT", removePaymentWorkerSaga)
    yield takeEvery("PAYMENT/UPDATE_PAYMENT", updatePaymentWorkerSaga)
}