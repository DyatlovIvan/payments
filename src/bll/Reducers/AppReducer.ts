import {STATUS_TYPE} from "../../ui/Enums/StatusType";

const initialState: InitialStateType = {
    error: null,
    status: STATUS_TYPE.FAILED,
    isInitialized: false
}

export const AppReducer = (state: InitialStateType = initialState, action: AppMainType): InitialStateType => {
    switch (action.type) {
        case "APP/SET_ERROR":
            return {...state, error: action.error}
        case "APP/SET_STATUS":
            return {...state, status: action.status}
        case "APP/SET_IS_INITIALIZED":
            return {...state,isInitialized:true}
        default:
            return state
    }
}

export const setAppError = (error: null | string) => ({
    type: "APP/SET_ERROR", error
}) as const

export const setAppStatus = (status: RequestStatusType) => ({
    type: "APP/SET_STATUS", status
}) as const

export const setIsInitialized = ()=> ({
    type :"APP/SET_IS_INITIALIZED"
}) as const


export type RequestStatusType = STATUS_TYPE.IDLE | STATUS_TYPE.LOADING | STATUS_TYPE.SUCCEEDED | STATUS_TYPE.FAILED

type InitialStateType = {
    error: string | null
    status: RequestStatusType
    isInitialized: boolean
}

export type AppMainType =
    | SetAppErrorType
    | SetAppStatusType
    | SetIsInitialized

type SetAppErrorType = ReturnType<typeof setAppError>
type SetAppStatusType = ReturnType<typeof setAppStatus>
type SetIsInitialized = ReturnType<typeof setIsInitialized>