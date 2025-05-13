import { useAppDispatch, useAppSelector } from "@/hooks/reduxProvider"
import { Marker, Tooltip } from "react-leaflet";
import L from 'leaflet';
import { Plane } from "./Pin"
import { getALlLocations, updateLocation } from "@/store/actions/locationAction"
import { LocationDetails } from "@/types/_locationTypes";

const DragableMarker = ({ location }: { location: LocationDetails }) => {
    const dispatch = useAppDispatch();
    const handleDragEnd = async (e: L.DragEndEvent) => {
        const marker = e.target;
        const newPosition = marker.getLatLng();
        await dispatch(updateLocation({ ...location, lat: newPosition.lat, lon: newPosition.lng }));
        await dispatch(getALlLocations())
    }


    return <Marker key={location._id} position={[Number(location.lat), Number(location.lon)]} icon={Plane} draggable={true} eventHandlers={{ dragend: handleDragEnd }} >
        <Tooltip>
            <p className="text-default bg-primary p-2 rounded-md inline-block me-4">{location.displayName}</p>
            {location.lat}-{location.lon}
        </Tooltip>
    </Marker>
}

const DragMarkers = () => {
    const { data: { allLocations } } = useAppSelector(state => state.location);
    return (
        <>
            {
                allLocations.length > 0 && allLocations.map(location => <DragableMarker key={location._id} location={location} />)
            }
        </>
    )
}

export default DragMarkers