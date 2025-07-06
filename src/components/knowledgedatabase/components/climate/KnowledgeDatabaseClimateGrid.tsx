import { Box, Button, Card, CardActions, CardContent, CardMedia, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import { useJwtPayload } from "../../../../hooks/usejwtPayload";
import CreateReliefForm from "./CreateClimateForm";
import { ClimatRsDto, deleteClimat, getAllClimats } from "../../../../services/climate";


type KnowledgeDatabaseObjectUi = {
    id: number;
    name: string;
    description: string;
    base64Image? : string
}

function convertToKnowledfeDatabaseObjectUi(response : ClimatRsDto) : KnowledgeDatabaseObjectUi {
    return {
        id: response.climat_id,
        name: response.climat_name,
        description: response.climat_description,
        base64Image: response.climat_picture_base64
    }
}

const StyledCard = styled(Card)(({ theme }) => ({
    transition: 'border 0.3s linear, box-shadow 0.3s ease-in-out',

    ':hover': {
        boxShadow: theme.shadows[16],
    }
}));

const KnowledgeDatabaseClimateGrid = () => {

    const [objectsUi, setObjectsUi] = useState<KnowledgeDatabaseObjectUi[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedObject, setSelectedObject] = useState<KnowledgeDatabaseObjectUi| null>(null);
    const payload = useJwtPayload();

    const isAdmin = payload?.is_admin || false;

    useEffect(() => {
        const formData = async () => {
            try {
                const response = await getAllClimats(true);
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
                await deleteClimat(id);

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
        return <CreateReliefForm 
            onCancel={() => setIsCreating(false)}
            id={ selectedObject?.id } 
            insertName={ selectedObject?.name || '' } 
            insertDescription={ selectedObject?.description || '' } 
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
                    Добавить новый климат
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

export default KnowledgeDatabaseClimateGrid;