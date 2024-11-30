'use client'

import {useUserStore} from "@/features/auth/services/useUserStore";
import {useMemo, useState} from "react";
import ConfirmModal from "@/core/components/modal/ConfirmModal";
import {deleteTokens} from "@/features/auth/services/tokenService";
import {useRouter} from "next/navigation";

export default function UserAccountPageClient() {

    const { user, clearUser } = useUserStore()
    const router = useRouter()

    const userRole = useMemo(() => {
        if(user?.role === 'Admin') return 'Administrador'
        if(user?.role === 'Regular') return 'Usuario'
        if(user?.role === 'Moderator') return 'Moderador'

        return 'No disponible'
    }, [user])

    const [open, setOpen] = useState(false)

    const handleCloseSesion = () => {
        clearUser()
        deleteTokens()
        router.push('/')
    }

    return (
        <>
            <ConfirmModal
                title={'Cerrar Sesión'}
                message={'¿Estás seguro de que quieres cerrar sesión?'}
                open={open}
                onConfirm={handleCloseSesion}
                onDissmis={() => setOpen(false)}
            />
            <section className={'w-full max-w-3xl place-self-center my-4 flex flex-col gap-4'}>
                <h1 className={'font-bold text-3xl text-center'}>Cuenta de usuario</h1>
                <UserSection title={'Nombre'} info={user?.name || 'No disponible'}/>
                <UserSection title={'Email'} info={user?.email || 'No disponible'}/>
                <UserSection title={'Rol'} info={userRole}/>
                <button
                    onClick={() => setOpen(true)}
                    className={'w-full px-4 py-2 rounded-full bg-red-50 text-red-500 text-xl font-bold border-2 border-red-500 transition-colors duration-300 hover:bg-red-500 hover:text-red-50 hover:border-red-50'}>
                    CERRAR SESIÓN
                </button>
            </section>
        </>
    )
}

function UserSection({ title, info}  : { title : string, info : string }){
    return (
        <>
            <div className={'shadow-lg bg-surfaceVariant rounded-xl px-4 py-2 border-2 border-background flex flex-col gap-2'}>
                <h3 className={'text-xl font-bold'}>{title}</h3>
                <hr className={'border border-background'}/>
                <p className={'font-xl'}>{info}</p>
            </div>
        </>
    )
}