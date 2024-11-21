import { useEffect, useMemo, useRef, useState } from 'react'
import useSearcher from '@/core/hooks/useSearcher'
import { debounce } from '@mui/material'
import BasicLoader from '../loaders/BasicLoader'
import BasicTextField from './BasicTextField'
import Entity from '@/core/definitinos/Entity'

export type SearchTextFieldProps<T extends Entity> = {
    selectedItems: T[]
    setSelectedItems: (items: T[]) => void
    renderChip?: (item: T) => React.ReactNode
    label: string
    urlSearch: string
    renderItem: (item: T) => React.ReactNode
}

export default function SearcherTextField<T extends Entity>({
    selectedItems,
    setSelectedItems,
    renderChip,
    label,
    urlSearch,
    renderItem,
}: SearchTextFieldProps<T>) {
    const [showSearch, setShowSearch] = useState(false)
    const [query, setQuery] = useState('')
    const [menuDirection, setMenuDirection] = useState<'up' | 'down'>('down') // Dirección del menú
    const { loading, error, results, handleSearch } = useSearcher<T>(urlSearch)

    const containerRef = useRef<HTMLDivElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)

    const itemsToShow = useMemo(() => {
        return results.filter(
            (item) =>
                !selectedItems.some(
                    (selectedItem) => selectedItem.itemUuid === item.itemUuid
                )
        )
    }, [results, selectedItems])

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

    const handleItemSelected = (item: T) => {
        setSelectedItems([...selectedItems, item])
        setQuery('')
        setShowSearch(false)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (
            containerRef.current &&
            !containerRef.current.contains(event.target as Node)
        ) {
            setShowSearch(false)
        }
    }

    // Recalcular la dirección del menú al abrir el dropdown
    useEffect(() => {
        if (showSearch && containerRef.current && menuRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect()
            const menuHeight = menuRef.current.offsetHeight
            const viewportHeight = window.innerHeight

            // Si no hay suficiente espacio abajo, cambiar dirección a 'up'
            if (containerRect.bottom + menuHeight > viewportHeight) {
                setMenuDirection('up')
            } else {
                setMenuDirection('down')
            }
        }
    }, [showSearch])

    useEffect(() => {
        if (showSearch) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showSearch])

    return (
        <>
            <div className="w-full flex flex-col gap-2">
                <div className="flex flex-row flex-wrap w-full h-auto max-h-24 gap-4 overflow-y-auto">
                    {selectedItems.map((item) =>
                        renderChip?.(item)
                    )}
                </div>
                <div ref={containerRef} className="relative">
                    <BasicTextField
                        autoComplete="off"
                        label={label}
                        maxRows={1}
                        className="w-full"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setShowSearch(true)}
                    />

                    {showSearch && (
                        <>
                            {error && (
                                <span className="text-sm italic opacity-90">
                                    Error al obtener los datos.
                                </span>
                            )}
                            <section
                                ref={menuRef}
                                className={`z-10 absolute w-full border-2 border-background rounded shadow-lg bg-surface ${
                                    menuDirection === 'down'
                                        ? 'top-full'
                                        : 'bottom-full'
                                }`}
                            >
                                <BasicLoader
                                    divProps={{
                                        className:
                                            'w-full flex flex-col items-center py-4 justify-center',
                                    }}
                                    className="self-center"
                                    loading={loading}
                                >
                                    {itemsToShow.map((item) => (
                                        <div
                                            key={item.itemUuid}
                                            className="transition-colors duration-200 hover:bg-background px-4 py-2 w-full cursor-pointer"
                                            onClick={() =>
                                                handleItemSelected(item)
                                            }
                                        >
                                            {renderItem(item)}
                                        </div>
                                    ))}
                                </BasicLoader>
                            </section>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
