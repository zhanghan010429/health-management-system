import httpRequest, { ResponseData } from './index'
import { AxiosPromise } from 'axios'

export const setBreatheData = (
    id: number, 
    form: any
): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/breathe/setBreatheData',
        data: { id, ...form }
    })
}

export const getBreatheData = (
    id: number
): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/breathe/getBreatheData',
        data: { id }
    })
}

export const setBloodOxygenData = (
    id: number, 
    form: any
): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/breathe/setBloodOxygenData',
        data: { id, ...form }
    })
}

export const getBloodOxygenData = (
    id: number
): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/breathe/getBloodOxygenData',
        data: { id }
    })
}

export const setVitalApacityData = (
    id: number, 
    form: any
): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/breathe/setVitalApacityData',
        data: { id, ...form }
    })
}

export const getVitalApacityData = (
    id: number
): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/breathe/getVitalApacityData',
        data: { id }
    })
}

