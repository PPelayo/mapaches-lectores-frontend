import BasicTextField from "@/core/components/inputs/BasicTextField";

export default function AuthorSearcher(){
    return (
        <>
            <BasicTextField
                label="Autor"
                maxRows={1}
            />
        </>
    )
}