'use client'

import { useEffect, useState } from "react"
import { RequestCreateBook } from "../definitions/RequestBook"
import { authAxiosClient } from "@/features/auth/axios/axiosClient"
import BaseResponse from "@/core/definitinos/BaseResponse"
import PaginationResult from "@/core/definitinos/PaginationResult"
import PrimaryButton from "@/core/components/buttons/PrimaryButton"
import dayjs from "dayjs"
import { fromUtc } from "@/core/utils/fromUtc"
import EditIcon from "@/core/components/icons/EditIcon"
import Link from "next/link"


export default function RequestCreateBookTable() {

    const [request, setRequest] = useState<RequestCreateBook[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [hasMore, setHasMore] = useState(true)


    useEffect(() => {
        setLoading(true)
        authAxiosClient.get<BaseResponse<PaginationResult<RequestCreateBook>, string>>("/requestBook/create")
            .then((res) => {
                setHasMore(res.data.result.hasNext)
                console.log('request data',res.data)
                setRequest(prev => [...prev, ...res.data.result.data])
            })
            .catch((ex) => {
                console.error('Excepcion', ex)
                setError('Hubo un error al recuperar los datos')
            })
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        console.log('request', request)
    }, [request])

    return (
        <>
            <div className="w-full max-h-[600px] p-4 overflow-auto flex flex-col items-center gap-2">
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
                        {
                            request.map(req => (
                                <tr>
                                    <td className="px-2 py-1 border">{fromUtc(req.createdAt).format('YYYY-MM-DD HH:mm')}</td>
                                    <td className="px-2 py-1 border">{req.user?.email}</td>
                                    <td className="px-2 py-1 border">{req.name}</td>
                                    <td className="px-2 py-1 border">
                                        <Link 
                                            href={'/'}
                                            className="flex flex-row gap-2 items-center w-fit"
                                        >
                                            Editar <EditIcon className="w-8 h-auto"/>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {
                    hasMore && !loading &&
                    <button className="px-4 py-2 rounded-lg border-2 border-secondary bg-onSecondaty w-fit text-secondary transition-colors duration-300 hover:text-onSecondary hover:bg-secondary hover:border-transparent">
                        Cargar más
                    </button>
                }
            </div>
        </>
    )
}