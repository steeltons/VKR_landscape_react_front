import api from './api';

const PLANT_URI = '/plants';

export type PlantRsDto = {
  plant_id: number;
  plant_name: string;
  plant_description: string;
  plant_picture_id?: number;
  plant_picture_base64?: string;
};

export type CreatePlantDto = {
  plant_name: string;
  plant_description: string;
  plant_picture_base64?: string;
};

export async function getAllPlants(): Promise<PlantRsDto[]> {
  const response = await api.get(PLANT_URI + '/all', { params:  {is_need_pictures: true}});
  console.log(response.data as PlantRsDto[])
  return response.data as PlantRsDto[];
}

export async function getPlantById(plantId: number): Promise<PlantRsDto> {
  const response = await api.get(`${PLANT_URI}/${plantId}`);
  return response.data as PlantRsDto;
}

export async function createPlant(data: CreatePlantDto): Promise<PlantRsDto> {
  const response = await api.post(PLANT_URI, data);
  return response.data as PlantRsDto;
}

export async function deletePlant(plantId: number): Promise<void> {
  await api.delete(`${PLANT_URI}/${plantId}`);
}
