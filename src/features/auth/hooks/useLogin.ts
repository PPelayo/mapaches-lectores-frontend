import { useState } from "react"
import LoginRequest from "../definitions/loginRequest"
import { baseAxiosClient } from "../axios/axiosClient"
import BaseResponse from "@/core/definitinos/BaseResponse"
import { AxiosError } from "axios"
import loginResponse from "../definitions/loginResponse"
import { saveTokens } from "../services/tokenService"
import { useUserStore } from "../services/useUserStore"

export default function useLogin(){

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)

    const { setUser } = useUserStore()

    const login = (req : LoginRequest) => {

        setLoading(true)
        setError(null)
        baseAxiosClient.post<BaseResponse<loginResponse, string>>('/auth/login', req)
            .then((res) => {
                const { tokens, user } = res.data.result
                saveTokens(tokens)
                setUser(user)
                setSuccess(true)
            })
            .catch((ex) => {
                if(ex instanceof AxiosError && ex.status === 400){
                    setError('Usuario y/o contraseña incorrectos')
                    return
                }
                console.error('Error al iniciar sesión', ex)
                setError('Error desconocido')
            })  
            .finally(() => {
                setLoading(false)
                setSuccess(false)
            })
    }


    return {
        login,
        loading,
        error,
        success
    }
}