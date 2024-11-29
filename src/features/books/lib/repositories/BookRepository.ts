import {authAxiosClient, baseAxiosClient} from "@/features/auth/axios/axiosClient";
import BaseResponse from "@/core/definitinos/BaseResponse";
import PaginationResult from "@/core/definitinos/PaginationResult";
import {Book, CreateBookRequest, OrderBook} from "@/features/books/definitions/Book";
import DataResult from "@/core/definitinos/DataResult";
import {GetBookErrors} from "@/features/books/definitions/errors/GetBookErrors";
import {AxiosError} from "axios";
import toast from "react-hot-toast";
import {CreateBookErrors} from "@/features/books/definitions/errors/CreateBookErrors";
interface  Params  {
    limit : number
    offset : number
    search? : string
    category? : string
    order? : OrderBook
}

class BookRepository{

    async getBooks({limit = 15, offset = 0,search , category, order} : Params ) : Promise<PaginationResult<Book> | undefined> {
        try{
            const res = await baseAxiosClient.get<BaseResponse<PaginationResult<Book>,string>>('/books', {
                params: {
                    limit: limit,
                    offset: offset,
                    categories: category,
                    order: order,
                    search: search
                }
            })
            return res.data.result

        } catch (ex){
            return
        }
    }

    async getBook(bookId : string) : Promise<DataResult<Book, GetBookErrors>> {
        try{
            const res = await baseAxiosClient.get<BaseResponse<Book, string>>(`/books/${bookId}`)
            return DataResult.createSuccess(res.data.result)
        } catch(ex){
            if(ex instanceof  AxiosError){
                if(ex.response?.status === 404){
                    return DataResult.createFailure(GetBookErrors.NOT_FOUND)
                }
            }
            return DataResult.createFailure(GetBookErrors.UNEXPECTED)
        }
    }

    async deleteBook(bookId : string) : Promise<Error | undefined> {
        try{
            await baseAxiosClient.delete<BaseResponse<string, string>>(`/books/${bookId}`)
            return undefined
        } catch(ex){
            console.error(ex)
            return ex as Error
        }
    }

    async createBook(bookRequest : CreateBookRequest, cover?: File) : Promise<DataResult<Book, CreateBookErrors>> {
        try{
            const bookResult = await authAxiosClient.post<BaseResponse<Book, string>>('/books', bookRequest)

            if(cover)
                await authAxiosClient.patchForm(`/books/${bookResult.data.result.itemUuid}/cover`, {file : cover})

            return DataResult.createSuccess(bookResult.data.result)
        } catch (ex) {
            if(ex instanceof AxiosError){
                if(ex.status === 400)
                    return DataResult.createFailure(CreateBookErrors.DATA_INVALID)

                if(ex.status === 401)
                    return DataResult.createFailure(CreateBookErrors.UNAUTHORIZED)

                if(ex.status === 409)
                    return DataResult.createFailure(CreateBookErrors.CONFLICT)

            }

            return DataResult.createFailure(CreateBookErrors.UNEXPECTED)
        }


            // .then((response) => {
            //     const book = response.data.result
            //     authAxiosClient.patchForm(`/books/${book.itemUuid}/cover`, {file : image})
            //         .then(() => {
            //             toast.success('Libro creado')
            //             router.push(`/books/${book.itemUuid}`)
            //         }).catch(() => toast.error('Error al subir la imagen')
            //     ).finally(() => setLoading(false))
            // })
            // .catch((ex) => {

            //
            //     toast.error('Error al crear el libro')
            //     setLoading(false)
            // })
    }

}

export const bookRepository = new BookRepository()