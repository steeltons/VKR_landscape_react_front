import api from "./api";
import { getAllTerritories } from "./territory";

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

export type LandscapeFoundationConnectionRsDto = {
  connection_id: number;
  landscape_id: number;
  foundation_id: number;
};


export async function getAllLandscapeReliefs(landscapeId: number): Promise<number[]> {
  const response = await api.get('/connections_landscapes_reliefs/all');
  return (response.data as LandscapeReliefConnectionRsDto[])
    .filter(item => item.landscape_id === landscapeId)
    .map(item => item.relief_id);
}

export async function insertNewLandscapeReliefs(landscapeId: number, reliefIds: number[]): Promise<void> {
  for (const reliefId of reliefIds) {
    await api.post('/connections_landscapes_reliefs/insert', null, {
      params: { landscape_id: landscapeId, relief_id: reliefId }
    });
  }
}

export async function getAllLandscapePlants(landscapeId: number): Promise<number[]> {
  const response = await api.get('/connections_landscapes_plants/all');
  const data = response.data as { connection_id: number; landscape_id: number; plant_id: number }[];
  return data.filter(d => d.landscape_id === landscapeId).map(d => d.plant_id);
}

export async function insertNewLandscapePlants(landscapeId: number, plantIds: number[]): Promise<void> {
  for (const plantId of plantIds) {
    await api.post('/connections_landscapes_plants/insert', null, {
      params: { landscape_id: landscapeId, plant_id: plantId }
    });
  }
}

// Аналогично для soils
export async function getAllLandscapeSoils(landscapeId: number): Promise<number[]> {
  const response = await api.get('/connections_landscapes_soils/all');
  const data = response.data as { connection_id: number; landscape_id: number; soil_id: number }[];
  return data.filter(d => d.landscape_id === landscapeId).map(d => d.soil_id);
}

export async function insertNewLandscapeSoils(landscapeId: number, soilIds: number[]): Promise<void> {
  for (const soilId of soilIds) {
    await api.post('/connections_landscapes_soils/insert', null, {
      params: { landscape_id: landscapeId, soil_id: soilId }
    });
  }
}

// Для grounds
export async function getAllLandscapeGrounds(landscapeId: number): Promise<number[]> {
  const response = await api.get('/connections_landscapes_grounds/all');
  const data = response.data as { connection_id: number; landscape_id: number; ground_id: number }[];
  return data.filter(d => d.landscape_id === landscapeId).map(d => d.ground_id);
}

export async function insertNewLandscapeGrounds(landscapeId: number, groundIds: number[]): Promise<void> {
  for (const groundId of groundIds) {
    await api.post('/connections_landscapes_grounds/insert', null, {
      params: { landscape_id: landscapeId, ground_id: groundId }
    });
  }
}

// Для waters
export async function getAllLandscapeWaters(landscapeId: number): Promise<number[]> {
  const response = await api.get('/connections_landscapes_waters/all');
  const data = response.data as { connection_id: number; landscape_id: number; water_id: number }[];
  return data.filter(d => d.landscape_id === landscapeId).map(d => d.water_id);
}

export async function insertNewLandscapeWaters(landscapeId: number, waterIds: number[]): Promise<void> {
  for (const waterId of waterIds) {
    await api.post('/connections_landscapes_waters/insert', null, {
      params: { landscape_id: landscapeId, water_id: waterId }
    });
  }
}

// Для climats
export async function getAllLandscapeClimates(landscapeId: number): Promise<number[]> {
  const response = await api.get('/connections_landscapes_climats/all');
  const data = response.data as { connection_id: number; landscape_id: number; climat_id: number }[];
  return data.filter(d => d.landscape_id === landscapeId).map(d => d.climat_id);
}

export async function getAllLandscapeFoundation(landscapeId: number): Promise<number[]> {
  const response = await api.get('/connections_landscapes_foundations/all');
  const data = response.data as { connection_id: number; landscape_id: number; foundation_id: number }[];
  return data.filter(d => d.landscape_id === landscapeId).map(d => d.foundation_id);
}

export async function insertNewLandscapeFoundation(landscapeId: number, ids: number[]) {
  for (const id of ids) {
    api.post('/connections_landscapes_foundations/insert', null, {
      params: {landscape_id: landscapeId, foundation_id: id}
    });
  }
}

export async function getAllLandscapeTerritories(landscapeId: number): Promise<number[]> {
  const response = await getAllTerritories();

  return response.filter(d => d.territorie_landscape_id === landscapeId).map(d => d.territorie_id);
}

export async function insertNewLandscapeClimates(landscapeId: number, climatIds: number[]): Promise<void> {
  for (const climatId of climatIds) {
    await api.post('/connections_landscapes_climats/insert', null, {
      params: { landscape_id: landscapeId, climat_id: climatId }
    });
  }
}

export async function removePlantLandscapeConnection(landscapeId: number, plantIds: number[]): Promise<void> {
  const response = await api.get('/connections_landscapes_plants/all');
  const connections = response.data as { connection_id: number; landscape_id: number; plant_id: number }[];

  connections
    .filter(c => c.landscape_id === landscapeId && plantIds.includes(c.plant_id))
    .forEach(c => api.delete('/connections_landscapes_plants/delete', { params: { connection_id: c.connection_id } }));
}

export async function removeSoilLandscapeConnection(landscapeId: number, soilIds: number[]): Promise<void> {
  const response = await api.get('/connections_landscapes_soils/all');
  const connections = response.data as { connection_id: number; landscape_id: number; soil_id: number }[];

  connections
    .filter(c => c.landscape_id === landscapeId && soilIds.includes(c.soil_id))
    .forEach(c => api.delete('/connections_landscapes_soils/delete', { params: { connection_id: c.connection_id } }));
}

export async function removeGroundLandscapeConnection(landscapeId: number, groundIds: number[]): Promise<void> {
  const response = await api.get('/connections_landscapes_grounds/all');
  const connections = response.data as { connection_id: number; landscape_id: number; ground_id: number }[];

  connections
    .filter(c => c.landscape_id === landscapeId && groundIds.includes(c.ground_id))
    .forEach(c => api.delete('/connections_landscapes_grounds/delete', { params: { connection_id: c.connection_id } }));
}

export async function removeWaterLandscapeConnection(landscapeId: number, waterIds: number[]): Promise<void> {
  const response = await api.get('/connections_landscapes_waters/all');
  const connections = response.data as { connection_id: number; landscape_id: number; water_id: number }[];

  connections
    .filter(c => c.landscape_id === landscapeId && waterIds.includes(c.water_id))
    .forEach(c => api.delete('/connections_landscapes_waters/delete', { params: { connection_id: c.connection_id } }));
}

export async function removeClimatLandscapeConnection(landscapeId: number, climatIds: number[]): Promise<void> {
  const response = await api.get('/connections_landscapes_climats/all');
  const connections = response.data as { connection_id: number; landscape_id: number; climat_id: number }[];

  connections
    .filter(c => c.landscape_id === landscapeId && climatIds.includes(c.climat_id))
    .forEach(c => api.delete('/connections_landscapes_climats/delete', { params: { connection_id: c.connection_id } }));
}

export async function removeReliefLandscapeConnection(landscapeId: number, reliefIds: number[]): Promise<void> {
  const response = await api.get('/connections_landscapes_reliefs/all');
  const connections = response.data as { connection_id: number; landscape_id: number; relief_id: number }[];

  connections
    .filter(c => c.landscape_id === landscapeId && reliefIds.includes(c.relief_id))
    .forEach(c => api.delete('/connections_landscapes_reliefs/delete', { params: { connection_id: c.connection_id } }));
}

export async function removefFoundationLandscapeConnection(landscapeId: number, foundations: number[]): Promise<void> {
  const response = await api.get('/connections_landscapes_foundations/all');
  const connections = response.data as { connection_id: number; landscape_id: number; foundation_id: number }[];

  connections
    .filter(c => c.landscape_id === landscapeId && foundations.includes(c.foundation_id))
    .forEach(c => api.delete('/connections_landscapes_foundations/delete', { params: { connection_id: c.connection_id } }));
}

