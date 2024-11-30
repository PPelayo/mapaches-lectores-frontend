'use server'

import FullError from "@/core/components/errors/FullError"
import MorePopularBooksCarousel from "@/features/books/components/MorePopularBooksCarousel";
import {bookRepository} from "@/features/books/lib/repositories/BookRepository";

export default async function MorePopularBooks() {
    const booksResult = await bookRepository.getBooks({limit: 10, order: 'Popular'})

    if(booksResult.isFailure()){
        return <FullError error={booksResult.getError()}/>
    }

    const books = booksResult.getData().data
    return (
        <>
            <section className="flex flex-col gap-1 py-2 px-4 mt-2">
                <h2 className="text-2xl font-bold">Libros más populares</h2>
                <MorePopularBooksCarousel books={books} />
            </section>
        </>

    )
}
