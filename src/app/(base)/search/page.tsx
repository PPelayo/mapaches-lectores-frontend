'use server'

import SearcherBooksLateralMenu from "@/features/searcher/components/SearcherBooksLateralMenu";
import {Suspense} from "react";
import BasicLoader from "@/core/components/loaders/BasicLoader";
import SearcherBooksServer from "@/features/searcher/components/SearcherBooks.server";

export default async function Search({searchParams}: { searchParams: { q: string } }) {

   return (
       <>
           <Suspense fallback={
               <div className={'w-full h-32 flex items-center justify-center'}>
                   <BasicLoader loading={true}/>
               </div>
           }>
               <div className={'grid grid-cols-12 max-w-7xl place-self-center p-6 gap-2 w-full'}>
                   <div className={'sm:col-span-3'}>
                       <SearcherBooksLateralMenu/>
                   </div>
                   <div className={'col-span-12 sm:col-span-9'}>
                      <SearcherBooksServer searchParams={searchParams}/>
                   </div>
               </div>
           </Suspense>
       </>
   )
}