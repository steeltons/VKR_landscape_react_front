import {
  Box, Button, Grid, MenuItem, TextField, Typography, InputLabel, Select, FormControl,
} from '@mui/material';
import { useState } from 'react';
import { createPlant, CreatePlantRqDto } from '../../../services/plants';
import { uploadImageFile } from '../../../services/images';

type Props = {
  onCancel: () => void;
};

const climates = ['умеренный', 'тропический', 'субтропический', 'арктический'];
const temperatures = Array.from({ length: 61 }, (_, i) => -20 + i); // от -20°C до +40°C

const CreatePlantForm = ({ onCancel }: Props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isFeed, setIsFeed] = useState('Да');
  const [needsSun, setNeedsSun] = useState('Да');
  const [isAnnual, setIsAnnual] = useState('Нет');
  const [climate, setClimate] = useState('умеренный');
  const [minTemp, setMinTemp] = useState('15');
  const [maxTemp, setMaxTemp] = useState('20');
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleSubmit = () => {
    const file: File = imageFiles[0];
    const plantRqDto : CreatePlantRqDto = {
        plant_name: name,
        plant_description: description,
    }

    const upload = async () => {
        const fileId: number = await uploadImageFile(file);
        plantRqDto.plant_picture_id = fileId;

        const result = await createPlant(plantRqDto);
        console.log(result)
    }
    upload();
    
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImageFiles(prev => [...prev, ...files]);
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    const updatedFiles = [...imageFiles];
    const updatedPreviews = [...imagePreviews];
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setImageFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Button variant="outlined" onClick={onCancel} sx={{ mb: 2 }}>
        ← Вернуться к растениям
      </Button>
      <Typography variant="h5" gutterBottom>
        ➕ Добавление нового растения
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth label="Название растения" value={name} onChange={(e) => setName(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Описание"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <label htmlFor="upload-image">
              <input
                accept="image/*"
                id="upload-image"
                type="file"
                multiple
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
              <Button variant="text" component="span">
                📤 Загрузить изображения
              </Button>
            </label>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 2 }}>
              {imagePreviews.map((preview, index) => (
                <Box key={index} sx={{ position: 'relative', display: 'inline-block'}}>
                  <img
                    src={preview}
                    alt={`preview-${index}`}
                    style={{
                        width: 150,
                        height: 150,
                        objectFit: 'cover',
                        borderRadius: 4,
                        border: '1px solid #ccc'
                    }}
                  />
                  <Button
                    onClick={() => handleRemoveImage(index)}
                    size="small"
                    sx={{
                      position: 'absolute',
                      bottom: 4,
                      right: 0,
                      minWidth: '24px',
                      height: '24px',
                      fontSize: '16px',
                      lineHeight: 1,
                      borderRadius: '50%',
                      backgroundColor: '#f44336',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#d32f2f',
                      },
                    }}
                  >
                    ×
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Является кормовым</InputLabel>
            <Select value={isFeed} label="Является кормовым" onChange={(e) => setIsFeed(e.target.value)}>
              <MenuItem value="Да">Да</MenuItem>
              <MenuItem value="Нет">Нет</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Нужен солнечный свет</InputLabel>
            <Select value={needsSun} label="Нужен солнечный свет" onChange={(e) => setNeedsSun(e.target.value)}>
              <MenuItem value="Да">Да</MenuItem>
              <MenuItem value="Нет">Нет</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Однолетнее</InputLabel>
            <Select value={isAnnual} label="Однолетнее" onChange={(e) => setIsAnnual(e.target.value)}>
              <MenuItem value="Да">Да</MenuItem>
              <MenuItem value="Нет">Нет</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Климат</InputLabel>
            <Select value={climate} label="Климат" onChange={(e) => setClimate(e.target.value)}>
              {climates.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Мин. температура</InputLabel>
            <Select value={minTemp} label="Мин. температура" onChange={(e) => setMinTemp(e.target.value)}>
              {temperatures.map((t) => (
                <MenuItem key={t} value={t}>{t} ℃</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Макс. температура</InputLabel>
            <Select value={maxTemp} label="Макс. температура" onChange={(e) => setMaxTemp(e.target.value)}>
              {temperatures.map((t) => (
                <MenuItem key={t} value={t}>{t} ℃</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={onCancel}>
            ❌ К растениям
          </Button>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            💾 Сохранить
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreatePlantForm;
