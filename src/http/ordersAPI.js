import { $authHost, $host } from './index';

export const sendOrder = async ({ auth, mobile, basket }) => {
  if (auth) {
    const { data } = await $authHost({
      method: 'POST',
      url: 'api/order/',
      data: { mobile, basket },
    });
    return data;
  } else {
    const { data } = await $host({ method: 'POST', url: 'api/order/', data: { mobile, basket } });
    return data;
  }
};


// limit=${limit}&page=${page}
//  limit, page,
export const fetchOrders = async ({ complete }) => {
  const { data } = await $authHost.get(
    `api/order?complete=${complete}`,
  );
  return data;
};

export const fetchChangeStatusOrder = async ({ complete, id }) => {
  const { data } = await $authHost.put('api/order', { complete, id });
  return data;
};

export const fetchDeleteOrder = async ({ id }) => {
  const { data } = await $authHost({ method: 'DELETE', url: 'api/order', data: { id } });
  return data;
};

export const getOneOrderDevice = async (id) => {
  const { data } = await $authHost.get('api/order/' + id);
  return data;
};
