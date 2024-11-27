import PaginationResult from "@/core/definitinos/PaginationResult";
import {Book} from "@/features/books/definitions/Book";
import {baseAxiosClient} from "@/features/auth/axios/axiosClient";
import BaseResponse from "@/core/definitinos/BaseResponse";
import SearcherBooksClient from "@/features/searcher/components/SearcherBooks.client";
import SearcherBooksLateralMenu from "@/features/searcher/components/SearcherBooksLateralMenu";

export default async function SearcherBooksServer({ searchParams } : { searchParams: { q: string } }){
    let result: PaginationResult<Book> | undefined = undefined

    try {
        const respose = await baseAxiosClient.get<BaseResponse<PaginationResult<Book>, string>>("/books", {
            params: {
                search: searchParams.q
            }
        })
        result = respose.data.result
    } catch (ex) {
        console.error(ex)
        return <SearcherBooksClient/>
    }

    return (
        <>
            <SearcherBooksClient initialFetch={result}/>
        </>
    )
}