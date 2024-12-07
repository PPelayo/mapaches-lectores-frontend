import Link from "next/link";

export default function SubHeader() {
    return (
        <section className="bg-secondaryContainer flex justify-center">
            <nav className="w-full max-w-3xl bg-secondaryContainer text-lg flex flex-row items-center justify-between px-0 py-0">
                <Link href={'/'} className="h-full px-4 py-1 rounded-lg transition-colors duration-200 hover:bg-secondary hover:text-onSecondary">Inicio</Link>
                <Link href={'/books/edit'} className="h-full px-4 py-1 rounded-lg transition-colors duration-200 hover:bg-secondary hover:text-onSecondary">Crear Libro</Link>
                <Link href={'/authors/edit'} className="h-full px-4 py-1 rounded-lg transition-colors duration-200 hover:bg-secondary hover:text-onSecondary">Crear Autor</Link>
                <Link href={'/publishers/edit'} className="h-full px-4 py-1 rounded-lg transition-colors duration-200 hover:bg-secondary hover:text-onSecondary">Crear Editorial</Link>
            </nav>
        </section>
    )
}