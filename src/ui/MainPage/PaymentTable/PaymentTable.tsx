import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/Store";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {fetchPayments} from "../../../bll/Sagas/paymentsSaga";
import {PaymentResponseType} from "../../../dal/api";
import {Payment} from "./Payment";
import s from './mainPage.module.css'

export const PaymentTable = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.Auth.isLogged)
    const payments = useSelector<AppRootStateType, Array<PaymentResponseType>>(state => state.Payment.data)
    useEffect(() => {
        dispatch(fetchPayments())
    }, [])

    const editPayment = (id:string) =>{
        navigate(`cards/${id}`)
    }
    return (
        <div className={s.paymentsPage}>
            <table className={s.table}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Sum</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {payments.map((el: PaymentResponseType) => (
                    <Payment key={el.id}
                             payment={el}
                             editPayment = {editPayment}/>
                ))}
                </tbody>
            </table>
        </div>
    )
}