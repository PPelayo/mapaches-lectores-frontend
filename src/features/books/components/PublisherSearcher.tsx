import BasicSearcherTextField from "@/core/components/inputs/BasicSearcherTextField";
import { useState } from "react";
import { Publisher } from "../definitions/Publisher";

interface Props {
    onChangePublisher : (publisher : Publisher) => void
}

export default function PublisherSearcher({ onChangePublisher} : Props) {

    const [value, setValue] = useState('')
    const [selectedPublishers, setSelectedPublishers] = useState<Publisher[]>([])
    const [allPublisher, setAllPublishers] = useState<Publisher[]>([])  
    const [isSearching, setIsSearching] = useState(true)
    const [error, setError] = useState<string | null>('')


    const handleItemClick = (publisher : Publisher) => {
        setError(null)
        setIsSearching(false)
        setSelectedPublishers([publisher])
        setValue(publisher.name)
        onChangePublisher(publisher)
    }

    const handleValueChange = (value : string) => {
        if(allPublisher.every(publisher => publisher.name !== value)){
            setError('No se encontró el autor')
            console.log('Error publisher');
        }

        setSelectedPublishers([])
        setIsSearching(true)
        setValue(value)
    }

    return (
        <>
            <BasicSearcherTextField
                value={value}
                externalError={error}
                onValueChange={handleValueChange}
                selectedItems={selectedPublishers}
                onItemClick={handleItemClick}
                urlSearch="/publishers"
                isSearching={isSearching}
                renderItem={(publisher) => publisher.name}
                onLoadResults={setAllPublishers}
            />
        </>
    )
}
