import { MapContainer, GeoJSON, TileLayer, Marker, Popup } from "react-leaflet";

// error loading markers
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';

export default function CustomMap({ center, height, zoom, scrollWheel, geoJsonData, marker }) {

    if (center == undefined) {
        return <><h1>Error loading Map - invalid center</h1></>
    }

    if (height == undefined) {
        return <><h1>Error loading Map - invalid height</h1></>
    }

    return (<MapContainer style={{ height: height }} className="h-96 sm:h-screen" center={center} zoom={zoom || 12} scrollWheelZoom={scrollWheel || true}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoJsonData && <GeoJSON data={geoJsonData} />}
        {marker && (<>
            <Marker position={marker.position}>
                <Popup>{marker.popUpText}</Popup>
            </Marker>
        </>)}
    </MapContainer>)
}