import CategoriesCarouselServer from "@/core/components/carousels/CategoriesCarousel.server";
import BasicLoader from "@/core/components/loaders/BasicLoader";
import MorePopularBooks from "@/features/books/components/MorePopularBooks";
import { Suspense } from "react";

export default function Home() {
    return (
        <>
            <Suspense fallback={
                <div className="w-full h-24 flex items-center justify-center">
                    <BasicLoader loading={true} />
                </div>
            }>
                <MorePopularBooks />
            </Suspense>

            <Suspense fallback={
                <div className="w-full h-24 flex items-center justify-center">
                    <BasicLoader loading={true} />
                </div>
            }>
                <CategoriesCarouselServer />
            </Suspense>
        </>

    )
}
