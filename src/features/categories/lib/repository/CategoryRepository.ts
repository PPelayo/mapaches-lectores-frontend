import Category from "@/features/books/definitions/Category";
import {baseAxiosClient} from "@/features/auth/axios/axiosClient";
import BaseResponse from "@/core/definitinos/BaseResponse";
import PaginationResult from "@/core/definitinos/PaginationResult";

class CategoryRepository {

    async getAll() :Promise<Category[]>  {
        try{
            const res = await baseAxiosClient.get<BaseResponse<PaginationResult<Category>,string>>('/categories', {
                params: {
                    limit: 1000,
                    offset: 0
                }
            })
            return res.data.result.data

        } catch {
            return []
        }
    }

}

export const categoryRepository = new CategoryRepository()