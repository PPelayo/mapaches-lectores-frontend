import BasicTextField from '@/core/components/inputs/BasicTextField'

export default function CreateBookPage() {
    return (
        <>
            <section>
                <form>
                    <button>
                        <picture>
                            <img src="" alt="" />
                        </picture>
                    </button>
                    <div>
                        <BasicTextField
                            label="Titulo"
                        />
                        <BasicTextField
                            label="Sinopsis"
                            variant='outlined'
                            multiline
                            minRows={5}
                            maxRows={20}
                        />
                        <BasicTextField
                            label="Autor"
                            variant='outlined'
                            maxRows={1}
                        />
                    </div>
                    
                </form>
            </section>
        </>
    )
}