import { Box, List, ListItem, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { RelatedObjectRsDto } from "../../../services/territory";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CurrentCoordsInfo from "./CurrentCoordsInfo";

export type MapInfoProps = {
    territories: RelatedObjectRsDto[];
    lat: number;
    lng: number;
}

function truncateNumber(incomeNumber: number) : number {
    const outcome = Math.trunc(incomeNumber * 100_000) / 100_000;
    return outcome;
}

const MapInfo: React.FC<MapInfoProps> = ({ territories, lat, lng }) => {

    return(
        <Box
            sx={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                rowGap: 3,
                bottom: 1,
                right: 1,
                width: 450,
                height: 450,
                bgcolor: 'white',
                boxShadow: 8,
                borderTopLeftRadius: 25,
                p: 3,
                zIndex: 1000,
                overflow: 'auto',
                overflowY: 'auto'
            }}
        >   
            <Typography>Выбраная координата: ({truncateNumber(lat)} , {truncateNumber(lng)})</Typography>
            {territories.length === 0 &&
                <Typography
                >
                    Точка не принадлежит ни одной территории
                </Typography>
            }
            {territories.length !== 0 &&
                territories.map((territorie, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{territorie.territorie.territorie_description}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Ландшафт</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>Название: {territorie.landscape.landscape_name}</Typography>
                            <Typography>Код: {territorie.landscape.landscape_code}</Typography>
                            <Typography>Описание: {territorie.landscape.landscape_description}</Typography>
                            <Typography>Площадь: {territorie.landscape.landscape_area_in_square_kilometers} км²</Typography>
                            <Typography>КР: {territorie.landscape.landscape_KR}</Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Климат</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            {territorie.climats.map((climat, i) => (
                                <Box key={i}>
                                <Typography>Название: {climat.climat_name}</Typography>
                                <Typography>Описание: {climat.climat_description}</Typography>
                                </Box>
                            ))}
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Почвы</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            {territorie.soils.map((soil, i) => (
                                <Box key={i}>
                                <Typography>Название: {soil.soil_name}</Typography>
                                <Typography>Описание: {soil.soil_description}</Typography>
                                <Typography>Кислотность: {soil.soil_acidity}</Typography>
                                <Typography>Минералы: {soil.soil_minerals}</Typography>
                                <Typography>Профиль: {soil.soil_profile}</Typography>
                                </Box>
                            ))}
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Грунты</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            {territorie.grounds.map((ground, i) => (
                                <Box key={i}>
                                <Typography>Название: {ground.ground_name}</Typography>
                                <Typography>Описание: {ground.ground_description}</Typography>
                                <Typography>Плотность: {ground.ground_density}</Typography>
                                <Typography>Влажность: {ground.ground_humidity}</Typography>
                                <Typography>Твёрдость: {ground.ground_solidity}</Typography>
                                </Box>
                            ))}
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Растения</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            {territorie.plants.map((plant, i) => (
                                <Box key={i}>
                                <Typography>Название: {plant.plant_name}</Typography>
                                <Typography>Описание: {plant.plant_description}</Typography>
                                </Box>
                            ))}
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Рельефы</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            {territorie.reliefs.map((relief, i) => (
                                <Box key={i}>
                                <Typography>Название: {relief.relief_name}</Typography>
                                <Typography>Описание: {relief.relief_description}</Typography>
                                </Box>
                            ))}
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Фундаменты</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            {territorie.foundations.map((foundation, i) => (
                                <Box key={i}>
                                <Typography>Название: {foundation.foundation_name}</Typography>
                                <Typography>Описание: {foundation.foundation_description}</Typography>
                                <Typography>Глубина крыши: {foundation.foundation_depth_roof_root_in_meters} м</Typography>
                                </Box>
                            ))}
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Воды</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            {territorie.waters.map((water, i) => (
                                <Box key={i}>
                                <Typography>Название: {water.water_name}</Typography>
                                <Typography>Описание: {water.water_description}</Typography>
                                </Box>
                            ))}
                            </AccordionDetails>
                        </Accordion>

                        </AccordionDetails>
                    </Accordion>
                    </Box>
                ))
                }
        </Box>
    )
};

export default MapInfo;