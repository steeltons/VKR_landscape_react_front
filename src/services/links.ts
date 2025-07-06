import api from "./api";

// DTO для связей
export type LandscapePlantConnectionRsDto = {
  connection_id: number;
  landscape_id: number;
  plant_id: number;
};

export type LandscapeReliefConnectionRsDto = {
  connection_id: number;
  landscape_id: number;
  relief_id: number;
};

export type LandscapeSoilConnectionRsDto = {
  connection_id: number;
  landscape_id: number;
  soil_id: number;
};

export type LandscapeGroundConnectionRsDto = {
  connection_id: number;
  landscape_id: number;
  ground_id: number;
};

export type LandscapeWaterConnectionRsDto = {
  connection_id: number;
  landscape_id: number;
  water_id: number;
};

export type LandscapeClimateConnectionRsDto = {
  connection_id: number;
  landscape_id: number;
  climate_id: number;
};

// Запросы на получение по ID ландшафта
export async function getAllLandscapePlants(landscapeId: number): Promise<number[]> {
  const response = await api.get('/connections_landscapes_plants/all');
  return (response.data as LandscapePlantConnectionRsDto[])
    .filter(item => item.landscape_id === landscapeId)
    .map(item => item.plant_id);
}

export async function getAllLandscapeReliefs(landscapeId: number): Promise<number[]> {
  const response = await api.get('/connections_landscapes_reliefs/all');
  return (response.data as LandscapeReliefConnectionRsDto[])
    .filter(item => item.landscape_id === landscapeId)
    .map(item => item.relief_id);
}

export async function getAllLandscapeSoils(landscapeId: number): Promise<number[]> {
  const response = await api.get('/connections_landscapes_soils/all');
  return (response.data as LandscapeSoilConnectionRsDto[])
    .filter(item => item.landscape_id === landscapeId)
    .map(item => item.soil_id);
}

export async function getAllLandscapeGrounds(landscapeId: number): Promise<number[]> {
  const response = await api.get('/connections_landscapes_grounds/all');
  return (response.data as LandscapeGroundConnectionRsDto[])
    .filter(item => item.landscape_id === landscapeId)
    .map(item => item.ground_id);
}

export async function getAllLandscapeWaters(landscapeId: number): Promise<number[]> {
  const response = await api.get('/connections_landscapes_waters/all');
  return (response.data as LandscapeWaterConnectionRsDto[])
    .filter(item => item.landscape_id === landscapeId)
    .map(item => item.water_id);
}

export async function getAllLandscapeClimates(landscapeId: number): Promise<number[]> {
  const response = await api.get('/connections_landscapes_climats/all');
  return (response.data as LandscapeClimateConnectionRsDto[])
    .filter(item => item.landscape_id === landscapeId)
    .map(item => item.climate_id);
}
