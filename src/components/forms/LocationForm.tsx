import { LocationSchema } from "@/schemas/locationSchema"
import { LocationFormInput } from "@/types/_locationTypes"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import PrimaryInput from "../inputs/PrimaryInput"
import { LOCATION_CONSTANTS } from "@/constants/locationConstants"
import PrimaryTextarea from "../inputs/PrimaryTextArea"
import PrimaryButton from "../buttons/PrimaryButton"




const LocationForm = () => {
    const { handleSubmit, register, formState: { errors } } = useForm<LocationFormInput>({
        resolver: zodResolver(LocationSchema.form),
        defaultValues: LOCATION_CONSTANTS.form
    });
    const onSubmit = () => {

    }
    return (
        <form className="space-y-2 py-5 w-[30rem]" onSubmit={handleSubmit(onSubmit)}>
            <p className="sub-heading-font">
                Location Installation
            </p>

            <PrimaryInput
                id="name"
                label="Location Name"
                required
                register={register}
                errors={errors}
            />

            <PrimaryInput
                id="lat"
                label="Latitude"
                required
                register={register}
                errors={errors}
            />

            <PrimaryInput
                id="lon"
                label="Longitude"
                required
                register={register}
                errors={errors}
            />

            <PrimaryTextarea
                id="desc"
                label="Description"
                register={register}
                errors={errors}
                className="h-[10rem]"
            />

            <PrimaryButton label="Install" type="submit" />

        </form>
    )
}

export default LocationForm