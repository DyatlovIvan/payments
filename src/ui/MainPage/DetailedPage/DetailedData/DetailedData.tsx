import {PaymentType} from "../../../../dal/api";
import {statusHandler} from "../../../Utils/statusHandler";
import {dateHandler} from "../../../Utils/dateHandler";
import s from "../DetailedPage.module.css";
import {ReusableButton} from "../../../Components/ReusableButton/ReusableButton";
import mainStyle from "../../../Components/ReusableStyle.module.css";
import React from "react";

export const DetailedData = React.memo(({detailedPayment, goToEditMode, goBack}: DetailedDataType) => {
        return (
            <div className={mainStyle.formContainer}>
                <div className={s.buttonGroup}>
                    <ReusableButton className={s.button}
                                    onClick={goBack} value={"Back"}/>
                    <ReusableButton className={s.button}
                                    onClick={goToEditMode} value={"Edit"}/></div>
                <div className={s.data}>
                    <span><b>Name</b>: {detailedPayment.name}</span>
                    <span><b>Sum</b>: {detailedPayment.sum}</span>
                    <span><b>Date</b>: {dateHandler(detailedPayment.createdAt, "point")}</span>
                    <span><b>Status</b>: {statusHandler(detailedPayment.status)}</span>
                </div>
            </div>
        )
    }
)

type DetailedDataType = {
    detailedPayment: PaymentType
    goToEditMode: () => void
    goBack: () => void
}