import React from "react";
import { BsCheck2All } from "react-icons/bs";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import Box from "./Box";

interface SuccessBoxPropType {
    isOpen: boolean;
    titleLabel?: string;
    bodyText: string;
    btnLabel?: string;
    navigationLabel?: string;
    /**
     * action
     */
    clickOn?: () => void;
    navigation?: () => void;
    isCreate?: boolean;
}

const SuccessBox: React.FC<SuccessBoxPropType> = ({
    isOpen,
    titleLabel,
    bodyText,
    btnLabel,
    navigationLabel,
    /**
     * action
     */
    clickOn,
    navigation,
    isCreate,
}) => {
    return (
        <Box open={isOpen}>
            <div className="h-auto w-[14rem] space-y-5 tablet:w-[25rem]">
                <div className="flex justify-center">
                    <div className="group flex h-16 w-16 items-center justify-center rounded-full border bg-default_light shadow-lg shadow-primary_light">
                        <BsCheck2All className="mx-auto h-auto w-7 text-success" />
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="sub-heading-font text-center font-medium ">
                        {titleLabel}
                    </p>
                    <p className="body-font text-center ">{bodyText}</p>
                </div>
                {isCreate && (
                    <div className="flex justify-center gap-5">
                        <div className="h-auto w-36">
                            <PrimaryButton
                                label={navigationLabel || "List"}
                                /**
                                 * action
                                 */
                                handleClickOn={navigation}
                            />
                        </div>
                        <div className="h-auto w-36">
                            <SecondaryButton
                                label={btnLabel || "Close"}
                                /**
                                 * action
                                 */
                                handleClickOn={clickOn}
                            />
                        </div>
                    </div>
                )}

                {!isCreate && (
                    <div className="flex justify-center gap-5">
                        <div className="h-auto w-36">
                            <PrimaryButton
                                label={btnLabel || "Close"}
                                /**
                                 * action
                                 */
                                handleClickOn={clickOn}
                            />
                        </div>
                    </div>
                )}
            </div>
        </Box>
    );
};

export default SuccessBox;
