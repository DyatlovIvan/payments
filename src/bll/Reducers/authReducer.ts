import {AppRootStateType} from "../Store";

const initialState: InitialStateType = {
    isLogged: false,
    isRegister: false
}

export const AuthReducer = (state: InitialStateType = initialState, action: LoginMainType) => {
    switch (action.type) {
        case "AUTH/SET_IS_LOGGED_IN":
            return {...state, isLogged: action.isLogged}
        case "AUTH/SET_IS_REGISTER":
            return {...state, isRegister: action.isRegister}
        default:
            return state
    }
}

export const setIsLogged = (isLogged: boolean) => ({
    type: 'AUTH/SET_IS_LOGGED_IN', isLogged
}) as const

export const setIsRegister = (isRegister: boolean) => ({
    type: 'AUTH/SET_IS_REGISTER', isRegister
}) as const


export const selectIsLogin = (state: AppRootStateType) => state.Auth.isLogged
export const selectError = (state: AppRootStateType) => state.App.error
export const selectStatus = (state: AppRootStateType) => state.App.status
export const selectIsRegister = (state: AppRootStateType) => state.Auth.isRegister

type InitialStateType = {
    isLogged: boolean
    isRegister: boolean
}
export type LoginMainType = SetIsLoggedType | SetIsRegisterType
type SetIsLoggedType = ReturnType<typeof setIsLogged>
type SetIsRegisterType = ReturnType<typeof setIsRegister>