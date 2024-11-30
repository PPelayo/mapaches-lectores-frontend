'use client'

import {Swiper, SwiperSlide} from "swiper/react";
import SwipperClass from 'swiper'
import {useState} from "react";
import Category from "@/features/books/definitions/Category";
import Link from "next/link";
import CarouselLeftButton from "@/core/components/buttons/CarouselLeftButton";
import CarouselRightButton from "@/core/components/buttons/CarouselRightButton";

interface Props {
    categories: Category[]
}

export default function CategoriesCarouselClient({ categories }: Props) {

    const [swipper, setSwipper] = useState<SwipperClass | null>(null)

    const handleNext = () => {
        swipper?.slideNext()
    }

    const handlePrev = () => {
        swipper?.slidePrev()
    }

    return (
        <>
            <div className={`w-full relative max-h-2xl ${!swipper && 'invisible'}`}>
                <Swiper
                    onSwiper={(swp) => setSwipper(swp)}
                    slidesPerView={6}
                    spaceBetween={10}
                    breakpoints={{
                        200: { slidesPerView: 1 },
                        320: { slidesPerView: 1 },
                        500: { slidesPerView: 2 },
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                        1280: { slidesPerView: 5 },
                    }}
                >
                    {
                        categories.map(category => (
                            <SwiperSlide
                                key={category.itemUuid}
                            >
                                <CategoryCard key={category.itemUuid} category={category} />
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
                <CarouselLeftButton onClick={handlePrev} />
                <CarouselRightButton onClick={handleNext}/>
            </div>
        </>
    )
}

function CategoryCard({ category }: { category: Category }) {
    return (
        <>
            <Link
                href={`/search?category=${category.description}`}
                className="w-auto rounded-2xl bg-background flex items-center justify-center px-8 py-4 transition-colors duration-300 hover:bg-primary">
                <button className="truncate">
                    <h2 className="text-2xl font-bold">
                        {category.description}
                    </h2>
                </button>
            </Link>
        </>
    )
}