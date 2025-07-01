import { Climat, Foundation, Ground, Landscape, Plant, Relief, Soil, Territorie, Water } from "../common/models";
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

export interface RelatedObjectsRsDto {
    territories: RelatedObjectRsDto[] 
}

export async function getRelatedObjectsByCoord(pointX: number, pointY: number, isNeedPictures: boolean = false): Promise<RelatedObjectsRsDto> {
  try {
    const response = await api.post('/territories/point-related-objects', null, {
      params: {
        point_x: pointX,
        point_y: pointY,
        is_need_pictures: isNeedPictures
      }
    });
    
    return response.data;
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}
