import api from './api';
import {IMeter} from '../models/Meter';

export const getMeters = async (subscriberNo: string): Promise<IMeter[]> => {
  try {
    const metersResponse = await api.get(
      `/api/meters?pageSize=10&pageNumber=1&subscriberNo=${subscriberNo}`,
      {
        headers: {
          'Cache-Control': 'no-cache',
          Accept: 'application/json',
        },
      },
    );
    // console.log(metersResponse.data);
    return metersResponse.data;
  } catch (error) {
    console.error(error);
  }
  return [];
};
