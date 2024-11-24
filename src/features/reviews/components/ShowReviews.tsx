'use client'

import PaginationResult from '@/core/definitinos/PaginationResult'
import {Review} from '../definitions/review'
import ReviewComponent from './ReviewComponent'
import {useEffect, useMemo, useState} from 'react'
import BasicLoader from '@/core/components/loaders/BasicLoader'
import {baseAxiosClient} from '@/features/auth/axios/axiosClient'
import FullError from '@/core/components/errors/FullError'
import BaseResponse from '@/core/definitinos/BaseResponse'

interface Props {
    iniitalReviews?: PaginationResult<Review>
    bookId: string,
    reviewsToHidden? : Review[] | null
}

const REVIEWS_LIMIT = 15

export default function ShowReviews({ iniitalReviews, bookId, reviewsToHidden }: Props) {
    const [loading, setLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [reviews, setReviews] = useState<Review[]>(iniitalReviews?.data || [])
    const [error, setError] = useState<string | null>(null)
    const [hasMore, setHasMore] = useState<boolean>(iniitalReviews?.hasNext || true)

    const reviewsToShow = useMemo(() => {
        return reviews.filter((review) => !reviewsToHidden?.find((r) => r.itemUuid === review.itemUuid))
    },[reviewsToHidden, reviews])

    useEffect(() => {
        setLoading(true)
        baseAxiosClient
            .get<BaseResponse<PaginationResult<Review>, string>>(
                `/books/${bookId}/reviews`,
                {
                    params: {
                        offset: offset,
                        limit: REVIEWS_LIMIT,
                    },
                }
            )
            .then((res) => {
                setReviews(res.data.result.data)
                setHasMore(res.data.result.hasNext)
            })
            .catch((err) => {
                console.error(err)
                setError('Ocurrio un error al obtener los comentarios')
            })
            .finally(() => setLoading(false))
    }, [offset, bookId])

    const handleLoadMore = () => {
        setOffset(offset + REVIEWS_LIMIT)
    }

    return (
        <>
            <FullError error={error}>
                <section className="grid grid-cols-1 gap-4 md:">
                    {reviewsToShow.map((review) => (
                        <ReviewComponent
                            review={review}
                            key={review.itemUuid}
                        />
                    ))}
                    <BasicLoader loading={loading}>
                        {hasMore && (
                            <button onClick={handleLoadMore}>
                                Cargar más...
                            </button>
                        )}
                    </BasicLoader>
                </section>
            </FullError>
        </>
    )
}
