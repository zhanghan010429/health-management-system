import httpRequest, { ResponseData } from './index'
import { AxiosPromise } from 'axios'

export const setBody = (
    id: number,
    tableName: string,
    form: any
): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/bodyMeasure/setBody',
        data: { id, tableName, ...form }
    })
}

export const getBody = (
    id: number,
    tableName: string,
): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/bodyMeasure/getBody',
        data: { id, tableName }
    })
}

export const setTemperature = (
    id: number,
    tableName: string,
    form: any
): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/bodyMeasure/setTemperature',
        data: { id, tableName, ...form }
    })
}

export const getTemperature = (
    id: number,
    tableName: string,
): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/bodyMeasure/getTemperature',
        data: { id, tableName }
    })
}

