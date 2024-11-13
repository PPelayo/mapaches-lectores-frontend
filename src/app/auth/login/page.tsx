'use client'

import PrimaryButton from "@/core/components/buttons/PrimaryButton";
import BasicInput from "@/core/components/inputs/BasicInput";
import Link from "next/link";


export default function Login() {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <div className="w-full flex flex-col items-center justify-center mt-10">
            <header className="flex flex-col items-center gap-6">
                <Link href={"/"}>
                    <picture className="border-2 border-secondary rounded-lg text-secondary text-2xl px-4 py-2">
                        Insertar logo
                    </picture>
                </Link>
                <h1 className="text-3xl font-bold uppercase">Iniciar Sesión</h1>
            </header>
            <section>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
                    <BasicInput
                        label="Email *"
                        baseAttributes={{
                            required: true,
                            type: "email",
                            placeholder: "Email"
                        }}
                    />
                    <BasicInput
                        label="Contraseña *"
                        baseAttributes={{
                            required: true,
                            type: "password",
                            placeholder: "Contraseña"
                        }}
                    />
                    <div className="flex flex-col gap-4">
                        <PrimaryButton
                            basicAttributes={{
                                type: "submit"
                            }}
                        >Iniciar sesión</PrimaryButton>
                        <Link href="/auth/register"
                            className="text-center px-4 py-2 text-xl font-bold uppercase rounded-full border-2 border-secondary text-secondary bg-surface transition-colors duration-300 hover:border-primary hover:text-primary"
                        >
                            Registrarse
                        </Link>
                    </div>
                </form>
            </section>
        </div>
    )
}
