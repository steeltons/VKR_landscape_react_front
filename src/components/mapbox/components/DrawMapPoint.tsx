import { Marker } from "react-leaflet";

export type MarkerPointProps = {
  lat: number;
  lng: number;
  onClick?: () => void;
};

const DrawMapPoint: React.FC<MarkerPointProps> = ({ lat, lng, onClick }) => {
  return (
    <Marker
      position={[lat, lng]}
      eventHandlers={{click: () => onClick ? onClick() : () => {}}}
    />
  );
};

export default DrawMapPoint;
