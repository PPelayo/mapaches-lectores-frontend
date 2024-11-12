'use client'

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
                    <label>
                        <h4 className="text-lg ml-1">Email *</h4>
                        <input
                            required
                            type="email"
                            placeholder="Email"
                            className="w-80 h-12 px-2 py-1 rounded-lg outline-none border-2 border-gray-300 shadow transition-colors hover:border-secondary"
                        />
                    </label>
                    <label>
                        <h4 className="text-lg ml-1">Contraseña *</h4>
                        <input
                            required
                            type="password"
                            placeholder="Contraseña"
                            className="w-80 h-12 px-2 py-1 rounded-lg outline-none border-2 border-gray-300 shadow transition-colors hover:border-secondary"
                        />
                    </label>
                    <div className="flex flex-col gap-4">
                        <button
                            className="mt-4 px-4 py-2 bg-primary text-xl font-bold uppercase rounded-full text-onPrimary border-2 border-transparent transition-colors duration-300 hover:border-primary hover:text-primary hover:bg-onPrimary"
                            type="submit"
                        >
                            Iniciar Sesión
                        </button>
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
