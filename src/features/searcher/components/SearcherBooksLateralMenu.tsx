'use client'

import {categoryRepository} from "@/features/categories/lib/repository/CategoryRepository";
import FullError from "@/core/components/errors/FullError";
import Link from "next/link";
import {useEffect, useMemo, useState} from "react";
import Category from "@/features/books/definitions/Category";
import BasicLoader from "@/core/components/loaders/BasicLoader";
import {useSearchParams} from "next/navigation";

interface Props {
    onCategoryClick? : (category : Category) => void,
}

export default function SearcherBooksLateralMenu({ onCategoryClick } : Props) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const searchParams = useSearchParams();
    const selectedCategory = searchParams.get('category');

    useEffect(() => {
        setLoading(true);
        categoryRepository.getAll()
            .then((categories) => {
                if (categories.length === 0)
                    setError('No se han podido cargar las categorias');

                setCategories(categories);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <aside className={'bg-background shadow-lg rounded-xl truncate px-3 py-2'}>
                <header>
                    <h3 className={'font-bold text-xl'}>
                        Categorias
                    </h3>
                </header>
                <BasicLoader loading={loading} color={'--primary'}>
                    <FullError error={error}>
                        <ul className="flex flex-col gap-1">
                            {
                                categories.map((category) => (
                                    <CategorieItem
                                        category={category}
                                        key={category.id}
                                        isSelected={category.description === selectedCategory}
                                        onClick={onCategoryClick}
                                    />
                                ))
                            }
                        </ul>
                    </FullError>
                </BasicLoader>
            </aside>
        </>
    );
}

function CategorieItem({ category, isSelected, onClick }: { category: Category, isSelected: boolean, onClick?: (category : Category) => void }) {
    const url = useMemo(() => {
        if (isSelected) {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.delete('category');
            return currentUrl.toString();
          } else {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('category', category.description);
            return currentUrl.toString();
          }
    }, [category, isSelected]);

    return (
        <>
            <li onClick={() => onClick?.(category)}>
                <Link
                    className={`px-2 py-1 rounded-lg transition-colors ease-in hover:bg-primary hover:text-background cursor-pointer flex ${isSelected ? 'bg-primary text-background' : ''}`}
                    href={url}>
                    {category.description}
                </Link>
            </li>
        </>
    );
}