import { Polygon } from 'react-leaflet';
import { CoordinatesRsDto } from '../../../services/coordinate';
import { CustomColor } from '../../../common/models';
import { rgbToHex } from '@mui/material';

interface ZonePolygonProps {
  points: CoordinatesRsDto[];
  color?: CustomColor;
}

const DEFAULT_COLOR: CustomColor = {red: 255, greeen: 255, blue: 255, alt: 1};
const DEFAULT_OPACITY = 0.5;

export const ZonePolygon: React.FC<ZonePolygonProps> = ({ points, color= DEFAULT_COLOR }) => {
  if (!points || points.length < 3) return null;

  const path: [number, number][] = points
    .sort((a, b) => a.coords_order - b.coords_order)
    .map((point) => [point.coords_coord_x, point.coords_coord_y]);

  const hexColor = rgbToHex(`rgb(${color.red},${color.greeen},${color.blue}})`)
  const opacity = color?.alt || DEFAULT_OPACITY;

  return (
    <Polygon
      positions={path}
      pathOptions={{ fillOpacity: opacity, color: hexColor, weight: 1 }}
    />
  );
};
