import {Route, Routes} from "react-router-dom";
import {PATH} from "../Enums/Routes";
import {MainPage} from "../MainPage/MainPage";
import {PaymentPage} from "../PaymentPage/PaymentPage";
import {Login} from "../Login/Login";
import {Register} from "../Register/Register";

export const RoutesContainer = () =>{
return(
    <Routes>
        <Route path={PATH.MAIN_PAGE} element = {<MainPage/>}/>
        <Route path={PATH.PAYMENT_PAGE} element = {<PaymentPage/>}/>
        <Route path={PATH.LOGIN} element = {<Login/>}/>
        <Route path={PATH.REGISTER} element = {<Register/>}/>
    </Routes>
)

}