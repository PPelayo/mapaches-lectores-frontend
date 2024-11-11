export default function BookCard () {
    return (
        <article className="flex-grow-0 flex-shrink-0 border-2 rounded-lg w-52 flex flex-col gap-1 cursor-pointer bg-primaryConatiner transition-all duration-300 hover:bg-primaryContainer hover:text-onPrimary scroll-px-4">
            <picture className="aspect-portada rounded-t-lg overflow-hidden">
                <img className="object-cover w-full h-full" alt="Alas de sangre" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV_MLFoyKI3SE5R4vS1A7riLHUKH0PacALqA&s"></img>
            </picture>
            <div className="flex flex-col gap-0 items-center">
                <h2 className="text-2xl font-bold">Titulo</h2>
                <h6 className="italic">Autor</h6>
                <section className="w-full px-2 text-right">4,4 - 3 valoraciones</section>
            </div>
        </article>
    )
}