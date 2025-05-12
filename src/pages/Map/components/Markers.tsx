import { useAppSelector } from "@/hooks/reduxProvider";
import Loader from "@/icons/animatedIcons/Loader";
import { useEffect } from "react";
import { Img } from "react-image";
import { Marker, Popup, Tooltip, useMap } from "react-leaflet";
import { useLocation } from "react-router-dom";
import MarkerClusterGroup from "react-leaflet-markercluster";

const Markers = () => {
    const location = useLocation();
    const map = useMap();
    const { data: { allLocations } } = useAppSelector(state => state.location)
    useEffect(() => {
        if (map && location.state && location.state.position && Array.isArray(location.state.position) && location.state.position.length > 0) {
            map.setView([location.state.position[0][0], location.state.position[0][1]]);
        }
    }, [location.state, map])
    return (
        <MarkerClusterGroup>
            {
                allLocations.length > 0 && allLocations.map(location => <Marker key={location._id} position={[Number(location.lat), Number(location.lon)]}><Tooltip>{location.name}</Tooltip>
                    <Popup>
                        <b className="heading-font">{location.displayName}</b>

                        {location.image !== "No Image" && <Img src={location.image} className="rounded-lg mt-4 h-[10rem]" alt="No Image" loader={<div className="w-[15rem]"><Loader /></div>} />}

                        <div className="mt-2 bg-gray-200  rounded-md p-2">
                            <p><b>Latitude</b> - {location.lat}</p>
                            <p><b>Longitude</b> - {location.lon}</p>
                            {
                                location.desc && <> <p><b>Description</b></p>
                                    <p>{location.desc}</p></>
                            }
                        </div>

                        <p>Created by - {location.user?.displayName}</p>
                    </Popup>
                </Marker>)
            }
        </MarkerClusterGroup>
    )
}

export default Markers