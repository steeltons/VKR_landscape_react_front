import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { CenterOnClick } from './components/CenterOnClick';
import MarkerPoint from './components/MarkerPoint';
import { getCoordinateById, getAllCoords, CoordinatesRsDto } from '../../services/coordinate';
import { ZonePolygon } from './components/ZonePolygon';
import { useSnackbar } from 'notistack';
import { getTerritorieById, RelatedObjectRsDto, RelatedObjectsRsDto } from '../../services/territory';
import { Box, Typography } from '@mui/material';
import MapInfo from './components/MapInfo';

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

export type MarkerProps = {
    lat: number;
    lng: number;
}

function groupPointsByTerritoryId(points : CoordinatesRsDto[]) : Map<number, CoordinatesRsDto[]> {
    return points.reduce((map, point) => {
        const key = point.coords_territorie_id;
        if (!map.has(key)) {
            map.set(key, [])
        }
        map.get(key)!.push(point);
        return map;
    }, new Map<number, CoordinatesRsDto[]>)
}

export const MapBox: React.FC<MapBoxProps> = ({ lat, lng, zoom = 12 }) => {    

    const [markerProps, setMarkerProps] = useState<MarkerProps>({
        lat: lat, 
        lng: lng
    })
    const [responsePoints, setResponsePoints] = useState<Array<CoordinatesRsDto[]>>(new Array());
    const [currentRelatedObject, setCurrentRelatedObject] = useState<RelatedObjectsRsDto | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllCoords()
                const new_points : MarkerProps[] = response.map((object) => {
                    return {lat: object.coords_coord_x, lng: object.coords_coord_y}
                })
                let grouped_points = groupPointsByTerritoryId(response);
                // let territories = grouped_points.keys()
                  // .map((id) => getTerritorieById(id))
                setResponsePoints(Array.from(grouped_points.values()))
            } catch (err : any) {
                console.error(err.response?.data || err.message)
            }
        }
        fetchData()
    }, [markerProps, currentRelatedObject])

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
    <MapContainer
      center={[lat, lng]}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      <MarkerPoint lat={markerProps.lat} lng={markerProps.lng} />
      {responsePoints.map((points, index) => (
        <ZonePolygon key={index} points={points} />
      ))}
      <CenterOnClick lat={lat} lng={lng} setMarkerProps={setMarkerProps} setCurrentRelatedObject={ setCurrentRelatedObject } />
    </MapContainer>

    <MapInfo lat={ markerProps.lat } lng={ markerProps.lng } territories={ currentRelatedObject?.territories || [] }/>
  </Box>
  );
};
