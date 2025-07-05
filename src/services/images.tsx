import api from "./api";

const PICTURES_URL = '/pictures'

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
    throw new Error("Не удалось получить ID изображения из ответа");
  }

  return response.data.id;
}
