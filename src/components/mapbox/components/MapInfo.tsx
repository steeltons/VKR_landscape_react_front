import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Slide, Collapse } from "@mui/material";
import { RelatedObjectRsDto } from "../../../services/territory";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";

export type MapInfoProps = {
  territories: RelatedObjectRsDto[];
  lat: number;
  lng: number;
  opened: boolean
};

const createInfoImage = (imageBase64: string | null | undefined) => {
    if (imageBase64) {
        return (
            <img
                src={`data:image/jpeg;base64,${imageBase64}`}
                alt="plant"
                style={{
                    float: 'right',
                    width: 92,
                    height: 92,
                    objectFit: 'cover',
                    borderRadius: 8,
                }}
            />
        )
    }
    return (<></>)
}

const MapInfo: React.FC<MapInfoProps> = ({ territories, lat, lng, opened }) => {
  const [open, setOpen] = useState(opened);

  return (
    <Box
        sx={{
            position: 'absolute',
            bottom: 0,
            right: 1,
            width: 450,
            zIndex: 1300,
        }}
    >
        {/* Выступ-тогглер */}
        <Box
            onClick={() => setOpen(!open)}
            sx={{
            height: 30,
            bgcolor: 'white',
            boxShadow: 4,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: '0.3s ease',
            ':hover': {
                height: 36,
            },
            }}
        >
            <Box
            sx={{
                width: 50,
                height: 6,
                bgcolor: '#aaa',
                borderRadius: 3,
            }}
            />
        </Box>

        <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
            sx={{
                height: 650,
                bgcolor: 'white',
                boxShadow: 8,
                p: 3,
                overflowY: 'auto',
            }}
            >
                <Typography>Выбранная координата: ({truncateNumber(lat)} , {truncateNumber(lng)})</Typography>
                {territories.length === 0 &&
                    <Typography
                    >
                        Точка не принадлежит ни одной территории
                    </Typography>
                }
                {territories.length !== 0 &&
                    territories.map((territorie, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                        <Accordion
                            defaultExpanded={ index === 0 ? true : false }
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography align="center"><b>{territorie.territorie.territorie_description}</b></Typography>
                            </AccordionSummary>
                            <AccordionDetails>

                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Ландшафт</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {createInfoImage(territorie.landscape.landscape_picture_base64)}
                                    <Typography><b>Название:</b> {territorie.landscape.landscape_name}</Typography>
                                    <Typography><b>Код:</b> {territorie.landscape.landscape_code}</Typography>
                                    <Typography><b>Описание:</b> {territorie.landscape.landscape_description}</Typography>
                                    <Typography><b>Площадь:</b> {territorie.landscape.landscape_area_in_square_kilometers} км²</Typography>
                                    <Typography><b>КР:</b> {territorie.landscape.landscape_KR}</Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Климат</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                {territorie.climats.map((climat, i) => (
                                    <Box
                                        key={i}
                                        sx={{
                                            mb: 3,
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {createInfoImage(climat.climat_picture_base64)}
                                        <Typography><b>Название:</b> {climat.climat_name}</Typography>
                                        <Typography><b>Описание:</b> {climat.climat_description}</Typography>
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
                                    <Box
                                        key={i}
                                        sx={{
                                            mb: 3,
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {createInfoImage(soil.soil_picture_base64)}
                                        <Typography><b>Название:</b> {soil.soil_name}</Typography>
                                        <Typography><b>Описание:</b> {soil.soil_description}</Typography>
                                        <Typography><b>Кислотность:</b> {soil.soil_acidity}</Typography>
                                        <Typography><b>Минералы:</b> {soil.soil_minerals}</Typography>
                                        <Typography><b>Профиль:</b> {soil.soil_profile}</Typography>
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
                                    <Box
                                        key={i}
                                        sx={{
                                            mb: 3,
                                            overflow: 'hidden',
                                        }}
                                    >
                                    {createInfoImage(ground.ground_picture_base64)}
                                    <Typography><b>Название:</b> {ground.ground_name}</Typography>
                                    <Typography><b>Описание:</b> {ground.ground_description}</Typography>
                                    <Typography><b>Плотность:</b> {ground.ground_density}</Typography>
                                    <Typography><b>Влажность:</b> {ground.ground_humidity}</Typography>
                                    <Typography><b>Твёрдость:</b> {ground.ground_solidity}</Typography>
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
                                        <Box
                                            key={i}
                                            sx={{
                                                mb: 3,
                                                overflow: 'hidden',
                                            }}
                                        >
                                        {createInfoImage(plant.plant_picture_base64)}
                                        <Typography><b>Название:</b> {plant.plant_name}</Typography>
                                        <Typography><b>Описание:</b> {plant.plant_description}</Typography>
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
                                    <Box
                                        key={i}
                                        sx={{
                                            mb: 3,
                                            overflow: 'hidden',
                                        }}
                                    >
                                    {createInfoImage(relief.relief_picture_base64)}
                                    <Typography><b>Название:</b> {relief.relief_name}</Typography>
                                    <Typography><b>Описание:</b> {relief.relief_description}</Typography>
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
                                    <Box
                                        key={i}
                                        sx={{
                                            mb: 3,
                                            overflow: 'hidden',
                                        }}
                                    >
                                    {createInfoImage(foundation.foundation_picture_base64)}
                                    <Typography><b>Название:</b> {foundation.foundation_name}</Typography>
                                    <Typography><b>Описание:</b> {foundation.foundation_description}</Typography>
                                    <Typography><b>Глубина крыши:</b> {foundation.foundation_depth_roof_root_in_meters} м</Typography>
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
                                    <Box
                                        key={i}
                                        sx={{
                                            mb: 3,
                                            overflow: 'hidden',
                                        }}
                                    >
                                    {createInfoImage(water.water_picture_base64)}
                                    <Typography><b>Название:</b> {water.water_name}</Typography>
                                    <Typography><b>Описание:</b> {water.water_description}</Typography>
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
        </Collapse>
    </Box>
  );
};

export default MapInfo;

function truncateNumber(incomeNumber: number) : number {
    const outcome = Math.trunc(incomeNumber * 100_000) / 100_000;
    return outcome;
}