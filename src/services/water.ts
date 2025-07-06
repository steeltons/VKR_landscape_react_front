import { ResponseMessage } from '../common/models';
import api from './api';

export interface WaterRsDto {
  water_id: number;
  water_name: string;
  water_description: string;
  water_picture_id: number;
  water_picture_base64: string;
}

export interface CreateWaterRqDto {
  water_name: string;
  water_description: string;
  water_picture_id?: number;
}

export interface UpdateWaterRqDto extends Partial<CreateWaterRqDto> {
  water_id?: number;
}

// Получить все воды
export async function getAllWaters(isNeedPicture: boolean = false): Promise<WaterRsDto[]> {
  const response = await api.get('/waters/all', {
    params: {
        is_need_pictures: isNeedPicture
    }
  });
  return response.data;
}

// Получить одну воду
export async function getWaterById(water_id: number): Promise<WaterRsDto> {
  const response = await api.get('/waters/one', {
    params: { water_id },
  });
  return response.data;
}

// Добавить новую воду
export async function insertWater(data: CreateWaterRqDto): Promise<ResponseMessage> {
  const response = await api.post('/waters/insert', null, { params: data });
  return response.data;
}

// Обновить воду
export async function updateWater(data: UpdateWaterRqDto): Promise<ResponseMessage> {
  const response = await api.patch('/waters/update', null, { params: data });
  return response.data;
}

// Удалить воду
export async function deleteWater(water_id: number): Promise<ResponseMessage> {
  const response = await api.delete('/waters/delete', { params: { water_id } });
  return response.data;
}
