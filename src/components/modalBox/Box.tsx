import React, { ReactNode } from "react";

// icons
import { RxCross2 } from "react-icons/rx";

interface PrimaryModalBoxType {
    children: ReactNode;
    open: boolean;
    titleLabel?: string;

    onCloseModal?: () => void;
}

const Box: React.FC<PrimaryModalBoxType> = ({
    children,
    open,
    titleLabel,

    onCloseModal,
}) => {

    return (
        <div
            className={`fixed inset-0 z-[999999]  ${open ? "" : "pointer-events-none"}`}
        >
            {/* BackDrop */}
            <div
                className={`fixed inset-0 ${open ? "bg-black/20 backdrop-blur-sm" : "pointer-events-none"
                    }`}
            />
            {/* content */}
            <div
                className={`bg-default fixed left-[50%] top-[50%] z-10 h-auto max-h-[90%] max-w-[90%] translate-x-[-50%] translate-y-[-50%] space-y-4 rounded-lg  px-5 py-4 shadow-md ${open
                    ? "scale-100 overflow-y-auto opacity-100"
                    : "pointer-events-none scale-0"
                    }  duration-200`}
            >
                <div className="flex items-center justify-between">
                    <p className="body-font font-semibold ">{titleLabel}</p>
                    {onCloseModal && (
                        <RxCross2
                            className="h-auto w-5 text-default_dark duration-200 laptop:cursor-pointer laptop:hover:rotate-90 laptop:hover:text-base_light"
                            /**
                             * action
                             */
                            onClick={onCloseModal}
                        />
                    )}
                </div>
                {children}
            </div>
        </div>
    );
};

export default Box;
