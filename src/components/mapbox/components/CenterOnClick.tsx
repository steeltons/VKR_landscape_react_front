import { useMap } from 'react-leaflet';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { MarkerProps } from '../MapBox';
import { getRelatedObjectsByCoord, RelatedObjectsRsDto } from '../../../services/territory';
import { point } from 'leaflet';
import { useSnackbar } from 'notistack';

interface CenterOnClickPoint {
  lat: number;
  lng: number;
}

interface CenterOnClickProps extends CenterOnClickPoint {
    setMarkerProps: Dispatch<SetStateAction<MarkerProps>>;
    setCurrentRelatedObject: Dispatch<SetStateAction<RelatedObjectsRsDto | null>>;
}

export const CenterOnClick: React.FC<CenterOnClickProps> = ({ lat, lng, setMarkerProps, setCurrentRelatedObject } : CenterOnClickProps, ) => {
  const map = useMap();

  const getRelatedObjects = async ({lat, lng} : CenterOnClickPoint) => {
    try {
        const result : RelatedObjectsRsDto = await getRelatedObjectsByCoord(lat, lng);
        setCurrentRelatedObject(result);
    } catch (exception : any) {
      setCurrentRelatedObject(null);
    }
}

  useEffect(() => {
    const handleClick = (e: L.LeafletMouseEvent) => {
      const point = e.latlng as CenterOnClickPoint;
      setMarkerProps({ lat: point.lat, lng: point.lng });
      getRelatedObjects(point);
    };

    map.on('click', handleClick);

    return () => {
      map.off('click', handleClick);
    };
  }, [map]);

  return null;
};
