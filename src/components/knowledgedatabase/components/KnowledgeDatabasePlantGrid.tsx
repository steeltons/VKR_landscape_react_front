import { Box, Button, Card, CardActions, CardContent, CardMedia, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { deletePlantById, getAllPlants, PlantRsDto } from "../../../services/plants";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import CreatePlantForm from "./CreatePlantForm";
import { useSnackbar } from "notistack";
import { useJwtPayload } from "../../../hooks/usejwtPayload";


type PlantUi = {
    id: number;
    name: string;
    description: string;
    base64Image? : string
}

function convertToPlantUi(response : PlantRsDto) : PlantUi {
    return {
        id: response.plant_id,
        name: response.plant_name,
        description: response.plant_description,
        base64Image: response.plant_picture_base64
    }
}

const StyledCard = styled(Card)(({ theme }) => ({
    transition: 'border 0.3s linear, box-shadow 0.3s ease-in-out',

    ':hover': {
        boxShadow: theme.shadows[16],
    }
}));

const KnowledgeDatabasePlantGrid = () => {

    const [plantsUi, setPlantsUi] = useState<PlantUi[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedPlant, setSelectedPlant] = useState<PlantUi| null>(null);
    const payload = useJwtPayload();
    const { enqueueSnackbar } = useSnackbar();

    const isAdmin = payload?.is_admin || false;

    useEffect(() => {
        const formData = async () => {
            try {
                const response = await getAllPlants(true);
                const convertedDatas = response.map((plant) => convertToPlantUi(plant));
                console.log(convertedDatas)
                setPlantsUi(convertedDatas);
            } catch (error : any) {
                console.error(error.response?.data || error.message);
                throw error;
            }
        };
        formData();
    }, [isCreating]);

    const handleDeletePlant = (plantId: number) => {
        const deletePlant = async() => {
            try {
                await deletePlantById(plantId);
                setPlantsUi((prevPlants) => prevPlants.filter((plant) => plant.id !== plantId));
            } catch (exception: any) {
                console.error(exception);
                throw exception;
            }
        };
        deletePlant();
    }

    const handleSelectPlant = (plantId: number) => {
        const plant = plantsUi.filter(plant => plant.id === plantId)[0]
        setSelectedPlant(plant);
        setIsCreating(true)
    }

    const handleCreatePlant = () => {
        setIsCreating(true);
        setSelectedPlant(null);
    }

    if (isCreating) {
        return <CreatePlantForm 
            onCancel={() => setIsCreating(false)}
            id={ selectedPlant?.id } 
            insertName={ selectedPlant?.name || '' } 
            insertDescription={ selectedPlant?.description || '' } 
            isUpdate={ selectedPlant !== null } 
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
                    onClick={() => handleCreatePlant()}
                >
                    Добавить новое растение
                </Button>
            }
            <Grid
                container
                spacing={ 2 }
            >
                {plantsUi.map((plant) => (
                    <Grid item xs={12} sm={6} lg={4} key={plant.id}>
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
                                        {plant.name}
                                    </Typography>
                                    <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: 80, maxWidth: 150 }}
                                    >
                                        {plant.description}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'start' }}>
                                    <Button size="small" onClick={() => handleSelectPlant(plant.id) }>Подробнее</Button>
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
                                    image={`data:image/jpeg;base64,${plant.base64Image}`}
                                    alt={plant.name}
                                />
                                {isAdmin &&
                                    <Button
                                        size="small"
                                        onClick={() => handleDeletePlant(plant.id)}
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

export default KnowledgeDatabasePlantGrid;