import { ApiException } from "../common/exceptions";
import api from "./api";

const PICTURES_URL = '/pictures'

export type PictureRsDto = {
  picture_id: number;
  picture_base64: string;
}

/**
 * Загружает изображение как файл на сервер и получает ID.
 * @param file Файл изображения
 * @returns ID сохранённой картинки
 */
export async function uploadImageFile(file: File): Promise<number> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(PICTURES_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (!response.data.id) {
    throw new ApiException('Не удалось получить ID изображения из ответа', 500)
  }

  return response.data.id;
}

export async function getImageById(imageId: number) : Promise<PictureRsDto> {
  const response = await api.get(PICTURES_URL + `/${imageId}`);
  return response.data[0];
}