import httpRequest, { ResponseData } from './index'
import { AxiosPromise } from 'axios'

export const setExerciseStep = (
    id: number, 
    form: any
): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/exercise/setExerciseStep',
        data: { id, ...form }
    })
}

export const getExerciseStep = (
    id: number
): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/exercise/getExerciseStep',
        data: { id }
    })
}


export const setCalorie = (
    id: number, 
    form: any
): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/exercise/setCalorie',
        data: { id, ...form }
    })
}

export const getCalorie = (
    id: number
): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/exercise/getCalorie',
        data: { id }
    })
}