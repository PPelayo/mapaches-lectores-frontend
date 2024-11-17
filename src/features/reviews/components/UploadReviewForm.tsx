'use client'

import { Button, Input } from '@headlessui/react'
import { FormEvent, useState } from 'react'
import ReactStars from 'react-stars'

export default function UploadReviewForm() {
    const [showButtons, setShowButtons] = useState(false)
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(0)

    const handleCancel = () => {
        setComment('')
        setRating(0)
        setShowButtons(false)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
    }

    return (
        <>
            <h2 className="text-xl font-bold">Comentarios</h2>
            <form
                onSubmit={handleSubmit}
                className="grid grid:cols-6 sm:grid-cols-8 w-full my-2 sm:gap-2"
            >
                <Input
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
                                onChange={(r : number) => setRating(r)}
                                className="flex "
                            />
                        </div>
                        <Button
                            type="button"
                            onClick={handleCancel}
                            className={
                                'col-start-1 sm:col-start-7 text-black rounded-full transition-all duration-200 ease-in data-[hover]:bg-background'
                            }
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={!comment}
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
