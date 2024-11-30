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
import ImageUploadButton from '../components/ImageUploadButton'
import {useRouter} from "next/navigation";
import CoverBook from '../components/CoverBook'
import {bookRepository} from "@/features/books/lib/repositories/BookRepository";
import DataResult from "@/core/definitinos/DataResult";
import {CreateBookErrors} from "@/features/books/definitions/errors/CreateBookErrors";

interface Props {
    book? : Book
}

export default function EditBookPageClient({ book : defaultBook } : Props) {

    const [title, setTitle] = useState(defaultBook?.name ?? '')
    const [synopsis, setSynopsis] = useState(defaultBook?.synopsis ?? '')
    const [numberOfPages, setNumberOfPages] = useState(defaultBook?.numberOfPages ?? 0)
    const [authors, setAuthros] = useState<Author[]>(defaultBook?.authors ?? [])
    const [categories, setCategories] = useState<Category[]>(defaultBook?.categories ?? [])
    const [publisher, setPublisher] = useState<Publisher | undefined>(defaultBook?.publisher)
    const [image, setImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(defaultBook?.coverUrl ?? null)

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
        if(!imagePreview){
            toast.error('Debes seleccionar una imagen')
            return false
        }
        return true
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

        const handleResult = (result : DataResult<Book, CreateBookErrors>) => {
            result.handle({
                onSuccess: (book) => {
                    toast.success('Libro creado')
                    router.push(`/books/${book.itemUuid}`)
                },
                onFailure: (error) => {
                    toast.error(error.toString())
                },
                onFinally: () => setLoading(false)
            })
        }

        if(defaultBook){
            const result = await bookRepository.updateBook(defaultBook.itemUuid, request, image ?? undefined)
            handleResult(result)
        } else {
            const result = await bookRepository.createBook(request, image ?? undefined)
            handleResult(result)
        }
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
                <CoverBook cover={imagePreview} className='w-full sm:w-72 truncate rounded-xl shadow-lg h-min'/>
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
                            defaultValue={publisher}
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