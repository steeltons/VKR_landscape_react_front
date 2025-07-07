import { ResponseMessage } from '../common/models';
import api from './api';

export interface GroundRsDto {
  ground_id: number;
  ground_name: string;
  ground_description: string;
  ground_density: number;
  ground_humidity: number;
  ground_solidity: number;
  ground_picture_id: number;
  ground_picture_base64: string;
}

export interface CreateGroundRqDto {
  ground_name: string;
  ground_description: string;
  ground_density: number;
  ground_humidity: number;
  ground_solidity: number;
  ground_picture_id?: number;
}

export interface UpdateGroundRqDto extends Partial<CreateGroundRqDto> {
  ground_id?: number;
}

// Получить все грунты
export async function getAllGrounds(isNeedPicture: boolean = false): Promise<GroundRsDto[]> {
  const response = await api.get('/grounds/all', {
    params: {
        is_need_pictures: isNeedPicture
    }
  });
  return response.data;
}

// Получить один грунт
export async function getGroundById(ground_id: number): Promise<GroundRsDto> {
  const response = await api.get('/grounds/one', {
    params: { ground_id },
  });
  return response.data[0] as GroundRsDto;
}

// Добавить новый грунт
export async function insertGround(data: CreateGroundRqDto): Promise<ResponseMessage> {
  const response = await api.post('/grounds/insert', null, { params: data });
  return response.data;
}

// Обновить грунт
export async function updateGround(data: UpdateGroundRqDto): Promise<ResponseMessage> {
  const response = await api.patch('/grounds/update', null, { params: data });
  return response.data;
}

// Удалить грунт
export async function deleteGround(ground_id: number): Promise<ResponseMessage> {
  const response = await api.delete('/grounds/delete', { params: { ground_id } });
  return response.data;
}
