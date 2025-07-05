import { useMemo } from 'react';
import { parseJwt } from '../utils/token';

type JwtPayload = {
  sub: string;
  is_admin: boolean;
  exp: number;
  [key: string]: any; // на случай дополнительных полей
};

export const useJwtPayload = (): JwtPayload | null => {
  return useMemo(() => {
    const token = localStorage.getItem('accessToken');
    return token ? parseJwt(token) : null;
  }, []);
};
