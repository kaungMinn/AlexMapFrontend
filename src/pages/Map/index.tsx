import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from 'leaflet';
import { useState } from "react";
import { DEFAULT_BUTTON_CONTROLL } from "./constants";
import { BtnKeyTypes } from "./types";
import ControlPanel from "./components/ControlPanel";
import { Hook } from "./hook";

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
        const tmp_pst = [...pst];
        tmp_pst.push([latlng.lat, latlng.lng]);
        // setPst(tmp_pst)
        // console.log('Clicked at:', latlng.lat, latlng.lng);
    };

    const handleDragEnd = (e: L.DragEndEvent) => {
        const marker = e.target;
        const newPosition = marker.getLatLng();
        setPosition(newPosition);
        setIsDragging(false);
        console.log('Marker dragged to:', newPosition.lat, newPosition.lng);
    };

    console.log("pst", pst)




    const handleDragStart = () => {
        setIsDragging(true);
    };

    return (
        <div className={` rounded-md relative p-2 mt-2 ${buttonControl.installation && ' bg-primary_dark'}`}>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} className={`h-[96vh] rounded-lg`} preferCanvas={true} >

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
                    pst.length > 0 && pst.map((position, index) => <Marker position={position} key={index}>
                        <Popup>
                            <b>New</b>
                        </Popup>
                    </Marker>)
                }

            </MapContainer>

            <ControlPanel mapState={mapState} handleMapState={handleMapState} />


        </div >
    )
}

export default Map