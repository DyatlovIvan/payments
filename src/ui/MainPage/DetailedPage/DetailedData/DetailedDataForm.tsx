import {PaymentResponseType} from "../../../../dal/api";
import {useFormik} from "formik";
import {ChangeEventHandler} from "react";
import {ReusableButton} from "../../../Components/ReusableButton/ReusableButton";
import s from "../DetailedPage.module.css";
import mainStyle from "../../../Components/ReusableStyle.module.css";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../bll/Store";
import {RequestStatusType} from "../../../../bll/Reducers/AppReducer";
import {STATUS_TYPE} from "../../../Enums/StatusType";
import {Preloader} from "../../../Components/Preloader/Preloader";
import {dateHandler} from "../../../Utils/dateHandler";

export const DetailedDataForm = ({detailedPayment, savePayment, goToEditMode}: DetailedDataFormType) => {
    const createdAt = dateHandler(detailedPayment.createdAt,"hyphen")
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.App.status)
    const formik = useFormik({
        initialValues: {
            id: detailedPayment.id,
            name: detailedPayment.name,
            sum: detailedPayment.sum,
            createdAt:createdAt,
            status: detailedPayment.status
        },
        onSubmit: (values) => savePayment(values as PaymentResponseType)
    })

    const OnChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        formik.handleChange(e)
    }
    if(status === STATUS_TYPE.LOADING){
        return(<Preloader/>)
    }
    return (
        <form onSubmit={formik.handleSubmit} className={mainStyle.formContainer}>
            <div className={s.buttonGroup}>
                <ReusableButton className={s.button} onClick={goToEditMode}
                                type={"button"} value={"Back"}/>
                <ReusableButton className={s.button}
                                type={"submit"} value={"Save"}/>
            </div>
            <div>
                <b>Name</b>:
                <div>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={OnChangeHandler}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}/>
                </div>

                <b>Sum</b>:
                <div>
                    <input
                        id="sum"
                        name="sum"
                        type="number"
                        onChange={OnChangeHandler}
                        onBlur={formik.handleBlur}
                        value={formik.values.sum}/>
                </div>

                <b>Date</b>:
                <div>
                    <input
                        id="createdAt"
                        name="createdAt"
                        type="date"
                        onChange={OnChangeHandler}
                        onBlur={formik.handleBlur}
                        defaultValue={formik.values.createdAt}/>
                </div>

                <b>Status</b>:
                <input
                    id="status"
                    name="status"
                    type="checkbox"
                    onChange={formik.handleChange}
                    checked={formik.values.status}/>
            </div>
        </form>
    )
}

type DetailedDataFormType = {
    detailedPayment: PaymentResponseType
    savePayment: (detailedPayment: PaymentResponseType) => void
    goToEditMode: () => void
}
