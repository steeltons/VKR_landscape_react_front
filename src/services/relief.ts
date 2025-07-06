// services/relief.ts
import { ResponseMessage } from '../common/models';
import api from './api';

export interface ReliefRsDto {
  relief_id: number;
  relief_name: string;
  relief_description: string;
  relief_picture_id: number;
  relief_picture_base64: string;
}

export interface CreateReliefRqDto {
  relief_name: string;
  relief_description: string;
  relief_picture_id?: number;
}

export interface UpdateReliefRqDto {
  relief_id?: number;
  relief_name?: string;
  relief_description?: string;
  relief_picture_id?: number;
}

// Получить все рельефы
export async function getAllReliefs(isNeedPicture: boolean = false): Promise<ReliefRsDto[]> {
  const response = await api.get('/reliefs/all', {
    params: {
        is_need_pictures: isNeedPicture
    }
  });
  return response.data;
}

// Получить один рельеф
export async function getReliefById(relief_id: number): Promise<ReliefRsDto> {
  const response = await api.get('/reliefs/one', {
    params: { relief_id },
  });
  return response.data;
}

// Добавить новый рельеф
export async function insertRelief(data: CreateReliefRqDto): Promise<ResponseMessage> {
  const response = await api.post('/reliefs/insert', null, {
    params: data,
  });
  return response.data;
}

// Обновить рельеф
export async function updateRelief(data: UpdateReliefRqDto): Promise<ResponseMessage> {
  const response = await api.patch('/reliefs/update', null, {
    params: data,
  });
  return response.data;
}

// Удалить рельеф
export async function deleteRelief(relief_id: number): Promise<ResponseMessage> {
  const response = await api.delete('/reliefs/delete', {
    params: { relief_id },
  });
  return response.data;
}
