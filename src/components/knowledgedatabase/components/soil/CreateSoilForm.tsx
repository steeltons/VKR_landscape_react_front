import React, { useEffect, useState } from 'react';
import {
  Box, Button, Grid, TextField, Typography,
} from '@mui/material';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import { getImageById, uploadImageFile } from '../../../../services/images';
import {
  CreateSoilRqDto, insertSoil,
  UpdateSoilRqDto, updateSoil,
  SoilRsDto, getSoilById
} from '../../../../services/soil';
import { base64ToFile } from '../../../../utils/imageConverter';

type Props = {
  onCancel: () => void;
  id?: number;
  isUpdate: boolean;
  canUserEdit: boolean;
};

const CreateSoilForm: React.FC<Props> = ({onCancel, id, isUpdate, canUserEdit}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [acidity, setAcidity] = useState<number | ''>('');
  const [minerals, setMinerals] = useState('');
  const [profile, setProfile] = useState('');
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
        if (id) {
          try {
            const soil = await getSoilById(id);
            console.log(soil);
            setName(soil.soil_name);
            setDescription(soil.soil_description);
            setAcidity(soil.soil_acidity);
            setMinerals(soil.soil_minerals);
            setProfile(soil.soil_profile);
            if (soil.soil_picture_id) {
              const base64 = (await getImageById(soil.soil_picture_id)).picture_base64;
              const image = base64ToFile(base64, 'image.png');
              setImageFiles([image]);
              setImagePreviews([URL.createObjectURL(image)]);
            }
          } catch(error: any) {
            enqueueSnackbar(`Ошибка загрузки грунта`, { 'variant': 'error' })
          }
      };
    }
    fetchData();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map(f => URL.createObjectURL(f));
    setImageFiles(files);
    setImagePreviews(previews);
  };

  const handleSubmit = async () => {
    try {
      const imgId = imageFiles.length > 0
        ? await uploadImageFile(imageFiles[0])
        : undefined;

      if (isUpdate && id) {
        const dto: UpdateSoilRqDto = {
          soil_id: id,
          soil_name: name,
          soil_description: description,
          soil_acidity: typeof acidity === 'number' ? acidity : undefined,
          soil_minerals: minerals,
          soil_profile: profile,
          soil_picture_id: imgId
        };
        const res = await updateSoil(dto);
        enqueueSnackbar(res.message, { variant: 'success' });
      } else {
        const dto: CreateSoilRqDto = {
          soil_name: name,
          soil_description: description,
          soil_acidity: typeof acidity === 'number' ? acidity : 0,
          soil_minerals: minerals,
          soil_profile: profile,
          soil_picture_id: imgId
        };
        const res = await insertSoil(dto);
        enqueueSnackbar(res.message, { variant: 'success' });
      }
      onCancel();
    } catch (e: any) {
      enqueueSnackbar(e.message || 'Ошибка при сохранении', { variant: 'error' });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Button variant="outlined" onClick={onCancel} sx={{ mb: 2 }}>
        ← Вернуться к почвам
      </Button>
      <Typography variant="h5" gutterBottom>
        ➕ {isUpdate ? `Редактирование почвы "${name}"` : 'Добавление новой почвы'}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth label="Название" value={name} disabled={!canUserEdit}
            onChange={e => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth label="Описание" multiline rows={3}
            value={description} disabled={!canUserEdit}
            onChange={e => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth label="Кислотность (pH)"
            type="number" inputProps={{ step: 0.1, min: 0, max: 14 }}
            value={acidity} disabled={!canUserEdit}
            onChange={e => setAcidity(e.target.value === '' ? '' : Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth label="Минералы"
            value={minerals} disabled={!canUserEdit}
            onChange={e => setMinerals(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth label="Профиль"
            value={profile} disabled={!canUserEdit}
            onChange={e => setProfile(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          {canUserEdit && (
            <label htmlFor="upload-image">
              <input
                accept="image/*" id="upload-image"
                type="file" style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
              <Button component="span">📤 Загрузить изображение</Button>
            </label>
          )}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
            {imagePreviews.map((src, idx) => (
              <Box key={idx} sx={{ position: 'relative' }}>
                <img
                  src={src} alt={`preview-${idx}`}
                  style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 4 }}
                />
              </Box>
            ))}
          </Box>
        </Grid>

        {canUserEdit && (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={onCancel}>❌ Отмена</Button>
            <Button variant="contained" color="success" onClick={handleSubmit}>💾 Сохранить</Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CreateSoilForm;
