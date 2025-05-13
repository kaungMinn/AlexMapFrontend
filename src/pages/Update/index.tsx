import LocationForm from '@/components/forms/LocationForm'

const Update = () => {
    return (
        <div className="pt-7 px-4">
            <h1 className="heading-font space-y-2 mb-4 border-b border-gray-300 pb-5">
                <p>Update</p>
                <p className="secondary-font">Where you update location nodes.</p>
            </h1>

            <div className="">
                <LocationForm />
            </div>

        </div>
    )
}

export default Update