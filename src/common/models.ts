export interface Territorie {
  territorie_id: number;
  territorie_landscape_id: number;
  territorie_description: string;
}

export interface Landscape {
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

export interface Soil {
  soil_id: number;
  soil_name: string;
  soil_description: string;
  soil_acidity: number;
  soil_minerals: string;
  soil_profile: string;
  soil_picture_id: number;
  soil_picture_base64: string;
}

export interface Ground {
  ground_id: number;
  ground_name: string;
  ground_description: string;
  ground_density: number;
  ground_humidity: number;
  ground_solidity: number;
  ground_picture_id: number;
  ground_picture_base64: string;
}

export interface Plant {
  plant_id: number;
  plant_name: string;
  plant_description: string;
  plant_picture_id: number;
  plant_picture_base64: string;
}

export interface Relief {
  relief_id: number;
  relief_name: string;
  relief_description: string;
  relief_picture_id: number;
  relief_picture_base64: string;
}

export interface Foundation {
  foundation_id: number;
  foundation_name: string;
  foundation_description: string;
  foundation_depth_roof_root_in_meters: number;
  foundation_picture_id: number;
  foundation_picture_base64: string;
}

export interface Water {
  water_id: number;
  water_name: string;
  water_description: string;
  water_picture_id: number;
  water_picture_base64: string;
}

export interface Climat {
  climat_id: number;
  climat_name: string;
  climat_description: string;
  climat_picture_id: number;
  climat_picture_base64: string;
}

export type CustomColor = {
  red: number;
  greeen: number;
  blue: number;
  alt?: number;
}

export type ResponseMessage = {
  message: string;
}

export type ErrorResponse = {
  detail: string;
}