import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {AppRootStateType} from "../../bll/Store";
import {RequestStatusType} from "../../bll/Reducers/AppReducer";
import React, {useCallback, useEffect, useState} from "react";
import {InputType, ReusableInput} from "../Components/ReusableInput/ReusableInput";
import mainStyle from '../Components/ReusableStyle.module.css'
import s from './Login.module.css'
import {STATUS_TYPE} from "../Enums/StatusType";
import {INPUT_TYPE} from "../Enums/InputType";
import {ReusableButton} from "../Components/ReusableButton/ReusableButton";
import {NavLink} from "react-router-dom";
import {hidePassword} from "../Utils/HidePassword";
import {loginSagaRequest} from "../../bll/Sagas/authSaga";
import {PATH} from "../Enums/Routes";
import {Preloader} from "../Components/Preloader/Preloader";
import {selectError, selectIsLogin, selectStatus} from "../../bll/Reducers/authReducer";


export const Login = React.memo(() => {
        const dispatch = useDispatch()
        const navigate = useNavigate()

        const isLoggedIn = useSelector<AppRootStateType, boolean>(selectIsLogin)
        const error = useSelector<AppRootStateType, string | null>(selectError)
        const status = useSelector<AppRootStateType, RequestStatusType>(selectStatus)

        const [email, setEmail] = useState<string>('dyatlovivan92@gmail.com')
        const [password, setPassword] = useState<string>('12345678')
        const [inputType, setInputType] = useState<InputType>(INPUT_TYPE.PASSWORD)
        const disabled = status === STATUS_TYPE.LOADING

        const singInHandler = useCallback(() => {
            dispatch(loginSagaRequest(email, password))
        }, [email, password])

        const changeInputType = useCallback(() => {
            setInputType(hidePassword(inputType))
        }, [inputType])

        useEffect(() => {
            if (isLoggedIn) {
                navigate(PATH.PAYMENTS_PAGE)
            }
        }, [isLoggedIn])

        return (
            <div className={mainStyle.formContainer}>
                <h1>Sign in</h1>
                {status === STATUS_TYPE.LOADING && <Preloader/>}
                {error && <span className={mainStyle.error}>{error}</span>}
                <ReusableInput disabled={disabled} value={email} onChangeText={setEmail}
                               placeholder={INPUT_TYPE.EMAIL} inputType={INPUT_TYPE.EMAIL}/>
                <div className={s.group}>
                    <ReusableInput disabled={disabled} value={password} onChangeText={setPassword}
                                   placeholder={INPUT_TYPE.PASSWORD} inputType={inputType}/>
                    <span
                        onClick={changeInputType}
                        className={mainStyle.eye}
                    >&#128065;
                    </span>
                </div>
                <ReusableButton disabled={disabled} className={s.loginButton}
                                onClick={singInHandler} value={"Login"}/>
                <div className={s.singUpBlockText}>
                    Don't have an account?
                </div>
                <NavLink className={s.signIn} to={"/register"}>Sing Up</NavLink>
            </div>
        )
    }
)