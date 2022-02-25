import axios from "axios";

const instance = axios.create({
    baseURL: 'https://621473c589fad53b1f142ad3.mockapi.io/api/v1/'
})

export const authAPI = {
    login(email: string, password: string) {

        return instance.get('auth', {params: {password, email}})
            .then(res => res.data)
    },
    register(email: string, password: string) {
        return instance.post('auth', {email, password})
    }
}

export const paymentAPI = {
    getPayments() {
        return instance.get('payment')
            .then(res => res.data)
    },
    removePayment(id: string) {
        return instance.delete(`payment/${id}`)
    },
    updatePayment(payment: PaymentResponseType) {
        return instance.put(`payment/${payment.id}`, {
                name: payment.name,
                sum: payment.sum,
                createdAt: payment.createdAt,
                status: payment.status
            })
            .then(res=>res.data)
    }
}

export type ResponseType = {
    email: string
    password: string
    id: string
}

export type PaymentResponseType = {
    id: string
    createdAt: string
    name: string
    sum: number
    status: boolean
}