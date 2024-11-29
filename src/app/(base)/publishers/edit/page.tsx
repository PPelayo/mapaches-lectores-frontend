import CreatePublisherForm from "@/features/publishers/components/CreatePublisherForm";

export default function PublishersEdit(){

    return (
        <>
            <section className="place-self-center max-w-3xl w-full flex flex-col items-center mt-4">
                <header>
                    <h1 className="text-2xl font-bold">
                        Crear Editorial
                    </h1>
                </header>
                <main className="w-full h-72 p-4">
                    <CreatePublisherForm/>
                </main>
            </section>
        </>
    )
}