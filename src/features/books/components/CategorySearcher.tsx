import { useEffect, useMemo, useState } from 'react'
import Category from '../definitions/Category'
import BasicSelect from '@/core/components/inputs/BasicSelect'
import { baseAxiosClient } from '@/features/auth/axios/axiosClient'
import BaseResponse from '@/core/definitinos/BaseResponse'
import PaginationResult from '@/core/definitinos/PaginationResult'
import BasicLoader from '@/core/components/loaders/BasicLoader'
import { SelectChangeEvent } from '@mui/material'
import BasicChip from '@/core/components/chips/BasicChip'

interface Props {
    selectedCategories: Category[]
    setSelectedCategories: (categories: Category[]) => void
}

export default function CategorySearcher({
    selectedCategories,
    setSelectedCategories,
}: Props) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<null | string>(null)

    const [allCategories, setAllCategories] = useState<Category[]>([])

    const categoriesToShow = useMemo(() => {
        return allCategories.filter(
            (category) =>
                !selectedCategories.some(
                    (selectedCategory) =>
                        selectedCategory.itemUuid === category.itemUuid
                )
        )
    }, [allCategories, selectedCategories])

    useEffect(() => {
        baseAxiosClient
            .get<BaseResponse<PaginationResult<Category>, string>>(
                '/categories'
            )
            .then((results) => {
                setAllCategories(results.data.result.data)
            })
            .catch((ex) => {
                console.error(ex)
                setError('Error al obtener los datos')
            })
            .finally(() => {
                setLoading(false)
            })
    }, [setAllCategories])

    const handleItemSelected = (e: SelectChangeEvent<string>) => {
        const category = allCategories.find(
            (category) => category.itemUuid === e.target.value
        )
        if (category) setSelectedCategories([...selectedCategories, category])
    }

    const handleItemRemoved = (key: string) => {
        setSelectedCategories(
            selectedCategories.filter(
                (selectedCategory) =>
                    selectedCategory.itemUuid !== key
            )
        )
    }

    return (
        <div className='w-full flex flex-col gap-2'>
            <section className='flex flex-row flex-wrap gap-2'>
                {
                    selectedCategories.map((category) => (
                        <BasicChip
                            key={category.itemUuid}
                            label={category.description}
                            onDelete={() => handleItemRemoved(category.itemUuid)}
                        />
                    ))
                }
            </section>
            <div className="w-full">
                {error && (
                    <div className="text-md italic text-center">{error}</div>
                )}
                <BasicLoader loading={loading}>
                    <BasicSelect
                        label='Categorias'
                        items={categoriesToShow}
                        onChange={handleItemSelected}
                        render={(category) => category.description}
                        value=""
                    />
                </BasicLoader>
            </div>
        </div>
    )
}
