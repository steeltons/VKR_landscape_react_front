import React, { useEffect, useState, ChangeEvent } from "react";
import {
  Avatar, Box, Button, TextField, Typography,
  FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import { getUserById, revokeUserAdmin, setUserAdmin, updateUser, UpdateUserRqDto, UserRsDto } from "../../../services/user";
import { uploadImageFile, getImageById } from "../../../services/images";
import { useSnackbar } from "notistack";

interface Props {
  onCancel: () => void;
  userId?: number | null;
}

const UserEditForm: React.FC<Props> = ({ onCancel, userId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [user, setUser] = useState<UserRsDto | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);

  const [formValues, setFormValues] = useState({
    login: "",
    email: "",
    surname: "",
    name: "",
    fathername: "",
    age: "",
    isFemale: "0",
    isAdmin: "false"
  });

  useEffect(() => {
    (async () => {
      try {
        if (userId) {
            const u = await getUserById(userId);
            setUser(u);
            setFormValues({
            login: u.user_login,
            email: u.user_email || "",
            surname: u.user_surname || "",
            name: u.user_name || "",
            fathername: u.user_fathername || "",
            age: u.user_age?.toString() || "",
            isFemale: String(u.user_is_female),
            isAdmin: u.user_is_admin ? 'true' : 'false'
            });
            if (u.user_picture_id) {
            const img = await getImageById(u.user_picture_id);
            setUserImage(img.picture_base64);
            }
        }
      } catch (e: any) {
        enqueueSnackbar("Ошибка при загрузке пользователя", { variant: "error" });
      }
    })();
  }, [userId]);

  const handleChange = (field: string, value: string) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setImageFile(f);
      setImagePreview(URL.createObjectURL(f));
    }
  };

  const handleSave = async () => {
    if (!user) return;

    const dto: UpdateUserRqDto = {
      user_id: user.user_id,
      user_email: formValues.email,
      user_surname: formValues.surname,
      user_name: formValues.name,
      user_fathername: formValues.fathername,
      user_age: parseInt(formValues.age),
      user_is_female: parseInt(formValues.isFemale),
    };

    console.log('Before update', dto);

    try {
      if (imageFile) {
        const picId = await uploadImageFile(imageFile);
        dto.user_picture_id = picId;
      }
      const res = await updateUser(dto);
      if (formValues.isAdmin === 'true') {
        await setUserAdmin(user.user_id)
      } else {
        await revokeUserAdmin(user.user_id);
      }
      enqueueSnackbar(res.message || "Пользователь обновлён", { variant: "success" });
    } catch (e: any) {
      enqueueSnackbar("Ошибка при сохранении", { variant: "error" });
    }
  };

  if (!user) return <Typography>Загрузка...</Typography>;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", py: 3, position: "relative" }}>
      <Button onClick={onCancel} sx={{ position: "absolute", top: 0, left: 0 }}>
        ← Назад
      </Button>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Avatar
          src={imagePreview || (userImage && `data:image/jpeg;base64,${userImage}`) || undefined}
          sx={{ width: 120, height: 120, mx: "auto" }}
        />
      </Box>

      <TextField fullWidth label="Логин" value={formValues.login} disabled sx={{ mb: 2 }} />
      <TextField fullWidth label="Почта" value={formValues.email} onChange={(e) => handleChange("email", e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth label="Фамилия" value={formValues.surname} onChange={(e) => handleChange("surname", e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth label="Имя" value={formValues.name} onChange={(e) => handleChange("name", e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth label="Отчество" value={formValues.fathername} onChange={(e) => handleChange("fathername", e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth label="Возраст" type="number" inputProps={{ min: 15, max: 120 }} value={formValues.age} onChange={(e) => handleChange("age", e.target.value)} sx={{ mb: 2 }} />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Пол</InputLabel>
        <Select value={formValues.isFemale} onChange={(e) => handleChange("isFemale", e.target.value)}>
          <MenuItem value="0">Мужской</MenuItem>
          <MenuItem value="1">Женский</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Администратор</InputLabel>
        <Select value={formValues.isAdmin} onChange={(e) => handleChange("isAdmin", e.target.value)}>
          <MenuItem value="true">Да</MenuItem>
          <MenuItem value="false">Нет</MenuItem>
        </Select>
      </FormControl>

      <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
        Загрузить изображение
        <input hidden accept="image/*" type="file" onChange={handleImageChange} />
      </Button>

      <Button variant="contained" color="success" fullWidth onClick={handleSave}>
        Сохранить
      </Button>
    </Box>
  );
};

export default UserEditForm;
