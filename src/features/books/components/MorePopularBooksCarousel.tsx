'use client'

import React from "react";
import {Button} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react";
import { Swiper as SwiperCore } from "swiper";
import {Navigation} from "swiper/modules";
import {Book} from "@/features/books/definitions/Book";
import BookCard from "@/features/books/components/BookCard";
import 'swiper/css';


interface  Props {
    books : Book[]
}

export default function MorePopularBooksCarousel({books} : Props){
    const [swiperInstance, setSwiperInstance] = React.useState<SwiperCore | null>(null);

    const handleNext = () => {
        swiperInstance?.slideNext();
    };

    const handlePrev = () => {
        swiperInstance?.slidePrev();
    };

    return (
        <>
            <div className={'w-full relative max-h-2xl'}>
                <Swiper
                    onSwiper={(swiper) => (setSwiperInstance(swiper))}
                    slidesPerView={1}
                    spaceBetween={10}
                    breakpoints={{
                        320: {  slidesPerView: 2 },
                        640: {  slidesPerView: 3 },
                        768: {  slidesPerView: 4 },
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
                                <BookCard book={book}/>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>

                {/* Botones personalizados */}
                <button
                    onClick={handlePrev}
                    className={'bg-gray-600 text-white px-6 py-4 rounded-xl opacity-50 absolute left-2 top-1/2 -translate-y-1/2 z-10' }
                >
                    {"<"}
                </button>
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
                    }}
                >
                    {">"}
                </Button>
            </div>
        </>
    )
}