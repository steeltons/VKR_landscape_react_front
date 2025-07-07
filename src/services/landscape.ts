// services/landscape.ts
import { ResponseMessage } from '../common/models';
import api from './api';

export interface LandscapeRsDto {
  landscape_id: number;
  landscape_name: string;
  landscape_code: string;
  landscape_description: string;
  landscape_area_in_square_kilometers: number;
  landscape_area_in_percents: number;
  landscape_KR: number;
  landscape_picture_id: number;
  landscape_picture_base64: string;
}

export interface CreateLandscapeRqDto {
  landscape_name: string;
  landscape_code: string;
  landscape_description: string;
  landscape_area_in_square_kilometers: number;
  landscape_area_in_percents: number;
  landscape_KR: number;
  landscape_picture_id?: number;
}

export interface UpdateLandscapeRqDto {
  landscape_id?: number;
  landscape_name?: string;
  landscape_code?: string;
  landscape_description?: string;
  landscape_area_in_square_kilometers?: number;
  landscape_area_in_percents?: number;
  landscape_KR?: number;
  landscape_picture_id?: number;
}

export async function getAllLandscapes(isNeedPicture: boolean = false, page?: number, elements?: number, ): Promise<LandscapeRsDto[]> {
  const response = await api.get('/landscapes/all', {
    params: {
        is_need_pictures: isNeedPicture,
        page: page,
        elements: elements
    }
  });
  return response.data;
}

export async function getLandscapeById(landscape_id: number): Promise<LandscapeRsDto> {
  const response = await api.get('/landscapes/one', {
    params: { landscape_id },
  });
  return response.data[0];
}

export async function insertLandscape(data: CreateLandscapeRqDto): Promise<ResponseMessage> {
  const response = await api.post('/landscapes/insert', null, {
    params: data,
  });
  return response.data;
}

export async function updateLandscape(data: UpdateLandscapeRqDto): Promise<ResponseMessage> {
  const response = await api.patch('/landscapes/update', null, {
    params: data,
  });
  return response.data;
}

export async function deleteLandscape(landscape_id: number): Promise<ResponseMessage> {
  const response = await api.delete('/landscapes/delete', {
    params: { landscape_id },
  });
  return response.data;
}
