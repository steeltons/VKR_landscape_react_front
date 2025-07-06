// services/climat.ts
import { ResponseMessage } from '../common/models';
import api from './api';

export interface ClimatRsDto {
  climat_id: number;
  climat_name: string;
  climat_description: string;
  climat_picture_id: number;
  climat_picture_base64: string;
}

export interface CreateClimatRqDto {
  climat_name: string;
  climat_description: string;
  climat_picture_id?: number;
}

export interface UpdateClimatRqDto {
  climat_id?: number;
  climat_name?: string;
  climat_description?: string;
  climat_picture_id?: number;
}

// Получить все климаты
export async function getAllClimats(isNeedPicture: boolean = false): Promise<ClimatRsDto[]> {
  const response = await api.get('/climats/all', {
    params: {
        is_need_pictures: isNeedPicture
    }
  });
  return response.data;
}

// Получить один климат
export async function getClimatById(climat_id: number): Promise<ClimatRsDto> {
  const response = await api.get('/climats/one', {
    params: { climat_id },
  });
  return response.data;
}

// Добавить новый климат
export async function insertClimat(data: CreateClimatRqDto): Promise<ResponseMessage> {
  const response = await api.post('/climats/insert', null, {
    params: data,
  });
  return response.data;
}

// Обновить климат
export async function updateClimat(data: UpdateClimatRqDto): Promise<ResponseMessage> {
  const response = await api.patch('/climats/update', null, {
    params: data,
  });
  return response.data;
}

// Удалить климат
export async function deleteClimat(climat_id: number): Promise<ResponseMessage> {
  const response = await api.delete('/climats/delete', {
    params: { climat_id },
  });
  return response.data;
}
