'use client'
/* eslint-disable @next/next/no-img-element */
import PrimaryButton from '@/core/components/buttons/PrimaryButton'
import BasicTextField from '@/core/components/inputs/BasicTextField'
import AuthorSearcher from '../components/AuthorSearcher'
import Author from '../definitions/Author'
import { useState } from 'react'

export default function CreateBookPage() {

    const [authors, setAuthros] = useState<Author[]>([])

    return (
        <>
            <section className='w-full max-w-5xl place-self-center mt-2 sm:mt-8 p-4'>
                <form className='flex flex-col sm:flex-row gap-4 w-full items-center'>
                    <button 
                        type='button'
                        className='aspect-portada bg-red-500 max-w-32 w-full sm:max-w-60'>
                        <img alt='as' className='object-cover w-full sm:w-64' src=''/>
                    </button>
                    <div className='flex flex-col gap-4 flex-1 w-full'>
                        <BasicTextField
                            label="Titulo"
                        />
                        <BasicTextField
                            label="Sinopsis"
                            variant='outlined'
                            multiline
                            minRows={5}
                            maxRows={20}
                        />
                        <AuthorSearcher selectedAuthors={authors} setSelectedAuthors={setAuthros} />
                        <div className='flex-1 w-full flex items-end justify-center'>
                        <PrimaryButton basicAttributes={{
                            type: 'submit',
                            className: 'w-1/2'
                        }}>Guardar</PrimaryButton>
                        </div>
                       
                    </div>
                </form>
            </section>
        </>
    )
}