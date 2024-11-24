'use client'

import {Book} from "@/features/books/definitions/Book";
import CoverBook from "@/features/books/components/CoverBook";
import {Rating} from "@mui/material";

interface  Props {
    book : Book,
    onClick? : (book : Book) => void
}

export default function BookCard ({ book, onClick } : Props) {

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
                <h6 className="italic md:text-lg">{
                    book.authors.map((author, index) => (
                        <span key={author.itemUuid}>
                            {`${author.name} ${author.lastName}`}
                            {index < book.authors.length - 1 ? ', ' : ''}
                        </span>
                    ))
                }</h6>
                <section className="w-full text-right flex flex-row gap-2 justify-end">
                    <Rating
                        value={book.reviewsAvarage}
                        readOnly
                    />
                    <span>({book.reviewsCount})</span>
                </section>
            </div>
        </article>
    )
}