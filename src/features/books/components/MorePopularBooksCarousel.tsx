'use client'

import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Swiper as SwiperCore} from "swiper";
import {Navigation} from "swiper/modules";
import {Book} from "@/features/books/definitions/Book";
import BookCard from "@/features/books/components/BookCard";
import 'swiper/css';
import Link from "next/link";
import CarouselLeftButton from "@/core/components/buttons/CarouselLeftButton";
import CarouselRightButton from "@/core/components/buttons/CarouselRightButton";


interface Props {
    books: Book[]
}

export default function MorePopularBooksCarousel({ books }: Props) {
    const [swiperInstance, setSwiperInstance] = React.useState<SwiperCore | null>(null);

    const handleNext = () => {
        swiperInstance?.slideNext();
    };

    const handlePrev = () => {
        swiperInstance?.slidePrev();
    };

    return (
        <>
            <div className={`w-full relative max-h-2xl ${!swiperInstance ? 'invisible' : ''}`}>
                <Swiper
                    onSwiper={(swiper) => (setSwiperInstance(swiper))}
                    slidesPerView={5}
                    spaceBetween={10}
                    breakpoints={{
                        200: { slidesPerView: 1 },
                        320: { slidesPerView: 2 },
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 5 },
                        1280: { slidesPerView: 6 },
                    }}
                    // loop={true}
                    modules={[Navigation]}
                    navigation
                    style={{ padding: "20px 0" }}
                >
                    {
                        books.map((book) => (
                            <SwiperSlide
                                key={book.itemUuid}>
                                <Link href={`/books/${book.itemUuid}`}>
                                    <BookCard book={book} />
                                </Link>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
                <CarouselLeftButton onClick={handlePrev} />
                <CarouselRightButton onClick={handleNext} />
            </div>
        </>
    )
}