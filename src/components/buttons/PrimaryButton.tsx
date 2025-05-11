import React from "react";

import PrimaryLoading from "../loadings/PrimaryLoading";


interface PrimaryButtonPropType {
    label: string;
    type?: "button" | "submit" | "reset" | undefined;
    isLoading?: boolean;
    icon?: React.ReactNode;
    isDisabled?: boolean;
    /**
     * action
     */
    handleClickOn?: React.MouseEventHandler<HTMLButtonElement>;
}

const PrimaryButton: React.FC<PrimaryButtonPropType> = ({
    label,
    type = "button",
    isLoading,
    icon,
    isDisabled,
    /**
     * action
     */
    handleClickOn,
}: PrimaryButtonPropType) => {


    return (
        <>
            <button
                className={`desktop4k:py-2.5 flex h-auto w-full items-center justify-center space-x-2 rounded-md border border-primary  px-4 py-2 text-default duration-300 hover:shadow-md bg-primary hover:shadow-primary_dark `}
                type={type}
                disabled={isLoading || isDisabled}
                /**
                 * action
                 */
                onClick={handleClickOn}
            >
                {isLoading ? (
                    <PrimaryLoading />
                ) : (
                    <>
                        {icon && icon}
                        {label && <p className="secondary-font font-medium ">{label}</p>}
                    </>
                )}
            </button>
        </>
    );
};

export default PrimaryButton;
