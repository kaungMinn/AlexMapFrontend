import { MapContainer, Marker, TileLayer, useMapEvents, ZoomControl } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from 'leaflet';
import { useEffect, useState } from "react";
import ControlPanel from "./components/ControlPanel";
import { Hook } from "./hook";
import Markers from "./components/Markers";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxProvider";
import { getALlLocations } from "@/store/actions/locationAction";
import DragMarkers from "./components/DragMarkers";
import PageLoading from "@/components/loadings/PageLoading";
import { Pin } from "./components/Pin";
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapClickHandler: React.FC<{
    onMapClick: (latlng: L.LatLng) => void;
}> = ({ onMapClick }) => {
    useMapEvents({
        click(e) {
            onMapClick(e.latlng);
        },
    });
    return null;
};


const Map = () => {

    const [mapState, handleMapState] = Hook();
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector(state => state.location);


    const [position] = useState<LatLngExpression>([16.8409, 96.1735])



    const handleMapClick = (latlng: L.LatLng) => {
        if (mapState.action === "installLocation") {
            //Purposely doing this for multi nodes in the future XD
            const tmpLocation: LatLngExpression[] = [];
            tmpLocation.push([latlng.lat, latlng.lng]);
            console.log("tmpLoc", tmpLocation)
            handleMapState('location', tmpLocation);
        }
    };



    useEffect(() => {
        dispatch(getALlLocations());
    }, [dispatch])


    return (
        <div className={` rounded-md relative p-2 mt-2 ${mapState.action !== "idle" && ' bg-primary_dark'}`}>
            <MapContainer center={position} zoom={16} scrollWheelZoom={false} className={`h-[96vh] rounded-lg`} preferCanvas={true} zoomControl={false} >

                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    detectRetina={true}
                />
                <MapClickHandler onMapClick={handleMapClick} />

                {
                    mapState.action === 'idle' && <Markers />
                }

                {
                    mapState.action === 'dragMarker' && <DragMarkers />
                }

                {
                    mapState.location.length > 0 && mapState.action === "installLocation" && mapState.location.map((position, index) => <Marker position={position} key={index} icon={Pin}></Marker>)
                }


                <ZoomControl position="bottomright" />

            </MapContainer>
            <ControlPanel mapState={mapState} handleMapState={handleMapState} />
            {isLoading && <PageLoading />}
        </div >
    )
}

export default Map