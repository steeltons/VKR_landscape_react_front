import { ErrorResponse } from "react-router-dom";
import { ResponseMessage } from "../common/models";
import api from "./api";

const USER_URL = 'users';

export type RegisterUserRqDto = {
    user_login: string;
    user_password: string;
    user_email: string;
}

export async function registerUser(data: RegisterUserRqDto) : Promise<ResponseMessage> {
    const response = await api.post(USER_URL + '/insert', null, {
            params: data
        });
    console.log(response.data);
    return response.data;
}