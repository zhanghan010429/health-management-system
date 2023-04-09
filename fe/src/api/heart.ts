import httpRequest, { ResponseData } from './index'
import { AxiosPromise } from 'axios'

export const setHeart = (
    id: number,
    tableName: string,
    form: any
): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/heart/setHeart',
        data: { id, tableName, ...form }
    })
}

export const getHeart = (
    id: number,
    tableName: string,
): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/heart/getHeart',
        data: { id, tableName }
    })
}