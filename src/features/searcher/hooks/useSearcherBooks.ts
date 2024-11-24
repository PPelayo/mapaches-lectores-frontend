import {useCallback, useEffect, useState} from "react";
import {Book} from "@/features/books/definitions/Book";
import {baseAxiosClient} from "@/features/auth/axios/axiosClient";
import BaseResponse from "@/core/definitinos/BaseResponse";
import PaginationResult from "@/core/definitinos/PaginationResult";

export default function useSearcherBooks(itemsPerFetch : number, initialFetch : PaginationResult<Book> | undefined) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [books, setBooks] = useState<Array<Book>>(initialFetch?.data ?? [])
    const [offset, setOffset] = useState(initialFetch?.data.length ?? 0)
    const [hasMore, setHasMore] = useState(initialFetch?.hasNext ?? true)

    useEffect(() => {
        if(!initialFetch){
            clear()
            loadMore('')
        }
    }, [initialFetch])

    const getResults = async (offset : number, search : string) => {
        console.log('offset', offset)
        const response = await baseAxiosClient.get<BaseResponse<PaginationResult<Book>, string>>('/books', {
            params: {
                offset: offset,
                limit: itemsPerFetch,
                search
            }
        })
        return response.data.result
    }

    const loadMore = useCallback((search : string, customOffset : number | undefined = undefined) => {
        if(loading && hasMore) return
        setLoading(true)
        setError(null)
        const currentOffset = customOffset ?? offset
        console.log('offset 2', offset)
        getResults(currentOffset, search)
            .then((result) => {
                setOffset(prev => prev + result.data.length)
                setHasMore(result.hasNext)
                console.log('result', result)
                setBooks(prev => [...prev, ...result.data])
            })
            .catch(() => {
                setError('Ocurrió un error al cargar los libros')
            })
            .finally(() => setLoading(false))
    }, [loading, offset, itemsPerFetch, hasMore])

    const clear = () => {
        setBooks([])
        setOffset(0)
        setHasMore(true)
        setError(null)
    }

    return {
        loading,
        error,
        books,
        hasMore,
        loadMore,
        clear
    }
}