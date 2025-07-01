import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Исправление иконок (по умолчанию они могут не загружаться)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface MapBoxProps {
  lat: number;
  lng: number;
  zoom?: number;
}

export const MapBox: React.FC<MapBoxProps> = ({ lat, lng, zoom = 13 }) => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        scrollWheelZoom={ true }
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <Marker position={[lat, lng]}>
          <Popup>Это точка на карте.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

