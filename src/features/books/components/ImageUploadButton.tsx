'use client'

import UploadImageIcon from "@/core/components/icons/UploadImageIcon"
import {ChangeEvent, useRef, useState} from "react"

interface Props {
    onImageChange : (image: File) => void
}

export default function ImageUploadButton({ onImageChange } : Props) {
    const [fileName, setFileName] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleButtonClick = () => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name)
            onImageChange(file)
        }
    };

    return (
        <div
            className={
                "relative w-full"
            }
        >
            <button
                type="button"
                onClick={handleButtonClick}
                className={"border-2 w-full justify-center gap-2 border-secondary rounded-full flex flex-row px-4 py-2 transition-colors duration-200 hover:bg-secondary hover:text-onSecondary"}
            >
                <UploadImageIcon className={"w-6 h-auto"} />
                {fileName ? "Cambiar imagen" : "Subir imagen"}
            </button>
            <input
                ref={inputRef}
                type="file"
                accept={'image/*'}
                alt={"Upload image"}
                className="hidden"
                onChange={handleFileChange} // Maneja el cambio de archivo
            />
            {fileName && (
                <p className="ml-2 text-md text-gray-700">
                    Archivo sleccionado: <strong>{fileName}</strong>
                </p>
            )}
        </div>
    );
}
