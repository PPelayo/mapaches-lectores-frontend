'use client'

import BasicTextField from '@/core/components/inputs/BasicTextField'
import useSearcher from '@/core/hooks/useSearcher'
import { useMemo, useState } from 'react'
import Author from '../definitions/Author'
import BasicLoader from '@/core/components/loaders/BasicLoader'
import { debounce } from '@/core/utils/debounce'

export default function AuthorSearcher() {
    const [showSearch, setShowSearch] = useState(false)
    const [query, setQuery] = useState('')

    const { loading, error, results, handleSearch } =
        useSearcher<Author>('/authors')

    // Memorizar la función debounced
    const debouncedSearch = useMemo(() => 
        debounce((query: string) => {
            handleSearch(query)
        }, 500), [handleSearch])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setQuery(value)
        debouncedSearch(value) // Invoca la función debounced
    }

    return (
        <>
            <div className="relative">
                <BasicTextField
                    autoComplete="off"
                    label="Autor"
                    maxRows={1}
                    className="w-full"
                    value={query}
                    onChange={handleChange}
                    onBlur={() => setShowSearch(false)}
                    onFocus={() => setShowSearch(true)}
                />
                {error && (
                    <span className="text-sm italic opacity-90">
                        Error al obtener los datos.
                    </span>
                )}
                {showSearch && (
                    <section className="absolute top-full bg-surface w-full border-2 border-background rounded shadow-lg">
                        <BasicLoader
                            divProps={{
                                className:
                                    'w-full flex flex-col items-center py-4 justify-center',
                            }}
                            className="self-center"
                            loading={loading}
                        >
                            {results?.map((author) => (
                                <div
                                    key={author.itemUuid}
                                    className="transition-colors duration-200 hover:bg-background px-4 py-2 w-full"
                                >
                                    {author.name} {author.lastName}
                                </div>
                            ))}
                        </BasicLoader>
                    </section>
                )}
            </div>
        </>
    )
}
