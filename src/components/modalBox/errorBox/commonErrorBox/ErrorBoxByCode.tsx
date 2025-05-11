import React from "react";
import { ErrorBoxLayoutPropsType, ErrorResponsePropsType } from "./_type";
import { FaGripfire } from "react-icons/fa";
import Box from "../../Box";
import { useAppDispatch } from "@/hooks/reduxProvider";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { resetError } from "@/store/slices/errorSlice";
import { handleLogout } from "@/utils/logoutHelper";
import { GrHostMaintenance } from 'react-icons/gr'
import { TbLockCancel } from "react-icons/tb";
import { HiOutlineX } from "react-icons/hi";

export const ErrorBoxLayout: React.FC<ErrorBoxLayoutPropsType> = (props) => {

    return (
        <div className="bg-default px-2 py-2 ">
            <div className="flex flex-col items-center justify-center ">
                <div>
                    {props.icon}
                </div>

                <p className="text-danger px-2 py-1 sub-heading-font">{props.title}</p>

                <p className="caption-font text-default_dark">{props.bodyText}</p>
            </div>
        </div>
    )

}

const UnauthenticatedBox: React.FC<ErrorResponsePropsType> = (err) => {
    return (
        <Box open={err.isError}>
            <ErrorBoxLayout icon={<FaGripfire size={40} className="text-danger hover:rotate-45 duration-300" />} title="Permission denied!" bodyText={err.errorMessage} />


            <div>
                <div>
                    <PrimaryButton label="Logout" handleClickOn={() => handleLogout()} />
                </div>
            </div>
        </Box>
    )

}

const GatewayTimeoutBox: React.FC<ErrorResponsePropsType> = (err) => {
    return (
        <Box open={err.isError}>
            <ErrorBoxLayout
                icon={<GrHostMaintenance className="h-10 w-10 text-danger" />}
                title="Already Existed!"
                bodyText="Sorry, our server is currently offline. We're working on it. Please try again later!"
            />
            <div className="flex justify-center">
                <div className="h-auto w-1/2">
                    <PrimaryButton
                        label="Logout"
                        /**
                         * action
                         */
                        handleClickOn={() => handleLogout()}
                    />
                </div>
            </div>
        </Box>
    );
};

const PermissionDeniedBox: React.FC<ErrorResponsePropsType> = (err) => {
    return (
        <Box open={err.isError}>
            <ErrorBoxLayout
                icon={<TbLockCancel className="h-10 w-10 text-warning" />}
                title="Permission Denied!"
                bodyText={err.errorMessage}
            />
            <div className="flex justify-center">
                <div className="h-auto w-1/2">
                    <PrimaryButton
                        label="Try again"
                        /**
                         * action
                         */
                        handleClickOn={() => handleLogout()}
                    // handleClickOn={() => dispatch(resetError())}
                    />
                </div>
            </div>
        </Box>
    );
};

const NotFoundBox: React.FC<ErrorResponsePropsType> = (err) => {
    const dispatch = useAppDispatch();
    return (
        <Box open={err.isError}>
            <ErrorBoxLayout
                icon={<HiOutlineX className="h-10 w-10 text-warning" />}
                title="Permission Denied!"
                bodyText={err.errorMessage}
            />
            <div className="flex justify-center">
                <div className="h-auto w-1/2">
                    <PrimaryButton
                        label="Try again"
                        /**
                         * action
                         */
                        handleClickOn={() => dispatch(resetError())}
                    />
                </div>
            </div>
        </Box>
    );
};


const AlreadyExistBox: React.FC<ErrorResponsePropsType> = (err) => {
    const dispatch = useAppDispatch();

    return (
        <Box open={err.isError}>
            <ErrorBoxLayout
                icon={<HiOutlineX className="h-10 w-10 text-warning" />}
                title="Already Exist!"
                bodyText={err.errorMessage}
            />
            <div className="flex justify-center">
                <div className="h-auto w-1/2">
                    <PrimaryButton
                        label="Try again"
                        /**
                         * action
                         */
                        handleClickOn={() => dispatch(resetError())}
                    />
                </div>
            </div>
        </Box>
    );
};


const CommonBox: React.FC<ErrorResponsePropsType> = (err) => {
    const dispatch = useAppDispatch();

    return (
        <Box open={err.isError}>
            <ErrorBoxLayout
                icon={
                    <FaGripfire />
                }

                title={"Error"}
                bodyText="Something went wrong"
            />

            <div>
                <div>
                    <PrimaryButton label="Try again" handleClickOn={() => dispatch(resetError())} />
                </div>
            </div>
        </Box>
    )
}


export {
    CommonBox,
    UnauthenticatedBox,
    GatewayTimeoutBox,
    PermissionDeniedBox,
    NotFoundBox,
    AlreadyExistBox
}