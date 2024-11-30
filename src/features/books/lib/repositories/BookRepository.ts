import {authAxiosClient, baseAxiosClient} from "@/features/auth/axios/axiosClient";
import BaseResponse from "@/core/definitinos/BaseResponse";
import PaginationResult from "@/core/definitinos/PaginationResult";
import {Book, CreateBookRequest, OrderBook} from "@/features/books/definitions/Book";
import DataResult from "@/core/definitinos/DataResult";
import {GetBookErrors} from "@/features/books/definitions/errors/GetBookErrors";
import {AxiosError} from "axios";
import {CreateBookErrors} from "@/features/books/definitions/errors/CreateBookErrors";
import {Review} from "@/features/reviews/definitions/review";

interface  Params  {
    limit? : number
    offset? : number
    search? : string
    category? : string
    order? : OrderBook
}

class BookRepository{

    async getBooks({limit = 15, offset = 0,search , category, order} : Params ) : Promise<DataResult<PaginationResult<Book>, GetBookErrors>> {
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
            return DataResult.createSuccess(res.data.result)

        } catch {
            return DataResult.createFailure(GetBookErrors.UNEXPECTED)
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
            await authAxiosClient.delete<BaseResponse<string, string>>(`/books/${bookId}`)
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
            return DataResult.createFailure(this.#manageBookCreateError(ex))
        }
    }

    async updateBook(bookId : string, bookRequest : CreateBookRequest, cover?: File) : Promise<DataResult<Book, CreateBookErrors>> {
        try{
            const bookResult = await authAxiosClient.put<BaseResponse<Book, string>>(`/books/${bookId}`, bookRequest)

            if(cover)
                await authAxiosClient.patchForm(`/books/${bookResult.data.result.itemUuid}/cover`, {file : cover})

            return DataResult.createSuccess(bookResult.data.result)
        } catch (ex) {
           return DataResult.createFailure(this.#manageBookCreateError(ex))
        }
    }

    async getBookReviews(bookId : string) : Promise<DataResult<PaginationResult<Review>, GetBookErrors.UNEXPECTED>> {
        try{
            const reviewsResult = await baseAxiosClient.get<BaseResponse<PaginationResult<Review>, string>>(`/books/${bookId}/reviews`)
            return DataResult.createSuccess(reviewsResult.data.result)
        } catch {
            return DataResult.createFailure(GetBookErrors.UNEXPECTED)
        }
    }

    #manageBookCreateError(ex : unknown) : CreateBookErrors{
        if(ex instanceof AxiosError){
            if(ex.status === 400)
                return CreateBookErrors.DATA_INVALID

            if(ex.status === 401)
                return CreateBookErrors.UNAUTHORIZED

            if(ex.status === 409)
                return CreateBookErrors.CONFLICT

        }
        return CreateBookErrors.UNEXPECTED
    }

}

export const bookRepository = new BookRepository()