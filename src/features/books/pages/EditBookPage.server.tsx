'use server'

import EditBookPageClient from "@/features/books/pages/EditBookPage.client";
import {bookRepository} from "@/features/books/lib/repositories/BookRepository";
import FullError from "@/core/components/errors/FullError";

interface Props {
    bookId?: string
}

export default async function EditBookPageServer({ bookId } : Props){

    if(!bookId)
        return <EditBookPageClient/>

    const bookResult = await bookRepository.getBook(bookId)
    if(bookResult.isFailure())
        return <FullError error="No se encontró el libro"/>

    return <EditBookPageClient book={bookResult.getData()}/>
}