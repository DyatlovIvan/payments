import {PaymentResponseType} from "../../../dal/api";
import {PAYMENTS_STATUS_TYPE} from "../../Enums/PaymentsStatusType";
import {dateHandler} from "../../Utils/dateHandler";
import {ReusableButton} from "../../Components/ReusableButton/ReusableButton";
import s from './mainPage.module.css'
import {useNavigate} from "react-router-dom";

type PaymentType = {
    payment:PaymentResponseType
    editPayment:(id:string)=>void
}

export const Payment = ({payment,editPayment}:PaymentType) => {

    return (
        <tr>
            <td>{payment.name}</td>
            <td>{payment.sum}</td>
            <td>{dateHandler(payment.createdAt)}</td>
            <td>{payment.status?PAYMENTS_STATUS_TYPE.SUCCESS:PAYMENTS_STATUS_TYPE.PENDING}</td>
            <td>
                <ReusableButton className={s.editButton}
                                onClick={()=>editPayment(payment.id)} value={'Edit'}/>
            </td>
        </tr>
    )
}