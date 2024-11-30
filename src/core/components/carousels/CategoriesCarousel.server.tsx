import Category from "@/features/books/definitions/Category"
import FullError from "../errors/FullError"
import CategoriesCarouselClient from "./CategoriesCarousel.client"
import {categoryRepository} from "@/features/categories/lib/repository/CategoryRepository";

export default async function CategoriesCarouselServer(){

    const categories : Category[] = await categoryRepository.getAll()
    const error = categories.length === 0 ? 'No se han podido cargar las categorias' : undefined
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