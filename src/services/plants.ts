import { ResponseMessage } from '../common/models';
import api from './api';

const PLANT_URI = '/plants';

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

export type UpdatePlantRqDto = {
  plant_id?: number;
  plant_name?: string;
  plant_description?: string;
  plant_picture_id?: number;
}

export async function getAllPlants(isNeedPicture: boolean = false): Promise<PlantRsDto[]> {
  const response = await api.get(PLANT_URI + '/all', { params:  {is_need_pictures: isNeedPicture}});
  return response.data as PlantRsDto[];
}

export async function getPlantById(plantId: number): Promise<PlantRsDto> {
  const response = await api.get(`${PLANT_URI}/${plantId}`);
  return response.data as PlantRsDto;
}

export async function createPlant(data: CreatePlantRqDto): Promise<ResponseMessage> {
  const response = await api.post(PLANT_URI + '/insert', data);
  return response.data as ResponseMessage;
}

export async function updatePlant(data: UpdatePlantRqDto): Promise<ResponseMessage> {
  const response = await api.patch(PLANT_URI + '/update', null,
    {
      params: data
    }
  )
  console.log(response.data)
  return response.data as ResponseMessage;
}

export async function deletePlantById(plantId: number): Promise<void> {
  await api.delete(PLANT_URI + '/delete', {
    params: {
      plant_id: plantId
    },
  });
}
