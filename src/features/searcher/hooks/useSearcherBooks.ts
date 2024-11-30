import {useCallback, useEffect, useState} from "react";
import {Book} from "@/features/books/definitions/Book";
import PaginationResult from "@/core/definitinos/PaginationResult";
import {bookRepository} from "@/features/books/lib/repositories/BookRepository";
import {ReadonlyURLSearchParams} from "next/navigation";

export default function useSearcherBooks(itemsPerFetch : number, initialFetch : PaginationResult<Book> | undefined, searchParams: ReadonlyURLSearchParams) {

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

    const getResults = async (offset : number, search : string, category? : string) => {
        return bookRepository.getBooks({ limit: itemsPerFetch, offset, search, category })
    }

    const loadMore = useCallback((search : string, customOffset : number | undefined = undefined) => {
        if(loading && hasMore) return
        setLoading(true)
        setError(null)
        const currentOffset = customOffset ?? offset
        getResults(currentOffset, search, searchParams.get('category') ?? undefined)
            .then((result) => {
                result.handle({
                    onSuccess: (paginationResult) => {
                        setOffset(prev => prev + (paginationResult.data.length))
                        setHasMore(paginationResult.hasNext)
                        setBooks(prev => [...prev, ...paginationResult.data])
                    },
                    onFailure: () => setError('Ocurrió un error al cargar los libros'),
                    onFinally : () => setLoading(false)
                })
            })
    }, [loading, offset, itemsPerFetch, hasMore, searchParams])

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