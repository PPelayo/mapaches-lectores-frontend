'use client'

import BaseResponse from "@/core/definitinos/BaseResponse"
import { authAxiosClient } from "@/features/auth/axios/axiosClient"
import User from "@/features/auth/definitions/user"
import { getTokens } from "@/features/auth/services/tokenService"
import { useUserStore } from "@/features/auth/services/useUserStore"
import { useEffect } from "react"



export default function UserInfoLoader(){

    const {user, setUser, setIsLoadingUser, isLoadingUser} = useUserStore()

    useEffect(() => {
        const tokens = getTokens()
        if (user || !tokens || isLoadingUser) return
        setIsLoadingUser(true)
        authAxiosClient
            .get<BaseResponse<User, string>>('/user/me')
            .then(({data}) => {
                setUser(data.result)
            })
            .catch((err) => {
                console.error('Error al obtener los datos', err)
                // deleteTokens()
            })
            .finally(() => {
                setIsLoadingUser(false)
            })
    }, [user, setUser, setIsLoadingUser, isLoadingUser])

    return (
        <></>
    )
}