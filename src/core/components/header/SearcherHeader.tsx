'use client'

import SearchIcon from "@/core/components/icons/SearchIcon";
import BasicSearcherTextField from "@/core/components/inputs/BasicSearcherTextField";
import {FormEvent, useState} from "react";
import {Book} from "@/features/books/definitions/Book";
import {useRouter} from "next/navigation";
import CoverBook from "@/features/books/components/CoverBook";

export default function SearcherHeader(){

    const [value, setValue] = useState('')
    const router = useRouter()
    const [showSearch, setShowSearch] = useState(true)

    const handleItemClick = (book : Book) => {
        setValue('')
        router.push(`/books/${book.itemUuid}`)
    }

    const handleChange = (text : string) => {
        setValue(text)
        setShowSearch(true)
    }

    const handleSubmit = (e : FormEvent) => {
        e.preventDefault()

        if(value){
            router.push(`/search?q=${value}`)
            setShowSearch(false)
        }
    }

    return (
        <>
            <form
                // className="h-full overflow-hidden bg-red-500 rounded-lg flex flex-row items-center bg-surface shadow-lg sm:w-52 md:w-96"
                className="h-full md:w-96 flex flex-row items-center bg-surface rounded"
                onSubmit={handleSubmit}>
                <BasicSearcherTextField
                    placeholder="Libro, autor"
                    urlSearch={'/books'}
                    renderItem={
                        (book) => <BookRender book={book} />
                    }
                    value={value}
                    onItemClick={handleItemClick}
                    onValueChange={handleChange}
                    className={'flex-1'}
                    activeMenu={showSearch}
                    onFocus={() => setShowSearch(true)}
                />
                <button className="bg-secondary text-onSecondary h-full flex items-center px-2 border border-transparent rounded-r transition-colors hover:border-secondary hover:bg-surface hover:text-secondary">
                    <SearchIcon className="w-8 h-auto" />
                </button>
            </form>

        </>
    )
}

function BookRender({book} : { book : Book }) {
    return (
        <>
            <div className={'flex flex-row gap-2 '}>
                <CoverBook cover={book.coverUrl} className={'w-10 rounded truncate'}/>
                <h3 className={'font-bold text-lg'}>{book.name}</h3>
            </div>
        </>
    )
}