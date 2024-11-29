'use server'

import CreateBookPage from "@/features/books/pages/CreateBookPage";
import {bookRepository} from "@/features/books/lib/repositories/BookRepository";
import FullError from "@/core/components/errors/FullError";

interface Props {
    bookId?: string
}

export default async function EditBookPageServer({ bookId } : Props){

    if(!bookId)
        return <CreateBookPage/>

    const bookResult = await bookRepository.getBook(bookId)
    if(bookResult.isFailure())
        return <FullError error="No se encontró el libro"/>

    return <CreateBookPage book={bookResult.getData()}/>
}