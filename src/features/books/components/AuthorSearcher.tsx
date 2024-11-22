'use client'

import Author from '../definitions/Author'
import BasicChip from '@/core/components/chips/BasicChip'
import MultiSearcherTextField from '@/core/components/inputs/MultiSearcherTextField'

interface Props {
    selectedAuthors: Author[]
    setSelectedAuthors: (authors: Author[]) => void
}

export default function AuthorSearcher({
    selectedAuthors,
    setSelectedAuthors,
}: Props) {
    const handleItemDeleted = (key: string) => {
        const newAuthors = selectedAuthors.filter((item) => item.itemUuid !== key)
        setSelectedAuthors(newAuthors)
    }

    return (
        <>
            <MultiSearcherTextField
                label="Autores"
                selectedItems={selectedAuthors}
                setSelectedItems={setSelectedAuthors}
                urlSearch="/authors"
                renderChip={(author) => (
                    <BasicChip
                        key={author.itemUuid}
                        label={author.name + ' ' + author.lastName}
                        onDelete={() => handleItemDeleted(author.itemUuid)}
                    />
                )}
                renderItem={(author) => author.name + ' ' + author.lastName}
            />
        </>

    )
}
