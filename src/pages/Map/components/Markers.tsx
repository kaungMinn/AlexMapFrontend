import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useLocation } from "react-router-dom"

const Markers = () => {
    const location = useLocation();
    const map = useMap();
    useEffect(() => {
        if (map && location.state && location.state.position && Array.isArray(location.state.position) && location.state.position.length > 0) {
            map.setView([location.state.position[0][0], location.state.position[0][1]]);
        }
    }, [location.state, map])
    return (
        <div>Markers</div>
    )
}

export default Markers