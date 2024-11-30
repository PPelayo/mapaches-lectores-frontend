import BookPageClient from "@/features/books/pages/BookPage.client";
import {bookRepository} from "@/features/books/lib/repositories/BookRepository";

interface Props {
    bookId: string
}

export default async function BookPage({ bookId }: Props) {

    const bookResult = await bookRepository.getBook(bookId)
    const reviewsResult = await bookRepository.getBookReviews(bookId)
    if(bookResult.isFailure()){
        return <div className="text-red-500 text-2xl text-center mt-10">{bookResult.getError()}</div>
    }
    if(reviewsResult.isFailure()){
        return <div className="text-red-500 text-2xl text-center mt-10">{reviewsResult.getError()}</div>
    }

    
    return (
        <>
            <BookPageClient initialBook={bookResult.getData()} initialsReviews={reviewsResult.getData()}/>
        </>
    )
}
