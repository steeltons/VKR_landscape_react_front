import {
  Box, Button, Grid, MenuItem, TextField, Typography, InputLabel, Select, FormControl,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import { getImageById, uploadImageFile } from '../../../../services/images';
import { CreateGroundRqDto, getGroundById, insertGround, updateGround, UpdateGroundRqDto } from '../../../../services/ground';
import { base64ToFile } from '../../../../utils/imageConverter';

type Props = {
  onCancel: () => void;
  id?: number;
  isUpdate: boolean;
  canUserEdit: boolean;
};

const CreateGroundForm= ({ onCancel, id, isUpdate, canUserEdit  }: Props) => {
  const [formId, setFormId] = useState(id);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [density, setDensity] = useState<number>(0);
  const [humidity, setHumidity] = useState<number>(0);
  const [solidity, setSolidity] = useState<number>(0);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const { enqueueSnackbar } = useSnackbar();

   const handleUploadObject = async (data: UpdateGroundRqDto) => {
      try {
        const response = await updateGround(data);
        enqueueSnackbar(response.message, { variant: 'success' })
      } catch (error: any) {
        enqueueSnackbar('Что-то пошло не так', { variant: 'error' })
      }
    }

  const handleCreateObject = async (data: CreateGroundRqDto) => {
    try {
      const response = await insertGround(data);
      enqueueSnackbar(response.message, { variant: 'success' })
    } catch (error: any) {
        enqueueSnackbar('Что-то пошло не так', { variant: 'error' })
    }
  }

  useEffect(() => {
    const fetchData = async() => {
      if (formId) {
        const ground = await getGroundById(formId);
        setName(ground.ground_name);
        setDescription(ground.ground_description);
        setDensity(ground.ground_density);
        setHumidity(ground.ground_humidity);
        setSolidity(ground.ground_solidity);
        if (ground.ground_picture_id) {
          const image = getImageById(ground.ground_picture_id);
          const base64 = (await image).picture_base64;
          const file = base64ToFile(base64, 'image.png', '.jpg');
          const preview = URL.createObjectURL(file);
          setImageFiles([file]);
          setImagePreviews([preview]);
        }
      }
    };
    fetchData();
  }, []);


  const handleSubmit = () => {
    const upload = async () => {
      const imageId  = (imageFiles.length !== 0)
      ?  await uploadImageFile(imageFiles[0])
      : undefined;

      console.log('ImageId', imageId)
      if (isUpdate) {
        const updateRqDto : UpdateGroundRqDto = {
          ground_id: id,
          ground_name: name,
          ground_description: description,
          ground_picture_id: imageId,
          ground_humidity: humidity,
          ground_density: density,
          ground_solidity: solidity
        }
        handleUploadObject(updateRqDto);
      } else {
        const createRqDto : CreateGroundRqDto = {
          ground_name: name,
          ground_description: description,
          ground_picture_id: imageId,
          ground_density: density,
          ground_humidity: humidity,
          ground_solidity: solidity
      }
        handleCreateObject(createRqDto);
      }
    }
    
    try {
      upload();
    } catch(error: any) {
      enqueueSnackbar('Что-то пошло не так', { variant: 'error' })
    }
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
        ← Вернуться к грунтам
      </Button>
      <Typography variant="h5" gutterBottom>
        ➕ {(formId === undefined) ? 'Добавление нового грунта' : `Редактирование грунта ${name}`}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField 
            fullWidth 
            label="Название почвы" 
            value={name}
            disabled={ !canUserEdit }
            onChange={(e) => setName(e.target.value)} 
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Описание"
            multiline
            rows={3}
            value={description}
            disabled={ !canUserEdit }
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {canUserEdit &&
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
            }

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
          <FormControl fullWidth
            disabled={ !canUserEdit }
          >
            <TextField
              fullWidth
              label="Плотность"
              type="number"
              value={ density }
              onChange={(e) => setDensity(Number(e.target.value))}
              disabled={!canUserEdit}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth
            disabled={ !canUserEdit }
          >
            <TextField
              fullWidth
              label="Влажность"
              type="number"
              value={ humidity }
              onChange={(e) => setHumidity(Number(e.target.value))}
              disabled={!canUserEdit}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth
            disabled={ !canUserEdit }
          >
            <TextField
              fullWidth
              label="Твёрдость"
              type="number"
              value={ solidity }
              onChange={(e) => setSolidity(Number(e.target.value))}
              disabled={!canUserEdit}
            />
          </FormControl>
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

export default CreateGroundForm;
