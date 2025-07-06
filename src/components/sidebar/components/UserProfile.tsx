import { useEffect, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { useJwtPayload } from "../../../hooks/usejwtPayload";
import { getUserById, UserRsDto } from "../../../services/user";
import { getImageById } from "../../../services/images";

const UserProfile = () => {
  const payload = useJwtPayload();
  const [user, setUser] = useState<UserRsDto | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      if (payload?.id) {
        const data = await getUserById(Number(payload.id));
        if (data.user_picture_id) {
          const image = await getImageById(data.user_picture_id);
          setUserImage(image.picture_base64);          
        } else {
          setUserImage(null);
        }
        setUser(data);
      }
    };
    fetchUser();
  }, [payload]);

  return (
    <Box sx={{ padding: 2, textAlign: "center" }}>
      <Avatar
        src={ user !== null ? `data:image/jpeg;base64,${userImage}` : "https://via.placeholder.com/80" }
        sx={{
          width: 140,
          height: 140,
          margin: "0 auto",
        }}
      />
      <Typography variant="h6" sx={{ mt: 1 }}>
        {user && user.user_name
          ? `${user.user_surname} ${user.user_name} ${user.user_fathername ?? ""}`
          : "Пользователь"}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        {user?.user_email || ""}
      </Typography>
    </Box>
  );
};

export default UserProfile;
