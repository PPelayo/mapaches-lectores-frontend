'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import SwipperClass from 'swiper'
import { useState } from "react";
import Category from "@/features/books/definitions/Category";
import Link from "next/link";
import { Button } from "@mui/material";

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
            <div className="w-full px-2 relative">
                <Swiper
                    onSwiper={(swp) => setSwipper(swp)}
                    slidesPerView={6}
                    spaceBetween={10}
                    breakpoints={{
                        200: { slidesPerView: 2 },
                        320: { slidesPerView: 2 },
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
                <Button
                    onClick={handlePrev}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 10,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        height: "65%"
                    }}
                >
                    {"<"}
                </Button>
            
                <Button
                    onClick={handleNext}
                    sx={{
                        position: "absolute",
                        right: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 10,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        height: "65%"
                    }}
                >
                    {">"}
                </Button>
            </div>
        </>
    )
}

function CategoryCard({ category }: { category: Category }) {
    return (
        <>
            <Link href={`/search?category=${category.description}&category=terror`} className="w-auto shadow-xl rounded-2xl bg-background flex items-center justify-center px-8 py-4 my-4">
                <button className="">
                    <h2 className="text-2xl font-bold">
                        {category.description}
                    </h2>
                </button>
            </Link>
        </>
    )
}

function CategoryCardSkeleton() {
    return (
        <>

        </>
    )
}