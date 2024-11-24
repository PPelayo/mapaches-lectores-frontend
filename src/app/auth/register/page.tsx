'use client'

import PrimaryButton from '@/core/components/buttons/PrimaryButton'
import BasicInput from '@/core/components/inputs/BasicInput'
import RegisterRequest from '@/features/auth/definitions/registerRequest'
import {useRegister} from '@/features/auth/hooks/useRegister'
import {useUserStore} from '@/features/auth/services/useUserStore'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {useEffect} from 'react'
import toast, {Toaster} from 'react-hot-toast'

export default function Register() {

    const {
        loading,
        error,
        register,
    } = useRegister()

    const { user } = useUserStore()

    const router = useRouter()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log('submit');
        
        e.preventDefault()

        const regReq = Object.fromEntries(new FormData(e.currentTarget))
        register(regReq as unknown as RegisterRequest)        
    }

    useEffect(() => {
        console.log(error);
        
        if(error)
            toast.error(error)

    }, [error])

    useEffect(()=> {
        if(user){
            toast.success('Usuario registrado')
            router.push('/')
        }
            
    }, [user, router])

    return (
        <>
            <div className="w-full flex flex-col items-center justify-center mt-10">
            <Toaster position='bottom-center' />
                <header className="flex flex-col items-center gap-6">
                    <Link href={'/'}>
                        <picture className="border-2 border-secondary rounded-lg text-secondary text-2xl px-4 py-2">
                            Insertar logo
                        </picture>
                    </Link>
                    <h1 className="text-3xl font-bold uppercase">Registrar</h1>
                </header>
                <section>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-6 mt-4"
                    >
                        <BasicInput
                            label="Nombre *"
                            baseAttributes={{
                                name: 'name',
                                required: true,
                                placeholder: 'Nombre',
                                
                            }}
                        />
                        <BasicInput
                            label="Email *"
                            baseAttributes={{
                                name: 'email',
                                required: true,
                                type: 'email',
                                placeholder: 'Email',
                            }}
                            error={error}
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
                        <BasicInput
                            label="Confirmar contraseña *"
                            baseAttributes={{
                                name: 'confirmPassword',
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
                                Registrarse
                            </PrimaryButton>
                        </div>
                    </form>
                </section>
            </div>
        </>
    )
}
