import { ErrorResponse } from "react-router-dom";
import { ResponseMessage } from "../common/models";
import api from "./api";

const USER_URL = 'users';

export type RegisterUserRqDto = {
    user_login: string;
    user_password: string;
    user_email: string;
}

export type UserRsDto = {
    user_id: number;
    user_login: string;
    user_password: string;
    user_email: string;
    user_surname: string;
    user_name: string;
    user_fathername: string;
    user_age: number;
    user_is_female: boolean;
    user_is_admin: boolean;
    user_picture_id: number;
    user_picture_base64: string;
}

export interface CreateUserRqDto {
  user_login: string;
  user_password: string;
  user_email: string;
  user_surname: string;
  user_name: string;
  user_fathername?: string;
  user_age: number;
  user_is_female: number;
  user_is_admin?: string;
  user_picture_id?: number;
}

export interface UpdateUserRqDto {
  user_id: number;
  user_login?: string;
  user_password?: string;
  user_email?: string;
  user_surname?: string;
  user_name?: string;
  user_fathername?: string;
  user_age?: number;
  user_is_female?: number;
  user_picture_id?: number;
}

export async function registerUser(data: RegisterUserRqDto) : Promise<ResponseMessage> {
    const response = await api.post(USER_URL + '/insert', null, {
            params: data
        });
    return response.data;
}

export async function getAllUsers(isNeedPicture: boolean = false) : Promise<UserRsDto[]> {
  const response = await api.get(USER_URL + '/all', {
    params: {
      is_need_pictures: isNeedPicture
    }
  })
  return response.data as UserRsDto[];
}

export async function getUserById(userId: number, isNeedPicture: boolean = false) : Promise<UserRsDto> {
    const response = await api.get(USER_URL + '/one', {
        params: {
            user_id: userId,
            is_need_pictures: isNeedPicture
        }
    });
    return response.data[0];
}

export async function insertUser(data: CreateUserRqDto): Promise<ResponseMessage> {
  const response = await api.post('/users/insert', null, {
    params: data,
  });
  return response.data;
}

export async function updateUser(data: UpdateUserRqDto): Promise<ResponseMessage> {
  const response = await api.patch('/users/update', null, {
    params: data,
  });
  return response.data;
}

export async function setUserAdmin(userId: number): Promise<ResponseMessage> {
  const response = await api.patch(`/users/${userId}/set-admin`);
  return response.data;
}

export async function revokeUserAdmin(userId: number) : Promise<ResponseMessage> {
  const response = await api.patch(`/users/${userId}/unset-admin`);
  return response.data;
}

export async function deleteUser(user_id: number): Promise<ResponseMessage> {
  const response = await api.delete('/users/delete', {
    params: { user_id },
  });
  return response.data;
}