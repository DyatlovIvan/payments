import {applyMiddleware, combineReducers, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import {AuthReducer} from "./Reducers/authReducer";
import {AppReducer} from "./Reducers/AppReducer";
import {authWatcherSaga} from "./Sagas/authSaga";
import { all } from "redux-saga/effects";
import {PaymentReducer} from "./Reducers/paymentReducer";
import {paymentWatcherSaga} from "./Sagas/paymentsSaga";

export const rootReducer = combineReducers({
    App:AppReducer,
    Auth:AuthReducer,
    Payment:PaymentReducer
})
const sagaMiddleware = createSagaMiddleware()
export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer,applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootWatcher)
function* rootWatcher(){
    yield all([authWatcherSaga(),paymentWatcherSaga()])
}