import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import { HandleMapState, MapState } from "../hook";
import { useNavigate } from "react-router-dom";
import { INSTALLATION } from "@/constants/routePaths";


type Props = {
    mapState: MapState;
    handleMapState: HandleMapState
}

const ControlPanel = ({ mapState, handleMapState }: Props) => {
    const navigate = useNavigate()

    return (
        <div className="bg-default p-5 absolute bottom-10 z-[400] right-20 rounded-md shadow-lg shadow-gray-300 space-y-2 w-[20rem] h-[10rem]">
            <h4 className="body-font text-center mb-4">Control Pannel</h4>
            {
                mapState.action === "idle" &&
                <>
                    <PrimaryButton label="Install Location" handleClickOn={() => {
                        handleMapState("action", 'installLocation')
                    }} />
                    <PrimaryButton label="Drag Marker" handleClickOn={() => {
                        handleMapState('action', 'dragMarker')
                    }} />
                </>
            }

            {
                mapState.action === "installLocation" && <div className="flex gap-2 pt-10">
                    <PrimaryButton label="Confirm Install" handleClickOn={() => navigate(INSTALLATION)} />
                    <SecondaryButton label="Cancel" handleClickOn={() => {
                        handleMapState('action', 'installLocation')
                    }} />
                </div>
            }

            {
                mapState.action === "dragMarker" && <div className="flex gap-2 pt-10">
                    <PrimaryButton label="Save Postions" />
                    <SecondaryButton label="Cancel" handleClickOn={() => {
                        handleMapState('action', 'dragMarker')
                    }} />
                </div>
            }

        </div>
    )
}

export default ControlPanel