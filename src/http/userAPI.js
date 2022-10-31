import { $authHost, $host } from '.';
import jwt_decode from 'jwt-decode';

export const registration = async (email, password) => {
  const { data } = await $host.post('api/user/registration', { email, password, role: 'ADMIN' });
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token); // Чтобы возвращался пользователь по jwt-токену
};

export const login = async (email, password) => {
  const { data } = await $host.post('api/user/login', { email, password });
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token); // Чтобы возвращался пользователь по jwt-токену
};

export const check = async () => {
  const { data } = await $authHost.get('api/user/auth'); // Проверка валидности токена, если срок жизни истек, то пользователя разлогинивает
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token);
};
