import httpRequest, { ResponseData } from './index'
import { AxiosPromise } from 'axios'

export const login = (
    phone: string,
    pwd: string
): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/auth/loginForm',
        data: { phone, pwd }
    })
}

export const regist = (
    phone: string,
    pwd: string,
    gender: string,
    name: string,
    age: string
): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/auth/registForm',
        data: { phone, pwd, name, gender, age }
    })
}

export const getPhoneCode = (phone: string): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/auth/getPhoneCode',
        data: { phone }
    })
}

export const resetPassword = (
    phone: string,
    pwd: string
): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/auth/resetPassword',
        data: { phone, pwd }
    })
}
