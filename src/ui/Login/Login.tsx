import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {AppRootStateType} from "../../bll/Store";
import {RequestStatusType} from "../../bll/Reducers/AppReducer";
import {useEffect, useState} from "react";
import {InputType, ReusableInput} from "../Components/ReusableInput/ReusableInput";
import mainStyle from '../Components/ReusableStyle.module.css'
import s from './Login.module.css'
import {STATUS_TYPE} from "../Enums/StatusType";
import {INPUT_TYPE} from "../Enums/InputType";
import {ReusableButton} from "../Components/ReusableButton/ReusableButton";
import {NavLink} from "react-router-dom";
import {hidePassword} from "../Utils/HidePassword";
import {loginSaga} from "../../bll/Sagas/authSaga";
import {PATH} from "../Enums/Routes";
import {Preloader} from "../Components/Preloader/Preloader";


export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.Auth.isLogged)
    const error = useSelector<AppRootStateType, string | null>(state => state.App.error)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.App.status)

    const [email, setEmail] = useState<string>('dyatlovivan92@gmail.com')
    const [password, setPassword] = useState<string>('12345678')
    const [inputType, setInputType] = useState<InputType>('password')
    const disabled = status === STATUS_TYPE.LOADING

    const singInHandler = () => {
        dispatch(loginSaga(email, password))
    }
    const changeInputType = () => {
        setInputType(hidePassword(inputType))
    }
    useEffect(()=> {
        if (isLoggedIn) {
            // debugger
            navigate(PATH.PAYMENTS_PAGE)
        }
    },[isLoggedIn])

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
                            onClick={singInHandler} value={'Login'}/>
                <div className={s.singUpBlockText}>
                    Don't have an account?
                </div>
                <NavLink className={s.signIn} to={`/register`}>Sing Up</NavLink>
        </div>
    )
}