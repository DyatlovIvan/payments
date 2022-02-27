import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {AppRootStateType} from "../../../bll/Store";
import {PaymentType} from "../../../dal/api";
import React, {useState} from "react";
import {DetailedDataForm} from "./DetailedData/DetailedDataForm";
import {DetailedData} from "./DetailedData/DetailedData";
import {updatePaymentRequest} from "../../../bll/Sagas/paymentsSaga";
import {PATH} from "../../Enums/Routes";

export const DetailedPage = React.memo(() => {
        const dispatch = useDispatch()
        const navigate = useNavigate()
        const payments = useSelector<AppRootStateType, Array<PaymentType>>(state => state.Payment.data)
        const id = useParams<'id'>().id
        const detailedPayment = payments.find(el => el.id === id)
        const [editMode, setEditMode] = useState(false)
        const savePaymentHandler = (payment: PaymentType) => {
            payment.createdAt = new Date(payment.createdAt).toISOString()
            dispatch(updatePaymentRequest(payment))
            setEditMode(false)
        }
        const goBack = () => navigate(PATH.PAYMENTS_PAGE)

        return (
            <div>
                {detailedPayment && (editMode
                    ? <DetailedDataForm detailedPayment={detailedPayment}
                                        savePayment={savePaymentHandler}
                                        goToEditMode={() => setEditMode(false)}/>
                    : <DetailedData detailedPayment={detailedPayment}
                                    goToEditMode={() => setEditMode(true)}
                                    goBack={goBack}/>)}
            </div>
        )
    }
)