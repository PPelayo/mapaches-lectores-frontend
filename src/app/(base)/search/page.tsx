'use server'

import {Book} from "@/features/books/definitions/Book";
import {baseAxiosClient} from "@/features/auth/axios/axiosClient";
import BaseResponse from "@/core/definitinos/BaseResponse";
import PaginationResult from "@/core/definitinos/PaginationResult";
import SearcherBooks from "@/features/searcher/components/SearcherBooks";

export default async function Search({searchParams}: { searchParams: { q: string } }) {

    let result : PaginationResult<Book> | undefined = undefined

    try {
        const respose = await baseAxiosClient.get<BaseResponse<PaginationResult<Book>, string>>("/books", {
            params: {
                search: searchParams.q
            }
        })
        result = respose.data.result
    } catch (ex) {
        console.error(ex)
        return <SearcherBooks/>
    }

    return (
        <>
           <SearcherBooks initialFetch={result}/>
        </>
    )
}