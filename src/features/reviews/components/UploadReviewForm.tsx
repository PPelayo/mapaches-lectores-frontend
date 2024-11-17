'use client'

import { authAxiosClient } from '@/features/auth/axios/axiosClient'
import { Button, Input } from '@headlessui/react'
import { FormEvent, useState } from 'react'
import ReactStars from 'react-stars'
import {
    CreateReviewsRequest,
} from '../definitions/createReviewsRequest'
import toast, { Toaster } from 'react-hot-toast'
import { AxiosError } from 'axios'
import { Rating } from '../definitions/review'

interface Props {
    bookId: string
}

export default function UploadReviewForm({ bookId }: Props) {
    const [showButtons, setShowButtons] = useState(false)
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState<Rating>(0)
    const [uploading, setUploading] = useState(false)

    const resetForm = () => {
        setComment('')
        setRating(0)
        setShowButtons(false)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        const req: CreateReviewsRequest = {
            description: comment,
            generalRating: rating,
        }

        authAxiosClient
            .post(`/books/${bookId}/reviews`, req)
            .then(resetForm)
            .catch((ex) => {
                if(ex instanceof AxiosError) {
                    if(ex.response?.status === 401){
                        toast.error('Necesitas estar logeado para comentar')
                        return
                    }
                    if(ex.response?.status === 403){
                        toast.error('Ya has comentado este libro.')
                        return
                    }
                }
                toast.error('Ocurrio un error al enviar el comentario')
            })
            .finally(() => setUploading(false))
    }

    return (
        <>
            <Toaster position='bottom-right' />
            <h2 className="text-xl font-bold">Comentarios</h2>
            <form
                onSubmit={handleSubmit}
                className="grid grid:cols-6 sm:grid-cols-8 w-full my-2 sm:gap-2"
            >
                <Input
                    autoComplete="off"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onFocus={() => setShowButtons(true)}
                    type="text"
                    placeholder="Escribe un comentario..."
                    className={`col-span-6 sm:col-span-8 border-b-2 border-secondaryContainer outline-none px-2 py-1 bg-surface data-[focus]:border-secondary
                                transition-colors duration-200 ease-in-out
                            `}
                />

                {showButtons && (
                    <>
                        <div className="flex flex-row gap-2 items-center col-span-6 sm:col-span-2">
                            <span>Valoracion General:</span>
                            <ReactStars
                                count={5}
                                size={24}
                                color2={'#ffd700'}
                                value={rating}
                                half={false}
                                onChange={(r: number) => setRating(r as Rating)}
                                className="flex "
                            />
                        </div>
                        <Button
                            type="button"
                            onClick={resetForm}
                            className={
                                'col-start-1 sm:col-start-7 text-black rounded-full transition-all duration-200 ease-in data-[hover]:bg-background'
                            }
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={!comment || uploading || rating === 0}
                            className={
                                'col-start-6 sm:col-start-8 bg-primary rounded-full px-4 py-2 text-md transition-all duration-200 ease-in data-[hover]:brightness-75 data-[disabled]:opacity-50'
                            }
                        >
                            Guardar
                        </Button>
                    </>
                )}
            </form>
        </>
    )
}
