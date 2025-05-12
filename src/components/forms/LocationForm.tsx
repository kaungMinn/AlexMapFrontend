import { LocationSchema } from "@/schemas/locationSchema"
import { LocationFormInput } from "@/types/_locationTypes"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import PrimaryInput from "../inputs/PrimaryInput"
import { LOCATION_CONSTANTS } from "@/constants/locationConstants"
import PrimaryTextarea from "../inputs/PrimaryTextArea"
import PrimaryButton from "../buttons/PrimaryButton"
import ImageInput from "../inputs/ImageInput"
import { FileWithPath } from "react-dropzone"
import { useLocation, useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxProvider"
import PageLoading from "../loadings/PageLoading"
import AskBox from "../modalBox/askBox"
import { resetLocation } from "@/store/slices/locationSlice"
import { MAP_ROUTE } from "@/constants/routePaths"
import { getLocation, installLocation, updateLocation } from "@/store/actions/locationAction"

const LocationForm = () => {
    const { handleSubmit, register, setValue, formState: { errors } } = useForm<LocationFormInput>({
        resolver: zodResolver(LocationSchema.form),
        defaultValues: LOCATION_CONSTANTS.form
    });
    const [file, setFile] = useState<FileWithPath | null>(null);
    const [initialImage, setInitalImage] = useState<string>('')
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { isLoading, isSuccess, data } = useAppSelector(state => state.location)

    const onSubmit = (value: LocationFormInput) => {
        if (location.state && location.state.nodeId) {
            dispatch(updateLocation({ ...value, _id: location.state.nodeId, image: file || initialImage }))
        } else {
            dispatch(installLocation({ ...value, image: file || '' }));
        }
    }

    const handleFileChange = (file: FileWithPath | null) => {

        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            setFile(file)
        } else {
            setFile(null)
        }
    };

    const backToMap = useCallback(() => {
        const position = []

        if (data.locationDetails.lat && data.locationDetails.lon) {
            position.push([data.locationDetails.lat, data.locationDetails.lon])
        }

        navigate(MAP_ROUTE, { state: { position } });
        dispatch(resetLocation());

    }
        , [data.locationDetails, navigate, dispatch]);

    useEffect(() => {
        if (location.state) {
            if (location.state.position && Array.isArray(location.state.position) && location.state.position.length > 0) {
                const { position } = location.state;
                setValue('lat', position[0][0]);
                setValue('lon', position[0][1]);
            }

            if (location.state.nodeId) {
                dispatch(getLocation(location.state.nodeId))
            }

        }
    }, [location.state, setValue, dispatch]);

    useEffect(() => {
        if (location.state && location.state.nodeId) {
            setValue('name', data.location.name);
            setValue('desc', data.location.desc);
            setValue('displayName', data.location.displayName);
            setValue('lat', data.location.lat);
            setValue('lon', data.location.lon);
            setValue('image', data.location.image);
            setInitalImage(data.location.image)
            // setFile(data.location.image)
        }
    }, [data.location, location.state, setValue])



    return (
        <form className="space-y-2 laptop:space-y-0 grid grid-cols-1 laptop:grid-cols-6 gap-x-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="laptop:col-span-4 col-span-6 bg-default rounded-xl p-5 shadow-md shadow-gray-300 laptop:grid laptop:grid-cols-2 laptop:gap-x-6 ">
                <PrimaryInput
                    id="displayName"
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
                <div></div>

                <PrimaryTextarea
                    id="desc"
                    label="Description"
                    register={register}
                    errors={errors}
                    className="h-[10rem] resize-none"
                />
            </div>

            <div className="laptop:col-span-2 col-span-6 h-[27rem] p-5 bg-default rounded-xl shadow-md shadow-gray-300 ">
                <ImageInput
                    initialImageUrl={initialImage}
                    maxSizeMB={4}
                    onFileChange={handleFileChange}
                />
            </div>

            <div className="col-span-6 mt-5 flex justify-end">
                <div className="w-20 mt-2">
                    <PrimaryButton label="Install" type="submit" />
                </div>
            </div>

            {isLoading && <PageLoading />}

            <AskBox
                isOpen={isSuccess && location.state && !location.state.nodeId}
                titleLabel="Success."
                bodyText={data.message}
                btnOkLabel="Install more"
                btnCancelLabel="See on map"
                clickOnOk={() => { dispatch(resetLocation()) }}
                clickOnCancel={() => { backToMap() }}
            />
        </form >
    )
}

export default LocationForm