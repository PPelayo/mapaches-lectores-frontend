import BaseResponse from "@/core/definitinos/BaseResponse"
import { baseAxiosClient } from "@/features/auth/axios/axiosClient"
import UploadReviewForm from "@/features/reviews/components/UploadReviewForm"
import { Book } from "../definitions/Book"
import { AxiosError } from "axios"

interface Props {
    bookId: string
}

export default async function BookPage({ bookId }: Props) {

    let error = ''

    let book : Book | undefined = undefined

    try{
        const bookResult = await baseAxiosClient.get<BaseResponse<Book, string>>(`/books/${bookId}`)

        book = bookResult.data.result

        console.log(book);
        

    } catch(ex) {
        if(ex instanceof AxiosError)
            error = ex.response?.data.message || `Ocurrio un error al obtener el libro ${ex}`
    }

    if(error || !book)
        return <div className="text-red-500 text-2xl text-center">{error}</div>
    
    return (
        <>
            <div className="flex flex-col gap-8 p-4 h-max max-w-7xl place-self-center w-full">
                <section className="flex flex-row gap-4">
                    <picture className="flex justify-center aspect-portada border-2 rounded-lg overflow-hidden shadow-lg transition-transform duration-200 ease-in-out hover:scale-[1.02]">
                        <img
                            loading="lazy"
                            className="object-cover w-64"
                            src={book.coverUrl}
                            alt="book"
                        />
                    </picture>
                    <article className="flex flex-col gap-4">
                        <header>
                            <h1 className="text-2xl font-bold uppercase">
                                {book.name}
                            </h1>
                            <h6 className="text-md italic">
                                {
                                    book.authors.map((author) => author.name).join(', ')
                                }
                            </h6>
                        </header>
                        <main>
                            <h3 className="text-lg font-bold">Sinposis</h3>
                            <p className="text-pretty">
                                {book.synopsis}
                            </p>
                        </main>
                    </article>
                </section>
                <section>
                    <UploadReviewForm bookId={bookId} />
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12">
                            <p className="text-lg">Comentario1</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario2</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
