import api from "./api";

const COORDINATE_URI_PATH = '/coords'

export type CoordinatesRsDto = {
    coord_id: number,
    coords_coord_x: number;
    coords_coord_y: number;
    coords_territorie_id: number,
    coords_order: number
}

export async function getAllCoords() : Promise<CoordinatesRsDto[]> {
    try {
        const response = await api.get(COORDINATE_URI_PATH + '/all');
        
        return response.data as CoordinatesRsDto[]
    } catch (error) {
        console.log(error)
        throw error
    }
}

export type CoorinateCreateRqDto = {
    coord_x: number;
    coord_y: number;
    territorie_id: number;
    order: number;
}
export async function insertNewCoordinate(data: CoorinateCreateRqDto) : Promise<void> {
    await api.post('/coords/insert', null, {
        params: data
    });
}

export async function getCoordinateById(coodinateId: number) : Promise<CoordinatesRsDto> {
    try {
        const queryParams = {coord_id : coodinateId}
        const response = await api.get(
            COORDINATE_URI_PATH + '/one',
            {
                params : queryParams
            }
        )

        return response.data as CoordinatesRsDto
    } catch (error) {
        console.log(error)
        throw error
    }
}
