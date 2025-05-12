import { useAppDispatch, useAppSelector } from "@/hooks/reduxProvider"
import { Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import { Pin } from "./Pin"
import { getALlLocations, LocationDetails, updateLocation } from "@/store/actions/locationAction"
import { useState } from "react"
import Loader from "@/icons/animatedIcons/Loader";

const DragableMarker = ({ location }: { location: LocationDetails }) => {
    const dispatch = useAppDispatch();
    const [isDragging, setIsDragging] = useState(false);
    const { isLoading } = useAppSelector(state => state.location);
    const handleDragEnd = async (e: L.DragEndEvent) => {
        const marker = e.target;
        const newPosition = marker.getLatLng();
        await dispatch(updateLocation({ ...location, lat: newPosition.lat, lon: newPosition.lng }));
        await dispatch(getALlLocations())

        setIsDragging(false);
    }
    const handleDragStart = () => {
        setIsDragging(true)
    }

    return <Marker key={location._id} position={[Number(location.lat), Number(location.lon)]} icon={Pin} draggable={true} eventHandlers={{ dragstart: handleDragStart, dragend: handleDragEnd }} >
        <Popup>
            {isLoading && <Loader />}
        </Popup>
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