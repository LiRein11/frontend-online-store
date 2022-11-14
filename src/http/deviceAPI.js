import { $authHost, $host } from '.';
import jwt_decode from 'jwt-decode';

export const createType = async (type) => {
  const { data } = await $authHost.post('api/type', type);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get('api/type');
  return data;
}; // Получение типов

export const createBrand = async (brand) => {
  const { data } = await $authHost.post('api/brand', brand);
  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get('api/brand');
  return data;
};

export const createDevice = async (device) => {
  const { data } = await $authHost.post('api/device', device);
  return data;
};

export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
  const { data } = await $host.get('api/device', {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  });
  return data;
};

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get('api/device/' + id);
  return data;
};

export const addDeviceToBasket = async (device) => {
  const { data } = await $authHost.post('api/basket/', device);
  return data;
};

export const addDeviceToBasketNoname = async (device) => {
  const { data } = await $host.post('api/basket/', device);
  return data;
};

export const getDevicesFromBasket = async () => {
  const { data } = await $host.get('api/basket/devices');
  return data;
};

export const getOneBasket = async () => {
  const { data } = await $authHost.get('api/basket/one');
  return data;
};

export const deleteDeviceFromBasket = async (id) => {
  await $authHost.delete('api/basket/devices/' + id);
};

export const deleteDeviceFromBasketNoname = async (id) => {
  await $authHost.delete('api/basket/devices/' + id);
};

export const addRating = async (body) => {
  const { data } = await $authHost.post('api/rating/', body);
  return data;
};

export const checkRating = async (body) => {
  const { data } = await $authHost.post('api/rating/check', body);
  return data;
};
