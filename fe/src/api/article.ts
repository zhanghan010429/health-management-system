import httpRequest, { ResponseData } from './index'
import { AxiosPromise } from 'axios'

export const setArticle = (
    id: number,
    content: any
): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/article/setArticle',
        data: { id, content }
    })
}

export const getArticle = (): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/article/getArticle',
        data: {  }
    })
}

export const editArticle = (
    id: number,
    content: any
): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/article/editArticle',
        data: { id, content }
    })
}

export const getArticleById = (
    id: number
): AxiosPromise<ResponseData> => {
    return httpRequest.request({
        method: 'post',
        url: '/health/article/getArticleById',
        data: { id }
    })
}


