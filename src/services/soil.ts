import { ResponseMessage } from '../common/models';
import api from './api';

export interface SoilRsDto {
  soil_id: number;
  soil_name: string;
  soil_description: string;
  soil_acidity: number;
  soil_minerals: string;
  soil_profile: string;
  soil_picture_id: number;
  soil_picture_base64: string;
}

export interface CreateSoilRqDto {
  soil_name: string;
  soil_description: string;
  soil_acidity: number;
  soil_minerals: string;
  soil_profile: string;
  soil_picture_id?: number;
}

export interface UpdateSoilRqDto extends Partial<CreateSoilRqDto> {
  soil_id?: number;
}

// Получить все почвы
export async function getAllSoils(isNeedPicture: boolean = false): Promise<SoilRsDto[]> {
  const response = await api.get('/soils/all', {
    params: {
        is_need_pictures: isNeedPicture
    }
  });
  return response.data;
}

// Получить одну почву
export async function getSoilById(soil_id: number): Promise<SoilRsDto> {
  const response = await api.get('/soils/one', {
    params: { soil_id },
  });
  return response.data[0];
}

// Добавить новую почву
export async function insertSoil(data: CreateSoilRqDto): Promise<ResponseMessage> {
  const response = await api.post('/soils/insert', null, { params: data });
  return response.data;
}

// Обновить почву
export async function updateSoil(data: UpdateSoilRqDto): Promise<ResponseMessage> {
  const response = await api.patch('/soils/update', null, { params: data });
  return response.data;
}

// Удалить почву
export async function deleteSoil(soil_id: number): Promise<ResponseMessage> {
  const response = await api.delete('/soils/delete', { params: { soil_id } });
  return response.data;
}
