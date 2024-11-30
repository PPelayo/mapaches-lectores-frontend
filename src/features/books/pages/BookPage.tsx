import BaseResponse from "@/core/definitinos/BaseResponse"
import {baseAxiosClient} from "@/features/auth/axios/axiosClient"
import {Book} from "../definitions/Book"
import {AxiosError} from "axios"
import PaginationResult from "@/core/definitinos/PaginationResult"
import {Review} from "@/features/reviews/definitions/review"
import BookPageClient from "@/features/books/pages/BookPage.client";

interface Props {
    bookId: string
}

export default async function BookPage({ bookId }: Props) {

    let error = ''
    let book : Book | undefined = undefined
    let initialsReviews : PaginationResult<Review> | undefined = undefined

    try{
        const bookResult = await baseAxiosClient.get<BaseResponse<Book, string>>(`/books/${bookId}`)
        book = bookResult.data.result
        const reviewsResult = await baseAxiosClient.get<BaseResponse<PaginationResult<Review>, string>>(`/books/${bookId}/reviews`)
        initialsReviews = reviewsResult.data.result
    } catch(ex) {
        if(ex instanceof AxiosError && ex.status === 404)
            error = 'No se encontró el libro'
        else{
            console.log(ex)
            error = 'Ocurrió un error al cargar el libro'
        }

    }

    if(error || !book)
        return <div className="text-red-500 text-2xl text-center mt-10">{error}</div>
    
    return (
        <>
            <BookPageClient initialBook={book} initialsReviews={initialsReviews}/>
        </>
    )
}
