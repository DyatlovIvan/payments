import {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {InputType, ReusableInput} from "../Components/ReusableInput/ReusableInput";
import {AppRootStateType} from "../../bll/Store";
import {RequestStatusType, setAppError} from "../../bll/Reducers/AppReducer";
import {ReusableButton} from "../Components/ReusableButton/ReusableButton";
import {INPUT_TYPE} from "../Enums/InputType";
import {STATUS_TYPE} from "../Enums/StatusType";
import {PATH} from "../Enums/Routes";
import {registerSagaRequest} from "../../bll/Sagas/authSaga";
import mainStyle from '../Components/ReusableStyle.module.css'
import s from './Register.module.css'
import {hidePassword} from "../Utils/HidePassword";
import {Preloader} from "../Components/Preloader/Preloader";


export const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')
    const [inputType, setInputType] = useState<InputType>(INPUT_TYPE.PASSWORD)

    const isRegister = useSelector<AppRootStateType, boolean>(state => state.Auth.isRegister)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.App.status)
    const error = useSelector<AppRootStateType, null | string>(state => state.App.error)
    const disabled = status === STATUS_TYPE.LOADING

    const onChangeEmailInput = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)
    const onChangePasswordInput = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)
    const onChangeRepeatPasswordInput = (e: ChangeEvent<HTMLInputElement>) => setRepeatPassword(e.currentTarget.value)
    const changeInputType = () => setInputType(hidePassword(inputType))
    const onClickBackHandler = () => navigate(PATH.LOGIN)

    const onClickRegisterHandler = () => {
        if (password === repeatPassword && password !== '') {
            dispatch(registerSagaRequest(email, password))
        } else {
            dispatch(setAppError("Passwords do not match"))
        }
    }
    if (isRegister) {
        navigate(PATH.LOGIN)
    }
    return (
        <div className={mainStyle.formContainer}>
            <h1>Sign up</h1>
            {status === STATUS_TYPE.LOADING && <Preloader/>}
            {error && <span className={mainStyle.error}>{error}</span>}
            <ReusableInput
                disabled={disabled}
                value={email}
                onChange={onChangeEmailInput}
                placeholder={INPUT_TYPE.EMAIL}
                name={INPUT_TYPE.EMAIL}
                inputType={INPUT_TYPE.EMAIL}
            />
            <div className={s.group}>
                <ReusableInput
                    disabled={disabled}
                    value={password}
                    onChange={onChangePasswordInput}
                    placeholder={INPUT_TYPE.PASSWORD}
                    name={INPUT_TYPE.PASSWORD}
                    inputType={inputType}
                />
                <span
                    className={mainStyle.eye}
                    onClick={changeInputType}
                >&#128065;
                    </span>
            </div>
            <div className={s.group}>
                <ReusableInput
                    inputType={inputType}
                    disabled={disabled}
                    onChange={onChangeRepeatPasswordInput}
                    name={INPUT_TYPE.PASSWORD}
                    placeholder={"confirm password"}
                    value={repeatPassword}
                />
                <span
                    onClick={changeInputType}
                    className={mainStyle.eye}
                >&#128065;
                    </span>
            </div>
            <div className={s.buttonGroup}>
                <ReusableButton disabled={disabled} className={s.cancel}
                                type={"button"} value={"back"}
                                onClick={onClickBackHandler}/>
                <ReusableButton disabled={disabled} className={s.register}
                                type={"button"} value={"register"}
                                onClick={onClickRegisterHandler}/>
            </div>
        </div>

    )
}