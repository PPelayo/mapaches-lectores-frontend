'use server'

import SearcherBooksLateralMenu from "@/features/searcher/components/SearcherBooksLateralMenu";
import { Suspense } from "react";
import BasicLoader from "@/core/components/loaders/BasicLoader";
import SearcherBooksServer from "@/features/searcher/components/SearcherBooks.server";
import { BookIcon } from "@/core/components/icons/BookIcon";
import SearcherBooksButtonMenu from "@/features/searcher/components/SearcherBooksButtonMenu";

export default async function Search({ searchParams }: { searchParams: { q: string, category: string } }) {

    return (
        <>
            <div className="flex flex-col w-full h-full flex-1 relative">
                <div className={'grid grid-cols-12 max-w-7xl place-self-center p-6 gap-2 w-full'}>
                    <div className={'sm:col-span-3'}>
                        <SearcherBooksLateralMenu />
                    </div>
                    <Suspense fallback={
                        <div className={'w-full col-span-12 sm:col-span-9 h-32 flex items-center justify-center'}>
                            <BasicLoader loading={true} />
                        </div>
                    }>
                        <div className={'col-span-12 sm:col-span-9'}>
                            <SearcherBooksServer searchParams={searchParams} />
                        </div>
                    </Suspense>
                </div>
                <SearcherBooksButtonMenu/>
            </div>
        </>
    )
}