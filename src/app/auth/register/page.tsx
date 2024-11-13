'use client'

import PrimaryButton from '@/core/components/buttons/PrimaryButton'
import BasicInput from '@/core/components/inputs/BasicInput'
import Link from 'next/link'

export default function Register() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        

    }

    return (
        <>
            <div className="w-full flex flex-col items-center justify-center mt-10">
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
                                required: true,
                                type: 'email',
                                placeholder: 'Email',
                            }}
                        />
                        <BasicInput
                            label="Email *"
                            baseAttributes={{
                                required: true,
                                type: 'email',
                                placeholder: 'Email',
                            }}
                        />
                        <BasicInput
                            label="Contraseña *"
                            baseAttributes={{
                                required: true,
                                type: 'password',
                                placeholder: 'Contraseña',
                            }}
                        />
                        <div className="flex flex-col gap-4">
                            <PrimaryButton
                                basicAttributes={{
                                    type: 'submit',
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
