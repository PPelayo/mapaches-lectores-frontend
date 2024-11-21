import BaseResponse from "@/core/definitinos/BaseResponse";
import PaginationResult from "@/core/definitinos/PaginationResult";
import { baseAxiosClient } from "@/features/auth/axios/axiosClient";
import { useCallback, useState } from "react";

const MAX_LIMIT = 5

export default function useSearcher<T>(urlToFetch: string) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<null | string>(null)
    const [results, setResults] = useState<T[]>([])


    const handleSearch = useCallback((query: string) => {
        // if(!query) return
        setLoading(true)
        setError(null)
        baseAxiosClient.get<BaseResponse<PaginationResult<T>, string>>(urlToFetch, {
            params: {
                limit: MAX_LIMIT,
                offset: 0,
                search: query
            }
        })
            .then((results) => {
                setResults(results.data.result.data)
            })
            .catch((ex) => {
                console.error(ex)
                setError('Error al obtener los datos')
            })
            .finally(() => setLoading(false))

    }, [urlToFetch])



    return {
        loading,
        error,
        results,
        handleSearch,
    }

}