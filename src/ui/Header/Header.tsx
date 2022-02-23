import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/Store";
import {setIsLogged} from "../../bll/Reducers/authReducer";
import s from './Header.module.css'
import {ReusableButton} from "../Components/ReusableButton/ReusableButton";

export const Header = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.Auth.isLogged)
    const logoutHandler = () => {
        dispatch(setIsLogged(false))
    }
    return (
        <header className={s.header}>
            <span className={s.title}>Payments</span>
            {isLoggedIn && <ReusableButton className={s.logout} onClick={logoutHandler}
                                           value={'Logout'}/>}
        </header>
    )
}