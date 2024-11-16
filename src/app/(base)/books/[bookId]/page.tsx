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
            <div className="flex flex-col gap-8 p-4 h-max max-w-7xl">
                {/* <section className="grid grid-cols-12 grid-rows-12 gap-4 grid-flow-col">
                    <div className="col-span-3 row-span-12 border rounded-lg border-secondaryContainer">
                        <img src={`/books/${bookId}.jpg`} alt="book" />
                    </div>
                    <header className="col-span-9 row-span-3"> 
                        <h1 className="text-4xl font-bold uppercase">Titulos</h1>
                        <h6 className="text-wrap">Autor1, autor2, autor3</h6>
                    </header>
                    <div className="col-span-9 row-span-9">
                        <p className="text-wrap text-lg">Descripción Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, nam facilis corrupti accusamus illo tempora facere. Officia quis laboriosam animi soluta culpa modi, doloremque provident mollitia quo illo suscipit impedit!

                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit hic ullam sed aut earum a quos? Doloremque, soluta! Architecto, a hic. Enim iusto dolor sapiente deserunt dolore minus totam reprehenderit.
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi, rerum veniam tempora obcaecati ipsa minus, eligendi labore culpa quisquam ratione modi similique suscipit quibusdam non officiis impedit ducimus, odio nam?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, voluptatum ab molestiae commodi quaerat repudiandae nulla itaque excepturi molestias recusandae sunt eligendi, nesciunt eaque nobis voluptatibus ex tenetur minus. Laboriosam!
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quis tempore aut neque architecto, eos delectus nemo fuga ducimus eum dignissimos quaerat voluptatibus velit, sint nihil, id dolores natus? Soluta.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat rem qui quis esse eos, dolores, perspiciatis repellendus maxime temporibus, voluptatem at voluptates! Perferendis expedita, cupiditate non blanditiis temporibus quidem quos.
                            Pariatur et eaque natus maiores aspernatur in recusandae enim nemo provident minima dicta alias sapiente eos hic quasi tempora quam quibusdam, adipisci inventore culpa consectetur maxime nesciunt sit! Aut, repudiandae.
                            Iste incidunt facere eaque beatae? Omnis sequi animi veniam obcaecati officiis odit, asperiores eum est facilis aperiam enim soluta, ipsa quibusdam quisquam atque libero earum autem veritatis. Quam, aliquid eius!
                            Sequi, ratione nulla esse, doloribus laborum ipsam ex dolorum quod sit voluptate accusamus voluptas placeat cumque laboriosam tempora beatae qui necessitatibus molestias. Omnis, explicabo repudiandae voluptates sint aliquid perspiciatis minima?
                        </p>
                    </div>
                </section> */}
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
                    <UploadReviewForm/>
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
