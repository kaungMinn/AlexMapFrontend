import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import { HandleMapState, MapState } from "../hook";
import { useNavigate } from "react-router-dom";
import { INSTALLATION } from "@/constants/routePaths";
import { useState } from "react";
import { TryAgainBox } from "@/components/modalBox/errorBox/commonErrorBox/ErrorBoxByCode";


type Props = {
    mapState: MapState;
    handleMapState: HandleMapState
}

const ControlPanel = ({ mapState, handleMapState }: Props) => {
    const [isAsking, setIsAsking] = useState(false);
    const navigate = useNavigate()

    const handleInstallLocation = () => {
        if (mapState.location.length > 0 && mapState.action === 'installLocation') {
            console.log(mapState)
            navigate(INSTALLATION, { state: { mode: "Installation", position: mapState.location } });
        } else {
            setIsAsking(true)
        }
    }


    return (
        <>
            <div className={`bg-default p-5 absolute bottom-10 z-[400] right-1/2 translate-x-1/2 desktop:right-20 desktop:translate-x-0 rounded-md shadow-xl  space-y-2 w-[20rem] h-[10rem] ${mapState.action !== 'idle' ? "shadow-primary_dark" : "shadow-gray-300"}`}>
                <h4 className="body-font text-center mb-4">Control Pannel</h4>
                {
                    mapState.action === "idle" &&
                    <>
                        <PrimaryButton label="Install Location" handleClickOn={() => {
                            handleMapState("action", 'installLocation');
                            handleMapState('location', [])
                        }} />
                        <PrimaryButton label="Drag Marker" handleClickOn={() => {
                            handleMapState('action', 'dragMarker')
                        }} />
                    </>
                }

                {
                    mapState.action === "installLocation" && <div className="flex gap-2 pt-10">
                        <PrimaryButton label="Confirm Install" handleClickOn={() => { handleInstallLocation() }} />
                        <SecondaryButton label="Cancel" handleClickOn={() => {
                            handleMapState('action', 'idle')
                        }} />
                    </div>
                }

                {
                    mapState.action === "dragMarker" && <div className=" pt-10">
                        {/* <PrimaryButton label="Save Postions" /> */}
                        <div className="w-40 mx-auto">
                            <SecondaryButton label="Cancel" handleClickOn={() => { handleMapState('action', 'idle') }} /></div>
                    </div>
                }

            </div>

            <TryAgainBox open={isAsking} message="Select a location from map." tryAgain={() => setIsAsking(false)} />
        </>
    )
}

export default ControlPanel