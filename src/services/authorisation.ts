import { ResponseMessage } from "../common/models";
import api from "./api";

export type LoginFormRqDto = {
    username: string;
    password: string;
}

export type LoginFormRsDto = {
    access_token: string;
    token_type: string;
}

export async function loginUser(data: LoginFormRqDto) : Promise<boolean>  {
    
    const response = await api.post('/login', data,
        {
           headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
           } 
        }
    )
    const tokenInfo : LoginFormRsDto = response.data;
    localStorage.setItem('accessToken', tokenInfo.access_token); 
    return true;
}

export async function logoutUser() : Promise<boolean> {
    const response = await api.post('logout');
    const message : ResponseMessage = response.data;
    localStorage.removeItem('accessToken');

    return true;
}