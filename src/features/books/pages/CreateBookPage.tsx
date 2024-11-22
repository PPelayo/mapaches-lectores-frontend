'use client'
/* eslint-disable @next/next/no-img-element */
import PrimaryButton from '@/core/components/buttons/PrimaryButton'
import BasicTextField from '@/core/components/inputs/BasicTextField'
import AuthorSearcher from '../components/AuthorSearcher'
import Author from '../definitions/Author'
import { ChangeEvent, useState } from 'react'
import CategorySearcher from '../components/CategorySearcher'
import Category from '../definitions/Category'
import PublisherSearcher from '../components/PublisherSearcher'
import { Publisher } from '../definitions/Publisher'
import { CreateBookRequest } from '../definitions/Book'
import toast, { Toaster } from 'react-hot-toast'
import { authAxiosClient } from '@/features/auth/axios/axiosClient'
import { AxiosError } from 'axios'

export default function CreateBookPage() {

    const [title, setTitle] = useState('')
    const [synopsis, setSynopsis] = useState('')
    const [numberOfPages, setNumberOfPages] = useState(0)	
    const [authors, setAuthros] = useState<Author[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [publisher, setPublisher] = useState<Publisher | undefined>(undefined)

    const [loading, setLoading] = useState(false)

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {  
        e.preventDefault()

        if(!publisher){
            toast.error('Debes seleccionar un editor') 
            return
        }
        
        const request : CreateBookRequest = {
            name: title,
            synopsis,
            publishedDate: new Date(),
            numberOfPages: numberOfPages,
            publisherId: publisher!.itemUuid,
            authors: authors.map(author => author.itemUuid),
            categories: categories.map(category => category.itemUuid)
        }
        setLoading(true)
        authAxiosClient.post('/books', request)
            .then(() => {
                toast.success('Libro creado')
            })
            .catch((ex) => {
                if(ex instanceof AxiosError && ex.status === 401){
                    toast.error('Error. Debes estar logueado')
                    return
                }

                toast.error('Error al crear el libro')
            })
            .finally(() => {
                setLoading(false)
            })
    }  

    const handleNumberChange = (e : ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        if(isNaN(Number(value)) || Number(value) < 0)
            return
        
        setNumberOfPages(Number(value))
    }

    return (
        <>
            <Toaster position='bottom-right'/>
            <section className='w-full max-w-5xl place-self-center mt-2 sm:mt-8 p-4'>
                <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4 w-full items-center'>
                    <button 
                        type='button'
                        className='aspect-portada bg-red-500 max-w-32 w-full sm:max-w-60'>
                        <img alt='as' className='object-cover w-full sm:w-64' src=''/>
                    </button>
                    <div className='flex flex-col gap-4 flex-1 w-full'>
                        <BasicTextField
                            label="Titulo"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <BasicTextField
                            value={synopsis}
                            onChange={(e) => setSynopsis(e.target.value)}
                            label="Sinopsis"
                            variant='outlined'
                            multiline
                            minRows={5}
                            maxRows={20}
                        />
                         <BasicTextField
                            type='number'
                            label="Número de páginas"
                            value={numberOfPages}
                            onChange={handleNumberChange}
                        />
                        <AuthorSearcher selectedAuthors={authors} setSelectedAuthors={setAuthros} />
                        <CategorySearcher
                            selectedCategories={categories}
                            setSelectedCategories={setCategories}
                        />

                        <PublisherSearcher
                            onChangePublisher={setPublisher}
                        />
                        
                        <div className='flex-1 w-full flex items-end justify-center'>
                        <PrimaryButton basicAttributes={{
                            type: 'submit',
                            disabled: loading,
                            className: `w-1/2`
                        }}>Guardar</PrimaryButton>
                        </div>
                       
                    </div>
                </form>
            </section>
        </>
    )
}