import { useMap } from 'react-leaflet';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { MarkerProps } from '../MapBox';
import { getRelatedObjectsByCoord, RelatedObjectsRsDto } from '../../../services/territory';
import { point } from 'leaflet';

interface CenterOnClickPoint {
  lat: number;
  lng: number;
}

interface CenterOnClickProps extends CenterOnClickPoint {
    setMarkerProps: Dispatch<SetStateAction<MarkerProps>>
}

async function getRelatedObjects({lat, lng} : CenterOnClickPoint) {
    try {
        const result : RelatedObjectsRsDto = await getRelatedObjectsByCoord(lat, lng)
        console.log(result.territories[0].grounds)
    } catch (exception : any) {
        console.error(exception)
        throw exception
    }
}

export const CenterOnClick: React.FC<CenterOnClickProps> = ({ lat, lng, setMarkerProps } : CenterOnClickProps, ) => {
  const map = useMap();

  useEffect(() => {
    const handleClick = (e: L.LeafletMouseEvent) => {
        const point = e.latlng as CenterOnClickPoint;
        setMarkerProps({lat: point.lat, lng: point.lng})
        getRelatedObjects(point)
    };

    map.on('click', handleClick);
    return () => {
      map.off('click', handleClick);
    };
  }, [map]);

  return null;
};
