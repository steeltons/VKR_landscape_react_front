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
import { registerUser, RegisterUserRqDto } from '../../../services/user';
import { ApiException } from '../../../common/exceptions';

interface LoginModalProps {
  onClose: () => void;
  onChangeAction: () => void;
}

const RegistrationForm: React.FC<LoginModalProps> = ({ onClose, onChangeAction }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const validateFields = () => {
    const newErrors = { username: '', email: '', password: '' };

    if (!/^[a-zA-Z]{4,}$/.test(username)) {
      newErrors.username = 'Логин должен быть не менее 4 символов и только на английском.';
      console.log(newErrors.username);
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = 'Введите корректный email.';
      console.log(newErrors.email);
    }

    if (!/(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{4,30}/.test(password)) {
      newErrors.password = 'Пароль от 4 до 30 символов, минимум одна заглавная, цифра и спецсимвол.';
      console.log(newErrors.password);
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleRegisterClick = async () => {
    if (!validateFields()) return;

    const request: RegisterUserRqDto = {
        user_login: username,
        user_email: email,
        user_password: password
    };

    try {
      const success = await registerUser(request);
      if (success) {
        enqueueSnackbar(`${username} успешно зарегестрировался`, { variant: 'success' });
        const loginRequest : LoginFormRqDto = {username, password};
        loginUser(loginRequest);
        onClose();
      }
    } catch (error: any) {
        if (error instanceof ApiException) {
            if (error.statusCode === 400) {
                enqueueSnackbar(error.message, {variant: 'warning'});
            } else {
                enqueueSnackbar(error.message, { variant: 'error' })
            }
            return;
        }
        
        enqueueSnackbar(`Oops... Что-то пошло не так`, { variant: 'error' });
    }
  };

  const arePasswordsSame = password === repeatPassword;

  return (
    <Paper elevation={3} sx={{ padding: 4, width: 450 }}>
      <Typography variant="h6" align="center" gutterBottom>
        🔒 Регистрация
      </Typography>

      <TextField
        fullWidth
        margin='normal'
        label='Логин'
        placeholder='Введите логин'
        value={username}
        required
        onChange={(e) => setUsername(e.target.value)}
        error={Boolean(errors.username)}
        helperText={errors.username}
      />
      <TextField
        fullWidth
        margin='normal'
        label='Почта'
        placeholder='Введите почту'
        value={email}
        required
        type='email'
        onChange={(e) => setEmail(e.target.value)}
        error={Boolean(errors.email)}
        helperText={errors.email}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Пароль"
        type={showPassword ? 'text' : 'password'}
        placeholder="Введите пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={Boolean(errors.password)}
        helperText={errors.password}
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
      <TextField
        fullWidth
        margin="normal"
        label="Повторите пароль"
        type={showPassword ? 'text' : 'password'}
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        error={!arePasswordsSame}
        helperText={!arePasswordsSame ? 'Пароли не совпадают' : ''}
      />

      <FormControlLabel control={<Checkbox />} label="Запомнить меня" />

      <Button
        fullWidth
        variant="contained"
        color="success"
        sx={{ mt: 2 }}
        onClick={handleRegisterClick}
        disabled={!username || !password || !email || !repeatPassword || !arePasswordsSame}
      >
        ЗАРЕГЕСТРИРОВАТЬСЯ
      </Button>

      <Typography align="center" sx={{ mt: 2 }}>
        Есть аккаунт?
        <Button size='medium' onClick={onChangeAction}>
          Войти
        </Button>
      </Typography>
    </Paper>
  );
};

export default RegistrationForm;
