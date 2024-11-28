'use client'

import BookCard from "@/features/books/components/BookCard";
import {Book} from "@/features/books/definitions/Book";
import useSearcherBooks from "@/features/searcher/hooks/useSearcherBooks";
import BasicLoader from "@/core/components/loaders/BasicLoader";
import PaginationResult from "@/core/definitinos/PaginationResult";
import {useEffect, useRef, useState} from "react";
import {useSearchParams} from "next/navigation";
import FullError from "@/core/components/errors/FullError";
import Link from "next/link";
import { data } from "motion/react-client";

interface  Props {
    initialFetch? : PaginationResult<Book>
}

const BOOKS_PER_FETCH = 10

export default function SearcherBooksClient({ initialFetch } : Props){

    const searchParams = useSearchParams()

    const {
        loading,
        error,
        books,
        hasMore,
        loadMore,
        clear
    } = useSearcherBooks(BOOKS_PER_FETCH, initialFetch, searchParams)

    const hasUsedInitialFetch = useRef(false);

    useEffect(() => {
        const query = searchParams.get('q') ?? '';

        //Si no ha usado el fetch inicial y este existe, no hace nada, de forma que cuando cambio el searchParams la segunda vez si hace un clear y un loadMore
        if (!hasUsedInitialFetch.current && initialFetch) {
            hasUsedInitialFetch.current = true
            return
        }
        clear()
        loadMore(query, 0)
    }, [searchParams, initialFetch]);


    return (
        <>
            <FullError error={error}>
                <div className={'flex flex-col gap-4 items-center'}>
                    <h2 className="italic text-xl">
                        {books.length === 0 && !loading && 'No hay datos que mostrar para esta búsqueda'}
                    </h2>
                    <section
                        className={'flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 px-2 items-center w-full'}>
                        {
                            books.map((book) => (
                                <Link href={`/books/${book.itemUuid} `} key={book.itemUuid}>
                                    <BookCard book={book} />
                                </Link>
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