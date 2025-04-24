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

export const updateUser = async ({userId, updatedUser}: any) => {
  console.log('data: ', updatedUser);
  try {
    const response: AxiosResponse = await api.patch(
      `/api/users/${userId}`,
      updatedUser,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
