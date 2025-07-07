import {
  Box, Button, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { SketchPicker, ColorResult } from 'react-color';
import { getAllLandscapes, LandscapeRsDto } from '../../../../services/landscape';
import { uploadImageFile, getImageById } from '../../../../services/images';
import { CreateTerritorieRqDto, getTerritorieById, insertTerritorie, uniteTerritorieLandscape, updateTerritorie, UpdateTerritorieRqDto } from '../../../../services/territory';

type Props = {
  onCancel: () => void;
  id?: number;
  isUpdate: boolean;
  canUserEdit: boolean;
};

const CreateTerritorieForm = ({ onCancel, id, isUpdate, canUserEdit }: Props) => {
  const [formId, setFormId] = useState(id);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [landscapeId, setLandscapeId] = useState<number | null>(null);
  const [landscapes, setLandscapes] = useState<LandscapeRsDto[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [color, setColor] = useState<ColorResult['rgb']>({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const landscapesData = await getAllLandscapes();
        setLandscapes(landscapesData);
      } catch {
        enqueueSnackbar('Не удалось загрузить список ландшафтов', { variant: 'error' });
      }

      if (formId) {
        try {
          const territorie = await getTerritorieById(formId);
          setName(`Территория ${territorie.territorie_id}`);
          setDescription(territorie.territorie_description || '');
          setLandscapeId(territorie.territorie_landscape_id ?? null);
          setColor({
            r: territorie.territorie_color_r,
            g: territorie.territorie_color_g,
            b: territorie.territorie_color_b,
            a: 1,
          });
        } catch {
          enqueueSnackbar('Ошибка при загрузке данных территории', { variant: 'error' });
        }
      }
    };

    fetchData();
  }, []);

  const handleSubmit = () => {
    const upload = async () => {

      const data: any = {
        territorie_description: description,
        territorie_color_r: color.r,
        territorie_color_g: color.g,
        territorie_color_b: color.b,
        
      };

      try {
        if (landscapeId === null && id) {
            await uniteTerritorieLandscape(id);
        }
        if (isUpdate) {
          const updateDto: UpdateTerritorieRqDto = {
            territorie_id: id,
            territorie_description: description,
            territorie_landscape_id: landscapeId,
            territorie_color_r: color.r,
            territorie_color_b: color.b,
            territorie_color_g: color.g
          };
          await updateTerritorie(updateDto);
        } else {
          const createDto: CreateTerritorieRqDto = {
            territorie_description: description,
            territorie_landscape_id: landscapeId,
            territorie_color_r: color.r,
            territorie_color_b: color.b,
            territorie_color_g: color.g
          };
          await insertTerritorie(createDto);
        }
        enqueueSnackbar('Сохранено успешно!', { variant: 'success' });
      } catch {
        enqueueSnackbar('Что-то пошло не так при сохранении', { variant: 'error' });
      }
    };

    upload();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Button variant="outlined" onClick={onCancel} sx={{ mb: 2 }}>
        ← Вернуться к территориям
      </Button>
      <Typography variant="h5" gutterBottom>
        ➕ {(formId === undefined) ? 'Добавление новой территории' : `Редактирование территории ${name}`}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Описание"
            multiline
            rows={3}
            value={description}
            disabled={!canUserEdit}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth disabled={!canUserEdit}>
            <InputLabel id="landscape-select-label">Ландшафт</InputLabel>
            <Select
              labelId="landscape-select-label"
              value={landscapeId ?? ''}
              onChange={(e) =>
                setLandscapeId(e.target.value === '' ? null : Number(e.target.value))
              }
              MenuProps={{ PaperProps: { style: { maxHeight: 250 } } }}
            >
              <MenuItem value="">Без ландшафта</MenuItem>
              {landscapes.map((landscape) => (
                <MenuItem key={landscape.landscape_id} value={landscape.landscape_id}>
                  {landscape.landscape_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>Цвет территории:</Typography>
          <SketchPicker
            color={color}
            onChangeComplete={(c) => setColor(c.rgb)}
            disableAlpha
            />
        </Grid>

        {canUserEdit &&
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={onCancel}>
              ❌ Отмена
            </Button>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              💾 Сохранить
            </Button>
          </Grid>
        }
      </Grid>
    </Box>
  );
};

export default CreateTerritorieForm;
