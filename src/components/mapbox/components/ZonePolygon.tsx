import { Polygon } from 'react-leaflet';
import { CoordinatesRsDto } from '../../../services/coordinate';

interface ZonePolygonProps {
  points: CoordinatesRsDto[];
}

export const ZonePolygon: React.FC<ZonePolygonProps> = ({ points }) => {
  if (!points || points.length < 3) return null;

  // Преобразование точек в формат Leaflet
  const path: [number, number][] = points
    .sort((a, b) => a.coords_order - b.coords_order)
    .map((point) => [point.coords_coord_x, point.coords_coord_y]);

  return (
    <Polygon
      positions={path}
      pathOptions={{ fillOpacity: 0.2, color: 'darkblue' }}
    />
  );
};
