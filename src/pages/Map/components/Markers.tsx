import { useAppSelector } from "@/hooks/reduxProvider";
import Loader from "@/icons/animatedIcons/Loader";
import { useCallback, useEffect } from "react";
import { Img } from "react-image";
import { Marker, Popup, Tooltip, useMap } from "react-leaflet";
import { useLocation } from "react-router-dom";
import MarkerClusterGroup from "react-leaflet-markercluster";

import { LocationDetails } from "@/types/_locationTypes";
import { Pin } from "./Pin";

const PopupBody = ({ nodeLocation }: { nodeLocation: LocationDetails }) => {
    return <>
        <b className="heading-font">{nodeLocation.displayName}</b>
        {nodeLocation.image !== "No Image" && <Img src={nodeLocation.image} className="rounded-lg mt-4 h-[10rem]" alt="No Image" loader={<div className="w-[15rem]"><Loader /></div>} />}

        <div className="mt-2 bg-gray-200  rounded-md p-2">
            <p><b>Latitude</b> - {nodeLocation.lat}</p>
            <p><b>Longitude</b> - {nodeLocation.lon}</p>
            {
                nodeLocation.desc && <> <p><b>Description</b></p>
                    <p>{nodeLocation.desc}</p></>
            }
        </div>

        <p>Created by - {nodeLocation.user?.displayName}</p></>
}

const PrimaryMarker = ({ nodeLocation }: { nodeLocation: LocationDetails }) => {
    const location = useLocation();
    const selectedNodeChecker = useCallback((lat: string | number, lon: string | number) => {
        if (location.state && Array.isArray(location.state.position) && location.state.position.length > 0) {
            if (location.state.position[0][0] === lat && location.state.position[0][1] === lon) {

                return true;
            } else {
                return false
            }
        }
        return false;
    }, [location.state]);

    return !selectedNodeChecker(nodeLocation.lat, nodeLocation.lon) ? <Marker key={nodeLocation._id} position={[Number(nodeLocation.lat), Number(nodeLocation.lon)]} ><Tooltip>{nodeLocation.name}</Tooltip>
        <Popup>
            <PopupBody nodeLocation={nodeLocation} />
        </Popup>
    </Marker> : <Marker key={nodeLocation._id} position={[Number(nodeLocation.lat), Number(nodeLocation.lon)]} icon={Pin}><Tooltip>{nodeLocation.name}</Tooltip>
        <Popup>
            <div className="bg-primary_light p-3 mb-4 text-center rounded-md secondary-font ">Selected Location</div>

            <PopupBody nodeLocation={nodeLocation} />
        </Popup>
    </Marker>
}

const Markers = () => {
    const location = useLocation();
    const map = useMap();
    const { data: { allLocations } } = useAppSelector(state => state.location);

    useEffect(() => {
        if (map && location.state && location.state.position && Array.isArray(location.state.position) && location.state.position.length > 0) {
            map.setView([location.state.position[0][0], location.state.position[0][1]]);
        }
    }, [location.state, map]);



    return (
        <MarkerClusterGroup>
            {
                allLocations.length > 0 && allLocations.map(nodeLocation => <PrimaryMarker key={nodeLocation._id} nodeLocation={nodeLocation} />)
            }
        </MarkerClusterGroup>
    )
}

export default Markers