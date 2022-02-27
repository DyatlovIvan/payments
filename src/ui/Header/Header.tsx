import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/Store";
import {setIsLogged} from "../../bll/Reducers/authReducer";
import s from './Header.module.css'
import {ReusableButton} from "../Components/ReusableButton/ReusableButton";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {setAppStatus} from "../../bll/Reducers/AppReducer";
import {STATUS_TYPE} from "../Enums/StatusType";
import {PATH} from "../Enums/Routes";

export const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.Auth.isLogged)
    const logoutHandler = () => {
        dispatch(setIsLogged(false))
        dispatch(setAppStatus(STATUS_TYPE.SUCCEEDED))
    }
    useEffect(() => {
        if (!isLoggedIn) {
            navigate(PATH.LOGIN)
        }
    }, [isLoggedIn])
    return (
        <header className={s.header}>
            <span className={s.title}>Payments</span>
            {isLoggedIn && (
                <ReusableButton
                    className={s.logout}
                    onClick={logoutHandler}
                    value={'Logout'}

                />
            )}
        </header>
    )
}