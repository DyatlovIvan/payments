import {PaymentResponseType} from "../../../dal/api";
import {dateHandler} from "../../Utils/dateHandler";
import {ReusableButton} from "../../Components/ReusableButton/ReusableButton";
import s from './mainPage.module.css'
import {statusHandler} from "../../Utils/statusHandler";

export const Payment = ({payment, editPayment,deletePayment}: PaymentType) => {
    return (
        <tr>
            <td>{payment.name}</td>
            <td>{payment.sum}</td>
            <td>{dateHandler(payment.createdAt,"point")}</td>
            <td>{statusHandler(payment.status)}</td>
            <td>
                <ReusableButton className={s.editButton}
                                onClick={() => editPayment(payment.id)} value={"Edit"}/>
                <ReusableButton className={s.deleteButton}
                                onClick={() => deletePayment(payment.id)} value={"Delete"}/>
            </td>
        </tr>
    )
}

type PaymentType = {
    payment: PaymentResponseType
    editPayment: (id: string) => void
    deletePayment: (id: string) => void
}