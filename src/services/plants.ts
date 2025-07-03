import api from './api';

const PLANT_URI = '/plants';
const CURRENT_BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyb290IiwiaXNfYWRtaW4iOiJ0cnVlIiwiZXhwIjoxNzUxNTQxOTczfQ.zjpKaZahkqdk7FMQyfoj3e7eODoYHQC56DlJldvwTRI';

export type PlantRsDto = {
  plant_id: number;
  plant_name: string;
  plant_description: string;
  plant_picture_id?: number;
  plant_picture_base64?: string;
};

export type CreatePlantRqDto = {
  plant_name: string;
  plant_description: string;
  plant_picture_id?: number;
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

export async function createPlant(data: CreatePlantRqDto): Promise<PlantRsDto> {
  const response = await api.post(PLANT_URI + '/insert', null, 
    {
      params: data,
      headers: {
        'Authorization': `Bearer ${CURRENT_BEARER_TOKEN}`
      }
    },
  );
  return response.data as PlantRsDto;
}

export async function deletePlant(plantId: number): Promise<void> {
  await api.delete(`${PLANT_URI}/${plantId}`);
}
