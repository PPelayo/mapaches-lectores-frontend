import axios, {AxiosError, AxiosRequestConfig} from "axios";
import http from "http"
import {getTokens, saveTokens} from "../services/tokenService";
import BaseResponse from "@/core/definitinos/BaseResponse";

export const baseAxiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    httpAgent: new http.Agent({
        
    }),
    insecureHTTPParser: true
    
})

export const authAxiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    httpAgent: new http.Agent({
    })
})

interface AxiosRequestConfigExtend extends AxiosRequestConfig {
    _retry? : boolean
}

authAxiosClient.interceptors.request.use(
    config => {
        const accessToken = getTokens()?.accessToken
        config.headers = config.headers || {}
        config.headers['Authorization'] = `Bearer ${accessToken}`
        return config
    },
    error => {
        console.log('Error en la petición', error)
        return error
    }
)

authAxiosClient.interceptors.response.use(
    response => response,
    async (error : AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfigExtend
        if(originalRequest._retry)
            return Promise.reject(error)

        originalRequest._retry = true
        const refreshToken = getTokens()?.refreshToken
        if(refreshToken){
            try{
                const authRes = await axios.post<BaseResponse<string, string>>(
                    originalRequest.baseURL + '/auth/refresh-token',
                    { refreshToken }
                )
                // if(authRes.status !== 200){
                //     forceUserLogin()
                // }
                const newAccessToken = authRes.data.result!
                saveTokens({ accessToken : newAccessToken, refreshToken })
                originalRequest.headers = originalRequest.headers || {}
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

                return await authAxiosClient(originalRequest)
            } catch (ex){
                // if(ex instanceof AxiosError){
                //     if(ex.response?.status === 401){
                //         forceUserLogin()
                //     }
                // }
                return Promise.reject(ex)
            }
        }
        return Promise.reject(error)
    }
)
