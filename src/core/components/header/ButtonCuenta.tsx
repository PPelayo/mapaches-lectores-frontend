'use client'

import User from '@/features/auth/definitions/user'
import { deleteTokens } from '@/features/auth/services/tokenService'
import { useUserStore } from '@/features/auth/services/useUserStore'
import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator, Transition, } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from "next/navigation"
import { Fragment, useMemo } from 'react'
import UserIcon from '../icons/UserIcon'
import BasicLoader from '../loaders/BasicLoader'

export default function ButtonCuenta() {

    const { user, isLoadingUser: loading } = useUserStore()

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

    console.log(user)
    const { clearUser } = useUserStore()
    const router = useRouter()

    const showAdminOption = useMemo(() => user.role === 'Admin' || user.role === 'Moderator', [user])

    const handleCloseSesion = () => {
        clearUser()
        deleteTokens()
    }

    const handleUserAccount = () => {
        router.push('/account')
    }

    const handleAdministrar = () => {
        router.push('/administrar')
    }

    return (
        <div>
            <Menu>
                <MenuButton
                    className="text-lg rounded-lg px-4 py-2 transition-all duration-200 hover:text-onSecondary hover:bg-secondary flex flex-row items-center gap-2">
                    <UserIcon className="w-7 sm:w-8 h-auto" />
                    <div className={'hidden xs:block'}>
                        {user.name}
                    </div>
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
                            'z-30 mt-2 absolute border border-onPrimaryContainer bg-primaryContainer rounded-lg shadow-xl flex flex-col text-onSecondary shadow-gray-400'
                        }
                    >
                        {
                            showAdminOption &&
                            <MenuItem
                                className={
                                    'px-2 py-2 transition-all duration-200 hover:bg-secondary hover:text-onSecondary'
                                }
                                as={'button'}
                                onClick={handleAdministrar}
                            >
                                Administrar
                            </MenuItem>
                        }
                        <MenuItem
                            className={
                                'px-2 py-2 transition-all duration-200 hover:bg-secondary hover:text-onSecondary'
                            }
                            as={'button'}
                            onClick={handleUserAccount}
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
                            onClick={handleCloseSesion}
                        >
                            Cerrar sesión
                        </MenuItem>
                        
                    </MenuItems>
                </Transition>
            </Menu>
        </div>
    )
}
