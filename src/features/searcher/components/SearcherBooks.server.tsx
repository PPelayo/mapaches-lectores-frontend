import PaginationResult from "@/core/definitinos/PaginationResult";
import {Book} from "@/features/books/definitions/Book";
import {baseAxiosClient} from "@/features/auth/axios/axiosClient";
import BaseResponse from "@/core/definitinos/BaseResponse";
import SearcherBooksClient from "@/features/searcher/components/SearcherBooks.client";
import {bookRepository} from "@/features/books/lib/repositories/BookRepository";

export default async function SearcherBooksServer({ searchParams } : { searchParams: { q: string, category : string } }){
    let result: PaginationResult<Book> | undefined = await bookRepository.getBooks({search: searchParams.q, limit: 15, offset: 0, category: searchParams.category})

    if (!result) {
        return <SearcherBooksClient/>
    }

    return (
        <>
            <SearcherBooksClient initialFetch={result}/>
        </>
    )
}