import React, { useEffect, useState } from 'react';
import {
  Box, Button, Grid, TextField, Typography
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { getImageById, uploadImageFile } from '../../../../services/images';
import {
  CreateLandscapeRqDto, insertLandscape,
  updateLandscape, UpdateLandscapeRqDto,
  getLandscapeById, LandscapeRsDto
} from '../../../../services/landscape';
import { base64ToFile } from '../../../../utils/imageConverter';

type Props = {
  onCancel: () => void;
  id?: number;
  isUpdate: boolean;
  canUserEdit: boolean;
};

const CreateLandscapeForm: React.FC<Props> = ({
  onCancel, id, isUpdate, canUserEdit
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [areaPercent, setAreaPercent] = useState<number | ''>('');
  const [areaSquare, setAreaSquare] = useState<number | ''>('');
  const [code, setCode] = useState('');
  const [kr, setKr] = useState<number | ''>('');
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  useEffect(() => {
  const fetchData = async () => {
    if (id) {
      try {
        const landscape = await getLandscapeById(id);
        setName(landscape.landscape_name);
        setDescription(landscape.landscape_description);
        setAreaPercent(landscape.landscape_area_in_percents);
        setAreaSquare(landscape.landscape_area_in_square_kilometers);
        setCode(landscape.landscape_code);
        setKr(landscape.landscape_KR);

        if (landscape.landscape_picture_id) {
          const image = await getImageById(landscape.landscape_picture_id);
          const base64 = image.picture_base64;
          const file = base64ToFile(base64, 'landscape_image', '.jpg');
          const preview = URL.createObjectURL(file);
          setImageFiles([file]);
          setImagePreviews([preview]);
        }
      } catch (error) {
        enqueueSnackbar('Ошибка при загрузке данных ландшафта', { variant: 'error' });
      }
    }
  };
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
        const dto: UpdateLandscapeRqDto = {
          landscape_id: id,
          landscape_name: name,
          landscape_description: description,
          landscape_area_in_percents: Number(areaPercent),
          landscape_area_in_square_kilometers: Number(areaSquare),
          landscape_code: code,
          landscape_KR: Number(kr),
          landscape_picture_id: imgId
        };
        const res = await updateLandscape(dto);
        enqueueSnackbar(res.message, { variant: 'success' });
      } else {
        const dto: CreateLandscapeRqDto = {
          landscape_name: name,
          landscape_description: description,
          landscape_area_in_percents: Number(areaPercent),
          landscape_area_in_square_kilometers: Number(areaSquare),
          landscape_code: code,
          landscape_KR: Number(kr),
          landscape_picture_id: imgId
        };
        const res = await insertLandscape(dto);
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
        ← Вернуться к ландшафтам
      </Button>
      <Typography variant="h5" gutterBottom>
        ➕ {isUpdate ? `Редактирование ландшафта "${name}"` : 'Добавление нового ландшафта'}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth label="Название"
            value={name} disabled={!canUserEdit}
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
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth label="Площадь (%)"
            type="number"
            value={areaPercent} 
            disabled={!canUserEdit}
            onChange={e => setAreaPercent(e.target.value === '' ? '' : Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth label="Площадь (км²)"
            type="number"
            value={areaSquare} 
            disabled={!canUserEdit}
            onChange={e => setAreaSquare(e.target.value === '' ? '' : Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth label="Код"
            value={code} 
            disabled={!canUserEdit}
            onChange={e => setCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth label="Коэффициент KR"
            type="number"
            value={kr} 
            disabled={!canUserEdit}
            onChange={e => setKr(e.target.value === '' ? '' : Number(e.target.value))}
          />
        </Grid>

        <Grid item xs={12}>
          {canUserEdit && (
            <label htmlFor="upload-image">
              <input
                accept="image/*"
                id="upload-image"
                type="file"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
              <Button component="span">📤 Загрузить изображение</Button>
            </label>
          )}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
            {imagePreviews.map((src, idx) => (
              <Box key={idx}>
                <img
                  src={src}
                  alt={`preview-${idx}`}
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

export default CreateLandscapeForm;
