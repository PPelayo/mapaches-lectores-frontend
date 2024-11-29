import {baseAxiosClient} from "@/features/auth/axios/axiosClient";
import BaseResponse from "@/core/definitinos/BaseResponse";
import PaginationResult from "@/core/definitinos/PaginationResult";
import {Book, OrderBook} from "@/features/books/definitions/Book";
import DataResult from "@/core/definitinos/DataResult";
import {GetBookErrors} from "@/features/books/definitions/errors/GetBookErrors";
import {AxiosError} from "axios";
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

}

export const bookRepository = new BookRepository()