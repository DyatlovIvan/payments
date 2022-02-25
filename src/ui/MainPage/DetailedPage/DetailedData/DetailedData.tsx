import {PaymentResponseType} from "../../../../dal/api";
import {statusHandler} from "../../../Utils/statusHandler";
import {dateHandler} from "../../../Utils/dateHandler";
import s from "../DetailedPage.module.css";
import {ReusableButton} from "../../../Components/ReusableButton/ReusableButton";
import mainStyle from "../../../Components/ReusableStyle.module.css";

type DetailedDataType = {
    detailedPayment: PaymentResponseType
    goToEditMode: () => void
    goBack:() => void
}

export const DetailedData = ({detailedPayment, goToEditMode, goBack}: DetailedDataType) => {
    return (
        <div className={mainStyle.formContainer}>
            <div className={s.buttonGroup}>
                <ReusableButton className={s.button}
                               onClick={goBack} value={'Back'}/>
                <ReusableButton className={s.button}
                                onClick={goToEditMode} value={'Edit'}/></div>
            <div className={s.data}>
                <span><b>Name</b>: {detailedPayment.name}</span>
                <span><b>Sum</b>: {detailedPayment.sum}</span>
                <span><b>Date</b>: {dateHandler(detailedPayment.createdAt)}</span>
                <span><b>Status</b>: {statusHandler(detailedPayment.status)}</span>
            </div>
        </div>
    )
}