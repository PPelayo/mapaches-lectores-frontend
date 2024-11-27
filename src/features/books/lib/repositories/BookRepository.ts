import {baseAxiosClient} from "@/features/auth/axios/axiosClient";
import BaseResponse from "@/core/definitinos/BaseResponse";
import PaginationResult from "@/core/definitinos/PaginationResult";
import {Book, OrderBook} from "@/features/books/definitions/Book";
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
                    category: category,
                    order: order,
                    search: search
                }
            })
            return res.data.result

        } catch (ex){
            return
        }
    }

}

export const bookRepository = new BookRepository()