import BaseResponse from "@/core/definitinos/BaseResponse"
import { baseAxiosClient } from "@/features/auth/axios/axiosClient"
import UploadReviewForm from "@/features/reviews/components/UploadReviewForm"
import { Book } from "../definitions/Book"
import { AxiosError } from "axios"
import PaginationResult from "@/core/definitinos/PaginationResult"
import ShowReviews from "@/features/reviews/components/ShowReviews"
import { Review } from "@/features/reviews/definitions/review"

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

        console.log(reviewsResult.data.result.data);
        

    } catch(ex) {
        if(ex instanceof AxiosError && ex.status === 404)
            error = 'No se encontró el libro'
        else{
            error = 'Ocurrió un error al cargar el libro'
            // console.error(ex)
        }

    }

    if(error || !book)
        return <div className="text-red-500 text-2xl text-center mt-10">{error}</div>
    
    return (
        <>
            <div className="flex flex-col gap-8 p-4 h-max max-w-7xl place-self-center w-full">
                <section className="flex flex-row gap-12">
                    <picture className="flex justify-center aspect-portada border-2 rounded-lg overflow-hidden shadow-lg transition-transform duration-200 ease-in-out hover:scale-[1.02]">
                        <img
                            loading="lazy"
                            className="object-cover w-64"
                            src={book.coverUrl}
                            alt="book"
                        />
                    </picture>
                    <article className="flex flex-col gap-4">
                        <header>
                            <h1 className="text-2xl font-bold uppercase">
                                {book.name}
                            </h1>
                            <h6 className="text-md italic">
                                {
                                    book.authors.map((author) => author.name).join(', ')
                                }
                            </h6>
                        </header>
                        <main>
                            <h3 className="text-lg font-bold">Sinposis</h3>
                            <p className="text-pretty">
                                {book.synopsis}
                            </p>
                        </main>
                    </article>
                </section>
                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold">Comentarios</h2>
                    <UploadReviewForm bookId={bookId} />
                    <ShowReviews bookId={bookId} iniitalReviews={initialsReviews} />
                    {/* <div className="grid grid-cols-12 gap-4">
                        
                    </div> */}
                </section>
            </div>
        </>
    )
}
