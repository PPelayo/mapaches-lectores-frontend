import { useState } from "react"
import { baseAxiosClient } from "../axios/baseAxiosClient"
import BaseResponse from "@/core/definitinos/BaseResponse"
import RegisterResponse from "../definitions/registerResponse"
import { saveTokens } from "../services/tokenService"
import RegisterRequest from "../definitions/registerRequest"
import { AxiosError } from "axios"
import { useUserStore } from "../services/useUserStore"

export function useRegister() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const { setUser } = useUserStore()

    const register = (registerRequest: RegisterRequest) => {
        if(registerRequest.password !== registerRequest.confirmPassword)
            return setError("Las contraseñas no coinciden")

        setLoading(true)
        setError(null)
        baseAxiosClient.post<BaseResponse<RegisterResponse, string>>("/auth/register", registerRequest)
            .then((res) => {
                const { user, tokens } = res.data.result
                saveTokens(tokens)
                setUser(user)
            })
            .catch((er) => {
                console.log('err', er);
                
                if (er instanceof AxiosError && er.status === 400) {
                    setError("El usuario ya existe")
                    return
                }
                console.error("An error occurred", er)
                setError("Ha ocurrido un error al registrar")
            })
            .finally(()=> setLoading(false))
    }

    return {
        register,
        loading,
        error,
    }
}