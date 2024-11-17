import UploadReviewForm from "@/features/reviews/components/UploadReviewForm"

/* eslint-disable @next/next/no-img-element */
interface Props {
    params: {
        bookId: string
    }
}

export default function BookInfo({ params }: Props) {
    const { bookId } = params

    return (
        <>
            <div className="flex flex-col gap-8 p-4 h-max max-w-7xl place-self-center">
                <section className="flex flex-row gap-4">
                    <picture className="aspect-portada border-2 rounded-lg overflow-hidden">
                        <img
                            className="object-cover w-64"
                            src={`/books/${bookId}.jpg`}
                            alt="book"
                        />
                    </picture>
                    <article className="flex flex-col gap-4">
                        <header>
                            <h1 className="text-2xl font-bold uppercase">
                                Titulos
                            </h1>
                            <h6 className="text-md italic">
                                Autor1, autor2, autor3
                            </h6>
                        </header>
                        <main>
                            <h3 className="text-lg font-bold">Sinposis</h3>
                            <p className="text-pretty">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Suscipit dignissimos
                                perferendis temporibus sint, in, beatae soluta
                                necessitatibus harum praesentium ea, reiciendis
                                culpa. Modi nam ea tenetur necessitatibus
                                consequuntur enim similique!
                            </p>
                        </main>
                    </article>
                </section>
                <section>
                    <UploadReviewForm bookId={bookId}/>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12">
                            <p className="text-lg">Comentario1</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario2</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                        <div className="col-span-12">
                            <p className="text-lg">Comentario3</p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
