'use client'

import BookCard from "@/features/books/components/BookCard";
import {Book} from "@/features/books/definitions/Book";
import useSearcherBooks from "@/features/searcher/hooks/useSearcherBooks";
import BasicLoader from "@/core/components/loaders/BasicLoader";
import PaginationResult from "@/core/definitinos/PaginationResult";
import {useEffect, useRef} from "react";
import {useSearchParams} from "next/navigation";
import FullError from "@/core/components/errors/FullError";

interface  Props {
    initialFetch? : PaginationResult<Book>
}

const BOOKS_PER_FETCH = 1

export default function SearcherBooks({ initialFetch } : Props){

    const searchParams = useSearchParams()
    const {
        loading,
        error,
        books,
        hasMore,
        loadMore,
        clear
    } = useSearcherBooks(BOOKS_PER_FETCH, initialFetch)

    const hasUsedInitialFetch = useRef(false);

    useEffect(() => {
        const query = searchParams.get('q') ?? '';

        //Si no ha usado el fetch inicial y este existe, no hace nada, de forma que cuando cambio el searchParams la segunda vez si hace un clear y un loadMore
        if (!hasUsedInitialFetch.current && initialFetch) {
            console.log('evitando hacer el fetch')
            hasUsedInitialFetch.current = true
            return
        }
        console.log('haciendo el fetch')
        clear()
        loadMore(query, 0)
    }, [searchParams, initialFetch]);

    return (
        <>
            <FullError error={error}>
                <div className={'flex flex-col gap-4 items-center'}>
                    <section
                        className={'flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 p-2 md:p-4 items-center w-full'}>
                        {
                            books.map((book) => (
                                <BookCard book={book} key={book.itemUuid}/>
                            ))
                        }
                    </section>
                    <BasicLoader loading={loading} className={'self-center'}/>
                    {
                        hasMore && !loading && (
                            <>
                                <button
                                    onClick={() => loadMore(searchParams.get('q') ?? '')}
                                    className={'bg-primary border-2 border-transparent text-onPrimary px-4 py-2 mb-4 rounded-lg shadow-lg transition-colors hover:border-primary hover:bg-onPrimary hover:text-primary'}>
                                    Cargar más
                                </button>
                            </>
                        )
                    }
                </div>
            </FullError>
        </>
    )
}