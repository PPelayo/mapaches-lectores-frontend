'use client'

import {Book} from "@/features/books/definitions/Book";
import CoverBook from "@/features/books/components/CoverBook";
import BasicChip from "@/core/components/chips/BasicChip";
import {Rating} from "@mui/material";
import UploadReviewForm from "@/features/reviews/components/UploadReviewForm";
import ShowReviews from "@/features/reviews/components/ShowReviews";
import {useParams, useRouter} from "next/navigation";
import {Review} from "@/features/reviews/definitions/review";
import PaginationResult from "@/core/definitinos/PaginationResult";
import {useEffect, useState} from "react";
import {authAxiosClient, baseAxiosClient} from "@/features/auth/axios/axiosClient";
import BaseResponse from "@/core/definitinos/BaseResponse";
import ReviewComponent from "@/features/reviews/components/ReviewComponent";
import BasicLoader from "@/core/components/loaders/BasicLoader";
import DeleteBookButton from "@/features/books/components/DeleteBookButton";
import EditBookButton from "@/features/books/components/EditBookButton";

interface Props {
    initialBook: Book,
    initialsReviews?: PaginationResult<Review>
}

export default function BookPageClient({initialBook, initialsReviews}: Props) {
    const router = useRouter()

    const {bookId} = useParams<{ bookId: string }>()
    const [book, setBook] = useState<Book>(initialBook)
    const [userReview, setUserReview] = useState<Review | undefined>()

    const [loadingUserReview, setLoadingUserReview] = useState(false)

    const handleUplaodReviews = (review: Review) => {
        baseAxiosClient.get<BaseResponse<Book, string>>(`/books/${bookId}`)
            .then((res) => {
                setBook(res.data.result)
            })
            .catch(() => {
            })
        setUserReview(review)
    }

    useEffect(() => {
        setLoadingUserReview(true)
        authAxiosClient.get<BaseResponse<Review, string>>(`/books/${bookId}/reviews/me`)
            .then((res) => {
                setUserReview(res.data.result)
            })
            .catch(() => {
            })
            .finally(() => setLoadingUserReview(false))
    }, [])

    return (
        <div className="flex flex-col gap-8 p-2 sm:p-4 h-max max-w-6xl place-self-center w-full">
            <section className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <CoverBook cover={book.coverUrl} className={'w-full sm:w-64 md:w-80 rounded-lg truncate shadow-lg'}/>
                <article className="flex flex-col gap-4 flex-1">
                    <header className={'flex flex-col xs:flex-row justify-between xs:items-center'}>
                        <h1 className="text-3xl font-bold uppercase flex flex-col sm:flex-row sm:gap-2">
                            {book.name}
                        </h1>
                        <div className={'flex flex-row items-center'}>
                            <EditBookButton bookId={bookId}/>
                            <DeleteBookButton bookId={bookId} onDeleted={() => router.push(`/?refresh=${new Date().getTime()}`)}/>
                        </div>
                    </header>
                    <main className={'flex flex-col gap-2'}>
                        <div className={'w-full flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between'}>
                            <section>
                                <h3 className={'text-xl italic font-bold'}>Editorial</h3>
                                <span className={'text-lg'}>{book.publisher.name}</span>
                            </section>
                            <section>
                                <h3 className={'text-xl italic font-bold'}>Nº Páginas</h3>
                                <span className={'text-lg'}>{book.numberOfPages}</span>
                            </section>
                        </div>
                        <div className={'w-full flex flex-col gap-2 sm:flex-row sm:justify-between'}>
                            <section>
                                <h3 className={'text-xl italic font-bold'}>Autores</h3>
                                <div className="text-lg italic flex flex-row gap-2 flex-wrap">
                                    {
                                        book.authors.map((author) => (
                                            <BasicChip
                                                key={author.itemUuid}
                                                label={`${author.name} ${author.lastName}`}
                                            />
                                        ))
                                    }
                                </div>
                            </section>
                            <section>
                                <h3 className={'text-xl italic font-bold'}>Categorias</h3>
                                <div className="text-lg italic flex flex-row gap-2 flex-wrap">
                                    {
                                        book.categories.map((category) => (
                                            <BasicChip
                                                key={category.itemUuid}
                                                label={category.description}
                                            />
                                        ))
                                    }
                                </div>
                            </section>
                        </div>
                        <h3 className="text-xl font-bold">Sinposis</h3>
                        <p className="text-pretty text-xl">
                            {book.synopsis}
                        </p>
                    </main>
                </article>
            </section>
            <section className="flex flex-col gap-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <span>Reseñas</span>
                    <Rating
                        value={book.reviewsAvarage}
                        precision={0.5}
                    />
                    <span>({book.reviewsCount})</span>
                </h2>
                <BasicLoader loading={loadingUserReview}>
                    {
                        userReview
                            ? <ReviewComponent review={userReview}/>
                            : <UploadReviewForm bookId={bookId} onReviewCreated={handleUplaodReviews}/>
                    }
                </BasicLoader>

                <ShowReviews bookId={bookId} iniitalReviews={initialsReviews}
                             reviewsToHidden={userReview && [userReview]}/>
            </section>
        </div>
    )
}