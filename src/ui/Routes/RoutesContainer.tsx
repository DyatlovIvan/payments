import {Route, Routes, useNavigate} from "react-router-dom";
import {PATH} from "../Enums/Routes";
import {PaymentTable} from "../MainPage/PaymentTable/PaymentTable";

import {Login} from "../Login/Login";
import {Register} from "../Register/Register";
import {DetailedPage} from "../MainPage/DetailedPage/DetailedPage";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/Store";

export const RoutesContainer = () =>{
    // const navigate = useNavigate()
    // const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.Auth.isLogged)
    // if (!isLoggedIn) {
    //     debugger
    //     navigate('/login')
    // }
return(
    <Routes>
        <Route path={PATH.LOGIN} element = {<Login/>}/>
        <Route path={PATH.PAYMENTS_PAGE} element = {<PaymentTable/>}/>
        <Route path={PATH.DETAILED_PAGE} element = {<DetailedPage/>}/>
        <Route path={PATH.REGISTER} element = {<Register/>}/>
    </Routes>
)

}