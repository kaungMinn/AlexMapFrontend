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
import { BsFullscreenExit } from "react-icons/bs";


export const ErrorBoxLayout: React.FC<ErrorBoxLayoutPropsType> = (props) => {

    return (
        <div className="bg-default px-2 py-2 w-[35vh] h-auto">
            <div className="space-y-6 ">
                <div>
                    {props.icon}
                </div>

                <div className="space-y-2">
                    <p className="sub-heading-font text-center font-semibold text-base_light">{props.title}</p>

                    <p className="body-font text-center text-slate-400">{props.bodyText}</p>
                </div>
            </div>
        </div>
    )

}

const UnauthenticatedBox: React.FC<ErrorResponsePropsType> = (err) => {
    return (
        <Box open={err.isError}>
            <ErrorBoxLayout icon={<FaGripfire size={40} className="mx-auto h-auto w-14 text-danger" />} title="Permission denied!" bodyText={err.errorMessage} />
            <div className="flex justify-center">
                <div className="h-auto w-1/2">
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
                icon={<GrHostMaintenance className="mx-auto h-auto w-14 text-danger" />}
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
                icon={<TbLockCancel className="mx-auto h-auto w-14 text-danger" />}
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
                icon={<HiOutlineX className="mx-auto h-auto w-14 text-danger" />}
                title="Not Found!"
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
                icon={<BsFullscreenExit className="mx-auto h-auto w-14 text-danger" />}
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
                    <FaGripfire className="mx-auto h-auto w-14 text-danger" />
                }

                title={"Error"}
                bodyText="Something went wrong"
            />

            <div className="flex justify-center">
                <div className="h-auto w-1/2">
                    <PrimaryButton label="Try again" handleClickOn={() => dispatch(resetError())} />
                </div>
            </div>
        </Box>
    )
}


const TryAgainBox: React.FC<{ open: boolean; message: string; tryAgain: () => void; }> = ({ open, message, tryAgain }) => {
    return (
        <Box open={open}>
            <ErrorBoxLayout
                icon={
                    <FaGripfire className="mx-auto h-auto w-14 text-danger" />
                }

                title={message}
                bodyText={"Action needed!"}
            />

            <div className="flex justify-center">
                <div className="h-auto w-1/2">
                    <PrimaryButton label="Try again" handleClickOn={() => tryAgain()} />
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
    AlreadyExistBox,
    TryAgainBox
}