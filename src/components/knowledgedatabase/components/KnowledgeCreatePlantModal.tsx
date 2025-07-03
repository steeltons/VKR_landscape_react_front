import { Box, Button, Grid, MenuItem, Modal, TextField, Typography } from "@mui/material";

interface CreatePlantModalProps {
  open: boolean;
  onClose: () => void;
}

const CreatePlantModal = ({ open, onClose }: CreatePlantModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          bgcolor: 'white',
          p: 4,
          maxWidth: '600px',
          mx: 'auto',
          my: '10vh',
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Добавление нового растения
        </Typography>

        <TextField fullWidth label="Название растения" sx={{ mb: 2 }} />
        <TextField fullWidth label="Описание" multiline rows={3} sx={{ mb: 2 }} />

        <Button variant="text" sx={{ mb: 2 }} component="label">
          📤 Загрузить изображение
          <input type="file" hidden />
        </Button>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={4}>
            <TextField fullWidth select label="Является кормовым" defaultValue="Да">
              <MenuItem value="Да">Да</MenuItem>
              <MenuItem value="Нет">Нет</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth select label="Нужен солнечный свет" defaultValue="Да">
              <MenuItem value="Да">Да</MenuItem>
              <MenuItem value="Нет">Нет</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth select label="Однолетнее" defaultValue="Нет">
              <MenuItem value="Да">Да</MenuItem>
              <MenuItem value="Нет">Нет</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth select label="Климат" defaultValue="умеренный">
              <MenuItem value="умеренный">умеренный</MenuItem>
              <MenuItem value="тропический">тропический</MenuItem>
              <MenuItem value="арктический">арктический</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth select label="Мин. температура" defaultValue="15 ℃">
              {/* {[...Array(31).keys()].map(i => (
                <MenuItem key={i} value={`${i - 10} ℃`}>{i - 10} ℃</MenuItem>
              ))} */}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth select label="Макс. температура" defaultValue="20 ℃">
              {/* {[...Array(51).keys()].map(i => (
                <MenuItem key={i} value={`${i + 10} ℃`}>{i + 10} ℃</MenuItem>
              ))} */}
            </TextField>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button onClick={onClose} variant="outlined" color="error">Отмена</Button>
          <Button variant="contained" color="success">Сохранить</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreatePlantModal;
