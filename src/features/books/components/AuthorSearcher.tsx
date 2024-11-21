'use client'

import SearcherTextField from '@/core/components/inputs/SearcherTextField'
import Author from '../definitions/Author'
import BasicChip from '@/core/components/chips/BasicChip'

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
            <SearcherTextField
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
