'use client'

import {Book} from "@/features/books/definitions/Book";
import CoverBook from "@/features/books/components/CoverBook";
import BasicChip from "@/core/components/chips/BasicChip";
import {Rating} from "@mui/material";
import UploadReviewForm from "@/features/reviews/components/UploadReviewForm";
import ShowReviews from "@/features/reviews/components/ShowReviews";
import {useParams} from "next/navigation";
import {Review} from "@/features/reviews/definitions/review";
import PaginationResult from "@/core/definitinos/PaginationResult";
import {useEffect, useState} from "react";
import {authAxiosClient, baseAxiosClient} from "@/features/auth/axios/axiosClient";
import BaseResponse from "@/core/definitinos/BaseResponse";
import ReviewComponent from "@/features/reviews/components/ReviewComponent";
import BasicLoader from "@/core/components/loaders/BasicLoader";

interface Props {
    initialBook: Book,
    initialsReviews?: PaginationResult<Review>
}

export default function BookPageClient({ initialBook, initialsReviews } : Props){

    const { bookId } = useParams<{bookId : string}>()
    const [book, setBook] = useState<Book>(initialBook)
    const [userReview, setUserReview] = useState<Review | undefined>()

    const [loadingUserReview, setLoadingUserReview] = useState(false)

    const handleUplaodReviews = (review : Review) => {
        baseAxiosClient.get<BaseResponse<Book, string>>(`/books/${bookId}`)
            .then((res) => {
                setBook(res.data.result)
            })
            .catch(() => {})
        setUserReview(review)
    }

    useEffect(() => {
        setLoadingUserReview(true)
        authAxiosClient.get<BaseResponse<Review, string>>(`/books/${bookId}/reviews/me`)
            .then((res) => {
                setUserReview(res.data.result)
            })
            .catch(() => {})
            .finally(() => setLoadingUserReview(false))
    }, [])

    return (
        <div className="flex  flex-col gap-8 p-4 h-max max-w-7xl place-self-center w-full">
            <section className="flex flex-col sm:flex-row gap-4 sm:gap-12">
                <CoverBook cover={book.coverUrl} className={'w-full sm:w-64 rounded-lg truncate shadow-lg'}/>
                <article className="flex flex-col gap-4">
                    <header>
                        <h1 className="text-3xl font-bold uppercase">
                            {book.name}
                        </h1>
                        <section className="text-lg italic flex flex-row gap-2 flex-wrap">
                            {
                                book.authors.map((author) => (
                                    <BasicChip
                                        key={author.itemUuid}
                                        label={`${author.name} ${author.lastName}`}
                                    />
                                ))
                            }
                        </section>
                    </header>
                    <main>
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
                    />
                    <span>({book.reviewsCount})</span>
                </h2>
                <BasicLoader loading={loadingUserReview}>
                    {
                        userReview
                            ? <ReviewComponent review={userReview} />
                            : <UploadReviewForm bookId={bookId} onReviewCreated={handleUplaodReviews}/>
                    }
                </BasicLoader>

                <ShowReviews bookId={bookId} iniitalReviews={initialsReviews} reviewsToHidden={userReview && [userReview]}/>
            </section>
        </div>
    )
}