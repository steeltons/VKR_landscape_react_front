import { Marker, Popup } from "react-leaflet";

export type MarkerPointProps = {
    lat: number;
    lng: number;
}

const MarkerPoint : React.FC<MarkerPointProps> = ({lat, lng} : MarkerPointProps) => {
    return (
        <Marker position={[lat, lng]}>
            <Popup>Это Владивосток</Popup>
        </Marker>
    )
}

export default MarkerPoint;