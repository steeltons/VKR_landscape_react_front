import { Box, Button, Card, CardActions, CardContent, CardMedia, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import { useJwtPayload } from "../../../../hooks/usejwtPayload";
import CreateSoilForm from "./CreateSoilForm";
import { deleteSoil, getAllSoils, SoilRsDto } from "../../../../services/soil";


type KnowledgeDatabaseObjectUi = {
    id: number;
    name: string;
    description: string;
    base64Image? : string
}

function convertToKnowledfeDatabaseObjectUi(response : SoilRsDto) : KnowledgeDatabaseObjectUi {
    return {
        id: response.soil_id,
        name: response.soil_name,
        description: response.soil_description,
        base64Image: response.soil_picture_base64
    }
}

const StyledCard = styled(Card)(({ theme }) => ({
    transition: 'border 0.3s linear, box-shadow 0.3s ease-in-out',

    ':hover': {
        boxShadow: theme.shadows[16],
    }
}));

const KnowledgeDatabaseSoilGrid = () => {

    const [objectsUi, setObjectsUi] = useState<KnowledgeDatabaseObjectUi[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedObject, setSelectedObject] = useState<KnowledgeDatabaseObjectUi| null>(null);
    const payload = useJwtPayload();

    const isAdmin = payload?.is_admin || false;

    useEffect(() => {
        const formData = async () => {
            try {
                const response = await getAllSoils(true);
                const convertedDatas = response.map((obj) => convertToKnowledfeDatabaseObjectUi(obj));
                setObjectsUi(convertedDatas);
            } catch (error : any) {
                console.error(error.response?.data || error.message);
                throw error;
            }
        };
        formData();
    }, [isCreating]);

    const handleDeleteObject = (id: number) => {
        const deletePlant = async() => {
            try {
                await deleteSoil(id);

                setObjectsUi((prevObject) => prevObject.filter((obj) => obj.id !== id));
            } catch (exception: any) {
                console.error(exception);
                throw exception;
            }
        };
        deletePlant();
    }

    const handleSelectObject = (id: number) => {
        const newSelectedObj = objectsUi.filter(obj => obj.id === id)[0];
        setSelectedObject(newSelectedObj);
        setIsCreating(true)
    }

    const handleCreateObject = () => {
        setIsCreating(true);
        setSelectedObject(null);
    }

    if (isCreating) {
        return <CreateSoilForm 
            onCancel={() => setIsCreating(false)}
            id={ selectedObject?.id } 
            isUpdate={ selectedObject !== null } 
            canUserEdit={ isAdmin }    
        />;
    }

    return (
        <>
            {isAdmin &&
                <Button 
                    variant="contained" 
                    color="success" 
                    sx={{ mb: 2 }}
                    onClick={() => handleCreateObject()}
                >
                    Добавить новую почву
                </Button>
            }
            <Grid
                container
                spacing={ 2 }
            >
                {objectsUi.map((obj) => (
                    <Grid item xs={12} sm={6} lg={4} key={obj.id}>
                        <StyledCard
                            sx={{
                                display: 'flex',
                                height: 220,
                                backgroundColor: 'rgb(241, 239, 239)',
                                position: 'relative', // чтобы абсолютная кнопка позиционировалась относительно карточки
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
                                        {obj.name}
                                    </Typography>
                                    <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: 80, maxWidth: 150 }}
                                    >
                                        {obj.description}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'start' }}>
                                    <Button size="small" onClick={() => handleSelectObject(obj.id) }>Подробнее</Button>
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
                                    }}
                                    image={`data:image/jpeg;base64,${obj.base64Image}`}
                                    alt={obj.name}
                                />
                                {isAdmin &&
                                    <Button
                                        size="small"
                                        onClick={() => handleDeleteObject(obj.id)}
                                        sx={{
                                        position: 'absolute',
                                        bottom: 25,
                                        right: 25,
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
                                }
                            </Box>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default KnowledgeDatabaseSoilGrid;