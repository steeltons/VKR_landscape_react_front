import { Box, Button, Card, CardActions, CardContent, CardMedia, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { getAllPlants, PlantRsDto } from "../../../services/plants";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';
import { point } from "leaflet";
import CreatePlantModal from "./KnowledgeCreatePlantModal";
import CreatePlantForm from "./CreatePlantForm";


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

    useEffect(() => {
        const formData = async () => {
            try {
                const response = await getAllPlants();
                const convertedDatas = response.map((plant) => convertToPlantUi(plant));
                setPlantsUi(convertedDatas);
            } catch (error : any) {
                console.error(error.response?.data || error.message);
                throw error;
            }
        };
        formData();
    }, []);

    const handleCreateNewPlant = () => {
        alert('Was clicked')
    }

    if (isCreating) {
        return <CreatePlantForm onCancel={() => setIsCreating(false)} />;
    }

    return (
        <>
            <Button 
                variant="contained" 
                color="success" 
                sx={{ mb: 2 }}
                onClick={() => setIsCreating(true)}
            >
                Добавить новое растение
            </Button>
            <Grid
                container
                spacing={ 2 }
            >
                {plantsUi.map((plant) => (
                    <Grid item xs={ 12 } sm={ 6 } lg={ 4 } key={ plant.id }>
                        <StyledCard 
                            sx={{ 
                                display: 'flex', 
                                height: 220,
                                padding: '5px 5px 5px 5px',
                                backgroundColor:'rgb(241, 239, 239)'
                            }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: 2 }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography variant="h6" gutterBottom>
                                        {plant.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: 80 }}>
                                        { plant.description }
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'start' }}>
                                    <Button size="small">Подробнее</Button>
                                </CardActions>
                            </Box>

                            {/* Правая часть: изображение */}
                            <Box>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 128, height: 128, margin: 2, alignSelf: 'center', objectFit: 'contain' }}
                                    image={`data:image/jpeg;base64,${plant.base64Image}`}
                                    alt={plant.name}
                                    
                                />
                            </Box>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default KnowledgeDatabasePlantGrid;