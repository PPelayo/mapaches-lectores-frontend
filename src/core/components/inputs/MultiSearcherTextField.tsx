import Entity from '@/core/definitinos/Entity'
import BasicSearcherTextField from './BasicSearcherTextField'
import { useState } from 'react'

export type MultiSearchTextFieldProps<T extends Entity> = {
    selectedItems: T[]
    setSelectedItems: (items: T[]) => void
    renderChip?: (item: T) => React.ReactNode
    label: string
    urlSearch: string
    renderItem: (item: T) => React.ReactNode
}

export default function MultiSearcherTextField<T extends Entity>({
    selectedItems,
    setSelectedItems,
    renderChip,
    label,
    urlSearch,
    renderItem,
}: MultiSearchTextFieldProps<T>) {

    const [value, setValue] = useState('')

    const handleItemClick = (item : T) => {
        setSelectedItems([...selectedItems, item])
        setValue('')
    }

    return (
        <>
            <div className="w-full flex flex-col gap-2">
                <div className="flex flex-row flex-wrap w-full h-auto max-h-24 gap-4 overflow-y-auto">
                    {selectedItems.map((item) =>
                        renderChip?.(item)
                    )}
                </div>
                <BasicSearcherTextField
                    selectedItems={selectedItems}
                    // setSelectedItems={setSelectedItems}
                    label={label}
                    urlSearch={urlSearch}
                    renderItem={renderItem}
                    value={value}
                    onValueChange={setValue}
                    onItemClick={handleItemClick}
                />
            </div>
        </>
    )
}
