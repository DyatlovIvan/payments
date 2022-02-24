import {PaymentResponseType} from "../../dal/api";

type InitialStateType = {
    data:Array<PaymentResponseType>
}
// type initialStateType = typeof initialState
const initialState ={
    data:[] as Array<PaymentResponseType>
}

export const PaymentReducer = (state:InitialStateType = initialState, action:PaymentMainType) =>{
    switch (action.type){
        case "PAYMENT/SET_TASKS":
            return {...state,data:action.payments}
        default:
            return state
    }
}
export type PaymentMainType = ReturnType<typeof setPayments>
export const setPayments = (payments:Array<PaymentResponseType>) =>({type:'PAYMENT/SET_TASKS',payments})