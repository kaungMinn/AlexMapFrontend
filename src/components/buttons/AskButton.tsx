import { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const AskButton = ({ label = "Edit", confirmLabel = "Ok", confirm }: { label?: string; confirmLabel?: string; confirm: () => void }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {!open && <PrimaryButton label={label} handleClickOn={() => {
                setOpen(true)
            }} />}

            {
                open && <div className="flex gap-2">
                    <SecondaryButton label="Cancel" handleClickOn={() => {
                        setOpen(false)
                    }} />
                    <PrimaryButton label={confirmLabel} handleClickOn={confirm} />
                </div>
            }

        </>
    )
}

export default AskButton