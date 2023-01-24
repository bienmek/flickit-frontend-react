import ErrorToaster from "./ErrorToaster";
import LoadingToaster from "./LoadingToaster";
import SuccessToaster from "./SuccessToaster";
import {useSelector} from "react-redux";


export default function ToasterContainer () {

    const toaster = useSelector((state) => state.toaster)

    return (
        <>
            {/* TOASTERS */}
            {(toaster.show && toaster.type === "ERROR") && (
                <ErrorToaster error={toaster.text} />
            )}
            {(toaster.show && toaster.type === "LOADING") && (
                <LoadingToaster />
            )}
            {(toaster.show && toaster.type === "SUCCESS") && (
                <SuccessToaster successMessage={toaster.text}/>
            )}
            {/* TOASTERS */}
        </>
    )
}