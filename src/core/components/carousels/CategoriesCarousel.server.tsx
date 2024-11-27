import Category from "@/features/books/definitions/Category"
import FullError from "../errors/FullError"
import CategoriesCarouselClient from "./CategoriesCarousel.client"
import { baseAxiosClient } from "@/features/auth/axios/axiosClient"
import PaginationResult from "@/core/definitinos/PaginationResult"
import BaseResponse from "@/core/definitinos/BaseResponse"
import MorePopularBooksCarousel from "@/features/books/components/MorePopularBooksCarousel";

export default async function CategoriesCarouselServer(){

    let categories : Category[] = []
    let error : string | undefined = undefined
    try{

        const res = await baseAxiosClient.get<BaseResponse<PaginationResult<Category>,string>>('/categories', {
            params: {
                limit: 1000,
                offset: 0
            }
        })

        categories = res.data.result.data

    } catch {
        error = 'Ocurrió un error inesperado al intentar recuperar las categorias'
    }

    return (
        <>
            <FullError error={error}>
                <section className="flex flex-col gap-1 py-2 px-4 my-2">
                    <h2 className="text-2xl font-bold">Categorias</h2>
                    <CategoriesCarouselClient categories={categories} />
                </section>
            </FullError>
        </>
    )
}