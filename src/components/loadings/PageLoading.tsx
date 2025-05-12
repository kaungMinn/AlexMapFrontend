import Loader from "@/icons/animatedIcons/Loader"

const PageLoading = () => {
    return (
        <div className='fixed inset-0 z-[999999] pointer-events-none'>
            {/* BackDrop */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-sm
                    }`}
            />
            <div className="flex justify-center items-center w-full h-full">
                <div className="w-[20rem]">
                    <Loader />
                </div>
            </div>
        </div>
    )
}

export default PageLoading