'use client'

import CreateAuthorForm from "@/features/authors/components/CreateAuthorForm";
import {useRouter} from "next/navigation";
import toast, {Toaster} from "react-hot-toast";

export default function AuthorsEdit() {

    const router = useRouter()

    const handleCreated = () => {
        toast.success('Autor creado')
        router.push('/')
    }

    return (
        <>
            <Toaster position={'bottom-right'}/>
            <section className="place-self-center max-w-3xl w-full flex flex-col items-center mt-4">
                <header>
                    <h1 className="text-2xl font-bold">Crear Autor</h1>
                </header>
                <main className="w-full h-72 p-4">
                    <CreateAuthorForm onCreated={handleCreated} />
                </main>

            </section>
        </>
    )
}