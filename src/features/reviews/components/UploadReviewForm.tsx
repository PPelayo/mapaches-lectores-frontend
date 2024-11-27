'use client'

import {authAxiosClient} from '@/features/auth/axios/axiosClient'
import {FormEvent, useCallback, useState} from 'react'
import {CreateReviewsRequest} from '../definitions/createReviewsRequest'
import toast, {Toaster} from 'react-hot-toast'
import {AxiosError} from 'axios'
import {Rating, Review} from '../definitions/review'
import {Rating as RatingMui, TextField} from '@mui/material'
import {motion} from 'motion/react'
import {useUserStore} from '@/features/auth/services/useUserStore'
import {useRouter} from 'next/navigation'
import BaseResponse from "@/core/definitinos/BaseResponse";

interface Props {
    bookId: string,
    onReviewCreated? : (review : Review) => void
}

export default function UploadReviewForm({ bookId, onReviewCreated }: Props) {
    const [showButtons, setShowButtons] = useState(false)
    const [comment, setComment] = useState('')
    const [title, setTitle] = useState('')
    const [rating, setRating] = useState<Rating>(0)
    const [uploading, setUploading] = useState(false)

    const { user } = useUserStore()
    const router = useRouter()

    const resetForm = () => {
        setComment('')
        setRating(0)
        setShowButtons(false)
    }

    const handleInputFocus = useCallback(() => {
        if(!user)
            router.push('/auth/login')

        setShowButtons(true)
    }, [user, router])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        const req: CreateReviewsRequest = {
            title: title,
            description: comment,
            generalRating: rating,
        }

        authAxiosClient
            .post<BaseResponse<Review, string>>(`/books/${bookId}/reviews`, req)
            .then((result) => {
                toast.success('Comentario enviado correctamente')
                resetForm()
                onReviewCreated?.(result.data.result)
            })
            .catch((ex) => {
                if (ex instanceof AxiosError) {
                    if (ex.response?.status === 401) {
                        toast.error('Necesitas estar logeado para comentar')
                        return
                    }
                    if (ex.response?.status === 403) {
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
            <Toaster position="bottom-right" />
                <motion.form
                    onSubmit={handleSubmit}
                    className={`grid grid:cols-6 sm:grid-cols-8 w-full my-2 sm:gap-2 ${
                        showButtons &&
                        'border-2 border-secondary rounded-xl p-4 shadow-xl'
                    }`}
                    layout
                    initial={{ borderRadius: '0px', padding: '0px' }}
                    animate={{
                        borderRadius: showButtons ? '1rem' : '0px',
                        padding: showButtons ? '1rem' : '0px',
                        border: showButtons
                            ? '2px solid var(--secondary)'
                            : '0px solid transparent',
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 20,
                    }}
                >
                    <TextField
                        autoComplete="off"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onFocus={handleInputFocus}
                        type="text"
                        label={showButtons ? 'Titulo' : 'Comentario...'}
                        multiline={false}
                        required={showButtons}
                        variant="standard"
                        className="col-span-6 sm:col-span-8"
                        sx={{
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'var(--secondary)',
                            },
                            '& .MuiInput-root::after': {
                                borderColor: 'var(--secondary)',
                            },
                        }}
                    />
                    <TextField
                        autoComplete="off"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        type="text"
                        label={'Comentario...'}
                        multiline={true}
                        required={showButtons}
                        variant="standard"
                        className={`col-span-6 sm:col-span-8 ${
                            !showButtons ? 'hidden' : ''
                        }`}
                        sx={{
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'var(--secondary)',
                            },
                            '& .MuiInput-root::after': {
                                borderColor: 'var(--secondary)',
                            },
                        }}
                    />

                    {showButtons && (
                        <>
                            <motion.div
                                className="flex flex-row gap-2 items-center col-span-6 sm:col-span-2"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                <span>Valoracion General:</span>
                                <RatingMui
                                    value={rating}
                                    onChange={(e, newValue) =>
                                        setRating((newValue as Rating) ?? 0)
                                    }
                                />
                            </motion.div>
                            <motion.button
                                type="button"
                                onClick={resetForm}
                                className="col-start-1 sm:col-start-5 sm:col-span-2 md:col-start-7 md:col-span-1 text-black rounded-full transition-all duration-200 ease-in hover:bg-background"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                Cancelar
                            </motion.button>
                            <motion.button
                                type="submit"
                                disabled={!comment || uploading || rating === 0}
                                className="col-start-6 sm:col-start-7 sm:col-span-2 md:col-start-8 md:col-span-1 bg-primary rounded-full px-4 py-2 text-md transition-all duration-200 ease-in hover:brightness-75 disabled:opacity-50"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                Guardar
                            </motion.button>
                        </>
                    )}
                </motion.form>
        </>
    )
}
