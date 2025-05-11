import React from "react";

// icons
import { RxDragHandleDots1 } from "react-icons/rx";

// components
import Box from "../Box";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";

interface AskBoxPropType {
    isOpen: boolean;
    titleLabel: string;
    bodyText: string;
    btnCancelLabel?: string;
    btnOkLabel: string;
    /**
     * action
     */
    clickOnOk?: () => void;
    clickOnCancel?: () => void;
}

const AskBox: React.FC<AskBoxPropType> = ({
    isOpen,
    titleLabel,
    bodyText,
    btnCancelLabel = "Cancel",
    btnOkLabel,
    /**
     * action
     */
    clickOnOk,
    clickOnCancel,
}) => {
    return (
        <React.Fragment>
            <Box open={isOpen} titleLabel="">
                <div className="space-y-6">
                    {/* <RxCross1 className="mx-auto h-auto w-14 text-danger" /> */}
                    <RxDragHandleDots1 className="mx-auto h-auto w-14 text-danger" />
                    <div className="space-y-2">
                        <p className="sub-heading-font text-center font-semibold text-base_light">
                            {titleLabel}
                        </p>
                        <p className="body-font text-center text-slate-400">{bodyText}</p>
                    </div>
                    <div className="flex h-auto w-full justify-center space-x-3">
                        <div className="h-auto w-40">
                            <SecondaryButton
                                label={btnCancelLabel}
                                /**
                                 * action
                                 */
                                handleClickOn={clickOnCancel}
                            />
                        </div>
                        <div className="h-auto w-40">
                            <PrimaryButton
                                label={btnOkLabel}
                                /**
                                 * action
                                 */
                                handleClickOn={clickOnOk}
                            />
                        </div>
                    </div>
                </div>
            </Box>
        </React.Fragment>
    );
};

export default AskBox;
