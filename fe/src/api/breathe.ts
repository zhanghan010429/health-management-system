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