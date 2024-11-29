'use client'
/* eslint-disable @next/next/no-img-element */
import PrimaryButton from '@/core/components/buttons/PrimaryButton'
import BasicTextField from '@/core/components/inputs/BasicTextField'
import AuthorSearcher from '../components/AuthorSearcher'
import Author from '../definitions/Author'
import {ChangeEvent, FormEvent, useState} from 'react'
import CategorySearcher from '../components/CategorySearcher'
import Category from '../definitions/Category'
import PublisherSearcher from '../components/PublisherSearcher'
import {Publisher} from '../definitions/Publisher'
import {Book, CreateBookRequest} from '../definitions/Book'
import toast, {Toaster} from 'react-hot-toast'
import {authAxiosClient} from '@/features/auth/axios/axiosClient'
import {AxiosError} from 'axios'
import ImageUploadButton from '../components/ImageUploadButton'
import BaseResponse from "@/core/definitinos/BaseResponse";
import {useRouter} from "next/navigation";
import CoverBook from '../components/CoverBook'

export default function CreateBookPage() {

    const [book, _] = useState<Book | null>(null)

    const [title, setTitle] = useState('')
    const [synopsis, setSynopsis] = useState('')
    const [numberOfPages, setNumberOfPages] = useState(0)
    const [authors, setAuthros] = useState<Author[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [publisher, setPublisher] = useState<Publisher | undefined>(undefined)
    const [image, setImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const validateForms = () =>{
        if(!title){
            toast.error('Debes ingresar un título')
            return false
        }
        if(!synopsis){
            toast.error('Debes ingresar una sinopsis')
            return false
        }
        if(!numberOfPages){
            toast.error('Debes ingresar un número de páginas')
            return false
        }
        if(!authors.length){
            toast.error('Debes seleccionar al menos un autor')
            return false
        }
        if(!categories.length){
            toast.error('Debes seleccionar al menos una categoría')
            return false
        }
        if(!publisher){
            toast.error('Debes seleccionar un editor')
            return false
        }
        if(!image){
            toast.error('Debes seleccionar una imagen')
            return false
        }
        return true
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!validateForms())
            return

        const request: CreateBookRequest = {
            name: title,
            synopsis,
            publishedDate: new Date(),
            numberOfPages: numberOfPages,
            publisherId: publisher!.itemUuid,
            authors: authors.map(author => author.itemUuid),
            categories: categories.map(category => category.itemUuid)
        }
        setLoading(true)
        authAxiosClient.post<BaseResponse<Book, string>>('/books', request)
            .then((response) => {
                const book = response.data.result
                authAxiosClient.patchForm(`/books/${book.itemUuid}/cover`, {file : image})
                    .then(() => {
                        toast.success('Libro creado')
                        router.push(`/books/${book.itemUuid}`)
                    }).catch(() => toast.error('Error al subir la imagen')
                ).finally(() => setLoading(false))
            })
            .catch((ex) => {
                if(ex instanceof AxiosError){
                    if(ex.status === 400){
                        toast.error('Error. Datos inválidos')
                        setLoading(false)
                        return
                    }
                    if(ex.status === 401){
                        toast.error('Error. Debes estar logueado')
                        setLoading(false)
                        return
                    }
                    if(ex.status === 409){
                        toast.error('Error. El libro ya existe')
                        setLoading(false)
                        return
                    }
                }

                toast.error('Error al crear el libro')
                setLoading(false)
            })
    }

    const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        if (isNaN(Number(value)) || Number(value) < 0)
            return

        setNumberOfPages(Number(value))
    }

    const handleImageChange = (file: File | null) => {
        setImage(file)
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        } else {
            setImagePreview(null)
        }
    }

    return (
        <>
            <Toaster position='bottom-right'/>
            <section className='flex flex-col sm:flex-row gap-4 w-full max-w-5xl place-self-center mt-2 sm:mt-8 p-4'>
                <CoverBook cover={imagePreview || book?.coverUrl} className='w-full sm:w-72 truncate rounded-xl shadow-lg h-min'/>
                <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4 w-full items-center'>
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
                            minRows={2}
                            maxRows={10}
                        />
                        <BasicTextField
                            type='number'
                            label="Número de páginas"
                            value={numberOfPages}
                            onChange={handleNumberChange}
                        />
                        <AuthorSearcher selectedAuthors={authors} setSelectedAuthors={setAuthros}/>
                        <CategorySearcher
                            selectedCategories={categories}
                            setSelectedCategories={setCategories}
                        />

                        <PublisherSearcher
                            onChangePublisher={setPublisher}
                        />

                        <ImageUploadButton onImageChange={handleImageChange}/>
                        <div className='flex-1 w-full flex items-end justify-center gap-4'>
                            <PrimaryButton basicAttributes={{
                                type: 'submit',
                                disabled: loading,
                                className: 'w-full sm:w-1/2'
                            }}>Guardar</PrimaryButton>
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}