'use client'

import SearchIcon from "@/core/components/icons/SearchIcon";
import BasicSearcherTextField from "@/core/components/inputs/BasicSearcherTextField";
import {FormEvent, useState} from "react";
import {Book} from "@/features/books/definitions/Book";
import {useRouter} from "next/navigation";

export default function SearcherHeader(){

    const [value, setValue] = useState('')
    const router = useRouter()

    const handleItemClick = (book : Book) => {
        setValue('')
        router.push(`/books/${book.itemUuid}`)
    }

    const handleSubmit = (e : FormEvent) => {
        e.preventDefault()
    }

    return (
        <>
            {/*<div className="h-full overflow-hidden rounded-lg flex flex-row items-center bg-surface shadow-lg sm:w-52 md:w-96">*/}
            {/*    <input*/}
            {/*        className="px-3 py-1 outline-none bg-surface h-full w-full border-2 rounded-l-lg border-transparent transition-colors hover:border-secondary"*/}
            {/*        type="text"*/}
            {/*        placeholder="Libro, autor"*/}
            {/*    />*/}
            {/*    <button className="bg-secondary text-onSecondary h-full flex items-center px-2 border-l-2 border-transparent rounded-r-lg transition-colors hover:border-secondary hover:bg-surface hover:text-secondary">*/}
            {/*        <SearchIcon className="w-8 h-auto" />*/}
            {/*    </button>*/}
            {/*</div>*/}
            <form
                // className="h-full overflow-hidden bg-red-500 rounded-lg flex flex-row items-center bg-surface shadow-lg sm:w-52 md:w-96"
                className="h-full md:w-96 flex flex-row items-center bg-surface rounded"
                onSubmit={handleSubmit}>
                <BasicSearcherTextField
                    placeholder="Libro, autor"
                    selectedItems={[]}
                    urlSearch={'/books'}
                    renderItem={
                        (book) => <span>{book.name}</span>
                    }
                    value={value}
                    onItemClick={handleItemClick}
                    onValueChange={setValue}
                    className={'flex-1'}
                />
                <button className="bg-secondary text-onSecondary h-full flex items-center px-2 border border-transparent rounded-r transition-colors hover:border-secondary hover:bg-surface hover:text-secondary">
                    <SearchIcon className="w-8 h-auto" />
                </button>
            </form>

        </>
    )
}