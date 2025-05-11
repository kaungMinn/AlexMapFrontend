import WorldIcon from "@/icons/animatedIcons/WorldIcon"
import { Outlet } from "react-router-dom"

const AuthLayout = () => {
    return (
        <div className="bg-gradient-to-tr from-primary via-primary_dark to-primary_light h-screen p-10 flex items-center justify-center">
            <div className=" w-[30rem] rounded-xl p-10  bg-white">
                <div className="w-[13rem] mx-auto">
                    <WorldIcon />
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout