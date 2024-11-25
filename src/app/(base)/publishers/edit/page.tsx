import CreatePublisherForm from "@/features/publishers/components/CreatePublisherForm";

export default function PublishersEdit(){

    return (
        <>
            <section className="self-center place-self-center flex flex-col gap-8 mt-4 items-center w-full max-w-3xl">
                <header>
                    <h1 className="text-2xl">
                        Crear Editorial
                    </h1>
                </header>
                <main className="w-full h-72">
                    <CreatePublisherForm/>
                </main>
            </section>
        </>
    )
}