'use client'

import PrimaryButton from '@/core/components/buttons/PrimaryButton'
import BasicInput from '@/core/components/inputs/BasicInput'
import LoginRequest from '@/features/auth/definitions/loginRequest'
import useLogin from '@/features/auth/hooks/useLogin'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {useEffect} from 'react'
import toast, {Toaster} from 'react-hot-toast'

export default function Login() {
    const { error, loading, login, success } = useLogin()
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const req = Object.fromEntries(new FormData(e.currentTarget))
        login(req as unknown as LoginRequest)
    }

    useEffect(() => {
        if (error) 
            toast.error(error)

    }, [error])


    useEffect(() => {
        if (success){
            toast.success('Inicio de sesión exitoso')
            router.push('/')
        }

    }, [success, router])

    return (
        <>
            <Toaster position='bottom-center' />
            <div className="w-full flex flex-col items-center justify-center my-10">
                <header className="flex flex-col items-center gap-6">
                    <Link href={'/'}>
                        <img src={'/logo.png'} alt={'Logo'} className={'h-32'} />
                    </Link>
                    <h1 className="text-3xl font-bold uppercase">
                        Iniciar Sesión
                    </h1>
                </header>
                <section>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-6 mt-4"
                    >
                        <BasicInput
                            label="Email *"
                            error={error}
                            baseAttributes={{
                                name: 'email',
                                required: true,
                                type: 'email',
                                placeholder: 'Email',
                            }}
                        />
                        <BasicInput
                            label="Contraseña *"
                            baseAttributes={{
                                name: 'password',
                                required: true,
                                type: 'password',
                                placeholder: 'Contraseña',
                            }}
                        />
                        <div className="flex flex-col gap-4">
                            <PrimaryButton
                                basicAttributes={{
                                    type: 'submit',
                                    disabled: loading,
                                }}
                            >
                                Iniciar sesión
                            </PrimaryButton>
                            <Link
                                href="/auth/register"
                                className="text-center px-4 py-2 text-xl font-bold uppercase rounded-full border-2 border-secondary text-secondary bg-surface transition-colors duration-300 hover:border-primary hover:text-primary"
                            >
                                Registrarse
                            </Link>
                        </div>
                    </form>
                </section>
            </div>
        </>
    )
}
