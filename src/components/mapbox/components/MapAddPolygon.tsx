import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Polyline, Polygon, useMapEvent } from 'react-leaflet';
import { Box, IconButton, Paper, Collapse } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import PaletteIcon from '@mui/icons-material/Palette';
import DeleteIcon from '@mui/icons-material/Delete';
import { SketchPicker } from 'react-color';
import L from 'leaflet';
import DrawMapPoint from './DrawMapPoint';
import { CustomColor } from '../../../common/models';
import { createColoredTerritory } from '../../../services/territory';
import { insertNewCoordinate } from '../../../services/coordinate';
import { useSnackbar } from 'notistack';
import { useJwtPayload } from '../../../hooks/usejwtPayload';

export type MarkerProps = {
  lat: number;
  lng: number;
};

function truncateNumber(incomeNumber: number) : number {
    const outcome = Math.trunc(incomeNumber * 100_000) / 100_000;
    return outcome;
}

export type MapAddPolygonProps = {
  mode: string;
  setMode: Dispatch<SetStateAction<'idle' | 'adding'>>;
};

const MapAddPolygon: React.FC<MapAddPolygonProps> = ({ mode, setMode }) => {
  const [drawnPoints, setDrawnPoints] = useState<MarkerProps[]>([]);
  const [color, setColor] = useState<string>('#3388ff');
  const [openControls, setOpenControls] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const payload = useJwtPayload();

  useMapEvent('click', (e) => {
    if (mode === 'adding') {
      setDrawnPoints((prev) => [...prev, { lat: e.latlng.lat, lng: e.latlng.lng }]);
    }
  });

  const handleSave = () => {
    const cleanedHex = color.slice(1);
    const territorieColor: CustomColor = {
      red: parseInt(cleanedHex.substring(0, 2), 16),
      greeen: parseInt(cleanedHex.substring(2, 4), 16),
      blue: parseInt(cleanedHex.substring(4, 6), 16),
    };

    const fetchData = async () => {
      try {
        const territorieId = await createColoredTerritory(territorieColor);
        drawnPoints.forEach((point, index) =>
          insertNewCoordinate({ coord_x: truncateNumber(point.lat), coord_y: truncateNumber(point.lng), territorie_id: territorieId, order: index }),
        );
        setDrawnPoints([]);
        enqueueSnackbar('Территория была успешно создана', { variant: 'success' });
        setMode('idle');
      } catch (error: any) {
        enqueueSnackbar('Что-то пошло не так', { variant: 'error' });
      }
    };
    fetchData();
  };

  useEffect(() => {
    if (containerRef.current) {
      L.DomEvent.disableClickPropagation(containerRef.current);
      L.DomEvent.disableScrollPropagation(containerRef.current);
    }
    if (pickerRef.current) {
        L.DomEvent.disableClickPropagation(pickerRef.current);
        L.DomEvent.disableScrollPropagation(pickerRef.current);
    }
  }, []);

  const toggleControls = () => setOpenControls((prev) => !prev);
  const linePositions = drawnPoints.map((p) => [p.lat, p.lng] as [number, number]);

  const handleRemovePoint = (pointIndex: number) => {
    setDrawnPoints((prev) => prev.filter((_, index) => index !== pointIndex));
  };

  const handleClearAllPoints = () => {
    setDrawnPoints([]);
  };

  return (
    <>
      {drawnPoints.length >= 2 &&
        (drawnPoints.length >= 3 ? (
          <Polygon positions={linePositions} pathOptions={{ color, fillOpacity: 0.3 }} />
        ) : (
          <Polyline positions={linePositions} pathOptions={{ color }} />
        ))}

      {drawnPoints.map((point, index) => (
        <DrawMapPoint key={`${point.lat}-${point.lng}-${index}`} lat={point.lat} lng={point.lng} onClick={() => handleRemovePoint(index)} />
      ))}

      <Box
        sx={{
          position: 'absolute',
          bottom: openControls ? 20 : -60,
          right: 0,
          top: 0,
          bgcolor: 'transparent',
          zIndex: 1500,
          transition: 'bottom 0.3s',
        }}
      >
        {payload?.is_admin && (
          <Paper elevation={4} sx={{ display: 'flex', alignItems: 'center', p: 1, background: 'white' }} ref={containerRef}>
            <IconButton onClick={toggleControls} size="small">
              {openControls ? <AddIcon /> : <PaletteIcon />}
            </IconButton>
            <Collapse in={openControls} orientation="horizontal">
              <IconButton onClick={() => setMode(mode === 'adding' ? 'idle' : 'adding')} color={mode === 'adding' ? 'secondary' : 'default'}>
                <AddIcon />
              </IconButton>
              <IconButton onClick={handleSave} disabled={drawnPoints.length < 2} color="primary">
                <SaveIcon />
              </IconButton>
              <IconButton onClick={handleClearAllPoints} disabled={drawnPoints.length === 0} color="error">
                <DeleteIcon />
              </IconButton>
              <div ref={pickerRef}>
                <SketchPicker 
                    color={color} 
                    onChangeComplete={(c) => setColor(c.hex)} 
                    disableAlpha 
                />
              </div>
            </Collapse>
          </Paper>
        )}
      </Box>
    </>
  );
};

export default MapAddPolygon;
