import { baseAxiosClient } from "@/features/auth/axios/axiosClient"
import { Book } from "../definitions/Book"
import BaseResponse from "@/core/definitinos/BaseResponse"
import PaginationResult from "@/core/definitinos/PaginationResult"
import BookCard from "./BookCard"
import FullError from "@/core/components/errors/FullError"

export default async function MorePopularBooks() {

    let books: Book[] = []
    let error: string | undefined = undefined
    try {

        const result = await baseAxiosClient.get<BaseResponse<PaginationResult<Book>, string>>('/books', {
            params: {
                limit: 10,
                order: 'Popular'
            }
        })

        books = result.data.result.data

    } catch (ex) {
        console.error(ex)
        error = 'Ocurrió un error al intentar recuperar los libros'
    }


    return (
        <FullError error={error}>
            <section className="flex flex-col gap-1 py-2 px-4 mt-2">
                <h2 className="text-2xl font-bold">Libros más populares</h2>
                <div className="flex flex-row gap-4 overflow-x-auto overflow-y-hidden py-2">
                    {
                        books.map((book) => (
                            <BookCard book={book} key={book.itemUuid} />
                        ))
                    }
                </div>
            </section>
        </FullError>

    )
}
