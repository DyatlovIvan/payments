import {PaymentResponseType} from "../../dal/api";

type InitialStateType = {
    data:Array<PaymentResponseType>
}

const initialState ={
    data:[] as Array<PaymentResponseType>
}

export const PaymentReducer = (state:InitialStateType = initialState, action:PaymentMainType) =>{
    switch (action.type){
        case "PAYMENT/SET_PAYMENTS":
            return {...state,data:action.payments}
        case "PAYMENT/DELETE_PAYMENT":
            return {...state,data: state.data.filter(el=>el.id!==action.id)}
        default:
            return state
    }
}
export type PaymentMainType = ReturnType<typeof setPayments> | ReturnType<typeof deletePayment>
export const setPayments = (payments:Array<PaymentResponseType>) =>({type:'PAYMENT/SET_PAYMENTS',payments}as const)
export const deletePayment = (id:string)=>({type:'PAYMENT/DELETE_PAYMENT',id}as const)