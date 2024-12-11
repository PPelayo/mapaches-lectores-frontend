'use client'

import { useEffect, useState } from "react"
import { RequestCreateBook } from "../definitions/RequestBook"
import { authAxiosClient } from "@/features/auth/axios/axiosClient"
import BaseResponse from "@/core/definitinos/BaseResponse"
import PaginationResult from "@/core/definitinos/PaginationResult"


export default function RequestCreateBookTable(){

    const [request, setRequest] = useState<RequestCreateBook[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [hasMore, setHasMore] = useState(true)


    useEffect(() => {
        setLoading(true)
        authAxiosClient.get<BaseResponse<PaginationResult<RequestCreateBook>,string>>("/requestBook/create")
        .then((res) => {
            setHasMore(res.data.result.hasNext)
            setRequest(prev => [...prev, ...res.data.result.data])
        })
        .catch(() => setError('Hubo un error al recuperar los datos'))
        .finally(() => setLoading(false))
    }, [])

    return (
        <>
        <div className="w-full max-h-[600px] p-4 overflow-auto flex">
            <table className="w-full rounded-lg overflow-hidden flex-1">
                <thead>
                    <tr>
                        <th className="px-2 py-1 border bg-background">FECHA</th>
                        <th className="px-2 py-1 border bg-background">USUARIO</th>
                        <th className="px-2 py-1 border bg-background">TITULO</th>
                        <th className="px-2 py-1 border bg-background">ACCIONES</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td className="px-2 py-1 border">FECHA 1</td>
                        <td className="px-2 py-1 border">USUARIO</td>
                        <td className="px-2 py-1 border">Titulo</td>
                        <td className="px-2 py-1 border">Accion</td>
                    </tr>
                </tbody>
            </table>
            <button>
                Cargar más
            </button>
        </div>
        </>
    )
}