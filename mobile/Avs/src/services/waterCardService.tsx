import {AxiosResponse} from 'axios';
import {IWaterCard} from '../models/WaterCard';
import api from './api';

export const getWaterCards = async ({queryKey}: any): Promise<IWaterCard[]> => {
  const [_key, userId, accessToken] = queryKey;
  const response: AxiosResponse<IWaterCard[]> = await api.get(
    `/api/water-cards/user/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    },
  );
  console.log(response.data);
  return response.data;
};

export const addWaterCard = async (waterCard: IWaterCard) => {
  try {
    console.log('waterCardService -> addWaterCards çalişti.');
  } catch (error) {
    console.error(error);
  }
};

export const updateWaterCards = async () => {
  try {
  } catch (error) {
    console.error(error);
  }
};

export const deleteWaterCards = async () => {
  try {
  } catch (error) {
    console.error(error);
  }
};
