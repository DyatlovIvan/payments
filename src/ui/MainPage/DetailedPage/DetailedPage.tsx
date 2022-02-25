import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {AppRootStateType} from "../../../bll/Store";
import {PaymentResponseType} from "../../../dal/api";
import {ReusableInput} from "../../Components/ReusableInput/ReusableInput";
import {INPUT_TYPE} from "../../Enums/InputType";
import {STATUS_TYPE} from "../../Enums/StatusType";
import {RequestStatusType} from "../../../bll/Reducers/AppReducer";
import {ChangeEvent, DetailedHTMLProps, FormEvent, InputHTMLAttributes, useState} from "react";
import {DetailedDataForm} from "./DetailedData/DetailedDataForm";
import {DetailedData} from "./DetailedData/DetailedData";
import {ReusableButton} from "../../Components/ReusableButton/ReusableButton";
import {updatePayment} from "../../../bll/Sagas/paymentsSaga";
import {PATH} from "../../Enums/Routes";

export const DetailedPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const payments = useSelector<AppRootStateType, Array<PaymentResponseType>>(state => state.Payment.data)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.App.status)
    const id = useParams<'id'>().id
    const detailedPayment = payments.filter(el => el.id === id)[0]


    const [editMode, setEditMode] = useState(false)
    const savePaymentHandler = (payment: PaymentResponseType) => {
        dispatch(updatePayment(payment))
        setEditMode(false)
    }

    const goBack = () => {
        navigate(PATH.PAYMENTS_PAGE)
    }

    return (
        <div>
            {editMode
                ? <DetailedDataForm detailedPayment={detailedPayment}
                                    savePayment={savePaymentHandler}
                                    goToEditMode={() => setEditMode(false)}/>
                : <DetailedData detailedPayment={detailedPayment}
                                goToEditMode={() => setEditMode(true)}
                                goBack={goBack}/>}

        </div>
    )
}