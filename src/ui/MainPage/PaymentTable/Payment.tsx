import {PaymentResponseType} from "../../../dal/api";
import {PAYMENTS_STATUS_TYPE} from "../../Enums/PaymentsStatusType";
import {dateHandler} from "../../Utils/dateHandler";
import {ReusableButton} from "../../Components/ReusableButton/ReusableButton";
import s from './mainPage.module.css'


type PaymentType = {
    payment: PaymentResponseType
    editPayment: (id: string) => void
    deletePayment: (id: string) => void
}

export const Payment = ({payment, editPayment,deletePayment}: PaymentType) => {
    return (
        <tr>
            <td>{payment.name}</td>
            <td>{payment.sum}</td>
            <td>{dateHandler(payment.createdAt)}</td>
            <td>{payment.status ? PAYMENTS_STATUS_TYPE.SUCCESS : PAYMENTS_STATUS_TYPE.PENDING}</td>
            <td>
                <ReusableButton className={s.editButton}
                                onClick={() => editPayment(payment.id)} value={'Edit'}/>
                <ReusableButton className={s.deleteButton}
                                onClick={() => deletePayment(payment.id)} value={'Delete'}/>
            </td>
        </tr>
    )
}