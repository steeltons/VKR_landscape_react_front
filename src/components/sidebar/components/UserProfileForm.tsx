import React, { useEffect, useState, ChangeEvent } from 'react';
import {
  Avatar, Box, Button, TextField, Typography, FormControl, FormLabel, RadioGroup,
  FormControlLabel, Radio
} from "@mui/material";
import { useJwtPayload } from "../../../hooks/usejwtPayload";
import { getUserById, updateUser, UserRsDto, UpdateUserRqDto } from "../../../services/user";
import { getImageById, uploadImageFile } from "../../../services/images";
import { useSnackbar } from "notistack";

const MIN_AGE = 15;
const MAX_AGE = 120;

interface UserProfileFormProps {
  onBack: () => void;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ onBack }) => {
  const payload = useJwtPayload();
  const [user, setUser] = useState<UserRsDto | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [fathername, setFathername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState<"M"|"F">("M");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!payload?.id) return;
    (async () => {
      const u = await getUserById(Number(payload.id));
      setUser(u);
      setSurname(u.user_surname);
      setName(u.user_name);
      setFathername(u.user_fathername || "");
      setEmail(u.user_email);
      setAge(u.user_age);
      setGender(u.user_is_female ? "F" : "M");
      if (u.user_picture_id) {
        const img = await getImageById(u.user_picture_id);
        setUserImage(img.picture_base64);
      }
    })();
  }, [payload]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setImageFile(f);
      setImagePreview(URL.createObjectURL(f));
    }
  };

  const handleSave = async () => {
    if (!user) return;
    if (age === "" || age < MIN_AGE || age > MAX_AGE) {
      enqueueSnackbar(`Возраст должен быть между ${MIN_AGE} и ${MAX_AGE}`, { variant: 'error' });
      return;
    }

    const upload = async () => {
      try {
        const dto: UpdateUserRqDto = {
          user_id: user.user_id,
          user_email: email,
          user_surname: surname,
          user_name: name,
          user_fathername: fathername,
          user_age: Number(age),
          user_is_female: gender === "F" ? 1 : 0,
        };
        if (imageFile) {
          const imageId : number = await uploadImageFile(imageFile);
          dto.user_picture_id = imageId
        }
      
        const res = await updateUser(dto);
        enqueueSnackbar(res.message, { variant: 'success' });
      } catch (e: any) {
        enqueueSnackbar(`Ошибка при сохранении: ${e.message}`, { variant: 'error' });
      }
    };
    upload();
  };

  if (!user) return <Typography>Loading profile...</Typography>;

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", py: 3, position: "relative" }}>
      <Button
        size="small"
        onClick={onBack}
        sx={{ position: "absolute", left: 0, top: 0 }}
      >
        На главную
      </Button>

      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Avatar
          src={imagePreview ? imagePreview : userImage ? `data:image/jpeg;base64,${userImage}` : undefined}
          sx={{ width: 120, height: 120, mx: "auto" }}
        />
      </Box>

      <TextField label="Логин" value={user.user_login} fullWidth disabled sx={{ mb: 2 }} />
      <TextField label="Почта" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth sx={{ mb: 2 }} />

      <TextField label="Фамилия" value={surname} onChange={(e) => setSurname(e.target.value)} fullWidth sx={{ mb: 2 }} />
      <TextField label="Имя" value={name} onChange={(e) => setName(e.target.value)} fullWidth sx={{ mb: 2 }} />
      <TextField label="Отчество" value={fathername} onChange={(e) => setFathername(e.target.value)} fullWidth sx={{ mb: 2 }} />

      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <FormLabel component="legend">Пол</FormLabel>
        <RadioGroup row value={gender} onChange={(e) => setGender(e.target.value as "M"|"F")}>
          <FormControlLabel value="M" control={<Radio />} label="М" />
          <FormControlLabel value="F" control={<Radio />} label="Ж" />
        </RadioGroup>
      </FormControl>

      <TextField
        label="Возраст"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
        inputProps={{ min: MIN_AGE, max: MAX_AGE }}
        fullWidth
        sx={{ mb: 2 }}
      />

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

export default UserProfileForm;
