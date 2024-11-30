'use server'
import SearcherBooksClient from "@/features/searcher/components/SearcherBooks.client";
import {bookRepository} from "@/features/books/lib/repositories/BookRepository";

export default async function SearcherBooksServer({ searchParams } : { searchParams: { q: string, category : string } }){
    const result = await bookRepository.getBooks({search: searchParams.q, limit: 15, offset: 0, category: searchParams.category})

    if (result.isFailure()) {
        return <SearcherBooksClient/>
    }

    return (
        <>
            <SearcherBooksClient initialFetch={result.getData()}/>
        </>
    )
}