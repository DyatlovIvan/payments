import {PAYMENTS_STATUS_TYPE} from "../Enums/PaymentsStatusType";

export const statusHandler = (status: boolean) => {
    return status ? PAYMENTS_STATUS_TYPE.SUCCESS : PAYMENTS_STATUS_TYPE.PENDING
}