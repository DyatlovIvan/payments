import {PaymentType} from "../../dal/api";

const initialState = {
    data: [] as Array<PaymentType>
}

export const PaymentReducer = (state: InitialStateType = initialState, action: PaymentMainType):InitialStateType => {
    switch (action.type) {
        case "PAYMENT/SET_PAYMENTS":
            return {...state, data: action.payments}
        case "PAYMENT/DELETE_PAYMENT":
            return {...state, data: state.data.filter(el => el.id !== action.id)}
        case "PAYMENT/UPDATE_PAYMENT":{
            return {...state, data: state.data.map(el => el.id === action.payment.id ? {
                    ...el,
                    name: action.payment.name,
                    sum: action.payment.sum,
                    createdAt: action.payment.createdAt,
                    status: action.payment.status
                } : el)
            }
            }
        default:
            return state
    }
}

export const setPayments = (payments: Array<PaymentType>) => ({type: 'PAYMENT/SET_PAYMENTS', payments} as const)
export const deletePayment = (id: string) => ({type: 'PAYMENT/DELETE_PAYMENT', id} as const)
export const updatePayment = (payment: PaymentType) => ({type: 'PAYMENT/UPDATE_PAYMENT', payment} as const)

type InitialStateType = {
    data: Array<PaymentType>
}

export type PaymentMainType =
    | ReturnType<typeof setPayments>
    | ReturnType<typeof deletePayment>
    | ReturnType<typeof updatePayment>