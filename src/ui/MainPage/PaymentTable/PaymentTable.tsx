import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/Store";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {fetchPayments, removePayment} from "../../../bll/Sagas/paymentsSaga";
import {PaymentResponseType} from "../../../dal/api";
import {Payment} from "./Payment";
import s from './mainPage.module.css'
import {STATUS_TYPE} from "../../Enums/StatusType";
import {RequestStatusType} from "../../../bll/Reducers/AppReducer";
import {Preloader} from "../../Components/Preloader/Preloader";

export const PaymentTable = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const payments = useSelector<AppRootStateType, Array<PaymentResponseType>>(state => state.Payment.data)
    const error = useSelector<AppRootStateType, string | null>(state => state.App.error)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.App.status)

    useEffect(() => {
        dispatch(fetchPayments())
    }, [])

    const editPayment = (id: string) => navigate(`/detailed${id}`)

    const deletePayment = (id:string) => {
        debugger
        dispatch(removePayment(id))
    }
    if(status === STATUS_TYPE.LOADING){
        return(<Preloader/>)
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
                             editPayment={editPayment}
                             deletePayment={deletePayment}/>
                ))}
                </tbody>
            </table>

        </div>
    )
}