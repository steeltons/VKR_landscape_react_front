import {
  Box, FormControl, InputLabel, MenuItem, Select, Typography, Grid,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getAllLandscapes } from "../../../services/landscape";
import { getAllPlants } from "../../../services/plants";
import ConstructorSelector, { ListObjectUi } from "./components/ConstructorSelector";
import { getAllReliefs, ReliefRsDto } from "../../../services/relief";
import { getAllSoils, SoilRsDto } from "../../../services/soil";
import { getAllGrounds, GroundRsDto } from "../../../services/ground";
import { getAllWaters, WaterRsDto } from "../../../services/water";
import { getAllClimats, ClimatRsDto } from "../../../services/climate";

type LandscapeUi = { id: number; name: string; code: string; };

const convertDtoToUi = (data: any): LandscapeUi => ({
  id: data.landscape_id,
  name: data.landscape_name,
  code: data.landscape_code,
});

const convertPlantDtoToUi = (data: any): ListObjectUi => ({
  id: data.plant_id,
  name: data.plant_name,
});

const convertReliefsToUi = (data: ReliefRsDto): ListObjectUi => ({
  id: data.relief_id,
  name: data.relief_name,
});

const convertSoilsToUi = (data: SoilRsDto): ListObjectUi => ({
  id: data.soil_id,
  name: data.soil_name,
});

const convertGroundsToUi = (data: GroundRsDto): ListObjectUi => ({
  id: data.ground_id,
  name: data.ground_name,
});

const convertWatersToUi = (data: WaterRsDto): ListObjectUi => ({
  id: data.water_id,
  name: data.water_name,
});

const convertClimatesToUi = (data: ClimatRsDto): ListObjectUi => ({
  id: data.climat_id,
  name: data.climat_name,
});

const LandscapeConstructorGrid = () => {
  const [landscapes, setLandscapes] = useState<LandscapeUi[]>([]);
  const [selectedId, setSelectedId] = useState<number | "">("");

  const [plants, setPlants] = useState<ListObjectUi[]>([]);
  const [selectedPlants, setSelectedPlants] = useState<number[]>([]);

  const [reliefs, setReliefs] = useState<ListObjectUi[]>([]);
  const [selectedReliefs, setSelectedReliefs] = useState<number[]>([]);

  const [soils, setSoils] = useState<ListObjectUi[]>([]);
  const [selectedSoils, setSelectedSoils] = useState<number[]>([]);

  const [grounds, setGrounds] = useState<ListObjectUi[]>([]);
  const [selectedGrounds, setSelectedGrounds] = useState<number[]>([]);

  const [waters, setWaters] = useState<ListObjectUi[]>([]);
  const [selectedWaters, setSelectedWaters] = useState<number[]>([]);

  const [climates, setClimates] = useState<ListObjectUi[]>([]);
  const [selectedClimates, setSelectedClimates] = useState<number[]>([]);

  const selectedLandscape = landscapes.find((l) => l.id === selectedId);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllLandscapes();
      setLandscapes(data.map(convertDtoToUi));
      setPlants((await getAllPlants()).map(convertPlantDtoToUi));
      setReliefs((await getAllReliefs()).map(convertReliefsToUi));
      setSoils((await getAllSoils()).map(convertSoilsToUi));
      setGrounds((await getAllGrounds()).map(convertGroundsToUi));
      setWaters((await getAllWaters()).map(convertWatersToUi));
      setClimates((await getAllClimats()).map(convertClimatesToUi));
    };
    fetchData();
  }, []);

  const handleObjectToggle = (
    setSelectedList: Dispatch<SetStateAction<number[]>>,
    selecterId: number
  ): void => {
    setSelectedList((prev) =>
      prev.includes(selecterId) ? prev.filter((id) => id !== selecterId) : [...prev, selecterId]
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <FormControl sx={{ width: '33%' }}>
        <InputLabel>Выберите ландшафт</InputLabel>
        <Select
          value={selectedId}
          label="Выберите ландшафт"
          onChange={(e) => setSelectedId(e.target.value as number)}
        >
          {landscapes.map((landscape) => (
            <MenuItem key={landscape.id} value={landscape.id}>
              {landscape.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedLandscape && (
        <>
          <Box sx={{ mt: 3 }}>
            <Typography><strong>Имя:</strong> {selectedLandscape.name}</Typography>
            <Typography><strong>Код:</strong> {selectedLandscape.code}</Typography>
          </Box>

          <Grid container spacing={3} sx={{ mt: 4 }}>
            <Grid item xs={4}>
              <ConstructorSelector
                tabName="Растения"
                objects={plants}
                selectedObjects={selectedPlants}
                setSelectedObjects={ setSelectedPlants }
                onToggle={handleObjectToggle}
              />
            </Grid>
            <Grid item xs={4}>
              <ConstructorSelector
                tabName="Рельефы"
                objects={reliefs}
                selectedObjects={selectedReliefs}
                setSelectedObjects={ setSelectedReliefs }
                onToggle={handleObjectToggle}
              />
            </Grid>
            <Grid item xs={4}>
              <ConstructorSelector
                tabName="Почвы"
                objects={soils}
                selectedObjects={selectedSoils}
                setSelectedObjects={ setSelectedSoils }
                onToggle={handleObjectToggle}
              />
            </Grid>
            <Grid item xs={4}>
              <ConstructorSelector
                tabName="Грунты"
                objects={grounds}
                selectedObjects={selectedGrounds}
                setSelectedObjects={ setSelectedGrounds }
                onToggle={handleObjectToggle}
              />
            </Grid>
            <Grid item xs={4}>
              <ConstructorSelector
                tabName="Воды"
                objects={waters}
                selectedObjects={selectedWaters}
                setSelectedObjects={ setSelectedWaters }
                onToggle={handleObjectToggle}
              />
            </Grid>
            <Grid item xs={4}>
              <ConstructorSelector
                tabName="Климаты"
                objects={climates}
                selectedObjects={selectedClimates}
                setSelectedObjects={ setSelectedClimates }
                onToggle={handleObjectToggle}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default LandscapeConstructorGrid;
