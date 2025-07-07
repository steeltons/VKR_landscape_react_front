import {
  Box, FormControl, InputLabel, MenuItem, Select, Typography, Grid,
  Button,
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
import { getAllLandscapeClimates, getAllLandscapeFoundation, getAllLandscapeGrounds, getAllLandscapePlants, getAllLandscapeReliefs, getAllLandscapeSoils, getAllLandscapeWaters, insertNewLandscapeClimates, insertNewLandscapeFoundation, insertNewLandscapeGrounds, insertNewLandscapePlants, insertNewLandscapeReliefs, insertNewLandscapeSoils, insertNewLandscapeWaters, removeClimatLandscapeConnection, removefFoundationLandscapeConnection, removeGroundLandscapeConnection, removePlantLandscapeConnection, removeReliefLandscapeConnection, removeSoilLandscapeConnection, removeWaterLandscapeConnection } from "../../../services/links";
import { Territorie } from "../../../common/models";
import { getAllTerritories, TerritorieRsDto } from "../../../services/territory";
import { FoundationRsDto, getAllFoundations } from "../../../services/foundaments";
import { enqueueSnackbar } from "notistack";

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

const convertTerritoriesToUi = (data: TerritorieRsDto) : ListObjectUi => ({
  id: data.territorie_id,
  name: data.territorie_description
});

const convertFoundamentToUi = (data: FoundationRsDto) : ListObjectUi => ({
  id: data.foundation_id,
  name: data.foundation_name
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

  const [foundaments, setFoundaments] = useState<ListObjectUi[]>([]);
  const [selectedFoundaments, setSelectedFoundaments] = useState<number[]>([]);


  const [oldPlants, setOldPlants] = useState<number[]>([]);
  const [oldReliefs, setOldReliefs] = useState<number[]>([]);
  const [oldSoils, setOldSoils] = useState<number[]>([]);
  const [oldGrounds, setOldGrounds] = useState<number[]>([]);
  const [oldWaters, setOldWaters] = useState<number[]>([]);
  const [oldClimates, setOldClimates] = useState<number[]>([]);
  const [oldFoundaments, setOldFoundaments] = useState<number[]>([]);

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
      setFoundaments((await getAllFoundations()).map(convertFoundamentToUi));
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

  const handleSelectedLandscape = (landscapeId: number) => {
    setSelectedId(landscapeId);

    const fetchData = async () => {
        const plants = await getAllLandscapePlants(landscapeId);
        const reliefs = await getAllLandscapeReliefs(landscapeId);
        const soils = await getAllLandscapeSoils(landscapeId);
        const grounds = await getAllLandscapeGrounds(landscapeId);
        const waters = await getAllLandscapeWaters(landscapeId);
        const climates = await getAllLandscapeClimates(landscapeId);
        const foundaments = await getAllLandscapeFoundation(landscapeId);
        console.log(foundaments);

        setOldPlants([...plants]);
        setOldReliefs([...reliefs]);
        setOldSoils([...soils]);
        setOldGrounds([...grounds]);
        setOldWaters([...waters]);
        setOldClimates([...climates]);
        setOldFoundaments([...foundaments]);

        setSelectedPlants([...plants]);
        setSelectedReliefs([...reliefs]);
        setSelectedSoils([...soils]);
        setSelectedGrounds([...grounds]);
        setSelectedWaters([...waters]);
        setSelectedClimates([...climates]);
        setSelectedFoundaments([...foundaments]);
    };
    fetchData();
  }

  const handleSave = (landscapeId: number) => {
    const newLandscapePlants = selectedPlants.filter(plantId => oldPlants.indexOf(plantId) === -1);
    const newRelief = selectedReliefs.filter(id => oldReliefs.indexOf(id) === -1);
    const newSoils = selectedSoils.filter(id => oldSoils.indexOf(id) === -1);
    const newGrounds = selectedGrounds.filter(id => oldGrounds.indexOf(id) === -1);
    const newWaters = selectedWaters.filter(id => oldWaters.indexOf(id) === -1);
    const newClimates = selectedClimates.filter(id => oldClimates.indexOf(id) === -1);
    const newFoundations = selectedFoundaments.filter(id => oldFoundaments.indexOf(id) === -1);

    const unusedPlants = oldPlants.filter(plantId => selectedPlants.indexOf(plantId) === -1)
    const unusedReliefs = oldReliefs.filter(reliefId => selectedReliefs.indexOf(reliefId) === -1)
    const unusedSoils = oldSoils.filter(id => selectedSoils.indexOf(id) === -1);
    const unusedGrounds = oldGrounds.filter(id => selectedGrounds.indexOf(id) === -1);
    const unusedWaters = oldWaters.filter(id => selectedWaters.indexOf(id) === -1);
    const unusedClimates = oldClimates.filter(id => selectedClimates.indexOf(id) === -1);
    const unusedFoundations = oldFoundaments.filter(id => selectedFoundaments.indexOf(id) === -1);
    
    const fetchData = async () => {
        try {
          if (newLandscapePlants.length !== 0) {
              insertNewLandscapePlants(landscapeId, newLandscapePlants);
          }
          if (newRelief.length !== 0) {
              insertNewLandscapeReliefs(landscapeId, newRelief);
          }
          if (newSoils.length !== 0) {
              insertNewLandscapeSoils(landscapeId, newSoils);
          }
          if (newGrounds.length !== 0) {
              insertNewLandscapeGrounds(landscapeId, newGrounds);
          }
          if (newWaters.length !== 0) {
              insertNewLandscapeWaters(landscapeId, newWaters);
          }
          if (newClimates.length !== 0) {
              insertNewLandscapeClimates(landscapeId, newClimates);
          }
          if (newFoundations.length !== 0) {
            insertNewLandscapeFoundation(landscapeId, newFoundations);
          }

          if (unusedPlants.length !== 0) {
              removePlantLandscapeConnection(landscapeId, unusedPlants);
          }
          if (unusedReliefs.length !== 0) {
              removeReliefLandscapeConnection(landscapeId, unusedReliefs);
          }
          if (unusedSoils.length !== 0) {
              removeSoilLandscapeConnection(landscapeId, unusedSoils);
          }
          if (unusedGrounds.length !== 0) {
              removeGroundLandscapeConnection(landscapeId, unusedGrounds);
          }
          if (unusedWaters.length !== 0) {
              removeWaterLandscapeConnection(landscapeId, unusedWaters);
          }
          if (unusedClimates.length !== 0) {
              removeClimatLandscapeConnection(landscapeId, unusedClimates);
          }
          if (unusedFoundations.length !== 0) {
              removefFoundationLandscapeConnection(landscapeId, unusedFoundations);
          }
          enqueueSnackbar('Ландшафт был успешно настроен', {variant: 'success'})
        } catch(error: any) {
          enqueueSnackbar('Ошибка связывания ланлшафта', { variant: 'error' })
        }

    };
    fetchData();
    
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <FormControl sx={{ width: '33%' }}>
        <InputLabel>Выберите ландшафт</InputLabel>
        <Select
          value={selectedId}
          label="Выберите ландшафт"
          onChange={(e) => handleSelectedLandscape(e.target.value as number)}
        >
          {landscapes.map((landscape) => (
            <MenuItem key={landscape.id} value={landscape.id}>
              {landscape.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedLandscape &&
        <Button variant="contained" color="primary" onClick={() => handleSave(selectedLandscape?.id)}>
            💾 Сохранить
        </Button>
      }
      
    </Box>

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
            <Grid item xs={4}>
              <ConstructorSelector
                tabName="Фундаменты"
                objects={foundaments}
                selectedObjects={selectedFoundaments}
                setSelectedObjects={ setSelectedFoundaments }
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
