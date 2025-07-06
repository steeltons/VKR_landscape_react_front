import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, styled, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllUsers, UserRsDto } from "../../../services/user";
import UserEditForm from "./UserEditForm";

type UserUi = {
    id: number;
    username: string;
    email: string;
    is_admin: boolean;
    name: string,
    surname: string;
    fathername?: string;
    image?: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
    transition: 'border 0.3s linear, box-shadow 0.3s ease-in-out',

    ':hover': {
        boxShadow: theme.shadows[16],
    }
}));

const convertUserToUi = (dto: UserRsDto) => {
    return {
        id: dto.user_id,
        username: dto.user_login,
        email: dto.user_email,
        is_admin: dto.user_is_admin,
        image: dto.user_picture_base64,
        name: dto.user_name,
        surname: dto.user_surname,
        fathername: dto.user_fathername
    }
}

const UserGrid = () => {

    const [users, setUsers] = useState<UserUi[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserUi | null>(null)
    const [isCreating, setIsCreating] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const users = (await getAllUsers(true))
                .map((user) => convertUserToUi(user));

            setUsers(Array.from(users));
        };
        fetchData();
    }, [isCreating])

    const handleSelectUser = (user : UserUi) => {
        setSelectedUser(user)
        setIsCreating(true);
    } 

    if (isCreating) {
        return (
            <UserEditForm
                onCancel={() => setIsCreating(false)}
                userId={ selectedUser ? selectedUser.id : null } 
            />
        )
    }

    return (
        <>
            <Grid
                container
                spacing={ 2 }
            >
                {users.map((user) => (
                    <Grid item xs={12} sm={6} lg={4} key={user.id}>
                        <StyledCard
                            sx={{
                                display: 'flex',
                                height: 220,
                                backgroundColor: 'rgb(241, 239, 239)',
                                position: 'relative',
                            }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, flex: 1 }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography 
                                        variant="h6" 
                                        gutterBottom
                                        sx={{
                                            maxHeight: 60,
                                            overflow: 'hidden'
                                        }}
                                    >
                                        {user.username}
                                    </Typography>
                                    <Typography>{`${user.surname} ${user.name} ${user.fathername || ''}`}</Typography>
                                    <Typography>{user.email}</Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'start' }} onClick={() => handleSelectUser(user)}>
                                    <Button size="small" >Подробнее</Button>
                                </CardActions>
                            </Box>
                            

                            {/* Правая часть: изображение с кнопкой "x" */}
                            <Box sx={{ position: 'relative', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        width: 192,
                                        height: 192,
                                        objectFit: 'cover',
                                        borderRadius: 25
                                    }}
                                    image={`data:image/jpeg;base64,${user.image}`}
                                    alt={user.username}
                                />
                            </Box>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </>
    )
};

export default UserGrid;
