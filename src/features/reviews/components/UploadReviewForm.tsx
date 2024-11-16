'use client'

import { Button, Input } from '@headlessui/react'
import { FormEvent, useState } from 'react'

export default function UploadReviewForm() {

    const [showButtons, setShowButtons] = useState(false)
    const [comment, setComment] = useState('')

    const handleCancel = () => {
        setComment('')
        setShowButtons(false)
    }

    const handleSubmit = (e : FormEvent) => {
        e.preventDefault()
    }

    return (
        <>
            <h2 className="text-xl font-bold">Comentarios</h2>
            <form 
                onSubmit={handleSubmit}
                className="grid grid:cols-6 sm:grid-cols-8 w-full my-2 gap-2">
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

                {
                    showButtons && (
                        <>
                            <Button
                                type='button'
                                onClick={handleCancel}
                                className={
                                    'col-start-5 sm:col-start-7 text-black rounded-full transition-all duration-200 ease-in data-[hover]:bg-background'
                                }
                            >
                                Cancelar
                            </Button>
                            <Button
                                type='submit'
                                disabled={!comment}
                                className={
                                    'bg-primary rounded-full px-4 py-2 text-md transition-all duration-200 ease-in hover:brightness-75 disabled:opacity-50'
                                }
                            >
                                Guardar
                            </Button>
                        </>
                    )
                }
            </form>
        </>
    )
}
