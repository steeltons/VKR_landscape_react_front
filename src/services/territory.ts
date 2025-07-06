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

export interface TerritorieRsDto {
  territorie_id: number;
  territorie_landscape_id: number;
  territorie_description: number;
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

export async function getTerritorieById(territorieId: number) : Promise<TerritorieRsDto> {
  const response  = await api.get('/territories/one', {
    params: {
      territorie_id: territorieId
    }
  })
  return response.data[0] as TerritorieRsDto;
}