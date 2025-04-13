import api from './api';
import {IMeter} from '../models/Meter';

export const getMeters = async ({queryKey}: any): Promise<IMeter[]> => {
  const [_key, subscriberNo, accessToken] = queryKey;
  try {
    const metersResponse = await api.get(
      `/api/meters?pageSize=10&pageNumber=1&subscriberNo=${subscriberNo}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Cache-Control': 'no-cache',
          Accept: 'application/json',
        },
      },
    );
    console.log();
    console.log(metersResponse.data);
    return metersResponse.data;
  } catch (error) {
    console.error(error);
  }
  return [];
};
