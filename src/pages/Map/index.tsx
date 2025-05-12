import { MapContainer, Marker, Popup, TileLayer, useMapEvents, ZoomControl } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from 'leaflet';
import { useEffect, useState } from "react";
import { DEFAULT_BUTTON_CONTROLL } from "./constants";
import { BtnKeyTypes } from "./types";
import ControlPanel from "./components/ControlPanel";
import { Hook } from "./hook";
import Markers from "./components/Markers";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxProvider";
import { getALlLocations } from "@/store/actions/locationAction";
import Loader from "@/icons/animatedIcons/Loader";
import { Img } from 'react-image';
import DragMarkers from "./components/DragMarkers";
import PageLoading from "@/components/loadings/PageLoading";
import { Pin } from "./components/Pin";

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
    const [buttonControl, setButtonControl] = useState<BtnKeyTypes>(DEFAULT_BUTTON_CONTROLL);
    const dispatch = useAppDispatch();
    const { data, isLoading } = useAppSelector(state => state.location);

    console.log(data.allLocations)

    const buttonController = (key: keyof BtnKeyTypes, value: boolean) => {
        const tmpBtnControl = { ...buttonControl };
        const btnKeys = Object.keys(tmpBtnControl);
        btnKeys.map((btnKey) => {
            if (key === btnKey) {
                tmpBtnControl[key as keyof BtnKeyTypes] = value;
            } else {
                tmpBtnControl[btnKey as keyof BtnKeyTypes] = false;
            }
        });
        setButtonControl(tmpBtnControl);
    }

    const [pst, setPst] = useState<LatLngExpression[]>([]);
    const [position, setPosition] = useState<LatLngExpression>([16.8409, 96.1735])
    const [isDragging, setIsDragging] = useState(false);


    const handleMapClick = (latlng: L.LatLng) => {
        if (mapState.action === "installLocation") {
            //Purposely doing this for multi nodes in the future XD
            const tmpLocation: LatLngExpression[] = [];
            tmpLocation.push([latlng.lat, latlng.lng]);
            console.log("tmpLoc", tmpLocation)
            handleMapState('location', tmpLocation);
        }
    };

    const handleDragEnd = (e: L.DragEndEvent) => {
        const marker = e.target;
        const newPosition = marker.getLatLng();
        setPosition(newPosition);
        setIsDragging(false);
        console.log('Marker dragged to:', newPosition.lat, newPosition.lng);
    };

    const handleDragStart = () => {
        setIsDragging(true);
    };



    useEffect(() => {
        dispatch(getALlLocations());
    }, [dispatch])


    return (
        <div className={` rounded-md relative p-2 mt-2 ${mapState.action !== "idle" && ' bg-primary_dark'}`}>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} className={`h-[96vh] rounded-lg`} preferCanvas={true} zoomControl={false} >

                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    detectRetina={true}
                />
                <MapClickHandler onMapClick={handleMapClick} />
                <Marker position={position} draggable={true}
                    eventHandlers={{
                        dragstart: handleDragStart,
                        dragend: handleDragEnd,
                    }}>
                    <Popup>
                        {
                            isDragging ? (
                                'Dragging..,'
                            ) : (
                                <>
                                    <b>Yangon, Myanmar</b><br />
                                    Former capital city</>
                            )
                        }
                    </Popup>
                </Marker>

                {
                    data.allLocations.length > 0 && mapState.action === "idle" && data.allLocations.map(location => <Marker key={location._id} position={[Number(location.lat), Number(location.lon)]}>
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

                {
                    mapState.action === 'dragMarker' && <DragMarkers />
                }

                {
                    pst.length > 0 && pst.map((position, index) => <Marker position={position} key={index}>
                        <Popup>
                            <b>New</b>
                        </Popup>
                    </Marker>)
                }

                {
                    mapState.location.length > 0 && mapState.action === "installLocation" && mapState.location.map((position, index) => <Marker position={position} key={index} icon={Pin}></Marker>)
                }
                <Markers />

                <div className="bg-red-500">
                    <ZoomControl position="bottomright" />

                </div>
            </MapContainer>
            <ControlPanel mapState={mapState} handleMapState={handleMapState} />
            {isLoading && <PageLoading />}






        </div >
    )
}

export default Map