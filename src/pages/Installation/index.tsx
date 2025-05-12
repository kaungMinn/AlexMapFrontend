import LocationForm from "@/components/forms/LocationForm"

const Installation = () => {
    return (
        <div className="pt-7 px-4">
            <h1 className="heading-font space-y-2 mb-4 border-b border-gray-300 pb-5">
                <p>Node</p>
                <p className="secondary-font">Installation</p>
            </h1>

            <div className="">
                <LocationForm />
            </div>

        </div>
    )
}

export default Installation