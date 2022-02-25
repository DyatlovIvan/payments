import {Route, Routes} from "react-router-dom";
import {PATH} from "../Enums/Routes";
import {PaymentTable} from "../MainPage/PaymentTable/PaymentTable";
import {Login} from "../Login/Login";
import {Register} from "../Register/Register";
import {DetailedPage} from "../MainPage/DetailedPage/DetailedPage";

export const RoutesContainer = () => {
    return (
        <Routes>
            <Route path={PATH.LOGIN} element={<Login/>}/>
            <Route path={PATH.PAYMENTS_PAGE} element={<PaymentTable/>}/>
            <Route path={PATH.DETAILED_PAGE} element={<DetailedPage/>}/>
            <Route path={PATH.REGISTER} element={<Register/>}/>
        </Routes>
    )
}