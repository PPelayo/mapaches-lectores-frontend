'use client'

import PrimaryButton from "@/core/components/buttons/PrimaryButton";
import BasicTextField from "@/core/components/inputs/BasicTextField";
import BaseResponse from "@/core/definitinos/BaseResponse";
import { authAxiosClient } from "@/features/auth/axios/axiosClient";
import { Publisher } from "@/features/books/definitions/Publisher";
import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Props {
    onCreated? : (publisher : Publisher) => void
}

export default function CreatePublisherForm({ onCreated } : Props) {

    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e : FormEvent) => {
        e.preventDefault()
        
        setLoading(true)
        authAxiosClient.post<BaseResponse<Publisher, string>>('/publishers')
        .then((result) => {
            onCreated?.(result.data.result)
        })
        .catch(() => toast.error('Error al crear el editor'))
        .finally(() => setLoading(false))
    }

    return (
        <>
            <Toaster position="bottom-right"/>
            <form 
                onSubmit={handleSubmit}
                className="flex flex-col justify-between h-full w-full">
                <BasicTextField
                    label="Nombre"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className="w-full flex items-center justify-center">
                    <PrimaryButton
                        basicAttributes={{
                            disabled: loading,
                            className: 'w-1/2 min-w-20 max-w-72' ,
                            type: 'submit'
                        }}
                    >
                        Guardar
                    </PrimaryButton>
                </div>
            </form>   
        </>
    )
}