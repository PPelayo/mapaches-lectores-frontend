import Category from "@/features/books/definitions/Category"
import FullError from "../errors/FullError"
import CategoriesCarouselClient from "./CategoriesCarousel.client"
import { baseAxiosClient } from "@/features/auth/axios/axiosClient"
import PaginationResult from "@/core/definitinos/PaginationResult"
import BaseResponse from "@/core/definitinos/BaseResponse"
import MorePopularBooksCarousel from "@/features/books/components/MorePopularBooksCarousel";
import {categoryRepository} from "@/features/categories/lib/repository/CategoryRepository";

export default async function CategoriesCarouselServer(){

    let categories : Category[] = await categoryRepository.getAll()
    let error = categories.length === 0 ? 'No se han podido cargar las categorias' : undefined
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