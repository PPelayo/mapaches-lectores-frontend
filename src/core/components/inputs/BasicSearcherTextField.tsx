import { useEffect, useMemo, useRef, useState } from 'react'
import useSearcher from '@/core/hooks/useSearcher'
import { debounce } from '@mui/material'
import BasicLoader from '../loaders/BasicLoader'
import BasicTextField from './BasicTextField'
import Entity from '@/core/definitinos/Entity'

export type BasicSearchTextFieldProps<T extends Entity> = {
    selectedItems: T[]
    label?: string
    urlSearch: string
    renderItem: (item: T) => React.ReactNode,
    onItemClick? : (item : T) => void,
    value : string,
    onValueChange : (value : string) => void,
    isSearching? : boolean
    onLoadResults? : (results : T[]) => void,
    externalError? : string | null,
    className? : string,
    placeholder? : string
}

export default function BasicSearcherTextField<T extends Entity>({
    selectedItems,
    label,
    urlSearch,
    renderItem,
    onItemClick,
    value,
    onValueChange,
    isSearching = true,
    onLoadResults,
    externalError,
    className = 'w-full',
    placeholder
}: BasicSearchTextFieldProps<T>) {
    const [showSearch, setShowSearch] = useState(false)
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
        if(isSearching) debouncedSearch(value)
    }, [value, debouncedSearch, isSearching])

    const handleItemSelected = (item: T) => {
        // setSelectedItems([...selectedItems, item])
        // setQuery('')
        onItemClick?.(item)
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

    useEffect(() => {
        onLoadResults?.(results)
    },[results, onLoadResults])

    return (
        <>
            <div ref={containerRef} className={`relative ${className}`}>
                <BasicTextField
                    placeholder={placeholder}
                    error={!!externalError}
                    autoComplete="off"
                    label={label}
                    maxRows={1}
                    className={'w-full'}
                    value={value}
                    onChange={(e) => onValueChange(e.target.value)}
                    onFocus={() => setShowSearch(true)}
                />

                {showSearch && (
                    <>
                        {error && (
                            <span className="text-md italic opacity-90">
                                Error al obtener los datos.
                            </span>
                        )}
                        <section
                            ref={menuRef}
                            className={`z-10 absolute w-full border-2 border-background rounded shadow-lg bg-surface ${menuDirection === 'down'
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
        </>
    )
}
