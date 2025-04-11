import {AxiosError, AxiosResponse} from 'axios';
import {IWaterCard} from '../models/WaterCard';
import api from './api';
import {AddWaterCardParams} from '../models/types/AddWaterCardParams';
import {DeleteWaterCardParams} from '../models/types/DeleteWaterCardParams';
import {UpdateWaterCardParams} from '../models/types/UpdateWaterCardParams';

export type UpdatePartiallyWaterCardParams = {
  accessToken: string;
  waterCard: IWaterCard;
  updatedWaterCard: UpdatedWaterCard[];
};

export type UpdatedWaterCard = {
  op: string;
  path: string;
  value: string | number;
};
export const getWaterCards = async ({queryKey}: any): Promise<IWaterCard[]> => {
  const [_key, userId, accessToken] = queryKey;

  try {
    const response = await api.get(`/api/water-cards/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Cache-Control': 'no-cache',
        Accept: 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addWaterCard = async ({
  accessToken,
  user,
  waterCard,
}: AddWaterCardParams) => {
  try {
    const response: AxiosResponse = await api.post(
      '/api/water-cards',
      {
        userId: user.id,
        subscriberNo: user.subscriberNo,
        meterNo: waterCard.meterNo,
        credit: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Cache-Control': 'no-cache',
        },
      },
    );
    // console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteWaterCard = async (params: DeleteWaterCardParams) => {
  try {
    // console.log(params);
    const {accessToken, waterCard} = params;
    const response = await api.delete(`/api/water-cards/${waterCard.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
      },
    });

    // console.log(response.data);
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};

export const updateWaterCard = async (params: UpdateWaterCardParams) => {
  try {
    console.log(params, ' updateWaterCards api servis metodu çalıştı.');
    const {accessToken, waterCard, updatedWaterCard} = params;
    console.log(updatedWaterCard);
    const response = await api.patch(
      `/api/water-cards/${waterCard.id}`,
      updatedWaterCard,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Cache-Control': 'no-cache',
        },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error: AxiosError | any) {
    console.error(error.message);
  }
};

export const updatePartiallyWaterCard = async (
  params: UpdatePartiallyWaterCardParams,
) => {
  console.log(params);
  const {accessToken, updatedWaterCard, waterCard} = params;
  const response = await api.patch(
    `/api/water-cards/${waterCard.id}`,
    updatedWaterCard,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
      },
    },
  );

  console.log(response.data);
};
