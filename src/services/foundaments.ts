// services/foundations.ts
import { ResponseMessage } from '../common/models';
import api from './api';

export interface FoundationRsDto {
  foundation_id: number;
  foundation_name: string;
  foundation_description: string;
  foundation_picture_id: number;
  foundation_depth_roof_root_in_meters: number;
  foundation_picture_base64: string;
}

export interface CreateFoundationRqDto {
  foundation_name: string;
  foundation_description: string;
  foundation_depth_roof_root_in_meters: number;
  foundation_picture_id?: number;
}

export interface UpdateFoundationRqDto {
  foundation_id?: number;
  foundation_name?: string;
  foundation_description?: string;
  foundation_depth_roof_root_in_meters?: number;
  foundation_picture_id?: number;
}

// Получить все фундаменты
export async function getAllFoundations(isNeedPicture: boolean = false): Promise<FoundationRsDto[]> {
  const response = await api.get('/foundations/all', {
    params: {
        is_need_pictures: isNeedPicture
    }
  });
  return response.data;
}

// Получить один фундамент
export async function getFoundationById(foundation_id: number): Promise<FoundationRsDto> {
  const response = await api.get('/foundations/one', {
    params: { foundation_id },
  });
  return response.data;
}

// Добавить новый фундамент
export async function insertFoundation(data: CreateFoundationRqDto): Promise<ResponseMessage> {
  const response = await api.post('/foundations/insert', null, {
    params: data,
  });
  return response.data;
}

// Обновить фундамент
export async function updateFoundation(data: UpdateFoundationRqDto): Promise<ResponseMessage> {
  const response = await api.patch('/foundations/update', null, {
    params: data,
  });
  return response.data;
}

// Удалить фундамент
export async function deleteFoundation(foundation_id: number): Promise<ResponseMessage> {
  const response = await api.delete('/foundations/delete', {
    params: { foundation_id },
  });
  return response.data;
}
