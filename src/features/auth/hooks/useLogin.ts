import { useState } from "react"
import LoginRequest from "../definitions/loginRequest"
import { baseAxiosClient } from "../axios/baseAxiosClient"
import BaseResponse from "@/core/definitinos/BaseResponse"
import { AxiosError } from "axios"
import loginResponse from "../definitions/loginResponse"
import { saveTokens } from "../services/tokenService"

export default function useLogin(){

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const login = (req : LoginRequest) => {
        baseAxiosClient.post<BaseResponse<loginResponse, string>>('/auth/login', req)
            .then((res) => {
                const { tokens } = res.data.result
                saveTokens(tokens)
            })
            .catch((ex) => {
                if(ex instanceof AxiosError && ex.status === 400){
                    setError('Usuario y/o contraseña incorrectos')
                    return
                }

                setError('Error desconocido')
            })  
            .finally(() => {
                setLoading(false)
            })
    }


    return {
        login,
        loading,
        error
    }
}