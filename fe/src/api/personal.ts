import httpRequest, { ResponseData } from './index'
import { AxiosPromise } from 'axios'

export const getUserInfo = (id: number): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'get',
        url: '/health/user/info',
        params: { id }
    })
}

export const changeUserName = (
    userId: number,
    userName: string
): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/user/changeUserName',
        data: { userId, userName }
    })
}

export const changeUserSex = (
    userId: number,
    sex: number
): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/user/changeUserSex',
        data: { userId, sex }
    })
}
