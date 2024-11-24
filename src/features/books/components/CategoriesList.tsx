import {useEffect, useState} from "react";
import Category from "@/features/books/definitions/Category";
import {baseAxiosClient} from "@/features/auth/axios/axiosClient";
import BaseResponse from "@/core/definitinos/BaseResponse";
import PaginationResult from "@/core/definitinos/PaginationResult";

export default function CategoriesList() {

    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        baseAxiosClient.get<BaseResponse<PaginationResult<Category>, string>>("/categories")
            .then((result) => {
                setCategories(result.data.result.data)
            })
            .finally(() => setLoading(false))

    }, [])

    return (
        <>
            <section>
                {

                }
            </section>
        </>
    )
}