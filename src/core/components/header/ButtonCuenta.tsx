'use client'

import Link from 'next/link'
import UserIcon from '../icons/UserIcon'
import { useUserStore } from '@/features/auth/services/useUserStore'
import { Fragment, useEffect, useState } from 'react'
import { deleteTokens, getTokens } from '@/features/auth/services/tokenService'
import BasicLoader from '../loaders/BasicLoader'
import { authAxiosClient } from '@/features/auth/axios/axiosClient'
import BaseResponse from '@/core/definitinos/BaseResponse'
import User from '@/features/auth/definitions/user'
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    MenuSeparator,
    Transition,
} from '@headlessui/react'

export default function ButtonCuenta() {
    const { user, setUser } = useUserStore()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const tokens = getTokens()
        if (user || !tokens) return
        setLoading(true)
        authAxiosClient
            .get<BaseResponse<User, string>>('/user/me')
            .then(({ data }) => {
                setLoading(false)
                setUser(data.result)
            })
            .catch((err) => {
                console.error('Error al obtener los datos', err)
                deleteTokens()
            })
            .finally(() => {
                setLoading(false)
            })
    }, [user, setUser])

    return (
        <>
            <BasicLoader
                innerProps={{
                    size: 10,
                    margin: 2,
                    speedMultiplier: 0.7,
                    className: 'bg-secondary rounded-lg shadow px-4 py-2',
                }}
                className="h-auto text-red-500"
                loading={loading}
            >
                {user ? (
                    <ButtonWithLogin user={user} />
                ) : (
                    <ButtonWithoutLogin />
                )}
            </BasicLoader>
        </>
    )
}

function ButtonWithoutLogin() {
    return (
        <Link
            href={'/auth/login'}
            className="text-lg rounded-lg px-4 py-2 transition-all duration-200 hover:text-onSecondary hover:bg-secondary flex flex-row items-center gap-2"
        >
            <UserIcon className="w-7 sm:w-8 h-auto" />
            Mi cuenta
        </Link>
    )
}

function ButtonWithLogin({ user }: { user: User }) {
    return (
        <div>
            <Menu>
                <MenuButton className="text-lg rounded-lg px-4 py-2 transition-all duration-200 hover:text-onSecondary hover:bg-secondary flex flex-row items-center gap-2">
                    <UserIcon className="w-7 sm:w-8 h-auto" />
                    {user.name}
                </MenuButton>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-300"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-200"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <MenuItems
                        anchor="bottom"
                        className={
                            'mt-2 absolute border border-onPrimaryContainer bg-primaryContainer rounded-lg shadow-xl flex flex-col text-onSecondary shadow-gray-400'
                        }
                    >
                        <MenuItem
                            className={
                                'px-2 py-2 transition-all duration-200 hover:bg-secondary hover:text-onSecondary'
                            }
                            as={'button'}
                        >
                            Cuenta
                        </MenuItem>
                        <MenuSeparator
                            className={'w-full border border-onSecondary'}
                        />
                        <MenuItem
                            className={
                                'text-red-500 font-bold px-2 py-2 transition-colors duration-200 hover:bg-secondary hover:text-red-300 '
                            }
                            as="button"
                        >
                            Cerrar sesión
                        </MenuItem>
                    </MenuItems>
                </Transition>
            </Menu>
        </div>
    )
}
