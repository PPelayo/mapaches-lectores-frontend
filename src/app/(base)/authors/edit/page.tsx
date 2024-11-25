import CreateAuthorForm from "@/features/authors/components/CreateAuthorForm";

export default function AuthorsEdit() {
    return (
        <>
            <section className="place-self-center max-w-3xl w-full flex flex-col items-center mt-4">
                <header>
                    <h1 className="text-2xl font-bold">Crear Autor</h1>
                </header>
                <main className="w-full h-72">
                    <CreateAuthorForm />
                </main>

            </section>
        </>
    )
}