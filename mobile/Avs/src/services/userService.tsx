import {AxiosResponse} from 'axios';
import {IMeter} from '../models/Meter';
import api from './api';

export const getUserMeters = async ({queryKey}: any): Promise<IMeter[]> => {
  const [_key, subscriberNo] = queryKey;
  try {
    const response: AxiosResponse = await api.get(
      `/api/users/${subscriberNo}/meters`,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return [];
};
