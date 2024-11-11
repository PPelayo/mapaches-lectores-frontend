export default function SubHeader() {
    return (
        <section className="bg-secondaryContainer flex justify-center">
            <nav className="w-full max-w-3xl bg-secondaryContainer text-lg flex flex-row items-center justify-between px-0 py-0">
                <button className="h-full px-4 py-1 rounded-lg transition-colors duration-200 hover:bg-secondary hover:text-onSecondary">Inicio</button>
                <button className="h-full px-4 py-1 rounded-lg transition-colors duration-200 hover:bg-secondary hover:text-onSecondary">Libros</button>
                <button className="h-full px-4 py-1 rounded-lg transition-colors duration-200 hover:bg-secondary hover:text-onSecondary">Autores</button>
                <button className="h-full px-4 py-1 rounded-lg transition-colors duration-200 hover:bg-secondary hover:text-onSecondary">Editoriales</button>
            </nav>
        </section>
    )
}