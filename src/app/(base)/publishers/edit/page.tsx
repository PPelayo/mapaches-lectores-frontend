'use client'
import CreatePublisherForm from "@/features/publishers/components/CreatePublisherForm";
import {useRouter} from "next/navigation";
import toast, {Toaster} from "react-hot-toast";

export default function PublishersEdit(){
    const router = useRouter()

    const handleCreated = () => {
        router.push('/')
        toast.success('Editorial creada')
    }
    return (
        <>
            <Toaster position={'bottom-right'}/>
            <section className="place-self-center max-w-3xl w-full flex flex-col items-center mt-4">
                <header>
                    <h1 className="text-2xl font-bold">
                        Crear Editorial
                    </h1>
                </header>
                <main className="w-full h-72 p-4">
                    <CreatePublisherForm onCreated={handleCreated}/>
                </main>
            </section>
        </>
    )
}