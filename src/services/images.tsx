import api from "./api";

const PICTURES_URL = '/pictures'
const CURRENT_BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyb290IiwiaXNfYWRtaW4iOiJ0cnVlIiwiZXhwIjoxNzUxNTQxOTczfQ.zjpKaZahkqdk7FMQyfoj3e7eODoYHQC56DlJldvwTRI';

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
      "Authorization": `Bearer ${CURRENT_BEARER_TOKEN}`
    },
  });

  if (!response.data.id) {
    throw new Error("Не удалось получить ID изображения из ответа");
  }

  return response.data.id;
}
