import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  TextField,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  Paper,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LoginFormRqDto, loginUser } from '../../../services/authorisation';
import { useSnackbar } from 'notistack';

interface LoginModalProps {
  onClose: () => void;
  onChangeAction: () => void;
}

const LoginForm: React.FC<LoginModalProps> = ({ onClose, onChangeAction }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const handleLoginClick = async () => {
    const request: LoginFormRqDto = { username, password };

    try {
      const success = await loginUser(request);
      if (success) {
        enqueueSnackbar(`${username} успешно вошёл в систему`, { variant: 'success' });
        onClose();
      }
    } catch (error: any) {
      if (error.status === 401) {
        enqueueSnackbar(`Неверный логин или пароль`, { variant: 'error' });
        return;
      }
      enqueueSnackbar(`Что-то пошло не так`)
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, width: 450 }}>
      <Typography variant="h6" align="center" gutterBottom>
        🔒 Вход в систему
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        label="Email или логин"
        placeholder="example@mail.com"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Пароль"
        type={showPassword ? 'text' : 'password'}
        placeholder="Введите пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <FormControlLabel control={<Checkbox />} label="Запомнить меня" />

      <Button
        fullWidth
        variant="contained"
        color="success"
        sx={{ mt: 2 }}
        onClick={handleLoginClick}
        disabled={!username || !password}
      >
        ВОЙТИ
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <Link href="#" variant="body2">
          Забыли пароль?
        </Link>
      </Box>

      <Typography align="center" sx={{ mt: 2 }}>
        Нет аккаунта? 
        <Button 
          size='medium'
          onClick={onChangeAction}
        >
          Зарегистрироваться
        </Button>
      </Typography>
    </Paper>
  );
};

export default LoginForm;
