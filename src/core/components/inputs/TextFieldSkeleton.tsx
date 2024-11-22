import BasicLoader from "../loaders/BasicLoader";

export default function TextFieldSkeleton(){
    return (
        <div className="bg-surfaceVariant w-full h-14 rounded-lg flex items-center justify-center">
            <BasicLoader loading/>
        </div>
    )
}