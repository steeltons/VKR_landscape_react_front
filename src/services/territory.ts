import { Climat, CustomColor, Foundation, Ground, Landscape, Plant, Relief, Soil, Territorie, Water } from "../common/models";
import api from "./api";

const TERRITORIE_URI = '/territories'

export interface RelatedObjectRsDto {
    territorie: Territorie;
    landscape: Landscape;
    soils: Soil[];
    grounds: Ground[];
    plants: Plant[];
    reliefs: Relief[];
    foundations: Foundation[];
    waters: Water[];
    climats: Climat[];
}

export interface TerritorieRsDto {
  territorie_id: number;
  territorie_landscape_id: number;
  territorie_description: string;
  territorie_color_r: number;
  territorie_color_g: number;
  territorie_color_b: number;
}

export interface RelatedObjectsRsDto {
    territories: RelatedObjectRsDto[] 
}

export async function getRelatedObjectsByCoord(pointX: number, pointY: number, isNeedPictures: boolean = false): Promise<RelatedObjectsRsDto> {
  const response = await api.post('/territories/point-related-objects', null, {
      params: {
        point_x: pointX,
        point_y: pointY,
        is_need_pictures: isNeedPictures
      }
    });
  return response.data;
}

export type TerritorieCreateRsDto = {
  message: string,
  id: number
} 

export async function createColoredTerritory(color: CustomColor) : Promise<number> {
  const response = await api.post('/territories/insert', null, {
    params: {
      territorie_color_r: color.red,
      territorie_color_g: color.greeen,
      territorie_color_b: color.blue
    }
  });
  const data = response.data as TerritorieCreateRsDto;
  
  return data.id;
}

export interface CreateTerritorieRqDto {
  territorie_description: string;
  territorie_color_r: number;
  territorie_landscape_id?: number | null,
  territorie_color_g: number;
  territorie_color_b: number;
}

export interface UpdateTerritorieRqDto extends CreateTerritorieRqDto {
  territorie_id?: number;
}

const BASE = "/territories";

export async function getAllTerritories(): Promise<TerritorieRsDto[]> {
  const res = await api.get(`${BASE}/all`);
  return res.data;
}

export async function getTerritorieById(id: number): Promise<TerritorieRsDto> {
  const res = await api.get(`${BASE}/one`, {
    params: { territorie_id: id },
  });
  return res.data[0]; // API возвращает массив
}

export async function insertTerritorie(data: CreateTerritorieRqDto): Promise<TerritorieCreateRsDto> {
  const res = await api.post(`${BASE}/insert`, null, {
    params: data,
  });
  return res.data;
}

export async function updateTerritorie(data: UpdateTerritorieRqDto): Promise<{ message: string }> {
  const res = await api.patch(`${BASE}/update`, null, {
    params: data,
  });
  return res.data;
}

export async function deleteTerritorie(id: number): Promise<{ message: string }> {
  const res = await api.delete(`${BASE}/delete`, {
    params: { territorie_id: id },
  });
  return res.data;
}

export async function uniteTerritorieLandscape(territireId: number) {
  await api.patch('/territories/untie_landscape', null, {
    params: {
      territorie_id: territireId
    }
  });
}