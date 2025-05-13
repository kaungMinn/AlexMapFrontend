
import L from 'leaflet';
export const Pin = L.divIcon({
        html: '<div style="font-size:40px">📍</div>',
        className: 'custom-div-icon',
        iconSize: [24, 24]
    });
    
export const Plane =  L.divIcon({
    html: '<div style="font-size:40px">✈️</div>',
    className: 'custom-div-icon',
    iconSize: [24, 24]
});