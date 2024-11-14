'use client'

import Link from 'next/link'
import UserIcon from '../icons/UserIcon'
import { useUserStore } from '@/features/auth/services/useUserStore'
import { useEffect, useState } from 'react'
import { deleteTokens, getTokens } from '@/features/auth/services/tokenService'
import BasicLoader from '../loaders/BasicLoader'
import { baseAxiosClient } from '@/features/auth/axios/baseAxiosClient'
import BaseResponse from '@/core/definitinos/BaseResponse'
import User from '@/features/auth/definitions/user'

export default function ButtonCuenta() {
    const { user, setUser } = useUserStore()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const tokens = getTokens()
        if (user || !tokens) return

        baseAxiosClient.get<BaseResponse<User, string>>('/auth/me')
            .then(({ data }) => {
                setLoading(false)
                setUser(data.result)
            })
            .catch(err => {
                console.error("Error al obtener los datos", err)
                deleteTokens()
            })
            .finally(() => {
                setLoading(false)
            })
    }, [user, setUser])

    return (
        <>
            <BasicLoader 
                innerProps={{ size: 10, margin: 2, className: 'bg-secondary rounded-lg shadow px-4 py-2' }}  
                className='h-auto text-red-500'
                loading={loading}>
                <Link
                    href={'/auth/login'}
                    className="text-lg rounded-lg px-4 py-2 transition-all duration-200 hover:text-onSecondary hover:bg-secondary flex flex-row items-center gap-2"
                >
                    {!user ? (
                        <>
                            <UserIcon className="w-7 sm:w-8 h-auto" />
                            Mi cuenta
                        </>
                    ) : (
                        <>{user.name}</>
                    )}
                </Link>
            </BasicLoader>
        </>
    )
}
