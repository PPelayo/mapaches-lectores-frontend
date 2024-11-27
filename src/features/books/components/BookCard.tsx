'use client'

import {Book} from "@/features/books/definitions/Book";
import CoverBook from "@/features/books/components/CoverBook";
import { useMemo } from "react";
import dynamic from 'next/dynamic';

const Rating = dynamic(() => import('@mui/material/Rating'), { ssr: false });


interface  Props {
    book : Book,
    onClick? : (book : Book) => void
}

export default function BookCard ({ book, onClick } : Props) {

    const authorsNameToDisplay =  useMemo(() => {
        return book.authors.map((author, index) =>
            `${author.name} ${author.lastName}${index < book.authors.length - 1 ? ', ' : ''} `
        )
    }, [book])

    return (
        <article
            onClick={() => onClick && onClick(book)}
            className="shadow-lg border rounded-lg truncate flex flex-col">
            <CoverBook
                cover={book.coverUrl}
                className={'w-full'}
            />
            <div className="flex flex-col gap-0 items-center px-2 py-1 truncate">
                <h2 className="text-lg sm:text-xl font-bold">{book.name}</h2>
                <h6 className="italic md:text-lg">
                    {
                        authorsNameToDisplay.map((name, index) =>(
                            <span key={index}>{name}</span>
                        ))
                    }
                </h6>
                <section className="w-full text-right flex flex-row gap-2 justify-end">
                    <Rating
                        value={book.reviewsAvarage}
                        readOnly
                        suppressHydrationWarning={true}
                    />
                    <span>({book.reviewsCount})</span>
                </section>
            </div>
        </article>
    )
}