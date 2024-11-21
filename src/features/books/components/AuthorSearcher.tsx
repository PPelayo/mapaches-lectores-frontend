'use client'

import BasicTextField from '@/core/components/inputs/BasicTextField'
import useSearcher from '@/core/hooks/useSearcher'
import { useEffect, useMemo, useRef, useState } from 'react'
import Author from '../definitions/Author'
import BasicLoader from '@/core/components/loaders/BasicLoader'
import { debounce } from '@/core/utils/debounce'
import BasicChip from '@/core/components/chips/BasicChip'

interface Props {
    selectedAuthors: Author[]
    setSelectedAuthors: (authors: Author[]) => void
}

export default function AuthorSearcher({selectedAuthors, setSelectedAuthors} : Props) {
    const [showSearch, setShowSearch] = useState(false)
    const [query, setQuery] = useState('')
    const { loading, error, results, handleSearch } =
        useSearcher<Author>('/authors')

    const containerRef = useRef<HTMLDivElement>(null)

    const authorsToShow = useMemo(() => {
        return results.filter(
            (author) =>
                !selectedAuthors.some(
                    (selectedAuthor) =>
                        selectedAuthor.itemUuid === author.itemUuid
                )
        )
    }, [results, selectedAuthors])
    // Memorizar la función debounced
    const debouncedSearch = useMemo(
        () =>
            debounce((query: string) => {
                handleSearch(query)
            }, 500),
        [handleSearch]
    )

    useEffect(() => {
        debouncedSearch(query)
    }, [query, debouncedSearch])

    const handleItemSelected = (author: Author) => {
        console.log('item selted', author)

        setSelectedAuthors([...selectedAuthors, author])
        setQuery('')
        setShowSearch(false)
    }

    const handleItemDeleted = (key: string) => {
        const newAuthors = selectedAuthors.filter(
            (author) => author.itemUuid !== key
        )
        setSelectedAuthors(newAuthors)
    }

   
    const handleClickOutside = (event: MouseEvent) => {
        // Si el clic ocurre fuera del contenedor, cerrar el dropdown
        if (
            containerRef.current && 
            !containerRef.current.contains(event.target as Node)
        ) {
            setShowSearch(false);
        }
    };

    useEffect(() => {
        if (showSearch) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Limpieza del evento cuando el componente se desmonta o se cierra el dropdown
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSearch]);

    return (
        <div className="w-full flex flex-col gap-2">
            <div className="flex flex-row flex-wrap w-full h-auto max-h-24 gap-4 overflow-y-auto">
                {selectedAuthors.map((author) => (
                    <BasicChip
                        key={author.itemUuid}
                        label={`${author.name} ${author.lastName}`}
                        onDelete={() => handleItemDeleted(author.itemUuid)}
                    />
                ))}
            </div>
            <div ref={containerRef} className="relative">
                <BasicTextField
                    autoComplete="off"
                    label="Autor"
                    maxRows={1}
                    className="w-full"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setShowSearch(true)}
                />
                {error && (
                    <span className="text-sm italic opacity-90">
                        Error al obtener los datos.
                    </span>
                )}
                {showSearch && (
                    <section className="dropdown-menu absolute top-full bg-surface w-full border-2 border-background rounded shadow-lg">
                        <BasicLoader
                            divProps={{
                                className:
                                    'w-full flex flex-col items-center py-4 justify-center',
                            }}
                            className="self-center"
                            loading={loading}
                        >
                            {authorsToShow.map((author) => (
                                <div
                                    key={author.itemUuid}
                                    className="transition-colors duration-200 hover:bg-background px-4 py-2 w-full cursor-pointer"
                                    onClick={(e) => {
                                        console.log('click', author)
                                        e.stopPropagation()
                                        handleItemSelected(author)
                                    }}
                                >
                                    {author.name} {author.lastName}
                                </div>
                            ))}
                        </BasicLoader>
                    </section>
                )}
            </div>
        </div>
    )
}
