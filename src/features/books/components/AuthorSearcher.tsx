'use client'

import BasicTextField from '@/core/components/inputs/BasicTextField'
import useSearcher from '@/core/hooks/useSearcher'
import { debounce } from '@mui/material'
import {  useEffect, useState } from 'react'
import Author from '../definitions/Author'

export default function AuthorSearcher() {
    const [showSearch, setShowSearch] = useState(false)
    const [query, setQuery] = useState('')

    const { loading, error, results, handleSearch } = useSearcher<Author>('/authors')


    console.log(results)


    useEffect(() => {
        const search = debounce(() => {
            handleSearch(query)
            setShowSearch(true)
        })
        if(query)
            search()        
    }, [query, handleSearch])

    return (
        <>
            <div className="relative">
                <BasicTextField
                    label="Autor"
                    maxRows={1}
                    className="w-full"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onBlur={() => setShowSearch(false)}
                    onFocus={() => {
                        setShowSearch(true)
                        handleSearch(query)
                    }}
                />
                {showSearch && (
                    <section className="absolute top-full bg-surface w-full border-2 border-background rounded shadow-lg">
                        {results?.map((author) => (
                                <div key={author.itemUuid} className='transition-colors duration-200 hover:bg-background px-4 py-2'>
                                    {author.name}
                                </div>
                            ))}
                    </section>
                )}
            </div>
        </>
    )
}
