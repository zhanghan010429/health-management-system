import httpRequest, { ResponseData } from './index'
import { AxiosPromise } from 'axios'

export const setNutrition = (
    id: number, 
    form: any
): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/nutrition/setNutrition',
        data: { id, ...form }
    })
}

export const getNutrition = (
    id: number
): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/nutrition/getNutrition',
        data: { id }
    })
}